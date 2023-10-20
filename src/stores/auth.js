import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, onAuthStateChanged, db } from '@/includes/firebase'

export const useAuthStore = defineStore('auth', () => {
  const userLoggedIn = ref(false)
  const defaultState = {
    watchlist: [],
    transactions: [],
    email: ''
  }
  const user = ref(defaultState)

  const register = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      const { uid } = userCredential.user
      await setDoc(doc(db, 'users', uid), {
        email: values.email
      })

      userLoggedIn.value = true
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password)
      const { uid } = userCredential.user
      await getUser(uid)
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      userLoggedIn.value = false
      user.value = defaultState
    } catch (error) {
      console.error(error)
    }
  }

  const getUser = async (uid) => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      user.value = {
        id: uid,
        ...user.value,
        ...docSnap.data()
      }
      userLoggedIn.value = true
    } else {
      console.log('No such document!')
    }
  }
  const getUserState = () =>
    new Promise((resolve, reject) => onAuthStateChanged(auth, resolve, reject))

  const addTransaction = async (data) => {
    try {
      user.value.transactions.push(data)
      const transactionRef = doc(db, 'users', user.value.id)
      setDoc(transactionRef, { transactions: user.value.transactions }, { merge: true })
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTransaction = async (data) => {
    try {
      const index = user.value.transactions.findIndex((item) => item === data)
      user.value.transactions.splice(index, 1)
      const transactionRef = doc(db, 'users', user.value.id)
      setDoc(transactionRef, { transactions: user.value.transactions }, { merge: true })
    } catch (error) {
      console.error(error)
    }
  }

  const getTransactions = computed(() => {
    return user.value.transactions
  })

  return {
    user,
    userLoggedIn,
    register,
    login,
    logout,
    getUser,
    getUserState,
    addTransaction,
    getTransactions,
    deleteTransaction
  }
})
