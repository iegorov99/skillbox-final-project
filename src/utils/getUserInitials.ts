export function getUserInitials(name: string, surname: string) {
  return name[0].toLocaleUpperCase() + surname[0].toLocaleUpperCase();
}