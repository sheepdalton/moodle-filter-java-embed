<?php

class filter_helloworld extends moodle_text_filter {
	
	public function filter($text, array $options = array()) {
		$rep_string = array("startcode", "endcode");
		$divcode = array('<div id="content">
           <textarea rows="20" cols="60" id="codeLJN" onkeyup="typeingHasOccured()"   onfocus="reportGainFocus()" onblur="reportLooseFocus()" > ', '</textarea>
           <br> <!-- <1E05 > </1E05>--> 
                <input onclick="runSketch();" type="button" id="runbuttonLJN" value="Run">
                  
                </input>
             <br>
            
            <textarea rows="4" cols="60" id="output" readonly>None.</textarea>
            <div id="log1" style="color:black; background-color:white; height: 16pt;"></div> 
       </div>
	   <div id="rightcolumn">    
            <div id="sketch-container" hidden=true>
                 <h2>Canvas</h2>
              <canvas id="sketch" ></canvas>
            </div>
            <div id="lessonContainerLJN" hidden=false>
               <div id="LessonArea">
               <h2> Chapter 1 Getting to work</h2>
               
               <p id="LessonText"> Welcome to learnning to program in Java. Lets being with the simpleist action. Below the
               text area to the right of this text you should see a button marked \'Run\' click it.
 
               
               </p>
                </div>
            </div>

        </div>');
		return str_replace($rep_string, $divcode, $text);
	}
}

?>