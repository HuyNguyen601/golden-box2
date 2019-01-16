import {firestore} from './firebase'


export const addCustomer = (customer)=>{
  firestore.collection("Customers").add({
    name: customer.name,
    phone: customer.phone,
    email: customer.email
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
}

export const getCustomers = (sorting, currentPage,pageSize, search,callback)=>{
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
    console.log(sorting)
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

/*
export const getNextCustomers(last,sorting, pageSize, callback)=>{
  const res = {}
  //get total count
  firestore.collection('Customers').get().then(querySnapshot=>{ res.totalCount=querySnapshot.size})
  //main query
  const query = firestore.collection('Customers')
    .orderBy('name')
    .limit(pageSize)
    .startAfter(last)
  query.get()
  .then(querySnapshot=>{
    const rows = []
    const first = querySnapshot.docs[0]
    const last = querySnapshot.docs[querySnapshot.docs.length-1]
    querySnapshot.forEach(doc=>{
      const row = doc.data()
      row.id = doc.id
      rows.push(row)
    })
    res.rows = rows
    res.last = last
    res.first = first
    callback(res)
  })
  .catch(error=>{
    console.log(error)
  })
}

export const getPrevCustomers(first,sorting, pageSize, callback)=>{
  const res = {}
  //get total count
  firestore.collection('Customers').get().then(querySnapshot=>{ res.totalCount=querySnapshot.size})
  //main query
  const query = firestore.collection('Customers')
    .orderBy('name')
    .limit(pageSize)
    .startBefore(first)
  query.get()
  .then(querySnapshot=>{
    const rows = []
    const first = querySnapshot.docs[0]
    const last = querySnapshot.docs[querySnapshot.docs.length-1]
    querySnapshot.forEach(doc=>{
      const row = doc.data()
      row.id = doc.id
      rows.push(row)
    })
    res.rows = rows
    res.last = last
    res.first = first
    callback(res)
  })
  .catch(error=>{
    console.log(error)
  })
}
*/
