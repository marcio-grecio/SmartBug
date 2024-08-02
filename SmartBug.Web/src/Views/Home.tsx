// import { Card } from 'primereact/card';
// import { Message } from 'primereact/message';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { useState } from 'react';
const Home = () => {
  // const [products, setProducts] = useState([]);

  return (
        <section className="mi-content rounded-md bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white text-center">
          <div className="mi-card" style={{ height: '90vh',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="mi-card-header border-none text-center">
              <h1 className="mi-error-code" style={{ margin: '0 0 70px 0'}}>HOME</h1>
              <h3 className="text-center" style={{ margin: '0 150px'}}>Estou na Home</h3>
            </div>
          </div>
        </section>   
//     <div className="card">
//       <Card title="Simple Card">
//         <p className="m-0">
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
//           numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
//         </p>
//       </Card>

//       <div className="card flex flex-wrap align-items-center justify-content-center gap-3">
//             <Message severity="success" text="Success Message" />
//             <Message severity="info" text="Info Message" />
//             <Message severity="warn" text="Warning Message" />
//             <Message severity="error" text="Error Message" />
//             <Message severity="secondary" text="Secondary Message" />
//             <Message severity="contrast" text="Contrast Message" />
//         </div>
//         <div className="card flex flex-wrap align-items-center justify-content-center gap-3">

//             <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
//                 <Column field="code" header="Code"></Column>
//                 <Column field="name" header="Name"></Column>
//                 <Column field="category" header="Category"></Column>
//                 <Column field="quantity" header="Quantity"></Column>
//             </DataTable>
//             <button type="button" className="
//             text-white 
//             bg-blue-700 
//             hover:bg-blue-800 
//             focus:ring-1 
//             focus:ring-blue-300 
//             font-medium 
//             rounded-lg 
//             text-sm 
//             px-5 
//             py-2.5 
//             me-2 
//             mb-2 
//             dark:bg-blue-600 
//             dark:hover:bg-blue-700 
//             focus:outline-none 
//             dark:focus:ring-blue-800">Default</button>



// <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Purple to Blue</button>
// <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Cyan to Blue</button>
// <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Green to Blue</button>
// <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Purple to Pink</button>
// <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pink to Orange</button>
// <button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Teal to Lime</button>
// <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Red to Yellow</button>

//         </div>
        
//     </div>
  )
}

export default Home
