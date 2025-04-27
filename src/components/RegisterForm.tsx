import { Button } from "./Button";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Api from "../api/api";
import { CustomInput } from "./CustomInput";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleAuthType } from "../features/authSlice";
import { useState } from "react";

const CreateRegisterFormSchema = z.object({
  email: z.string().email("Введён некорректный формат электронной почты").min(5, "Должно быть не менее 5 символв"),
  password: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
  name: z.string().min(3, "Имя должно содержать не менее 3 символов"),
  surname: z.string().min(5, "Имя должно содержать не менее 5 символов"),
  passwordCheck: z.string().min(8, "Подтверждение пароля должно содержать не менее 8 символов"),
}).refine(data => data.password === data.passwordCheck, {
  message: "Пароли не совпадают",
  path: ["passwordCheck"],
});

type CreateRegisterForm = z.infer<typeof CreateRegisterFormSchema>;

type TProps = {
  className: string
};

export const RegisterForm = ({ className }: TProps) => {
  const dispatch = useAppDispatch();
  const authType = useAppSelector((state) => state.authType);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClick = () => {
    if (authType === "login") {
      dispatch(toggleAuthType("register"));
    } else {
      dispatch(toggleAuthType("login"));
    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm<CreateRegisterForm>({
    resolver: zodResolver(CreateRegisterFormSchema)
  })

  const registerMutation = useMutation(
    {
      mutationFn: Api.registerUser,
      onSuccess: () => {
        setErrorStatus(false);
        Api.queryClient.invalidateQueries({ queryKey: ["profiler"] });
      },
      onError: (error) => {
        console.error(error.message);
        setErrorStatus(true);
        if (error.message === "User already exists") setErrorMessage("Пользователь с таким E-mail уже существует.")
      }
    },
    Api.queryClient
  );

  return (
    registerMutation.isSuccess ? (
      <div className={`${className}__success`}>
        <p className={`${className}__success-title`}>Регистрация завершена</p>
        <p className={`${className}__success-note`}>Используйте вашу электронную почту для входа</p>
        <Button className="custom-input__btn btn btn--blue" onClick={() => dispatch(toggleAuthType("login"))}>Войти</Button>
      </div>
    ) : (
      <form className={`${className}__form`} onSubmit={handleSubmit(({ email, password, name, surname }) => registerMutation.mutate({ email, password, name, surname }))}>
        <CustomInput className={`custom-input--white ${className}__input ${errors.email ? "custom-input--error" : ""}`} idField="email" iconId="mail-icon" errorMessage={errors.email?.message}>
          <input className="custom-input__field" id="email" type="email" {...register("email")} placeholder="Электронная почта" />
        </CustomInput>
        <CustomInput className={`custom-input--white ${className}__input ${errors.name ? "custom-input--error" : ""}`} idField="name" iconId="user-icon-false" errorMessage={errors.name?.message}>
          <input className="custom-input__field" id="name" type="text" {...register("name")} placeholder="Имя" />
        </CustomInput>
        <CustomInput className={`custom-input--white ${className}__input ${errors.surname ? "custom-input--error" : ""}`} idField="surname" iconId="user-icon-false" errorMessage={errors.surname?.message}>
          <input className="custom-input__field" id="surname" type="text" {...register("surname")} placeholder="Фамилия" />
        </CustomInput>
        <CustomInput className={`custom-input--white ${className}__input ${errors.password ? "custom-input--error" : ""}`} idField="password" iconId="key-icon" errorMessage={errors.password?.message}>
          <input className="custom-input__field" id="password" type="password" {...register("password")} placeholder="Пароль" />
        </CustomInput>
        <CustomInput className={`custom-input--white ${className}__input ${errors.passwordCheck ? "custom-input--error" : ""}`} idField="passwordCheck" iconId="key-icon" errorMessage={errors.passwordCheck?.message}>
          <input className="custom-input__field" id="passwordCheck" type="password" {...register("passwordCheck")} placeholder="Подтверждение пароля" />
        </CustomInput>

        {errorStatus && <p className="form-field__error-text">{errorMessage}</p>}
        <Button type="submit" className="custom-input__btn btn btn--blue">Зарегистрироваться</Button>
        <Button className="auth-window__btn btn btn--transparent" onClick={handleClick} type="button">{authType === "login" ? "Регистрация" : "У меня есть пароль"}</Button>
      </form>
    )
  );
};

