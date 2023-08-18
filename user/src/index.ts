import 'dotenv/config';
import 'module-alias/register';
import validateEnv from './utils/validateEnv';
import App from './app';
import PostController from './resources/post/post.controller';
import UserController from './resources/user/user.controller';
import PermissionController from './resources/permission/permission.controller';
import RoleController from './resources/role/role.controller';

validateEnv();

const app = new App([
	new PostController(),
	new UserController(),
	new PermissionController(),
	new RoleController()
], Number(process.env.PORT));

app.listen();