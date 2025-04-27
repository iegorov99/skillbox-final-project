import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "./CustomInput";
import Api from "../api/api";
import { queryClient } from "../api/queryClient";
import { Button } from "./Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleModalIsOpen } from "../features/modalIsOpenSlice";
import { toggleIsAuth } from "../features/isAuthSlice";
import { toggleUserName } from "../features/userNameSlice";
import { toggleAuthType } from "../features/authSlice";

const CreateLoginFormSchema = z.object({
  email: z.string().email("Введите корректный формат электронной почты").min(5, "Должно быть не менее 5 символв"),
  password: z.string().min(8, "Пароль должен содержать не менее 8 символов")
});

type CreateLoginForm = z.infer<typeof CreateLoginFormSchema>;

type TProps = {
  className: string
}

export const LoginForm = ({ className } : TProps) => {
  const dispatch = useAppDispatch();
    const authType = useAppSelector((state) => state.authType);
    
    const handleClick = () => {
      if (authType === "login") {
        dispatch(toggleAuthType("register"));
      } else {
        dispatch(toggleAuthType("login"));
      }
    };

  const { register, handleSubmit, formState: {errors} } = useForm<CreateLoginForm>({
    resolver: zodResolver(CreateLoginFormSchema)
  });

  const setUserName = async () => {
    const data = await Api.fetchMe();
    dispatch(toggleUserName(data.name));
  }

  const loginMutation = useMutation(
    {
      mutationFn: Api.loginUser,
      onSuccess() {
        dispatch(toggleModalIsOpen(false));
        dispatch(toggleIsAuth(true));
        setUserName();
        queryClient.invalidateQueries({ queryKey: ["profile"] })
      }
    },
    queryClient
  );

  return (
    <form className={className + "__form"} onSubmit={handleSubmit(({email, password}) => loginMutation.mutate({email, password}))}>
      <CustomInput className={`custom-input--white ${className}__input ${errors.email ? "custom-input--error" : ""}`} idField="email" iconId="mail-icon" errorMessage={errors.email?.message}>
        <input className="custom-input__field" id="email" type="email" {...register("email")} placeholder="Электронная почта" />
      </CustomInput>
      <CustomInput className={`custom-input--white ${className}__input ${errors.password ? "custom-input--error" : ""}`} idField="password" iconId="key-icon" errorMessage={errors.password?.message}>
        <input className="custom-input__field" id="password" type="password" {...register("password")} placeholder="Пароль" />
      </CustomInput>

      {loginMutation.error && <span className="form-field__error-text">Неверно введён E-mail или пароль</span>}
      
      <Button className="custom-input__btn btn btn--blue" isLoading={loginMutation.isPending} type="submit">Войти</Button>

      <Button className="auth-window__btn btn btn--transparent" onClick={handleClick} type="button">{authType === "login" ? "Регистрация" : "У меня есть пароль"}</Button>
    </form>
  );
};