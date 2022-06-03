import { auth, provider } from '../firebase'

export const signUp = (email, password) => {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res)
                resolve(res)
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

export const login=(email,password)=>{
    return new Promise((resolve,reject)=>{
        auth.signInWithEmailAndPassword(email,password).then((res)=>{
            console.log(res)
            resolve(res)
            
        }).catch((err)=>{
            console.log(err)
            reject(err)
        })
    })
}
