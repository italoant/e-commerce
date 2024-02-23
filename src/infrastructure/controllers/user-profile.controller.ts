import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetUser } from "../../e-commerce/cases/User/get/get-user.case.";
import { CurrentUser } from "../../common/current-user-decorator/current-user.decorator";
import { AuthGuard } from "../../e-commerce/auth/auth.guard";


@Controller('profile')
@ApiTags('')
export class ProfileController {
  constructor(
    private readonly getUser: GetUser,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@CurrentUser() req) {
    return req;
  }
}