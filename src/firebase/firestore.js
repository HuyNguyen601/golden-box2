import {firestore} from './firebase'


export const addCustomer = (customer)=>{
  firestore.collection("Customers").add({
    name: customer.name,
    phone: customer.phone,
    email: customer.email
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    docRef.collection("Address").add(customer.address)
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
}

export const getCustomers = (sorting, currentPage,pageSize, search,callback)=>{
  console.log(1)
  const startAt = currentPage * pageSize
  const res = {}
  //get total count
  const firstQuery = firestore.collection('Customers')
                    .where(sorting.columnName,'>=',search)
                    .where(sorting.columnName,'<=',search+'z')
                    .orderBy(sorting.columnName, sorting.direction)

  firstQuery.get().then(querySnapshot=>{
    res.totalCount=querySnapshot.size
    const doc = querySnapshot.docs[startAt]
    //main query
    const query = doc === undefined
      ? firstQuery.limit(pageSize)
      : firstQuery.limit(pageSize).startAt(doc)

    query.get()
    .then(querySnapshot=>{
      const rows = []

      querySnapshot.forEach(doc=>{
        const row = doc.data()
        row.id = doc.id
        rows.push(row)
      })
      res.rows = rows
      res.loading = false
      callback(res)
    })
    .catch(error=>{
      console.log(error)
    })
  })
}
export const getAddress= async id =>{
  const query = firestore.collection('Customers').doc(id).collection('Address')
  const querySnapshot = await query.get()
  const rows = []
  querySnapshot.forEach(doc=>{
    const row = doc.data()
    row.id = doc.id
    rows.push(row)
  })
  return rows
}
