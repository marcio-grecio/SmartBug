const PageNotFound = () => {
  return (
    <section className="mi-content">
      <div className="mi-card" style={{ height: '91vh',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="mi-card-header border-none text-center">
          <h1 className="mi-error-code" style={{ margin: '0 0 70px 0'}}>404</h1>
          <h3 className="text-center" style={{ margin: '0 150px'}}>Oops!!! Acho que você tentou acessar algo que não existe!</h3>
        </div>
      </div>
    </section>
  )
}

export default PageNotFound
