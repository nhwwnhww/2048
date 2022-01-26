// get all function
function Slide(){
    // big box
    this.cont = document.querySelector(".cont");
    // game over box
    this.mask = document.querySelector(".mask");
    // score
    this.g = document.querySelector(".grade");
    // total score
    this.over_grade = document.querySelector(".over_grade");
    // restart botton
    this.btn = document.querySelector(".btn");
    // martix (data)
    this.pos = [];

    this.myArr = [];
    // background
    this.createBack();
    // keyboard key
    this.keyDown();

    this.createFore();
    this.createFore();
    // restart
    this.restart();
    // total score
    this.grade = 0;
  }

  // all function
  Slide.prototype = {

    // player control
    keyDown: function () {
      document.onkeydown = function (e) {
        switch (e.keyCode) {
          case 37: this.leftmove(); break;
          case 38: this.upmove(); break;
          case 39: this.rightmove(); break;
          case 40: this.downmove(); break;
        }
        this.g.innerHTML = "score: " + this.grade;
        this.gameover();
      }.bind(this);
    },

    // gameover
    gameover: function () {
      var foreSlide = document.querySelectorAll(".fore-slide");
      var flag = 0;
      if (foreSlide.length == 16){
        console.log(flag);
        for (var i = 0; i < 4; i++){
          for (var j = 0; j < 4; j++){
            if (i == 0 && j == 0){
              if (this.pos[i][j] === this.pos[i][j+1] || this.pos[i][j] === this.pos[i+1][j]) {
                flag = 1;
              }
            }
            if (i==3 && j==3){
              if (this.pos[i][j] === this.pos[i][j-1] || this.pos[i][j] === this.pos[i-1][j]) {
                flag = 1;
              }
            }
            if (i==0 && j==3){
              if (this.pos[i][j] === this.pos[i][j-1] || this.pos[i][j] === this.pos[i+1][j]) {
                flag = 1;
              }
            }
            if (i==3 && j==0){
              if (this.pos[i][j] === this.pos[i][j+1] || this.pos[i][j] === this.pos[i-1][j]) {
                flag = 1;
              }
            }
            if (i==0 && (j==1 || j==2)){
              if (this.pos[i][j] === this.pos[i][j+1] || this.pos[i][j] === this.pos[i+1][j] || this.pos[i][j] === this.pos[i][j-1]) {
                flag = 1;
              }
            }
            if (i==3 && (j==1 || j==2)){
              if (this.pos[i][j] === this.pos[i][j+1] || this.pos[i][j] === this.pos[i-1][j] || this.pos[i][j] === this.pos[i][j-1]) {
                flag = 1;
              }
            }
            if (j==0 && (i==1 || i==2)){
              if (this.pos[i][j] === this.pos[i][j+1] || this.pos[i][j] === this.pos[i+1][j] || this.pos[i][j] === this.pos[i-1][j]) {
                flag = 1;
              }
            }
            if (j==3 && (i==1 || i==2)){
              if (this.pos[i][j] === this.pos[i][j-1] || this.pos[i][j] === this.pos[i+1][j] || this.pos[i][j] === this.pos[i-1][j]) {
                flag = 1;
              }
            }
          }
        }
        // if flag == 0 --> game over
        if (flag == 0){
          this.over_grade.innerHTML = "score: " + this.grade;
          this.mask.style.display = "flex"; 
        }
      }
    },

    // data 1, left and up move
    getData: function (arr) {
      var i, nextI, len, m;
      len =arr.length;
      for (i = 0; i < len;i += 1){
        nextI = -1;
        for (m = i + 1; m < len; m++){
          if (arr[m] !== 0) {
            nextI = m;
            break;
          }
        }
        if (nextI !== -1) {
          if (arr[i] === 0){
            arr[i] = arr[nextI];
            arr[nextI] = 0;
            i -= 1;
          }
         else if (arr[i] === arr[nextI]){
           arr[i] = arr[i] * 2;
           this.grade += arr[i];
           arr[nextI] = 0;
         } 
        }
      }
    },

    // data 2, right and down move
    getData1: function (arr) {
      var i, nextI, len, m;
      len =arr.length;
      for (i = 3; i >= 0; i--){
        nextI = -1;
        for (m = i - 1; m >= 0; m--){
          if (arr[m] !== 0) {
            nextI = m;
            break;
          }
        }
        if (nextI !== -1) {
          if (arr[i] === 0){
            arr[i] = arr[nextI];
            arr[nextI] = 0;
            i += 1;
          }
         else if (arr[i] === arr[nextI]){
           arr[i] = arr[i] * 2;
           this.grade += arr[i];
           arr[nextI] = 0;
         } 
        }
      }
    },

    // move left
    leftmove: function () {
      this.myArr = [];
      for (var i = 0; i < 4; i++){
        this.myArr.push([])
        for (var j = 0; j < 4; j++){
          this.myArr[i].push(this.pos[i][j]);
        }
      }
      for (var i = 0; i < 4; i++){
        this.getData(this.pos[i]);
      }
      for(var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++){
          if (this.myArr[i][j] != this.pos[i][j]) {
            this.createFore();
            i = 5;
            j = 5;
            break;
          }
        }
      }
    },

    // move right
    rightmove: function () {
      this.myArr = [];
      for (var i = 0; i < 4; i++){
        this.myArr.push([])
        for (var j = 0; j < 4; j++){
          this.myArr[i].push(this.pos[i][j]);
        }
      }
      for (var i = 0; i < 4; i++){
        this.getData1(this.pos[i]);
      }
      for(var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++){
          if (this.myArr[i][j] != this.pos[i][j]) {
            this.createFore();
            i = 5;
            j = 5;
            break;
          }
        }
      }
    },

    //move up
    upmove: function() {
      this.myArr = [];
      for (var i = 0; i < 4; i++){
        this.myArr.push([])
        for (var j = 0; j < 4; j++){
          this.myArr[i].push(this.pos[i][j]);
        }
      }
      this.myArr1 = [];
      for (var i = 0; i < 4; i++){
        this.myArr1.push([])
        for (var j = 0; j < 4; j++){
          this.myArr1[i].push(this.pos[j][i]);
        }
      }
      for (var i = 0; i < 4; i++){
        this.getData(this.myArr1[i]);
      }
      this.pos = [];
      for (var i = 0; i < 4; i++){
        this.pos.push([])
        for (var j = 0; j < 4; j++){
          this.pos[i].push(this.myArr1[j][i]);
        }
      }
      for (var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++){
          if (this.myArr[i][j] != this.pos[i][j]) {
            this.createFore();
            i = 5;
            j = 5;
            break;
          }
        }
      }
    },

    // move down
    downmove: function() {
      this.myArr = [];
      for (var i = 0; i < 4; i++){
        this.myArr.push([])
        for (var j = 0; j < 4; j++){
          this.myArr[i].push(this.pos[i][j]);
        }
      }
      this.myArr1 = [];
      for (var i = 0; i < 4; i++){
        this.myArr1.push([])
        for (var j = 0; j < 4; j++){
          this.myArr1[i].push(this.pos[j][i]);
        }
      }
      for (var i = 0; i < 4; i++){
        this.getData1(this.myArr1[i]);
      }
      this.pos = [];
      for (var i = 0; i < 4; i++){
        this.pos.push([])
        for (var j = 0; j < 4; j++){
          this.pos[i].push(this.myArr1[j][i]);
        }
      }
      for (var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++){
          if (this.myArr[i][j] != this.pos[i][j]) {
            this.createFore();
            i = 5;
            j = 5;
            break;
          }
        }
      }
    },

    // background size and color
    createBack: function () {
      for (var i = 0; i < 4; i++){
        this.pos.push([])
        for (var j = 0; j < 4; j++){
          this.pos[i].push(0);
          var div = document.createElement("div");
          div.className = `back-slide back-slide-${i}-${j}`;
          this.cont.appendChild(div)
          div.style.left = j * (120 + 20) + 20 + "px";
          div.style.top = i * (120 + 20) + 20 + "px";
        }
      }
    },

    // create romdom block and display block
    createFore: function () {
      while (true) {
        this.x = random(0 , 3);
        this.y = random(0 , 3);
        if (this.pos[this.x][this.y] == 0){
          break;
        }
      }
      // generate romdom number between 2 , 4
      this.pos[this.x][this.y] = Math.random() > 0.5 ? 2 : 4;

      var foreSlide = document.querySelectorAll(".fore-slide");
      for (var k = 0; k < foreSlide.length; k++ ){
        foreSlide[k].remove();
      }

      // generate background color if pos != 0
      for (var i = 0; i < this.pos.length; i++){
        for (var j = 0; j < this.pos[i].length; j++ ){
          if (this.pos[i][j] != 0) {
            var div = document.createElement("div");
            div.className = `fore-slide fore-slide-${i}-${j}`;
            this.cont.appendChild(div);
            div.innerHTML = this.pos[i][j];

            if (this.pos[i][j] == 2){
              div.style.backgroundImage = "linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%)";
            }
            else if (this.pos[i][j] == 4){
              div.style.backgroundImage = "linear-gradient( 135deg, #FFF6B7 10%, #F6416C 100%)";
            }
            else if (this.pos[i][j] == 8){
              div.style.backgroundImage = "linear-gradient( 135deg, #FCCF31 10%, #F55555 100%)";
            }
            else if (this.pos[i][j] == 16){
              div.style.backgroundImage = "linear-gradient( 135deg, #FFD26F 10%, #3677FF 100%)";
            }
            else if (this.pos[i][j] == 32){
              div.style.backgroundImage = "linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%)";
            }
            else if (this.pos[i][j] == 64){
              div.style.backgroundImage = "linear-gradient( 135deg, #52E5E7 10%, #130CB7 100%)";
            }
            else if (this.pos[i][j] == 128){
              div.style.backgroundImage = "linear-gradient( 135deg, #F0FF00 10%, #58CFFB 100%)";
            }
            else if (this.pos[i][j] == 256){
              div.style.backgroundImage = "linear-gradient( 135deg, #69FF97 10%, #00E4FF 100%)";
            }
            else if (this.pos[i][j] == 512){
              div.style.backgroundImage = "linear-gradient( 135deg, #70F570 10%, #49C628 100%)";
            }
            else if (this.pos[i][j] == 1024){
              div.style.backgroundImage = "linear-gradient( 135deg, #FF96F9 10%, #C32BAC 100%)";
            }
            else if (this.pos[i][j] == 2048){
              div.style.backgroundImage = "linear-gradient( 135deg, #EECE13 10%, #B210FF 100%)";
            }
            if (this.pos[i][j] > 100) {
              div.style.fontSize = "45px";
            }
            div.style.left = j * (120 + 20) + 20 + "px";
            div.style.top = i * (120 + 20) + 20 + "px";
          }
        }
      }
    },

    // restart
    restart: function () {
      this.btn.onclick = function () {
        this.grade = 0;
        for (var i  = 0; i < 4; i++){
          for (var j = 0; j < 4; j++){
            this.pos[i][j] = 0;
          }
        }
        this.g.innerHTML = "score: " + this.grade;
        this.mask.style.display = "none";
        this.createFore();
        this.createFore();
      }.bind(this);
    }
  }

  // random function
  function random(max, min) {
    return Math.round(Math.random() * (max - min) + min);
  }

  var s = new Slide;