export interface Service {
  title: string;
  description: string;
  points: string[];
}

export const services: Service[] = [
  {
    title: "Design Mobilier",
    description:
      "Fiecare proiect începe cu o discuție, o vizită la fața locului și o serie de schițe. Proiectăm în funcție de modul în care trăiești și lucrezi cu adevărat, nu după un catalog.",
    points: ["Consultație față în față", "Vizualizare 3D", "Selecție materiale și finisaje"],
  },
  {
    title: "Producție",
    description:
      "Toată tâmplăria este produsă în propriul atelier, ceea ce ne oferă control total asupra toleranțelor, materialelor și calității finisajului, de la primul debitaj până la lustruirea finală.",
    points: ["Atelier propriu", "CNC de precizie și finisare manuală", "Control riguros al calității"],
  },
  {
    title: "Instalare",
    description:
      "Echipele noastre proprii de instalare livrează și montează fiecare piesă, protejând spațiul tău și asigurându-se că rezultatul final corespunde exact intenției de design.",
    points: ["Echipă dedicată de instalare", "Protecția șantierului inclusă", "Predare fără remedieri ulterioare"],
  },
];
