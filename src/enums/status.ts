type Options = {
    label: string;
    value: boolean | null;
  };

const statusOptions: Options[] = [
    { label: "Все", value: null },
    { label: "Активные", value: false },
    { label: "В архиве", value: true },
  ];

export {statusOptions, type Options}