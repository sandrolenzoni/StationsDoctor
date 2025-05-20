export const validateCPF = (raw: string) => {
  const cpf = raw.replace(/\D/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  const calcDigit = (factor: number) => {
    let total = 0;
    for (let i = 0; i < factor - 1; i++) {
      total += Number(cpf[i]) * (factor - i);
    }
    const rest = (total * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  const digit1 = calcDigit(10);
  const digit2 = calcDigit(11);

  return digit1 === Number(cpf[9]) && digit2 === Number(cpf[10]);
}