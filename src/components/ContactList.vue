<template>
  <div>  
    <h1>Contact List App</h1>

    <div class="mb-3 row">
      <div class="offset-md-1 col-md-12">
        <form @submit.prevent="">
          <div class="row">
            <label for="staticEmail" class="col-sm-6 col-md-2">Name</label>
            <div class="col-sm-6 col-md-2">
              <input type="text" class="form-control mb-2" v-model="newContact.name" id="name" placeholder="Name" required autofocus>
            </div>
            <label for="inputPassword" class="col-sm-6 col-md-2">Contact Number</label>
            <div class="col-sm-6 col-md-2">
              <input type="tel" class="form-control mb-2" v-model="newContact.contactNumber" id="contactNumber" required placeholder="Contact Number">
            </div>
            <!-- <div class="col-sm-6 col-form-label"></div> -->
            <div class="col-md-2">
              <button class="btn btn-primary" @click="storeContact" v-if="!updatingContact">Add Contact</button>
              <button class="btn btn-primary" @click="updateContact(newContact.id)" v-else>Update Contact</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="offset-md-1 col-md-10 col-sm-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody v-for="contact in contacts" :key="contact.id">
            <tr>
              <td>{{ contact.name }}</td>
              <td>{{ contact.contactNumber }}</td>
              <td>
                <button class="btn btn-primary" @click="editContact(contact)">Edit</button>
                <button class="ml-2 btn btn-danger" v-b-modal.modal-1 @click="toBeDeleted(contact)">Delete</button>
                 <!-- @click="deleteContact(contact.id)" -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal id="modal-1" title="Are you sure?" hide-footer v-if="modalShow">
      <div class="my-4"><span class="font-weight-bold">Name:</span> {{ toBeDeletedContact.name }}</div>
      <div class="my-4"><span class="font-weight-bold">Contact Number:</span> {{ toBeDeletedContact.contactNumber }}</div>
      <hr>
      <div class="float-right">
        <b-button class="btn btn-primary mr-2" @click="modalShow = !modalShow">Cancel</b-button>
        <b-button variant="primary" @click="deleteContact(toBeDeletedContact.id)">OK</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

export default {
  name: 'ContactList',
  data () {
    return {
      collection: 'contacts',
      contacts: [],
      newContact: {},
      toBeDeletedContact: {},
      modalShow: false,
      updatingContact: false
    }
  },
  mounted () {
    this.fetchContacts()
  },
  methods: {
    async fetchContacts () {
      let data = []
      const querySnapshot = await getDocs(collection(db, this.collection))
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id, 
          name: doc.data().name,
          contactNumber: doc.data().contactNumber
        })
      })
      this.contacts = data
    },
    async storeContact () {
      if (this.newContact.name != null && this.newContact.contactNumber != null) {
        await addDoc(collection(db, this.collection), this.newContact)
        this.newContact = {}
        alert('Contact successfully added!')
        this.fetchContacts()
      } else {
        alert('All fields are required.')
      }
    },
    async deleteContact (id) {
      await deleteDoc(doc(db, this.collection, id))
      this.modalShow = !this.modalShow
      this.fetchContacts()
    },
    editContact (contact) {
      this.newContact = contact
      this.updatingContact = !this.updatingContact
    },
    async updateContact (id) {
      const contactRef = doc(db, this.collection, id)
      await updateDoc(contactRef, this.newContact);
      alert('Contact successfully updated!')
      this.updatingContact = false
      this.fetchContacts()
    },
    toBeDeleted (data) {
      this.toBeDeletedContact = data
      this.modalShow = !this.modalShow
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
