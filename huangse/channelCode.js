let arr = [];
for(let i=1;i<101;i++){
	arr.push({
            "id" : "c1_"+i,
            "name" : "c1_"+i
        });
}
// console.log(arr)
console.log(JSON.stringify(arr));

let str = "";
for(let i=1;i<101;i++){
	if(i==100){
		str += `c1_${i}`;
	}else{
		str += `c1_${i},`;
	}
	
}

console.warn(str);