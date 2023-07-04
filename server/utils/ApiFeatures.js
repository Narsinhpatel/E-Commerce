class ApiFeature{

constructor(query,querystr){
    this.query=query;
    this.querystr=querystr;
}

search(){
let keyword=this.querystr.keyword?{
    name:{
        $regex:this.querystr.keyword,
        $options:"i"

    }

   
}:{}


this.query=this.query.find({...keyword});
return this;

}

filter(){

    let querystrCopy={...this.querystr};
//Removing some field for category
let RemoveFields=["keyword","page","limit"];

RemoveFields.forEach((key)=>delete querystrCopy[key])

//Filter for Price and Rating

let queryStr=JSON.stringify(querystrCopy);
queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);

this.query=this.query.find(JSON.parse(queryStr))

return this;
}

//pagination
pagination(resultPerPage){

    let currentPage=Number(this.querystr.page);

    let skip=resultPerPage*(currentPage-1);


    this.query=this.query.limit(resultPerPage).skip(skip);

    return this;
}
}

module.exports=ApiFeature;