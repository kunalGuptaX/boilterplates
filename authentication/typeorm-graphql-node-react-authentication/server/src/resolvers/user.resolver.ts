import { User } from "../entity/User";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { MyContext } from "src/types/MyContext";
import { createAccessToken, createRefreshToken, verifyToken } from "../auth";
import { isAuth } from "../auth";
import { sendRefreshToken } from "../auth";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const payload = verifyToken(authorization) as { userId: string };
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  authenticatedRoute(@Ctx() { payload }: MyContext) {
    return `Your user id is ${payload?.userId}`;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("could not find user");

    const valid = await compare(password, user.password);
    if (!valid) throw new Error("Invalid password");

    sendRefreshToken(res, createRefreshToken(user));
    return { accessToken: createAccessToken(user), user };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      User.insert({ email, password: hashedPassword });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");
    return true;
  }
}
