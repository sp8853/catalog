const fs = require('fs'); 

function convertToDecimal(value, base) {
    return [...value].reverse().reduce((acc, char, idx) => {
        const num = parseInt(char, base); 
        return acc + num * Math.pow(base, idx); 
    }, 0);
}

function lagrangeInterpolation(points) {
    let result = 0;

    const k = points.length;
    for (let i = 0; i < k; i++) {
        let term = points[i].y;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (0 - points[j].x) / (points[i].x - points[j].x);
            }
        }
        result += term;
    }
    return Math.round(result); 
}

function main(filePath) {
    const data = fs.readFileSync(filePath, 'utf8'); 
    const input = JSON.parse(data);

    const n = input.keys.n; 
    const k = input.keys.k; 

    const points = []; 

    for (const [key, value] of Object.entries(input)) {
        if (key === 'keys') continue; 

        const x = parseInt(key); 
        const base = parseInt(value.base);
        const y = convertToDecimal(value.value, base); 

        points.push({ x, y });
    }

   
    if (points.length < k) {
        console.error('Not enough points to solve the polynomial!');
        return;
    }

    const secret = lagrangeInterpolation(points.slice(0, k));

    console.log(The secret (constant term c) is: ${secret});
}


console.log('Test Case 1:');
main('testcase1.json'); 

console.log('\nTest Case 2:');
main('testcase2.json');