(function(global) {

  var canvas = document.getElementById('sketch'),
    code = document.getElementById('codeLJN'),
    output = document.getElementById('output'),
    instance = null;
  var userID = "0";
  var whenStartType = null ;
  var whenEndType = null ; 
  var lastTimer  = null ; 
  var urlOfTheRecordingFunction = "js/reportCompile.php?v=1&";  
  var xmlHttp; 
  var xmlLessonsDoc ; ///Library/WebServer/Documents/learnJavaNow/js/helper.js
  /* --------------------------------------------------------------*/ 
  /* When the lesson button is clicked it switches over to the text
    * hiding the canvas.
    * */ 
  global.showLesson = function(){
   //alert("Lessoncicked");
   var canvas =document.getElementById('sketch-container');
   var lessonText =  document.getElementById('lessonContainerLJN');
   canvas.hidden = true ;
   lessonText.hidden = false ; 
  }
  /* --------------------------------------------------------------*/ 
  
  global.showGraphics = function(){
   var canvas =document.getElementById('sketch-container');
   var lessonText =  document.getElementById('lessonContainerLJN');
   canvas.hidden = false ;
   lessonText.hidden = true ;
  
}
/* --------------------------------------------------------------*/
/*
 *Show next lesson loads the next lesson.
 * To do this has an array of lessons ?
 *  each lesson has index + lesson text + code + check for working. 
 */
global.showNextLesson = function()
{
  alert( "Show next lesson " );
}
//----------------------------------------------------------------
/* This is where we are told that the server got the message. 
 *
 */ 
global.gotAsyncData = function( oEvent ) {
  
  if (xmlHttp.readyState === 4) {  
        if (xmlHttp.status === 200) {  
          console.log("REPSONSE=(" + xmlHttp.responseText +") Y ");  
    } else {  
      console.log("Error", xmlHttp.statusText);  
    }  
  }
  
 // alert("something happend  " + xmlHttp.statusText);
}
//--------------------------------------------------------------
global.recordAction = function( theAction ) {
  
   var dateState = new Date().valueOf();
   var xmlsrc= urlOfTheRecordingFunction + "userid=" + userID +  "&mesage="+ theAction + "&when="+dateState; //  "js/reportCompile.php?userid=30330";
  // console.log("sending...", xmlsrc);
  
   xmlHttp = new window.XMLHttpRequest();
   xmlHttp.onreadystatechange = gotAsyncData; // 
   xmlHttp.open("GET",xmlsrc,false);
  try{
   xmlHttp.send(null);
  }
   catch(err){
    alert("Don't panic: "+ err.description); 
   } 
   //var xmlLessonsDoc= xmlHttp.responseXML; // .documentElement;
   
}
//----------------------------------------------------------------
global.reportLooseFocus = function(){
 recordAction("LOOSEFOCUS"); 
}
global.reportGainFocus = function(){
 recordAction("GAINFOCUS"); 
}
//----------------------------------------------------------------
global.reportLoosingPage = function(){
  recordAction("CLOSELESSON");
}
/* --------------------------------------------------------------*/


global.setupPage = function(){
   status.text = "hello from Java";
   
   var it= getCookie( "USERID_FAKE");
  
   if( it == null ||it =="" )
   {
    var user_ID = Math.floor( 1+  Math.random() * 10000000); 
    setCookie( "USERID_FAKE",user_ID, 366 ) ;// log for 1year and 1 day.
    recordAction("NEWUSER");
    it= getCookie( "USERID_FAKE");
     
   }  
   userID = it ; 
   console.log(" COOKIE ? "+userID);

   recordAction("OPENLESSON");// need to get lesson #of page. 
   showLesson();
   
  // alert(" OK = " +  xmlLessonsDoc) ; 
   /*var lessons = xmlLessonsDoc.getElementsByTagName("lesson");
   var lesson1 = xmlLessonsDoc.firstChild; // @@@ TODO NEXT JOB UNPARSE THIS. 
   var lessonTextChild = lessons[0];
       lessonTextChild = lessonTextChild.getElementsByTagName("lessonText");
   var lessonText = lessonTextChild[0];
   var lessonText2 =lessonText.textContent;
   */ 
   
   //alert( "TEXT ='"+ lessonText2 );
    /*
     * chrom 
     *var xmlhttp = new window.XMLHttpRequest();
xmlhttp.open("GET",xmlsrc,false);
xmlhttp.send(null);
var xmlDoc = xmlhttp.responseXML.documentElement;


    =document.implementation.createDocument("","",null);
   // xmlLesssonDoc.async = false; 
   xmlLesssonDoc.onload=readLessonXML;
   xmlLesssonDoc.load("lessons.xml");*/
    
   //alert(" setupPage");
}
global.readLessonXML = function(){
  alert("Lessons reading in");
}
//--------------------------------------------------------
function setCookie( c_name, value, exdays )
{
  var exDate = new Date();
  exDate.setDate(exDate.getDate() + exdays );
  
  var c_value = escape(value) + ((exdays==null) ?"" : ";expires"+ exDate.toUTCString());
  document.cookie=c_name+"="+c_value;
}
//---------------------------------------------------------
function getCookie(c_name ){
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" "+c_name + "=");
  if( c_start == -1)
  {
    c_start = c_value.indexOf(c_name+"=");
  }
  if( c_start == -1 ) return null ;
  c_start = c_value.indexOf("=",c_start)+1;
  var c_end = c_value.indexOf(";", c_start);
  if( c_end == -1 )
  {
    c_end =c_value.lenght; 
  }
  c_value = unescape(c_value.substring(c_start, c_end));
  return c_value; 
}
/* --------------------------------------------------------------*/
 
  function createCanvas() {
    // Make a new canvas, in case we're switching from 2D to 3D contexts.
    var container = document.getElementById('sketch-container');
    var sketch = document.getElementById('sketch');
    container.removeChild(sketch);

    sketch = document.createElement('canvas');
    sketch.id = 'sketch';
    container.appendChild(sketch);

    return sketch;
  }
   ///------------------------------------------------------------------
  function waitForExit() {
    
    var checkbox = document.getElementById('expect-exit-callback');
    if (!checkbox) {
      return false;
    }
    console.log(" EXITING ??? ");
    return checkbox.checked || checkbox.value;
  }
  //---------------------------------------------------------------------
  global.doit = function()
  {
    //alert("Hello! I am an alert box!!");
    var output = document.getElementById('output');
    output.value ="hello ( from doitfunction)";
  }
  //---------------------------------------------------------------------
  //setTimeout(typeingHasOccured,1000);
  function interactionPeriodOver(timeOutID )
  {
    var diffinseconds = Math.round((whenEndType - whenStartType)/1000); 
    console.log("typeing trasmit "+ diffinseconds);
    lastTimer = null ; // clean out.
    recordAction("INTERACTING&pd="+diffinseconds);
  }
  //----------------------------------------------------------------------
  global.typeingHasOccured = function( event)
  {
    // whenStartType =
     // give a little longer before reporting
    if( lastTimer != null )
    {
      clearTimeout(lastTimer );// this works in chom
    }else
    {
      whenStartType = new Date(); //remember when things start.
    }
    whenEndType = new Date(); 
    //console.log("key =", whenStartType ,  whenEndType);
    //lastTimer = setTimeout(function() { interactionPeriodOver() } ,5000);
    lastTimer = setTimeout(function() { interactionPeriodOver()} ,5000);
     
  }
  //------------------------------------------------------------------------
  global.runSketch = function(callback) {
    var output = document.getElementById('output');
    var code = document.getElementById('codeLJN');
    if( output == null )alert("output is null");
    //output.value = "hello I am working ";
    output.value = "";
    
    try {
      
      var sketch = Processing.compile(code.value);
      
      canvas = createCanvas();
      instance = new Processing(canvas, sketch);
      recordAction("RUNOK");
      // output.value = instance.toString();
    } catch (e) {
      // current solution from https://groups.google.com/forum/?fromgroups=#!topic/processingjs/4jJ6X-ddNFE
      
      // was e.toString()
      // for firefox / opera 
    var linenumber = e.lineNumber; 
  
    // for webkit 
    if (!linenumber) linenumber = e.line; 
  
    if (linenumber) { 
      linenumber = "on line "+linenumber; 
    } else { 
      // for chrome 
      linenumber = "Chrome cannot report line numbers try Firefox";
      
    }
      
      output.value = "I found an error:" + e.name + " " +  e.message+ " "+ linenumber;
      recordAction("ERROR")
    }
  };
  
  }(window));



//--------------------------------------------------------