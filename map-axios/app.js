let express=require ('express') ;
let app=express();


let data;
renderList(function(){
    Axios.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
    .then(function(res){
        console.log(res.responseText);
        data=JSON.parse(res.responseText);
        getData('臺北市');
    })
})

function getData(city){
    let ary=data.features;
    let str='';
    for(let i=0;ary.length>i;i++){
        if(ary[i].properties.county==city){
            str+='<li>'+ary[i].properties.county + ary[i].properties.name+'  ,成人口罩：'+ary[i].properties.mask_adult+'  ,兒童口罩：'+ary[i].properties.mask_child+'</li>'
        }
        
    };
    document.querySelector('.list').innerHTML=str;
}


document.querySelector('.area').addEventListener('change',function(e){
    getData(e.target.value);
})

renderList();



app.listen(3000);
