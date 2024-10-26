
var levim  = document.getElementById("lev");
var dark  = document.getElementById("darken");
var imgb = document.getElementById("b");

function init(){
  let menu_ui = document.getElementById("menu");
  let play_btn = document.getElementById("play");
  let record_btn = document.getElementById("Rec");
  let set_btn = document.getElementById("set");

  play_btn.addEventListener("click", () => {

    menu_ui.style.display = "none";
    let lev1 = document.getElementById("level")
    let bias = 0
    let sec = 60
    let lev = lev1.getContext("2d")
    lev.drawImage(levim,0,bias)
    let  d = new Date()
    let stime = Date.now()
    let not =0
    let not2 = -144
    let lnot =0
    let lnot2 = -144
    
    function timer() {
        let time =  Date.now()
        duration  =time-stime
        if(duration< sec * 1000) {
            lev.clearRect(0,0,144,687);
           
            if(not<=143) {
                not+=4
                lev.drawImage(dark,not,duration*(687/(sec*1000)))
            } else {
                not =-143
                lev.drawImage(dark,not,duration*(687/(sec*1000)))
            }

            if(not2<=143) {
                not2+=4
                lev.drawImage(dark,not2,duration*(687/(sec*1000)))
            } else {
                not2 =-143
                lev.drawImage(dark,not2,duration*(687/(sec*1000)))
            }

            if(lnot>-144 && lnot<=144) {
                lnot-=5
                lev.drawImage(levim,lnot,duration*(687/(sec*1000)))
            } else {
                lnot =144
                lev.drawImage(levim,lnot,duration*(687/(sec*1000)))
            }

            if(lnot2>-144 && lnot2<=144) {
                lnot2-=5
                lev.drawImage(levim,lnot2,duration*(687/(sec*1000)))
            } else {
                lnot2 =144
                lev.drawImage(levim,lnot2,duration*(687/(sec*1000)))
            }
 
            
            
            window.requestAnimationFrame(timer)
        
        }
       
    }
    window.requestAnimationFrame(timer)
  })
let selected_color = [255, 124, 23];
deep_color = 21;
let pic = [];
for(let i = 0; i<20;i++) {
    let red = selected_color[0] + 1 *Math.floor(Math.random()*deep_color)-Math.floor(deep_color/2);
    let green = selected_color[1] + 1 *Math.floor(Math.random()*deep_color)-Math.floor(deep_color/2);
    let blue = selected_color[2] + 1 *Math.floor(Math.random()*deep_color)-Math.floor(deep_color/2);
    let rgb_string = "rgb("+ String(red) +"," + String(green) + "," + String(blue) +")";
    pic.push(rgb_string);
}



let canvas = document.getElementById("canvas");

let ctx = canvas.getContext("2d");





let arr_map = [];

let x_map = 14
let y_map= 14

let field_length = Math.floor(600/14)+1







let c =1
    for(let y = 0 ; y<y_map; y++) {
        arrx= []
        for(let x=0;x<x_map;x++) {
            arrx.push({
                x:x,
                y:y,
                id:c,
                type:0,
                checked: 0
            })
            c++;
        }
        arr_map.push(arrx)
    }
       






function findPath(y,x,y1,x1,map) {
    
    
    let ftype = map[y1][x1].type;
    map[y][x].checked =  1;
    if(map[y] != undefined) {
        if(map[y][x+1] != undefined) {
            if(map[y][x+1].checked ==0) {
                if(map[y][x+1].type == ftype && y == map[y1][x1].y &&  x+1 == map[y1][x1].x ) {
                    flag = 1
                } else if(map[y][x+1].type ==0) {
                    findPath(y,x+1,y1,x1,map)
                }
            }
        }
    }
    if(map[y] != undefined) {
        if(map[y][x-1] != undefined) {
            if(map[y][x-1].checked ==0) {
                if(map[y][x-1].type == ftype && y == map[y1][x1].y &&  x-1 == map[y1][x1].x) {
                    flag = 1
                } else if(map[y][x-1].type ==0) {
                    findPath(y,x-1,y1,x1,map)
                }
            }
        }
    }

    if(map[y+1] != undefined) {
        if(map[y+1][x] != undefined) {
            if(map[y+1][x].checked ==0) {
                if(map[y+1][x].type == ftype && y+1 == map[y1][x1].y &&  x == map[y1][x1].x) {
                    flag = 1
                } else if(map[y+1][x].type ==0) {
                    findPath(y+1,x,y1,x1,map)
                }
            }
        }
    }
    if(map[y-1] != undefined) {
        if(map[y-1][x] != undefined) {
            if(map[y-1][x].checked ==0) {
                if(map[y-1][x].type == ftype && y-1 == map[y1][x1].y &&  x == map[y1][x1].x) {
                    flag = 1
                } else if(map[y-1][x].type ==0) {
                    findPath(y-1,x,y1,x1,map)
                }
            }
        }
    }
                 
    }
    
function Path(y,x,y1,x1,map) {
    for(let y = 0 ; y<y_map; y++) {
        for(let x=0;x<x_map;x++) {
            map[y][x].checked =0

            }
        }

    flag = 0
    if(map[y1][x1].type == map[y][x].type ) {
        findPath(y,x,y1,x1,map); 
    }
   
    if(flag ==1) {
        return 1
    } else {
        return 0
    }
    }




function getCoords(elem) {
        let box = elem.getBoundingClientRect();
      
        return {
          top: box.top + window.pageYOffset,
          right: box.right + window.pageXOffset,
          bottom: box.bottom + window.pageYOffset,
          left: box.left + window.pageXOffset
        };
}

function stepmap(map) {
    let not_reached = [];
    let empty = [];
    for(let y = 0 ; y<y_map; y++) {
        for(let x=0;x<x_map;x++) {
            if(map[y][x].type == 0) {
                empty.push(map[y][x])

            }
        }
    }
    findex = (Math.floor(Math.random() * empty.length));
    if(empty.length ==0) {
        return 1
        
    }
    let first_filled = empty[findex] ;
    
     let type_fill = (Math.floor(Math.random() * 16))+1;
     
    map[first_filled.y][first_filled.x].type = type_fill;
    empty.splice(findex,1);
    let fl = 0
    while (fl ==0) {
        
        sindex = (Math.floor(Math.random() * empty.length));
        second_filled = empty[sindex];
         map[second_filled.y][second_filled.x].type = type_fill;
         empty.splice(sindex,1);
        
        if(Path(first_filled.y,first_filled.x,second_filled.y,second_filled.x,map) ==1) {
            fl =1
            break
        } else if(empty.length ==0) {
            fl=0
            break
            
        }else {
            map[second_filled.y][second_filled.x].type = 0;
        }
    }

        }
        

for(i=0;i<((y_map*x_map)/2);i++) {
stepmap(arr_map);
}

function drawMap(map) {
    ctx.clearRect(0,0,600,600);
    ctx.drawImage(imgb,0,0,600,600)
    for(let y = 0 ; y<y_map; y++) {
        for(let x=0;x<x_map;x++) {
            index_fill = map[y][x].type;
            if(index_fill!=0) {
                ctx.fillStyle = pic[index_fill-1]
                ctx.fillRect(field_length*x,field_length*y,field_length,field_length)
           }
            

            }
        }
}

console.log(getCoords(canvas))
console.log(arr_map)
drawMap(arr_map);

arr_y = []
    for(let y=0; y<=y_map; y++) {
        arr_y.push(field_length*y)
    }

arr_x = []
for(let y=0; y<=x_map; y++) {
    arr_x.push(field_length*y)
}


function findCo (dy,dx) {
    for(let y=0; y<y_map; y++) {
        for(let x=0; x<x_map; x++) {
            if((dy>arr_y[y] && dy<arr_y[y+1]) && (dx>arr_x[x] && dx<arr_x[x+1])) {
                return [y,x];

            }
        }
    }
}
cclick=0
let fco = findCo(getCoords(canvas).left+1,getCoords(canvas).top+1);

document.addEventListener("mousedown", () => {
    let cox = event.pageX-getCoords(canvas).left;
    let coy =event.pageY-getCoords(canvas).top;
    fco1 =findCo(coy,cox);
    if(fco1 !=undefined){
        if(Path(fco[0],fco[1],fco1[0],fco1[1],arr_map)==1) {
            arr_map[fco[0]][fco[1]].type = 0
            arr_map[fco1[0]][fco1[1]].type = 0
            

            drawMap(arr_map);

        } else {
            fco = fco1
        }

    }

    
})



}


