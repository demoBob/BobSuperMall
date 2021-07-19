export default function debounce(func,delay){
    let timer = null
    return function(...parms){
        if(timer) clearTimeout(timer)
        timer = setTimeout(() =>{
            func.apply(this,parms)
        },delay)
    }
}