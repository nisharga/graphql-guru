import dotenv from "dotenv"
import path from "path";

dotenv.config({ path: path.join(process.cwd(), '.env') });
export const config = {
    port: process.env.PORT,
    access_token_expires_in: process.env.ACCESS_TOKEN_EXP_DATE,
    secret_access_token: process.env.SECRET_ACCESS_TOKEN,
    refresh_token_exp: process.env.REFRESH_TOKEN_EXP,
    refresh_token: process.env.REFRESH_TOKEN,
    reset_pass_token:process.env.RESET_PASS_TOKEN,
    reset_pass_link: process.env.RESET_PASSWORD_LINK,
    reset_pass_exp:process.env.RESET_PASS_EXP,
    app_email:process.env.APP_EMAIL,
    app_pass:process.env.APP_PASS,
    node_env: process.env.NODE_ENV

}