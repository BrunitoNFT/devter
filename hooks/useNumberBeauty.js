

export default function useNumberBeauty(amount) {
    if (amount>=1000000) {
        const a = Math.floor(amount/1000000)
        return `${a}M`
    }else if (amount>=1000){
        const b = Math.floor(amount/1000)
        return `${b}k`
    }else{
        return amount
    }
}

