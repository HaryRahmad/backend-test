function reverseString(data){
    let result = ``;
    for (let i = 0; i < data.length; i++) {
        if (isNaN(data[i])) {
            result = data[i] + result;
        } else {
            result = result + data[i];
        }
    }
    return result;
}

console.log(reverseString(`NEGIE1`));

//-------------------------------------------------------------------------------

function checkLongSentence(data){
    let result = ``;
    let dataSplit = data.split(` `);
    for (let i = 0; i < dataSplit.length; i++) {
        if (dataSplit[i].length > result.length) {
            result = dataSplit[i];
        }
    }
    return `${result} : ${result.length}`;
}
console.log(checkLongSentence(`Saya sangat senang mengerjakan soal algoritma`));

//-------------------------------------------------------------------------------

const INPUT = ['xc', 'dz', 'bbb', 'dz']  
const QUERY = ['bbb', 'ac', 'dz'] 

function checkQuery(dataInput, dataQuery){
    let result = [];
    for (let i = 0; i < dataQuery.length; i++) {
        // let data = dataQuery[i];
        let check = dataInput.filter(el => el === dataQuery[i]);

        result.push(check.length);
    }
    return result;
}
console.log(checkQuery(INPUT, QUERY));

//-------------------------------------------------------------------------------

const Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

function mathMatrix(data){
    let diagonalPertama = 0;
    let diagonalKedua = 0;
    for (let i = 0; i < data.length; i++) {
        // for (let j = 0; j < data[i].length; j++) {
        //     if (i === j) {
        //         console.log(data[i][j], `-----------------1111`);
                
        //         diagonalPertama += data[i][j];
        //     }
        // }
        // console.log(data[i].length, `-----------------1111`);
        diagonalPertama += data[i][i];
        
        // for (let k = data[i].length; k < 0; k--) {
        //     if (i === k) {
        //         console.log(data[i][k], `-----------------2222`);
        //         diagonalKedua += data[i][k];
        //     }
        // }
        diagonalKedua += data[i][data[i].length - 1 - i];
    }
    // console.log(diagonalPertama, diagonalKedua,`-----------------`);
    
    return diagonalPertama - diagonalKedua;
}
console.log(mathMatrix(Matrix));

