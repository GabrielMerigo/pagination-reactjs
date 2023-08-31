const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

interface IPaginationProps {
  /* numero total de páginas */
  limit: number;
  /* total de itens - iremos pegar esse total 
  e dividir pelo limit para saber qual será o tal de páginas */
  total: number;
  /* se eu estou na página 1, o meu offset será 0, 
  pois eu não quero pular nenhum item;
  Se eu estou na página 2, eu quero pular os itens da página 1
   - Então se você tinha 10 itens na página 1, na página 2 você vai ter um offset de 10
     Porque você quer pular aqueles 10 primeiros itens.
     Se você for para a página 3, você quer pular os 20 primeiros itens
  
  */
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({
  limit,
  total,
  offset,
  setOffset,
}: IPaginationProps) => {
  const currentPage = offset ? offset / limit + 1 : 1;
  /* Se o meu offset for 20, eu sei que eu estou na página 3, 
    eu irei dividir ele pelo *limit*, que no caso seria 10
    Então, eu teria 2. Porém, eu quero ir para a página 3 então eu adiciono 1.
  */
  const totalPages = Math.ceil(total / limit);
  const firstPage = Math.max(currentPage - MAX_LEFT, 1);
  /* Vamos supor que o meu currentPage é 45 e o meu MAX_LEFT é 4, então, nesse caso a minha primeira página
    da esquerda para direita é 41. Porém se o meu currentPage for 3, e o meu MAX_LEFT for 4, a primeira página
    não poderá ser -1, então, usamos o Math.max para pegar o número maior entro os dois.
  */

  function onPageChange(page: number) {
    setOffset((page - 1) * limit);
  }

  return (
    <ul className="pagination">
      <li>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Anterior
        </button>
      </li>
      {Array.from({ length: Math.min(MAX_ITEMS, totalPages) })
        .map((_, index) => index + firstPage)
        .map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={page === currentPage ? "pagination__item--active" : ""}
            >
              {page}
            </button>
          </li>
        ))}
      <li>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Próximo
        </button>
      </li>
    </ul>
  );
};
