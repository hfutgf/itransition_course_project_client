import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import routesConfig from "@/config/routes.config";
import { cn } from "@/lib/utils";
import { AuthService } from "@/services/auth.service";
import useUserStore from "@/store/users.store";
import { IRegisterForm } from "@/types/auth.types";
import authenticationCheck from "@/utils/authenticationCheck";
import { AxiosResponse } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Registration = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const { setUser } = useUserStore();
  const { t } = useTranslation();

  const { register, handleSubmit } = useForm<IRegisterForm>();
  const navigate = useNavigate();
  const location = useLocation();

  const authService = new AuthService();

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    setIsLoading(true);
    const { confirmPassword, ...fields } = data;
    if (confirmPassword === fields.password) {
      const response = (await authService.register(fields)) as AxiosResponse & {
        message: string;
      };
      if (response.status !== 201) {
        setErrorMessage(response.message);
      } else {
        setUser(response.data.user);
        navigate(routesConfig.DASHBOARD);
      }
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
        {t("sign-up")}
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
        <Input
          {...register("fullName", { required: true })}
          type="text"
          placeholder={t("full-name")}
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
        <div className="relative">
          <Input
            {...register("confirmPassword", { required: true })}
            type={viewConfirmPassword ? "text" : "password"}
            placeholder={t("confirm-password")}
          />
          <Eye
            onClick={() => setViewConfirmPassword(true)}
            className={cn(
              "absolute z-[10] right-[8px] top-[12px] cursor-pointer text-gray hover:text-black duration-150",
              viewConfirmPassword ? "hidden" : "block"
            )}
            size={18}
          />
          <EyeOff
            onClick={() => setViewConfirmPassword(false)}
            className={cn(
              "absolute z-[10] right-[8px] top-[12px] cursor-pointer text-gray hover:text-black duration-150",
              viewConfirmPassword ? "block" : "hidden"
            )}
            size={18}
          />
        </div>
      </div>
      <Button
        disabled={isLoading}
        className="w-full dark:text-white mt-[24px] bg-gradient-to-r from-blue to-pink hover:from-blue/90 hover:to-pink/90 "
      >
        {t("registration")}
      </Button>
      <div className="mt-[48px] flex items-center justify-center space-x-1">
        <span className="text-gray"> {t("Do you have an account?")}</span>
        <Link
          to={routesConfig.LOGIN}
          className="font-[500] hover:text-gray duration-200 select-none"
        >
           {t("sign-in")}
        </Link>
      </div>
    </form>
  );
};

export default Registration;
