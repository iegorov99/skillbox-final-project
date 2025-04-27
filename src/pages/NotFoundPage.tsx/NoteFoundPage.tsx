import useDocumentTitle from "../../hooks/useDocumentTitle";

const NotFoundPage = () => {
  useDocumentTitle("Страница не найдена");
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found__wrapper">
          <h1 className="not-found__title">
            <span className="not-found__title-num">404</span>
            <span className="not-found__title-text">Страница не найдена</span>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage;