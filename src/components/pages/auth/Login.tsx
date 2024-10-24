import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import routesConfig from "@/config/routes.config";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginForm } from "@/types/auth.types";
import { AuthService } from "@/services/auth.service";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useUserStore from "@/store/users.store";
import authenticationCheck from "@/utils/authenticationCheck";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const { register, handleSubmit } = useForm<ILoginForm>();
  const authService = new AuthService();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    setIsLoading(true);
    const response = (await authService.login(data)) as AxiosResponse & {
      message: string;
    };
    if (response.status !== 200) {
      setErrorMessage(response.message);
    } else {
      navigate(routesConfig.DASHBOARD);
      setUser(response.data.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    authenticationCheck(navigate, location);
  }, [location, navigate]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[450px] min-w-[450px] border rounded-[12px] shadow-md p-[24px] bg-white dark:bg-black overflow-hidden "
    >
      <h1 className="text-center text-gray text-[24px] font-[500]">
        {t("sign-in")}
      </h1>
      <div
        className={cn(
          "text-red mt-[24px] text-center",
          errorMessage.length ? "block" : "hidden"
        )}
      >
        {errorMessage}
      </div>
      <div className="flex flex-col gap-[12px] mt-[16px]">
        <Input
          {...register("email", { required: true })}
          type="text"
          placeholder={t("email")}
        />
        <div className="relative">
          <Input
            {...register("password", { required: true })}
            type={viewPassword ? "text" : "password"}
            placeholder={t("password")}
          />
          <Eye
            onClick={() => setViewPassword(true)}
            className={cn(
              "absolute z-[10] right-[8px] top-[12px] cursor-pointer text-gray hover:text-black duration-150",
              viewPassword ? "hidden" : "block"
            )}
            size={18}
          />
          <EyeOff
            onClick={() => setViewPassword(false)}
            className={cn(
              "absolute z-[10] right-[8px] top-[12px] cursor-pointer text-gray hover:text-black duration-150",
              viewPassword ? "block" : "hidden"
            )}
            size={18}
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full dark:text-white mt-[24px] bg-gradient-to-r from-blue to-pink hover:from-blue/90 hover:to-pink/90 "
      >
        {t("login")}
      </Button>
      <div className="mt-[48px] flex items-center justify-center space-x-1">
        <span className="text-gray"> {t("Don't have an account")}</span>
        <Link
          to={routesConfig.REGISTER}
          className="font-[500] hover:text-gray duration-200"
        >
          {t("sign-up")}
        </Link>
      </div>
    </form>
  );
};

export default Login;
