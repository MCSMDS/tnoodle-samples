function tnoodlejs(){
  var $wnd_0 = window, $doc_0 = document, gwtOnLoad, bodyDone, base = '', metaProps = {}, values = [], providers = [], answers = [], softPermutationId = 0, onLoadErrorFunc, propertyErrorFunc;
  if (!$wnd_0.__gwt_stylesLoaded) {
    $wnd_0.__gwt_stylesLoaded = {};
  }
  if (!$wnd_0.__gwt_scriptsLoaded) {
    $wnd_0.__gwt_scriptsLoaded = {};
  }
  function isHostedMode(){
    var result = false;
    try {
      var query = $wnd_0.location.search;
      return (query.indexOf('gwt.codesvr=') != -1 || (query.indexOf('gwt.hosted=') != -1 || $wnd_0.external && $wnd_0.external.gwtOnLoad)) && query.indexOf('gwt.hybrid') == -1;
    }
     catch (e) {
    }
    isHostedMode = function(){
      return result;
    }
    ;
    return result;
  }

  function maybeStartModule(){
    if (gwtOnLoad && bodyDone) {
      gwtOnLoad(onLoadErrorFunc, 'tnoodlejs', base, softPermutationId);
    }
  }

  function computeScriptBase(){
    var thisScript, markerId = '__gwt_marker_tnoodlejs', markerScript;
    $doc_0.write('<script id="' + markerId + '"><\/script>');
    markerScript = $doc_0.getElementById(markerId);
    thisScript = markerScript && markerScript.previousSibling;
    while (thisScript && thisScript.tagName != 'SCRIPT') {
      thisScript = thisScript.previousSibling;
    }
    function getDirectoryOfFile(path){
      var hashIndex = path.lastIndexOf('#');
      if (hashIndex == -1) {
        hashIndex = path.length;
      }
      var queryIndex = path.indexOf('?');
      if (queryIndex == -1) {
        queryIndex = path.length;
      }
      var slashIndex = path.lastIndexOf('/', Math.min(queryIndex, hashIndex));
      return slashIndex >= 0?path.substring(0, slashIndex + 1):'';
    }

    ;
    if (thisScript && thisScript.src) {
      base = getDirectoryOfFile(thisScript.src);
    }
    if (base == '') {
      var baseElements = $doc_0.getElementsByTagName('base');
      if (baseElements.length > 0) {
        base = baseElements[baseElements.length - 1].href;
      }
       else {
        base = getDirectoryOfFile($doc_0.location.href);
      }
    }
     else if (base.match(/^\w+:\/\//)) {
    }
     else {
      var img = $doc_0.createElement('img');
      img.src = base + 'clear.cache.gif';
      base = getDirectoryOfFile(img.src);
    }
    if (markerScript) {
      markerScript.parentNode.removeChild(markerScript);
    }
  }

  function processMetas(){
    var metas = document.getElementsByTagName('meta');
    for (var i = 0, n = metas.length; i < n; ++i) {
      var meta = metas[i], name_0 = meta.getAttribute('name'), content_0;
      if (name_0) {
        if (name_0 == 'gwt:property') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            var value, eq = content_0.indexOf('=');
            if (eq >= 0) {
              name_0 = content_0.substring(0, eq);
              value = content_0.substring(eq + 1);
            }
             else {
              name_0 = content_0;
              value = '';
            }
            metaProps[name_0] = value;
          }
        }
         else if (name_0 == 'gwt:onPropertyErrorFn') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            try {
              propertyErrorFunc = eval(content_0);
            }
             catch (e) {
              alert('Bad handler "' + content_0 + '" for "gwt:onPropertyErrorFn"');
            }
          }
        }
         else if (name_0 == 'gwt:onLoadErrorFn') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            try {
              onLoadErrorFunc = eval(content_0);
            }
             catch (e) {
              alert('Bad handler "' + content_0 + '" for "gwt:onLoadErrorFn"');
            }
          }
        }
      }
    }
  }

  function unflattenKeylistIntoAnswers(propValArray, value){
    var answer = answers;
    for (var i = 0, n = propValArray.length - 1; i < n; ++i) {
      answer = answer[propValArray[i]] || (answer[propValArray[i]] = []);
    }
    answer[propValArray[n]] = value;
  }

  function computePropValue(propName){
    var value = providers[propName](), allowedValuesMap = values[propName];
    if (value in allowedValuesMap) {
      return value;
    }
    var allowedValuesList = [];
    for (var k in allowedValuesMap) {
      allowedValuesList[allowedValuesMap[k]] = k;
    }
    if (propertyErrorFunc) {
      propertyErrorFunc(propName, allowedValuesList, value);
    }
    throw null;
  }

  providers['user.agent'] = function(){
    var ua = navigator.userAgent.toLowerCase();
    var makeVersion = function(result){
      return parseInt(result[1]) * 1000 + parseInt(result[2]);
    }
    ;
    if (function(){
      return ua.indexOf('opera') != -1;
    }
    ())
      return 'opera';
    if (function(){
      return ua.indexOf('webkit') != -1;
    }
    ())
      return 'safari';
    if (function(){
      return ua.indexOf('msie') != -1 && $doc_0.documentMode >= 9;
    }
    ())
      return 'ie9';
    if (function(){
      return ua.indexOf('msie') != -1 && $doc_0.documentMode >= 8;
    }
    ())
      return 'ie8';
    if (function(){
      var result = /msie ([0-9]+)\.([0-9]+)/.exec(ua);
      if (result && result.length == 3)
        return makeVersion(result) >= 6000;
    }
    ())
      return 'ie6';
    if (function(){
      return ua.indexOf('gecko') != -1;
    }
    ())
      return 'gecko1_8';
    return 'unknown';
  }
  ;
  values['user.agent'] = {gecko1_8:0, ie6:1, ie8:2, ie9:3, opera:4, safari:5};
  tnoodlejs.onScriptLoad = function(gwtOnLoadFunc){
    tnoodlejs = null;
    gwtOnLoad = gwtOnLoadFunc;
    maybeStartModule();
  }
  ;
  if (isHostedMode()) {
    alert('Single-script hosted mode not yet implemented. See issue ' + 'http://code.google.com/p/google-web-toolkit/issues/detail?id=2079');
    return;
  }
  computeScriptBase();
  processMetas();
  try {
    var strongName;
    unflattenKeylistIntoAnswers(['gecko1_8'], '926C9827FEB5DB208A3930A1C76ED48B');
    unflattenKeylistIntoAnswers(['ie6'], '926C9827FEB5DB208A3930A1C76ED48B' + ':1');
    unflattenKeylistIntoAnswers(['ie8'], '926C9827FEB5DB208A3930A1C76ED48B' + ':2');
    unflattenKeylistIntoAnswers(['ie9'], '926C9827FEB5DB208A3930A1C76ED48B' + ':3');
    unflattenKeylistIntoAnswers(['opera'], '926C9827FEB5DB208A3930A1C76ED48B' + ':4');
    unflattenKeylistIntoAnswers(['safari'], '926C9827FEB5DB208A3930A1C76ED48B' + ':5');
    strongName = answers[computePropValue('user.agent')];
    var idx = strongName.indexOf(':');
    if (idx != -1) {
      softPermutationId = Number(strongName.substring(idx + 1));
    }
  }
   catch (e) {
    return;
  }
  var onBodyDoneTimerId;
  function onBodyDone(){
    if (!bodyDone) {
      bodyDone = true;
      maybeStartModule();
      if ($doc_0.removeEventListener) {
        $doc_0.removeEventListener('DOMContentLoaded', onBodyDone, false);
      }
      if (onBodyDoneTimerId) {
        clearInterval(onBodyDoneTimerId);
      }
    }
  }

  if ($doc_0.addEventListener) {
    $doc_0.addEventListener('DOMContentLoaded', function(){
      onBodyDone();
    }
    , false);
  }
  var onBodyDoneTimerId = setInterval(function(){
    if (/loaded|complete/.test($doc_0.readyState)) {
      onBodyDone();
    }
  }
  , 50);
}

tnoodlejs();
(function () {var $gwt_version = "2.5.1";var $wnd = window;var $doc = $wnd.document;var $moduleName, $moduleBase;var $stats = $wnd.__gwtStatsEvent ? function(a) {$wnd.__gwtStatsEvent(a)} : null;var $strongName = '926C9827FEB5DB208A3930A1C76ED48B';var _, P0_longLit = {l:0, m:0, h:0}, P1_longLit = {l:1, m:0, h:0}, Pf_longLit = {l:15, m:0, h:0}, P1e_longLit = {l:30, m:0, h:0}, P32_longLit = {l:50, m:0, h:0}, P64_longLit = {l:100, m:0, h:0}, Pc8_longLit = {l:200, m:0, h:0}, P3e8_longLit = {l:1000, m:0, h:0}, Pea60_longLit = {l:60000, m:0, h:0}, Pf4240_longLit = {l:1000000, m:0, h:0}, P111110_longLit = {l:1118480, m:0, h:0}, Pffffff_longLit = {l:4194303, m:3, h:0}, P111111111110_longLit = {l:1118480, m:279620, h:1}, Pba9876543210_longLit = {l:1323536, m:2777561, h:11}, seedTable = {}, Q$Object = 0, Q$String = 1, Q$boolean_$1 = 2, Q$byte_$1 = 3, Q$char_$1 = 4, Q$Style$Display = 5, Q$Style$HasCssName = 6, Q$Style$Overflow = 7, Q$Style$Position = 8, Q$Style$TextAlign = 9, Q$Style$Unit = 10, Q$ClickHandler = 11, Q$DomEvent$Type = 12, Q$MouseDownHandler = 13, Q$MouseMoveHandler = 14, Q$MouseUpHandler = 15, Q$TouchCancelHandler = 16, Q$TouchEndHandler = 17, Q$TouchMoveHandler = 18, Q$TouchStartHandler = 19, Q$AttachEvent$Handler = 20, Q$CloseHandler = 21, Q$HasAttachHandlers = 22, Q$ResizeHandler = 23, Q$ValueChangeHandler = 24, Q$EventHandler = 25, Q$HandlerRegistration = 26, Q$HasHandlers = 27, Q$HasDirection$Direction = 28, Q$JSONArray = 29, Q$JSONNumber = 30, Q$JSONObject = 31, Q$JSONString = 32, Q$LongLibBase$LongEmul = 33, Q$HtmlLogFormatter = 34, Q$SafeUri = 35, Q$SafeUriString = 36, Q$Point = 37, Q$TouchScroller$4 = 38, Q$TouchScroller$5 = 39, Q$TouchScroller$TemporalPoint = 40, Q$Event$NativePreviewHandler = 41, Q$EventListener = 42, Q$WindowImplIE$Resources = 43, Q$HasVisibility = 44, Q$IsWidget = 45, Q$RootPanel = 46, Q$UIObject = 47, Q$Widget = 48, Q$UserAgentAsserter$UserAgentProperty = 49, Q$SimpleEventBus$Command = 50, Q$UmbrellaException = 51, Q$CubieCube = 52, Q$Search = 53, Q$FullCube = 54, Q$Center1 = 55, Q$CornerCube = 56, Q$Edge3 = 57, Q$FullCube_0 = 58, Q$FullCube_$1 = 59, Q$Search_0 = 60, Q$double_$1 = 61, Q$int_$1 = 62, Q$int_$2 = 63, Q$Serializable = 64, Q$Boolean = 65, Q$CharSequence = 66, Q$Class = 67, Q$Comparable = 68, Q$Double = 69, Q$Enum = 70, Q$Exception = 71, Q$Integer = 72, Q$Number = 73, Q$Object_$1 = 74, Q$StackTraceElement = 75, Q$String_$1 = 76, Q$Throwable = 77, Q$Date = 78, Q$HashMap = 79, Q$LinkedHashMap$ChainEntry = 80, Q$List = 81, Q$Map = 82, Q$Map$Entry = 83, Q$NoSuchElementException = 84, Q$RandomAccess = 85, Q$Set = 86, Q$TreeMap$Node = 87, Q$TreeMap$SubMapType = 88, Q$Handler = 89, Q$Handler_$1 = 90, Q$Logger = 91, Q$ClockPuzzle = 92, Q$ClockPuzzle$ClockState = 93, Q$CubePuzzle = 94, Q$CubePuzzle$CubeMove = 95, Q$CubePuzzle$CubeMove_$1 = 96, Q$CubePuzzle$CubeState = 97, Q$CubePuzzle$Face = 98, Q$FourByFourCubePuzzle = 99, Q$FourByFourRandomTurnsCubePuzzle = 100, Q$MegaminxPuzzle = 101, Q$MegaminxPuzzle$Face = 102, Q$MegaminxPuzzle$MegaminxState = 103, Q$NoInspectionFiveByFiveCubePuzzle = 104, Q$NoInspectionFourByFourCubePuzzle = 105, Q$NoInspectionThreeByThreeCubePuzzle = 106, Q$PyraminxPuzzle = 107, Q$PyraminxPuzzle$PyraminxState = 108, Q$SkewbPuzzle = 109, Q$SkewbPuzzle$SkewbState = 110, Q$SquareOnePuzzle = 111, Q$SquareOnePuzzle$SquareOneState = 112, Q$SquareOneUnfilteredPuzzle = 113, Q$ThreeByThreeCubeFewestMovesPuzzle = 114, Q$ThreeByThreeCubePuzzle = 115, Q$TwoByTwoCubePuzzle = 116, Q$InvalidMoveException = 117, Q$InvalidScrambleException = 118, Q$Puzzle = 119, Q$Puzzle$Bucket = 120, Q$Puzzle$PuzzleState = 121, Q$Color = 122, Q$Element = 123, Q$InvalidHexColorException = 124, Q$Path = 125, Q$Path$Command = 126, Q$Point2D$Double = 127, Q$Transform = 128, Q$Exportable = 129, CM$ = {};
function newSeed(id){
  return new seedTable[id];
}

function defineSeed(id, superSeed, castableTypeMap){
  var seed = seedTable[id];
  if (seed && !seed.___clazz$) {
    _ = seed.prototype;
  }
   else {
    !seed && (seed = seedTable[id] = function(){
    }
    );
    _ = seed.prototype = superSeed < 0?{}:newSeed(superSeed);
    _.castableTypeMap$ = castableTypeMap;
  }
  for (var i_0 = 3; i_0 < arguments.length; ++i_0) {
    arguments[i_0].prototype = _;
  }
  if (seed.___clazz$) {
    _.___clazz$ = seed.___clazz$;
    seed.___clazz$ = null;
  }
}

function makeCastMap(a){
  var result = {};
  for (var i_0 = 0, c = a.length; i_0 < c; ++i_0) {
    result[a[i_0]] = 1;
  }
  return result;
}

function nullMethod(){
}

defineSeed(1, -1, CM$);
_.equals$ = function equals(other){
  return this === other;
}
;
_.getClass$ = function getClass_0(){
  return this.___clazz$;
}
;
_.hashCode$ = function hashCode_0(){
  return getHashCode(this);
}
;
_.toString$ = function toString_0(){
  return this.___clazz$.typeName + '@' + toPowerOfTwoString(this.hashCode$());
}
;
_.toString = function(){
  return this.toString$();
}
;
_.typeMarker$ = nullMethod;
function $cancel(this$static){
  if (!this$static.isRunning) {
    return;
  }
  this$static.wasStarted = this$static.isStarted;
  this$static.isRunning = false;
  this$static.isStarted = false;
  this$static.wasStarted && $onComplete(this$static);
}

function Animation_0(){
}

defineSeed(3, 1, {});
_.isRunning = false;
_.isStarted = false;
_.wasStarted = false;
defineSeed(4, 1, {});
function $clinit_AnimationSchedulerImpl(){
  $clinit_AnimationSchedulerImpl = nullMethod;
  var impl;
  impl = com_google_gwt_animation_client_AnimationScheduler();
  !!impl && (impl.isNativelySupported() || new AnimationSchedulerImplTimer_0);
}

defineSeed(5, 4, {});
function AnimationSchedulerImplMozilla_0(){
  $clinit_AnimationSchedulerImpl();
}

defineSeed(6, 5, {}, AnimationSchedulerImplMozilla_0);
_.isNativelySupported = function isNativelySupported(){
  return !!$wnd.mozRequestAnimationFrame;
}
;
function AnimationSchedulerImplTimer_0(){
  $clinit_AnimationSchedulerImpl();
  new ArrayList_0;
  $clinit_Timer();
}

defineSeed(7, 5, {}, AnimationSchedulerImplTimer_0);
_.isNativelySupported = function isNativelySupported_0(){
  return true;
}
;
function AnimationSchedulerImplWebkit_0(){
  $clinit_AnimationSchedulerImpl();
}

defineSeed(8, 5, {}, AnimationSchedulerImplWebkit_0);
_.isNativelySupported = function isNativelySupported_1(){
  return !!($wnd.webkitRequestAnimationFrame && $wnd.webkitCancelRequestAnimationFrame);
}
;
function $elapsedMillis(this$static){
  return currentTimeMillis() - this$static.start;
}

function Duration_0(){
  this.start = currentTimeMillis();
}

function currentTimeMillis(){
  return (new Date).getTime();
}

defineSeed(9, 1, {}, Duration_0);
function setUncaughtExceptionHandler(handler){
  sUncaughtExceptionHandler = handler;
}

var sUncaughtExceptionHandler = null;
function $getStackTrace(this$static){
  if (this$static.stackTrace == null) {
    return initDim(_3Ljava_lang_StackTraceElement_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$StackTraceElement, 0, 0);
  }
  return this$static.stackTrace;
}

function $setStackTrace(this$static, stackTrace){
  var c, copy, i_0;
  copy = initDim(_3Ljava_lang_StackTraceElement_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$StackTraceElement, stackTrace.length, 0);
  for (i_0 = 0 , c = stackTrace.length; i_0 < c; ++i_0) {
    if (!stackTrace[i_0]) {
      throw new NullPointerException_0;
    }
    copy[i_0] = stackTrace[i_0];
  }
  this$static.stackTrace = copy;
}

function Throwable_0(){
  com_google_gwt_core_client_impl_StackTraceCreator_Collector().fillInStackTrace(this);
}

function Throwable_1(message, cause){
  com_google_gwt_core_client_impl_StackTraceCreator_Collector().fillInStackTrace(this);
  this.cause = cause;
  this.detailMessage = message;
}

defineSeed(14, 1, makeCastMap([Q$Serializable, Q$Throwable]));
_.getMessage = function getMessage(){
  return this.detailMessage;
}
;
_.toString$ = function toString_1(){
  var className, msg;
  className = this.___clazz$.typeName;
  msg = this.getMessage();
  return msg != null?className + ': ' + msg:className;
}
;
_.cause = null;
_.detailMessage = null;
_.stackTrace = null;
function Exception_0(message){
  com_google_gwt_core_client_impl_StackTraceCreator_Collector().fillInStackTrace(this);
  this.detailMessage = message;
}

defineSeed(13, 14, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]));
function RuntimeException_0(){
  Throwable_0.call(this);
}

function RuntimeException_1(message){
  Exception_0.call(this, message);
}

function RuntimeException_2(message, cause){
  Throwable_1.call(this, message, cause);
}

defineSeed(12, 13, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), RuntimeException_0, RuntimeException_1);
function JavaScriptException_0(e){
  RuntimeException_0.call(this);
  this.e = e;
  this.description = '';
  com_google_gwt_core_client_impl_StackTraceCreator_Collector().createStackTrace(this);
}

function getExceptionDescription(e){
  return instanceOfJso(e)?getExceptionDescription0(dynamicCastJso(e)):e + '';
}

function getExceptionDescription0(e){
  return e == null?null:e.message;
}

function getExceptionName(e){
  return e == null?'null':instanceOfJso(e)?getExceptionName0(dynamicCastJso(e)):instanceOf(e, Q$String)?'String':getClass__devirtual$(e).typeName;
}

function getExceptionName0(e){
  return e == null?null:e.name;
}

function getExceptionProperties(e){
  return instanceOfJso(e)?getProperties(dynamicCastJso(e)):'';
}

defineSeed(11, 12, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), JavaScriptException_0);
_.getMessage = function getMessage_0(){
  this.message_0 == null && (this.name_0 = getExceptionName(this.e) , this.description = this.description + ': ' + getExceptionDescription(this.e) , this.message_0 = '(' + this.name_0 + ') ' + getExceptionProperties(this.e) + this.description , undefined);
  return this.message_0;
}
;
_.description = '';
_.e = null;
_.message_0 = null;
_.name_0 = null;
function equals__devirtual$(this$static, other){
  var maybeJsoInvocation;
  return maybeJsoInvocation = this$static , isJavaObject(maybeJsoInvocation)?maybeJsoInvocation.equals$(other):maybeJsoInvocation === other;
}

function getClass__devirtual$(this$static){
  var maybeJsoInvocation;
  return maybeJsoInvocation = this$static , isJavaObject(maybeJsoInvocation)?maybeJsoInvocation.___clazz$:Lcom_google_gwt_core_client_JavaScriptObject_2_classLit;
}

function hashCode__devirtual$(this$static){
  var maybeJsoInvocation;
  return maybeJsoInvocation = this$static , isJavaObject(maybeJsoInvocation)?maybeJsoInvocation.hashCode$():getHashCode(maybeJsoInvocation);
}

function create(milliseconds){
  return new Date(milliseconds);
}

function $clinit_JsonUtils(){
  var out;
  $clinit_JsonUtils = nullMethod;
  escapeTable = (out = ['\\u0000', '\\u0001', '\\u0002', '\\u0003', '\\u0004', '\\u0005', '\\u0006', '\\u0007', '\\b', '\\t', '\\n', '\\u000B', '\\f', '\\r', '\\u000E', '\\u000F', '\\u0010', '\\u0011', '\\u0012', '\\u0013', '\\u0014', '\\u0015', '\\u0016', '\\u0017', '\\u0018', '\\u0019', '\\u001A', '\\u001B', '\\u001C', '\\u001D', '\\u001E', '\\u001F'] , out[34] = '\\"' , out[92] = '\\\\' , out[173] = '\\u00ad' , out[1536] = '\\u0600' , out[1537] = '\\u0601' , out[1538] = '\\u0602' , out[1539] = '\\u0603' , out[1757] = '\\u06dd' , out[1807] = '\\u070f' , out[6068] = '\\u17b4' , out[6069] = '\\u17b5' , out[8203] = '\\u200b' , out[8204] = '\\u200c' , out[8205] = '\\u200d' , out[8206] = '\\u200e' , out[8207] = '\\u200f' , out[8232] = '\\u2028' , out[8233] = '\\u2029' , out[8234] = '\\u202a' , out[8235] = '\\u202b' , out[8236] = '\\u202c' , out[8237] = '\\u202d' , out[8238] = '\\u202e' , out[8288] = '\\u2060' , out[8289] = '\\u2061' , out[8290] = '\\u2062' , out[8291] = '\\u2063' , out[8292] = '\\u2064' , out[8298] = '\\u206a' , out[8299] = '\\u206b' , out[8300] = '\\u206c' , out[8301] = '\\u206d' , out[8302] = '\\u206e' , out[8303] = '\\u206f' , out[65279] = '\\ufeff' , out[65529] = '\\ufff9' , out[65530] = '\\ufffa' , out[65531] = '\\ufffb' , out);
  typeof JSON == 'object' && typeof JSON.parse == 'function';
}

function escapeValue(toEscape){
  $clinit_JsonUtils();
  var s = toEscape.replace(/[\x00-\x1f\xad\u0600-\u0603\u06dd\u070f\u17b4\u17b5\u200b-\u200f\u2028-\u202e\u2060-\u2064\u206a-\u206f\ufeff\ufff9-\ufffb"\\]/g, function(x){
    var lookedUp;
    return lookedUp = escapeTable[x.charCodeAt(0)] , lookedUp == null?x:lookedUp;
  }
  );
  return '"' + s + '"';
}

var escapeTable;
defineSeed(20, 1, {});
function apply(jsFunction, thisObj, args){
  return jsFunction.apply(thisObj, args);
  var __0;
}

function enter(){
  var now;
  if (entryDepth != 0) {
    now = currentTimeMillis();
    if (now - watchdogEntryDepthLastScheduled > 2000) {
      watchdogEntryDepthLastScheduled = now;
      watchdogEntryDepthTimerId = watchdogEntryDepthSchedule();
    }
  }
  if (entryDepth++ == 0) {
    $flushEntryCommands(($clinit_SchedulerImpl() , INSTANCE));
    return true;
  }
  return false;
}

function entry_0(jsFunction){
  return function(){
    try {
      return entry0(jsFunction, this, arguments);
    }
     catch (e) {
      throw e;
    }
  }
  ;
}

function entry0(jsFunction, thisObj, args){
  var initialEntry, t;
  initialEntry = enter();
  try {
    if (sUncaughtExceptionHandler) {
      try {
        return apply(jsFunction, thisObj, args);
      }
       catch ($e0) {
        $e0 = caught_0($e0);
        if (instanceOf($e0, Q$Throwable)) {
          t = $e0;
          $onUncaughtException(sUncaughtExceptionHandler, t);
          return undefined;
        }
         else 
          throw $e0;
      }
    }
     else {
      return apply(jsFunction, thisObj, args);
    }
  }
   finally {
    exit(initialEntry);
  }
}

function exit(initialEntry){
  initialEntry && $flushFinallyCommands(($clinit_SchedulerImpl() , INSTANCE));
  --entryDepth;
  if (initialEntry) {
    if (watchdogEntryDepthTimerId != -1) {
      watchdogEntryDepthCancel(watchdogEntryDepthTimerId);
      watchdogEntryDepthTimerId = -1;
    }
  }
}

function getHashCode(o){
  return o.$H || (o.$H = ++sNextHashId);
}

function watchdogEntryDepthCancel(timerId){
  $wnd.clearTimeout(timerId);
}

function watchdogEntryDepthSchedule(){
  return $wnd.setTimeout(function(){
    entryDepth != 0 && (entryDepth = 0);
    watchdogEntryDepthTimerId = -1;
  }
  , 10);
}

var entryDepth = 0, sNextHashId = 0, watchdogEntryDepthLastScheduled = 0, watchdogEntryDepthTimerId = -1;
function $clinit_SchedulerImpl(){
  $clinit_SchedulerImpl = nullMethod;
  INSTANCE = new SchedulerImpl_0;
}

function $flushEntryCommands(this$static){
  var oldQueue, rescheduled;
  if (this$static.entryCommands) {
    rescheduled = null;
    do {
      oldQueue = this$static.entryCommands;
      this$static.entryCommands = null;
      rescheduled = runScheduledTasks(oldQueue, rescheduled);
    }
     while (this$static.entryCommands);
    this$static.entryCommands = rescheduled;
  }
}

function $flushFinallyCommands(this$static){
  var oldQueue, rescheduled;
  if (this$static.finallyCommands) {
    rescheduled = null;
    do {
      oldQueue = this$static.finallyCommands;
      this$static.finallyCommands = null;
      rescheduled = runScheduledTasks(oldQueue, rescheduled);
    }
     while (this$static.finallyCommands);
    this$static.finallyCommands = rescheduled;
  }
}

function $flushPostEventPumpCommands(this$static){
  var oldDeferred;
  if (this$static.deferredCommands) {
    oldDeferred = this$static.deferredCommands;
    this$static.deferredCommands = null;
    !this$static.incrementalCommands && (this$static.incrementalCommands = []);
    runScheduledTasks(oldDeferred, this$static.incrementalCommands);
  }
  !!this$static.incrementalCommands && (this$static.incrementalCommands = $runRepeatingTasks(this$static.incrementalCommands));
}

function $isWorkQueued(this$static){
  return !!this$static.deferredCommands || !!this$static.incrementalCommands;
}

function $maybeSchedulePostEventPumpCommands(this$static){
  if (!this$static.shouldBeRunning) {
    this$static.shouldBeRunning = true;
    !this$static.flusher && (this$static.flusher = new SchedulerImpl$Flusher_0(this$static));
    scheduleFixedDelayImpl(this$static.flusher, 1);
    !this$static.rescue && (this$static.rescue = new SchedulerImpl$Rescuer_0(this$static));
    scheduleFixedDelayImpl(this$static.rescue, 50);
  }
}

function $runRepeatingTasks(tasks){
  var canceledSomeTasks, duration, executedSomeTask, i_0, length_0, newTasks, t;
  length_0 = tasks.length;
  if (length_0 == 0) {
    return null;
  }
  canceledSomeTasks = false;
  duration = new Duration_0;
  while (currentTimeMillis() - duration.start < 100) {
    executedSomeTask = false;
    for (i_0 = 0; i_0 < length_0; ++i_0) {
      t = tasks[i_0];
      if (!t) {
        continue;
      }
      executedSomeTask = true;
      if (!t[0].execute()) {
        tasks[i_0] = null;
        canceledSomeTasks = true;
      }
    }
    if (!executedSomeTask) {
      break;
    }
  }
  if (canceledSomeTasks) {
    newTasks = [];
    for (i_0 = 0; i_0 < length_0; ++i_0) {
      !!tasks[i_0] && (newTasks[newTasks.length] = tasks[i_0] , undefined);
    }
    return newTasks.length == 0?null:newTasks;
  }
   else {
    return tasks;
  }
}

function $scheduleDeferred(this$static, cmd){
  this$static.deferredCommands = push(this$static.deferredCommands, [cmd, false]);
  $maybeSchedulePostEventPumpCommands(this$static);
}

function SchedulerImpl_0(){
}

function execute(cmd){
  return cmd.execute();
}

function push(queue, task){
  !queue && (queue = []);
  queue[queue.length] = task;
  return queue;
}

function runScheduledTasks(tasks, rescheduled){
  var e, i_0, j, t;
  for (i_0 = 0 , j = tasks.length; i_0 < j; ++i_0) {
    t = tasks[i_0];
    try {
      t[1]?t[0].execute() && (rescheduled = push(rescheduled, t)):t[0].execute_0();
    }
     catch ($e0) {
      $e0 = caught_0($e0);
      if (instanceOf($e0, Q$Throwable)) {
        e = $e0;
        !!sUncaughtExceptionHandler && $onUncaughtException(sUncaughtExceptionHandler, e);
      }
       else 
        throw $e0;
    }
  }
  return rescheduled;
}

function scheduleFixedDelayImpl(cmd, delayMs){
  $clinit_SchedulerImpl();
  $wnd.setTimeout(function(){
    var ret = $entry(execute)(cmd);
    ret && $wnd.setTimeout(arguments.callee, delayMs);
  }
  , delayMs);
}

defineSeed(22, 20, {}, SchedulerImpl_0);
_.deferredCommands = null;
_.entryCommands = null;
_.finallyCommands = null;
_.flushRunning = false;
_.flusher = null;
_.incrementalCommands = null;
_.rescue = null;
_.shouldBeRunning = false;
var INSTANCE;
function SchedulerImpl$Flusher_0(this$0){
  this.this$0 = this$0;
}

defineSeed(23, 1, {}, SchedulerImpl$Flusher_0);
_.execute = function execute_0(){
  this.this$0.flushRunning = true;
  $flushPostEventPumpCommands(this.this$0);
  this.this$0.flushRunning = false;
  return this.this$0.shouldBeRunning = $isWorkQueued(this.this$0);
}
;
_.this$0 = null;
function SchedulerImpl$Rescuer_0(this$0){
  this.this$0 = this$0;
}

defineSeed(24, 1, {}, SchedulerImpl$Rescuer_0);
_.execute = function execute_1(){
  this.this$0.flushRunning && scheduleFixedDelayImpl(this.this$0.flusher, 1);
  return this.this$0.shouldBeRunning;
}
;
_.this$0 = null;
function extractNameFromToString(fnToString){
  var index, start, toReturn;
  toReturn = '';
  fnToString = $trim(fnToString);
  index = fnToString.indexOf('(');
  start = fnToString.indexOf('function') == 0?8:0;
  if (index == -1) {
    index = $indexOf_0(fnToString, fromCodePoint(64));
    start = fnToString.indexOf('function ') == 0?9:0;
  }
  index != -1 && (toReturn = $trim(fnToString.substr(start, index - start)));
  return toReturn.length > 0?toReturn:'anonymous';
}

function getProperties(e){
  return $getProperties((com_google_gwt_core_client_impl_StackTraceCreator_Collector() , e));
}

function parseInt_0(number){
  return parseInt(number) || -1;
}

function splice(arr, length_0){
  arr.length >= length_0 && arr.splice(0, length_0);
  return arr;
}

function $getProperties(e){
  var result = '';
  try {
    for (var prop in e) {
      if (prop != 'name' && prop != 'message' && prop != 'toString') {
        try {
          result += '\n ' + prop + ': ' + e[prop];
        }
         catch (ignored) {
        }
      }
    }
  }
   catch (ignored) {
  }
  return result;
}

function $makeException(){
  try {
    null.a();
  }
   catch (e) {
    return e;
  }
}

function StackTraceCreator$Collector_0(){
}

defineSeed(27, 1, {}, StackTraceCreator$Collector_0);
_.collect = function collect(){
  var seen = {};
  var toReturn = [];
  var callee = arguments.callee.caller.caller;
  while (callee) {
    var name_0 = this.extractName(callee.toString());
    toReturn.push(name_0);
    var keyName = ':' + name_0;
    var withThisName = seen[keyName];
    if (withThisName) {
      var i_0, j;
      for (i_0 = 0 , j = withThisName.length; i_0 < j; i_0++) {
        if (withThisName[i_0] === callee) {
          return toReturn;
        }
      }
    }
    (withThisName || (seen[keyName] = [])).push(callee);
    callee = callee.caller;
  }
  return toReturn;
}
;
_.createStackTrace = function createStackTrace(e){
  var i_0, j, stack, stackTrace;
  stack = this.inferFrom(instanceOfJso(e.e)?dynamicCastJso(e.e):null);
  stackTrace = initDim(_3Ljava_lang_StackTraceElement_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$StackTraceElement, stack.length, 0);
  for (i_0 = 0 , j = stackTrace.length; i_0 < j; ++i_0) {
    stackTrace[i_0] = new StackTraceElement_0(stack[i_0], null, -1);
  }
  $setStackTrace(e, stackTrace);
}
;
_.extractName = function extractName(fnToString){
  return extractNameFromToString(fnToString);
}
;
_.fillInStackTrace = function fillInStackTrace(t){
  var i_0, j, stack, stackTrace;
  stack = com_google_gwt_core_client_impl_StackTraceCreator_Collector().collect();
  stackTrace = initDim(_3Ljava_lang_StackTraceElement_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$StackTraceElement, stack.length, 0);
  for (i_0 = 0 , j = stackTrace.length; i_0 < j; ++i_0) {
    stackTrace[i_0] = new StackTraceElement_0(stack[i_0], null, -1);
  }
  $setStackTrace(t, stackTrace);
}
;
_.inferFrom = function inferFrom(e){
  return [];
}
;
function $inferFrom(this$static, e){
  var i_0, j, stack;
  stack = this$static.getStack(e);
  for (i_0 = 0 , j = stack.length; i_0 < j; ++i_0) {
    stack[i_0] = this$static.extractName(stack[i_0]);
  }
  return stack;
}

function StackTraceCreator$CollectorMoz_0(){
}

defineSeed(29, 27, {}, StackTraceCreator$CollectorMoz_0);
_.collect = function collect_0(){
  return splice(this.inferFrom($makeException()), this.toSplice());
}
;
_.getStack = function getStack(e){
  return e && e.stack?e.stack.split('\n'):[];
}
;
_.inferFrom = function inferFrom_0(e){
  return $inferFrom(this, e);
}
;
_.toSplice = function toSplice(){
  return 2;
}
;
function $clinit_StackTraceCreator$CollectorChrome(){
  $clinit_StackTraceCreator$CollectorChrome = nullMethod;
  Error.stackTraceLimit = 128;
}

function $inferFrom_0(this$static, e){
  var stack;
  stack = $inferFrom(this$static, e);
  return stack.length == 0?(new StackTraceCreator$Collector_0).inferFrom(e):splice(stack, 1);
}

function $parseStackTrace(this$static, e, stack){
  var col, endFileUrl, fileName, i_0, j, lastColon, line, location_0, stackElements, stackTrace;
  stackTrace = initDim(_3Ljava_lang_StackTraceElement_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$StackTraceElement, stack.length, 0);
  for (i_0 = 0 , j = stackTrace.length; i_0 < j; ++i_0) {
    stackElements = $split(stack[i_0], '@@', 0);
    line = -1;
    col = -1;
    fileName = 'Unknown';
    if (stackElements.length == 2 && stackElements[1] != null) {
      location_0 = stackElements[1];
      lastColon = $lastIndexOf(location_0, fromCodePoint(58));
      endFileUrl = $lastIndexOf_0(location_0, fromCodePoint(58), lastColon - 1);
      fileName = location_0.substr(0, endFileUrl - 0);
      if (lastColon != -1 && endFileUrl != -1) {
        line = parseInt_0(location_0.substr(endFileUrl + 1, lastColon - (endFileUrl + 1)));
        col = parseInt_0($substring(location_0, lastColon + 1));
      }
    }
    stackTrace[i_0] = new StackTraceElement_0(stackElements[0], fileName + '@' + col, this$static.replaceIfNoSourceMap(line < 0?-1:line));
  }
  $setStackTrace(e, stackTrace);
}

defineSeed(28, 29, {});
_.collect = function collect_1(){
  var res;
  res = splice($inferFrom_0(this, $makeException()), 3);
  res.length == 0 && (res = splice((new StackTraceCreator$Collector_0).collect(), 1));
  return res;
}
;
_.createStackTrace = function createStackTrace_0(e){
  var stack;
  stack = $inferFrom_0(this, instanceOfJso(e.e)?dynamicCastJso(e.e):null);
  $parseStackTrace(this, e, stack);
}
;
_.extractName = function extractName_0(fnToString){
  var closeParen, index, location_0, toReturn;
  if (fnToString.length == 0) {
    return 'anonymous';
  }
  toReturn = $trim(fnToString);
  toReturn.indexOf('at ') == 0 && (toReturn = $substring(toReturn, 3));
  index = toReturn.indexOf('[');
  index != -1 && (toReturn = $trim(toReturn.substr(0, index - 0)) + $trim($substring(toReturn, toReturn.indexOf(']', index) + 1)));
  index = toReturn.indexOf('(');
  if (index == -1) {
    index = toReturn.indexOf('@');
    if (index == -1) {
      location_0 = toReturn;
      toReturn = '';
    }
     else {
      location_0 = $trim($substring(toReturn, index + 1));
      toReturn = $trim(toReturn.substr(0, index - 0));
    }
  }
   else {
    closeParen = toReturn.indexOf(')', index);
    location_0 = toReturn.substr(index + 1, closeParen - (index + 1));
    toReturn = $trim(toReturn.substr(0, index - 0));
  }
  index = $indexOf_0(toReturn, fromCodePoint(46));
  index != -1 && (toReturn = $substring(toReturn, index + 1));
  return (toReturn.length > 0?toReturn:'anonymous') + '@@' + location_0;
}
;
_.fillInStackTrace = function fillInStackTrace_0(t){
  var stack;
  stack = com_google_gwt_core_client_impl_StackTraceCreator_Collector().collect();
  $parseStackTrace(this, t, stack);
}
;
_.inferFrom = function inferFrom_1(e){
  return $inferFrom_0(this, e);
}
;
_.replaceIfNoSourceMap = function replaceIfNoSourceMap(line){
  return line;
}
;
_.toSplice = function toSplice_0(){
  return 3;
}
;
function StackTraceCreator$CollectorChromeNoSourceMap_0(){
  $clinit_StackTraceCreator$CollectorChrome();
}

defineSeed(30, 28, {}, StackTraceCreator$CollectorChromeNoSourceMap_0);
_.replaceIfNoSourceMap = function replaceIfNoSourceMap_0(line){
  return -1;
}
;
function StackTraceCreator$CollectorOpera_0(){
}

defineSeed(31, 29, {}, StackTraceCreator$CollectorOpera_0);
_.extractName = function extractName_1(fnToString){
  return fnToString.length == 0?'anonymous':fnToString;
}
;
_.getStack = function getStack_0(e){
  var i_0, i2, idx, j, toReturn;
  toReturn = e && e.message?e.message.split('\n'):[];
  for (i_0 = 0 , i2 = 0 , j = toReturn.length; i2 < j; ++i_0 , i2 += 2) {
    idx = toReturn[i2].lastIndexOf('function ');
    idx == -1?(toReturn[i_0] = '' , undefined):(toReturn[i_0] = $trim($substring(toReturn[i2], idx + 9)) , undefined);
  }
  toReturn.length = i_0;
  return toReturn;
}
;
_.toSplice = function toSplice_1(){
  return 3;
}
;
defineSeed(32, 1, {});
function StringBufferImplAppend_0(){
}

defineSeed(33, 32, {}, StringBufferImplAppend_0);
_.append = function append(data, x){
  this.string += x;
}
;
_.append_0 = function append_0(data, x){
  this.string += x;
}
;
_.append_1 = function append_1(data, x){
  this.string += x;
}
;
_.append_2 = function append_2(data, x){
  this.string += x;
}
;
_.appendNonNull = function appendNonNull(data, x){
  this.string += x;
}
;
_.createData = function createData(){
  return null;
}
;
_.length_0 = function length_1(data){
  return this.string.length;
}
;
_.replace_0 = function replace_0(data, start, end, toInsert){
  this.string = $substring_0(this.string, 0, start) + toInsert + $substring(this.string, end);
}
;
_.toString_0 = function toString_2(data){
  return this.string;
}
;
_.string = '';
function $appendNonNull(a, x){
  a[a.explicitLength++] = x;
}

function $takeString(a){
  var s = a.join('');
  a.length = a.explicitLength = 0;
  return s;
}

function $toString(this$static, a){
  var s;
  s = $takeString(a);
  $appendNonNull(a, s);
  return s;
}

defineSeed(35, 32, {});
_.append = function append_3(a, x){
  a[a.explicitLength++] = x;
}
;
_.append_0 = function append_4(a, x){
  a[a.explicitLength++] = x;
}
;
_.append_1 = function append_5(a, x){
  $appendNonNull(a, '' + x);
}
;
_.append_2 = function append_6(a, x){
  a[a.explicitLength++] = x == null?'null':x;
}
;
_.appendNonNull = function appendNonNull_0(a, x){
  $appendNonNull(a, x);
}
;
_.createData = function createData_0(){
  var array = [];
  array.explicitLength = 0;
  return array;
}
;
_.length_0 = function length_2(a){
  return $toString(this, a).length;
}
;
_.replace_0 = function replace_1(a, start, end, toInsert){
  var s;
  s = $takeString(a);
  $appendNonNull(a, s.substr(0, start - 0));
  a[a.explicitLength++] = toInsert == null?'null':toInsert;
  $appendNonNull(a, $substring(s, end));
}
;
_.toString_0 = function toString_3(a){
  return $toString(this, a);
}
;
function StringBufferImplArray_0(){
}

defineSeed(34, 35, {}, StringBufferImplArray_0);
function $appendChild(this$static, newChild){
  return this$static.appendChild(newChild);
}

function $getParentElement(this$static){
  return $getParentElement_0(($clinit_DOMImpl() , this$static));
}

function $isOrHasChild(this$static, child){
  return ($clinit_DOMImpl() , impl_0).isOrHasChild(this$static, child);
}

function $removeChild(this$static, oldChild){
  return this$static.removeChild(oldChild);
}

function is(o){
  try {
    return !!o && !!o.nodeType;
  }
   catch (e) {
    return false;
  }
}

function $dispatchEvent(this$static, evt){
  ($clinit_DOMImpl() , impl_0).dispatchEvent_0(this$static, evt);
}

function $getFirstChildElement(this$static){
  return $getFirstChildElement_0(($clinit_DOMImpl() , this$static));
}

function $getInnerText(this$static){
  return ($clinit_DOMImpl() , impl_0).getInnerText(this$static);
}

function $getPropertyString(this$static, name_0){
  return this$static[name_0] == null?null:String(this$static[name_0]);
}

function $getScrollLeft(this$static){
  return ($clinit_DOMImpl() , impl_0).getScrollLeft_0(this$static);
}

function $getString(this$static){
  return ($clinit_DOMImpl() , impl_0).toString_1(this$static);
}

function $setInnerHTML(this$static, html){
  this$static.innerHTML = html || '';
}

function $setInnerText(this$static, text){
  ($clinit_DOMImpl() , impl_0).setInnerText(this$static, text);
}

function $setScrollLeft(this$static, scrollLeft){
  ($clinit_DOMImpl() , impl_0).setScrollLeft(this$static, scrollLeft);
}

function $setScrollTop(this$static, scrollTop){
  this$static.scrollTop = scrollTop;
}

function is_0(o){
  if (is(o)) {
    return !!o && o.nodeType == 1;
  }
  return false;
}

function $clinit_DOMImpl(){
  $clinit_DOMImpl = nullMethod;
  impl_0 = com_google_gwt_dom_client_DOMImpl();
}

function $getFirstChildElement_0(elem){
  var child = elem.firstChild;
  while (child && child.nodeType != 1)
    child = child.nextSibling;
  return child;
}

function $getParentElement_0(node){
  var parent_0 = node.parentNode;
  (!parent_0 || parent_0.nodeType != 1) && (parent_0 = null);
  return parent_0;
}

defineSeed(40, 1, {});
_.createButtonElement = function createButtonElement(doc, type){
  var e = doc.createElement('BUTTON');
  e.type = type;
  return e;
}
;
_.createElement_0 = function createElement(doc, tag){
  return doc.createElement(tag);
}
;
_.createScriptElement = function createScriptElement(doc, source){
  var elem;
  elem = this.createElement_0(doc, 'script');
  elem.text = source;
  return elem;
}
;
_.eventStopPropagation = function eventStopPropagation(evt){
  evt.stopPropagation();
}
;
_.getAbsoluteLeft = function getAbsoluteLeft(elem){
  var left = 0;
  var curr = elem;
  while (curr.offsetParent) {
    left -= curr.scrollLeft;
    curr = curr.parentNode;
  }
  while (elem) {
    left += elem.offsetLeft;
    elem = elem.offsetParent;
  }
  return left;
}
;
_.getAbsoluteTop = function getAbsoluteTop(elem){
  var top_0 = 0;
  var curr = elem;
  while (curr.offsetParent) {
    top_0 -= curr.scrollTop;
    curr = curr.parentNode;
  }
  while (elem) {
    top_0 += elem.offsetTop;
    elem = elem.offsetParent;
  }
  return top_0;
}
;
_.getBodyOffsetLeft = function getBodyOffsetLeft(doc){
  return 0;
}
;
_.getBodyOffsetTop = function getBodyOffsetTop(doc){
  return 0;
}
;
_.getInnerText = function getInnerText(node){
  var text = '', child = node.firstChild;
  while (child) {
    child.nodeType == 1?(text += this.getInnerText(child)):child.nodeValue && (text += child.nodeValue);
    child = child.nextSibling;
  }
  return text;
}
;
_.getScrollLeft = function getScrollLeft(doc){
  return $getScrollLeft($equals_0(doc.compatMode, 'CSS1Compat')?doc.documentElement:doc.body);
}
;
_.getScrollLeft_0 = function getScrollLeft_0(elem){
  return elem.scrollLeft || 0;
}
;
_.getScrollTop = function getScrollTop(doc){
  return ($equals_0(doc.compatMode, 'CSS1Compat')?doc.documentElement:doc.body).scrollTop || 0;
}
;
_.getTabIndex = function getTabIndex(elem){
  return elem.tabIndex;
}
;
_.getTagName = function getTagName(elem){
  return elem.tagName;
}
;
_.imgSetSrc = function imgSetSrc(img, src){
  img.src = src;
}
;
_.setInnerText = function setInnerText(elem, text){
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
  text != null && elem.appendChild(elem.ownerDocument.createTextNode(text));
}
;
_.setScrollLeft = function setScrollLeft(elem, left){
  elem.scrollLeft = left;
}
;
_.toString_1 = function toString_4(elem){
  return elem.outerHTML;
}
;
var impl_0;
function $getBoundingClientRectLeft(elem){
  try {
    return elem.getBoundingClientRect().left;
  }
   catch (e) {
    return 0;
  }
}

function $getBoundingClientRectTop(elem){
  try {
    return elem.getBoundingClientRect().top;
  }
   catch (e) {
    return 0;
  }
}

function isOrHasChildImpl(parent_0, child){
  if (parent_0.nodeType != 1 && parent_0.nodeType != 9) {
    return parent_0 == child;
  }
  if (child.nodeType != 1) {
    child = child.parentNode;
    if (!child) {
      return false;
    }
  }
  if (parent_0.nodeType == 9) {
    return parent_0 === child || parent_0.body && parent_0.body.contains(child);
  }
   else {
    return parent_0 === child || parent_0.contains(child);
  }
}

defineSeed(42, 40, {});
_.createButtonElement = function createButtonElement_0(doc, type){
  return doc.createElement("<BUTTON type='" + type + "'><\/BUTTON>");
}
;
_.createElement_0 = function createElement_0(doc, tagName){
  var container, elem;
  if (tagName.indexOf(':') != -1) {
    container = (!doc.__gwt_container && (doc.__gwt_container = doc.createElement('div')) , doc.__gwt_container);
    container.innerHTML = '<' + tagName + '/>' || '';
    elem = $getFirstChildElement_0(($clinit_DOMImpl() , container));
    container.removeChild(elem);
    return elem;
  }
  return doc.createElement(tagName);
}
;
_.createHtmlEvent = function createHtmlEvent(doc, type, canBubble, cancelable){
  var evt = doc.createEventObject();
  evt.type = type;
  return evt;
}
;
_.dispatchEvent_0 = function dispatchEvent_1(target, evt){
  target.fireEvent('on' + evt.type, evt);
}
;
_.eventGetRelatedTarget = function eventGetRelatedTarget(evt){
  return evt.relatedTarget || (evt.type == 'mouseout'?evt.toElement:evt.fromElement);
}
;
_.eventGetTarget = function eventGetTarget(evt){
  return evt.srcElement;
}
;
_.eventPreventDefault = function eventPreventDefault(evt){
  evt.returnValue = false;
}
;
_.eventStopPropagation = function eventStopPropagation_0(evt){
  evt.cancelBubble = true;
}
;
_.getBodyOffsetLeft = function getBodyOffsetLeft_0(doc){
  return ($equals_0(doc.compatMode, 'CSS1Compat')?doc.documentElement:doc.body).clientLeft;
}
;
_.getBodyOffsetTop = function getBodyOffsetTop_0(doc){
  return ($equals_0(doc.compatMode, 'CSS1Compat')?doc.documentElement:doc.body).clientTop;
}
;
_.getInnerText = function getInnerText_0(elem){
  return elem.innerText;
}
;
_.getTagName = function getTagName_0(elem){
  var scopeName, tagName;
  tagName = elem.tagName;
  scopeName = elem.scopeName;
  if (scopeName == null || $equalsIgnoreCase('html', scopeName)) {
    return tagName;
  }
  return scopeName + ':' + tagName;
}
;
_.isOrHasChild = function isOrHasChild(parent_0, child){
  return isOrHasChildImpl(parent_0, child);
}
;
_.setInnerText = function setInnerText_0(elem, text){
  elem.innerText = text || '';
}
;
var currentEventTarget = null;
function $getZoomMultiple(doc){
  var bodyOffset;
  if ($equals_0(doc.compatMode, 'CSS1Compat')) {
    return 1;
  }
   else {
    bodyOffset = doc.body.offsetWidth || 0;
    return bodyOffset == 0?1:~~(($getParentElement(doc.body).offsetWidth || 0) / bodyOffset);
  }
}

function DOMImplIE6_0(){
  $clinit_DOMImpl();
}

function isIE6_0(){
  if (!isIE6Detected) {
    isIE6 = isIE6Impl();
    isIE6Detected = true;
  }
  return isIE6;
}

function isIE6Impl(){
  function makeVersion(result){
    return parseInt(result[1]) * 1000 + parseInt(result[2]);
  }

  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('msie') != -1) {
    var result_0 = /msie ([0-9]+)\.([0-9]+)/.exec(ua);
    if (result_0 && result_0.length == 3) {
      var v = makeVersion(result_0);
      if (v < 7000) {
        return true;
      }
    }
  }
  return false;
}

defineSeed(41, 42, {}, DOMImplIE6_0);
_.getAbsoluteLeft = function getAbsoluteLeft_0(elem){
  var doc;
  doc = elem.ownerDocument;
  return round_int(floor($getBoundingClientRectLeft(elem) / $getZoomMultiple(doc) + impl_0.getScrollLeft(doc)));
}
;
_.getAbsoluteTop = function getAbsoluteTop_0(elem){
  var doc;
  doc = elem.ownerDocument;
  return round_int(floor($getBoundingClientRectTop(elem) / $getZoomMultiple(doc) + impl_0.getScrollTop(doc)));
}
;
_.getScrollLeft_0 = function getScrollLeft_1(elem){
  if (elem.currentStyle.direction == 'rtl') {
    return (elem.scrollLeft || 0) - ((elem.scrollWidth || 0) - elem.clientWidth);
  }
  return elem.scrollLeft || 0;
}
;
_.imgSetSrc = function imgSetSrc_0(img, src){
  isIE6_0()?setImgSrc(img, src):(img.src = src , undefined);
}
;
_.setScrollLeft = function setScrollLeft_0(elem, left){
  elem.currentStyle.direction == 'rtl' && (left += (elem.scrollWidth || 0) - elem.clientWidth);
  elem.scrollLeft = left;
}
;
var isIE6 = false, isIE6Detected = false;
function DOMImplIE8_0(){
  $clinit_DOMImpl();
}

defineSeed(43, 42, {}, DOMImplIE8_0);
_.getAbsoluteLeft = function getAbsoluteLeft_1(elem){
  var doc;
  doc = elem.ownerDocument;
  return $getBoundingClientRectLeft(elem) + impl_0.getScrollLeft(doc);
}
;
_.getAbsoluteTop = function getAbsoluteTop_1(elem){
  var doc;
  doc = elem.ownerDocument;
  return $getBoundingClientRectTop(elem) + impl_0.getScrollTop(doc);
}
;
_.getScrollLeft_0 = function getScrollLeft_2(elem){
  if (elem.currentStyle.direction == 'rtl') {
    return -(elem.scrollLeft || 0);
  }
  return elem.scrollLeft || 0;
}
;
_.setScrollLeft = function setScrollLeft_1(elem, left){
  elem.currentStyle.direction == 'rtl' && (left = -left);
  elem.scrollLeft = left;
}
;
defineSeed(46, 40, {});
_.createHtmlEvent = function createHtmlEvent_0(doc, type, canBubble, cancelable){
  var evt = doc.createEvent('HTMLEvents');
  evt.initEvent(type, canBubble, cancelable);
  return evt;
}
;
_.dispatchEvent_0 = function dispatchEvent_2(target, evt){
  target.dispatchEvent(evt);
}
;
_.eventGetRelatedTarget = function eventGetRelatedTarget_0(evt){
  return evt.relatedTarget;
}
;
_.eventGetTarget = function eventGetTarget_0(evt){
  return evt.target;
}
;
_.eventPreventDefault = function eventPreventDefault_0(evt){
  evt.preventDefault();
}
;
_.getInnerText = function getInnerText_1(elem){
  return elem.textContent;
}
;
_.isOrHasChild = function isOrHasChild_0(parent_0, child){
  return parent_0.contains(child);
}
;
_.setInnerText = function setInnerText_1(elem, text){
  elem.textContent = text || '';
}
;
function $isRTL(elem){
  return elem.ownerDocument.defaultView.getComputedStyle(elem, '').direction == 'rtl';
}

function getAbsoluteLeftUsingOffsets(elem){
  if (elem.offsetLeft == null) {
    return 0;
  }
  var left = 0;
  var doc = elem.ownerDocument;
  var curr = elem.parentNode;
  if (curr) {
    while (curr.offsetParent) {
      left -= curr.scrollLeft;
      doc.defaultView.getComputedStyle(curr, '').getPropertyValue('direction') == 'rtl' && (left += curr.scrollWidth - curr.clientWidth);
      curr = curr.parentNode;
    }
  }
  while (elem) {
    left += elem.offsetLeft;
    if (doc.defaultView.getComputedStyle(elem, '')['position'] == 'fixed') {
      left += doc.body.scrollLeft;
      return left;
    }
    var parent_0 = elem.offsetParent;
    parent_0 && $wnd.devicePixelRatio && (left += parseInt(doc.defaultView.getComputedStyle(parent_0, '').getPropertyValue('border-left-width')));
    if (parent_0 && parent_0.tagName == 'BODY' && elem.style.position == 'absolute') {
      break;
    }
    elem = parent_0;
  }
  return left;
}

function getAbsoluteTopUsingOffsets(elem){
  if (elem.offsetTop == null) {
    return 0;
  }
  var top_0 = 0;
  var doc = elem.ownerDocument;
  var curr = elem.parentNode;
  if (curr) {
    while (curr.offsetParent) {
      top_0 -= curr.scrollTop;
      curr = curr.parentNode;
    }
  }
  while (elem) {
    top_0 += elem.offsetTop;
    if (doc.defaultView.getComputedStyle(elem, '')['position'] == 'fixed') {
      top_0 += doc.body.scrollTop;
      return top_0;
    }
    var parent_0 = elem.offsetParent;
    parent_0 && $wnd.devicePixelRatio && (top_0 += parseInt(doc.defaultView.getComputedStyle(parent_0, '').getPropertyValue('border-top-width')));
    if (parent_0 && parent_0.tagName == 'BODY' && elem.style.position == 'absolute') {
      break;
    }
    elem = parent_0;
  }
  return top_0;
}

function getBoundingClientRect(element){
  return element.getBoundingClientRect && element.getBoundingClientRect();
}

defineSeed(45, 46, {});
_.createButtonElement = function createButtonElement_1(doc, type){
  var e = doc.createElement('BUTTON');
  e.setAttribute('type', type);
  return e;
}
;
_.createScriptElement = function createScriptElement_0(doc, source){
  var elem;
  elem = doc.createElement('script');
  impl_0.setInnerText(elem, source);
  return elem;
}
;
_.getAbsoluteLeft = function getAbsoluteLeft_2(elem){
  var rect;
  rect = getBoundingClientRect(elem);
  return rect?rect.left + $getScrollLeft(elem.ownerDocument.body):getAbsoluteLeftUsingOffsets(elem);
}
;
_.getAbsoluteTop = function getAbsoluteTop_2(elem){
  var rect;
  rect = getBoundingClientRect(elem);
  return rect?rect.top + (elem.ownerDocument.body.scrollTop || 0):getAbsoluteTopUsingOffsets(elem);
}
;
_.getScrollLeft = function getScrollLeft_3(doc){
  return $getScrollLeft(doc.body);
}
;
_.getScrollLeft_0 = function getScrollLeft_4(elem){
  if ($isRTL(elem)) {
    return (elem.scrollLeft || 0) - ((elem.scrollWidth || 0) - elem.clientWidth);
  }
  return elem.scrollLeft || 0;
}
;
_.getScrollTop = function getScrollTop_0(doc){
  return doc.body.scrollTop || 0;
}
;
_.getTabIndex = function getTabIndex_0(elem){
  return typeof elem.tabIndex != 'undefined'?elem.tabIndex:-1;
}
;
_.setScrollLeft = function setScrollLeft_2(elem, left){
  $isRTL(elem) && (left += (elem.scrollWidth || 0) - elem.clientWidth);
  elem.scrollLeft = left;
}
;
function $getBoundingClientRectLeft_0(elem){
  try {
    return elem.getBoundingClientRect().left;
  }
   catch (e) {
    return 0;
  }
}

function $getBoundingClientRectTop_0(elem){
  try {
    return elem.getBoundingClientRect().top;
  }
   catch (e) {
    return 0;
  }
}

function $getParentOffsetDelta(elem){
  var offsetParent = elem.offsetParent;
  if (offsetParent) {
    return offsetParent.offsetWidth - offsetParent.clientWidth;
  }
  return 0;
}

function DOMImplIE9_0(){
  $clinit_DOMImpl();
}

defineSeed(44, 45, {}, DOMImplIE9_0);
_.getAbsoluteLeft = function getAbsoluteLeft_3(elem){
  var left;
  left = $getBoundingClientRectLeft_0(elem) + $wnd.pageXOffset;
  $isRTL(elem) && (left += $getParentOffsetDelta(elem));
  return left;
}
;
_.getAbsoluteTop = function getAbsoluteTop_3(elem){
  return $getBoundingClientRectTop_0(elem) + $wnd.pageYOffset;
}
;
_.getScrollLeft = function getScrollLeft_5(doc){
  return $wnd.pageXOffset;
}
;
_.getScrollLeft_0 = function getScrollLeft_6(elem){
  var left;
  left = elem.scrollLeft || 0;
  $isRTL(elem) && (left = -left);
  return left;
}
;
_.getScrollTop = function getScrollTop_1(doc){
  return $wnd.pageYOffset;
}
;
_.getTabIndex = function getTabIndex_1(elem){
  return elem.tabIndex < 65535?elem.tabIndex:-(elem.tabIndex % 65535) - 1;
}
;
_.isOrHasChild = function isOrHasChild_1(parent_0, child){
  return isOrHasChildImpl(parent_0, child);
}
;
_.setScrollLeft = function setScrollLeft_3(elem, left){
  $isRTL(elem) && (left = -left);
  elem.scrollLeft = left;
}
;
function $getAbsoluteLeftImpl(viewport, elem){
  if (Element.prototype.getBoundingClientRect) {
    return elem.getBoundingClientRect().left + viewport.scrollLeft | 0;
  }
   else {
    var doc = elem.ownerDocument;
    return doc.getBoxObjectFor(elem).screenX - doc.getBoxObjectFor(doc.documentElement).screenX;
  }
}

function $getAbsoluteTopImpl(viewport, elem){
  if (Element.prototype.getBoundingClientRect) {
    return elem.getBoundingClientRect().top + viewport.scrollTop | 0;
  }
   else {
    var doc = elem.ownerDocument;
    return doc.getBoxObjectFor(elem).screenY - doc.getBoxObjectFor(doc.documentElement).screenY;
  }
}

function $isGecko19(){
  var geckoVersion = getGeckoVersion();
  return geckoVersion != -1 && geckoVersion >= 1009000;
}

function $isRTL_0(elem){
  var style = elem.ownerDocument.defaultView.getComputedStyle(elem, null);
  return style.direction == 'rtl';
}

function DOMImplMozilla_0(){
  $clinit_DOMImpl();
}

function getGeckoVersion(){
  var result = /rv:([0-9]+)\.([0-9]+)(\.([0-9]+))?.*?/.exec(navigator.userAgent.toLowerCase());
  if (result && result.length >= 3) {
    var version = parseInt(result[1]) * 1000000 + parseInt(result[2]) * 1000 + parseInt(result.length >= 5 && !isNaN(result[4])?result[4]:0);
    return version;
  }
  return -1;
}

defineSeed(47, 46, {}, DOMImplMozilla_0);
_.eventGetRelatedTarget = function eventGetRelatedTarget_1(evt){
  var relatedTarget = evt.relatedTarget;
  if (!relatedTarget) {
    return null;
  }
  try {
    var nodeName = relatedTarget.nodeName;
    return relatedTarget;
  }
   catch (e) {
    return null;
  }
}
;
_.getAbsoluteLeft = function getAbsoluteLeft_4(elem){
  return $getAbsoluteLeftImpl($getViewportElement(elem.ownerDocument), elem);
}
;
_.getAbsoluteTop = function getAbsoluteTop_4(elem){
  return $getAbsoluteTopImpl($getViewportElement(elem.ownerDocument), elem);
}
;
_.getBodyOffsetLeft = function getBodyOffsetLeft_1(doc){
  var style = $wnd.getComputedStyle(doc.documentElement, null);
  if (style == null) {
    return 0;
  }
  return parseInt(style.marginLeft, 10) + parseInt(style.borderLeftWidth, 10);
}
;
_.getBodyOffsetTop = function getBodyOffsetTop_1(doc){
  var style = $wnd.getComputedStyle(doc.documentElement, null);
  if (style == null) {
    return 0;
  }
  return parseInt(style.marginTop, 10) + parseInt(style.borderTopWidth, 10);
}
;
_.getScrollLeft_0 = function getScrollLeft_7(elem){
  if (!$isGecko19() && $isRTL_0(elem)) {
    return (elem.scrollLeft || 0) - ((elem.scrollWidth || 0) - elem.clientWidth);
  }
  return elem.scrollLeft || 0;
}
;
_.isOrHasChild = function isOrHasChild_2(parent_0, child){
  return parent_0 === child || !!(parent_0.compareDocumentPosition(child) & 16);
}
;
_.setScrollLeft = function setScrollLeft_4(elem, left){
  !$isGecko19() && $isRTL_0(elem) && (left += (elem.scrollWidth || 0) - elem.clientWidth);
  elem.scrollLeft = left;
}
;
_.toString_1 = function toString_5(elem){
  var doc = elem.ownerDocument;
  var temp = elem.cloneNode(true);
  var tempDiv = doc.createElement('DIV');
  tempDiv.appendChild(temp);
  outer = tempDiv.innerHTML;
  temp.innerHTML = '';
  return outer;
}
;
function DOMImplOpera_0(){
  $clinit_DOMImpl();
}

defineSeed(48, 46, {}, DOMImplOpera_0);
_.getAbsoluteLeft = function getAbsoluteLeft_5(elem){
  var left = 0;
  var curr = elem.parentNode;
  while (curr && curr.offsetParent) {
    curr.tagName != 'TR' && curr.tagName != 'TBODY' && (left -= curr.scrollLeft);
    curr = curr.parentNode;
  }
  while (elem) {
    left += elem.offsetLeft;
    elem = elem.offsetParent;
  }
  return left;
}
;
_.getAbsoluteTop = function getAbsoluteTop_5(elem){
  var top_0 = 0;
  var curr = elem.parentNode;
  while (curr && curr.offsetParent) {
    curr.tagName != 'TR' && curr.tagName != 'TBODY' && (top_0 -= curr.scrollTop);
    curr = curr.parentNode;
  }
  while (elem) {
    top_0 += elem.offsetTop;
    elem = elem.offsetParent;
  }
  return top_0;
}
;
function DOMImplWebkit_0(){
  $clinit_DOMImpl();
}

defineSeed(50, 45, {}, DOMImplWebkit_0);
_.eventGetTarget = function eventGetTarget_1(evt){
  var target = evt.target;
  target && target.nodeType == 3 && (target = target.parentNode);
  return target;
}
;
function $createDivElement(this$static){
  return ($clinit_DOMImpl() , impl_0).createElement_0(this$static, 'div');
}

function $createImageElement(this$static){
  return ($clinit_DOMImpl() , impl_0).createElement_0(this$static, 'img');
}

function $createLoadEvent(this$static){
  return ($clinit_DOMImpl() , impl_0).createHtmlEvent(this$static, 'load', false, false);
}

function $createPushButtonElement(this$static){
  return ($clinit_DOMImpl() , impl_0).createButtonElement(this$static, 'button');
}

function $createScriptElement(this$static, source){
  return ($clinit_DOMImpl() , impl_0).createScriptElement(this$static, source);
}

function $createScrollEvent(this$static){
  return ($clinit_DOMImpl() , impl_0).createHtmlEvent(this$static, 'scroll', false, false);
}

function $createTBodyElement(this$static){
  return ($clinit_DOMImpl() , impl_0).createElement_0(this$static, 'tbody');
}

function $createTDElement(this$static){
  return ($clinit_DOMImpl() , impl_0).createElement_0(this$static, 'td');
}

function $createTRElement(this$static){
  return ($clinit_DOMImpl() , impl_0).createElement_0(this$static, 'tr');
}

function $createTableElement(this$static){
  return ($clinit_DOMImpl() , impl_0).createElement_0(this$static, 'table');
}

function $getBodyOffsetLeft(this$static){
  return ($clinit_DOMImpl() , impl_0).getBodyOffsetLeft(this$static);
}

function $getBodyOffsetTop(this$static){
  return ($clinit_DOMImpl() , impl_0).getBodyOffsetTop(this$static);
}

function $getClientHeight(this$static){
  return ($equals_0(this$static.compatMode, 'CSS1Compat')?this$static.documentElement:this$static.body).clientHeight;
}

function $getClientWidth(this$static){
  return ($equals_0(this$static.compatMode, 'CSS1Compat')?this$static.documentElement:this$static.body).clientWidth;
}

function $getScrollHeight(this$static){
  return ($equals_0(this$static.compatMode, 'CSS1Compat')?this$static.documentElement:this$static.body).scrollHeight || 0;
}

function $getScrollWidth(this$static){
  return ($equals_0(this$static.compatMode, 'CSS1Compat')?this$static.documentElement:this$static.body).scrollWidth || 0;
}

function $getViewportElement(this$static){
  return $equals_0(this$static.compatMode, 'CSS1Compat')?this$static.documentElement:this$static.body;
}

function $setSrc(this$static, src){
  ($clinit_DOMImpl() , impl_0).imgSetSrc(this$static, src);
}

function $clinit_ImageSrcIE6(){
  $clinit_ImageSrcIE6 = nullMethod;
  executeBackgroundImageCacheCommand();
}

function addTop(srcImgMap, img, src){
  img.src = src;
  if (img.complete) {
    return;
  }
  img.__kids = [];
  img.__pendingSrc = src;
  srcImgMap[src] = img;
  var _onload = img.onload, _onerror = img.onerror, _onabort = img.onabort;
  function finish(_originalHandler){
    var kids = img.__kids;
    img.__cleanup();
    window.setTimeout(function(){
      for (var i_0 = 0; i_0 < kids.length; ++i_0) {
        var kid = kids[i_0];
        if (kid.__pendingSrc == src) {
          kid.src = src;
          kid.__pendingSrc = null;
        }
      }
    }
    , 0);
    _originalHandler && _originalHandler.call(img);
  }

  img.onload = function(){
    finish(_onload);
  }
  ;
  img.onerror = function(){
    finish(_onerror);
  }
  ;
  img.onabort = function(){
    finish(_onabort);
  }
  ;
  img.__cleanup = function(){
    img.onload = _onload;
    img.onerror = _onerror;
    img.onabort = _onabort;
    img.__cleanup = img.__pendingSrc = img.__kids = null;
    delete srcImgMap[src];
  }
  ;
}

function cleanupExpandos(img){
  img.__cleanup = img.__pendingSrc = img.__kids = null;
}

function executeBackgroundImageCacheCommand(){
  try {
    $doc.execCommand('BackgroundImageCache', false, true);
  }
   catch (e) {
  }
}

function removeChild(parent_0, child, checkOnly){
  var kids = parent_0.__kids;
  for (var i_0 = 0, c = kids.length; i_0 < c; ++i_0) {
    if (kids[i_0] === child) {
      if (!checkOnly) {
        kids.splice(i_0, 1);
        child.__pendingSrc = null;
      }
      return true;
    }
  }
  return false;
}

function removeTop(srcImgMap, img){
  var src = img.__pendingSrc;
  var kids = img.__kids;
  img.__cleanup();
  if (img = kids[0]) {
    img.__pendingSrc = null;
    addTop(srcImgMap, img, src);
    if (img.__pendingSrc) {
      kids.splice(0, 1);
      img.__kids = kids;
    }
     else {
      for (var i_0 = 1, c = kids.length; i_0 < c; ++i_0) {
        kids[i_0].src = src;
        kids[i_0].__pendingSrc = null;
      }
    }
  }
}

function setImgSrc(img, src){
  $clinit_ImageSrcIE6();
  var isSameSource, oldSrc, top_0;
  isSameSource = $equals_0(img.__pendingSrc || img.src, src);
  !srcImgMap_0 && (srcImgMap_0 = {});
  oldSrc = img.__pendingSrc;
  if (oldSrc != null) {
    top_0 = srcImgMap_0[oldSrc];
    if (!top_0) {
      cleanupExpandos(img);
    }
     else if (top_0 == img) {
      if (isSameSource) {
        return;
      }
      removeTop(srcImgMap_0, top_0);
    }
     else if (removeChild(top_0, img, isSameSource)) {
      if (isSameSource) {
        return;
      }
    }
     else {
      cleanupExpandos(img);
    }
  }
  top_0 = srcImgMap_0[src];
  !top_0?addTop(srcImgMap_0, img, src):(top_0.__kids.push(img) , img.__pendingSrc = top_0.__pendingSrc , undefined);
}

var srcImgMap_0 = null;
function $getClientX(this$static){
  return ($clinit_DOMImpl() , this$static).clientX || 0;
}

function $getClientY(this$static){
  return ($clinit_DOMImpl() , this$static).clientY || 0;
}

function $getTouches(this$static){
  return ($clinit_DOMImpl() , this$static).touches;
}

function $preventDefault(this$static){
  ($clinit_DOMImpl() , impl_0).eventPreventDefault(this$static);
}

function $stopPropagation(this$static){
  ($clinit_DOMImpl() , impl_0).eventStopPropagation(this$static);
}

function $compareTo(this$static, other){
  return this$static.ordinal - other.ordinal;
}

function Enum_0(name_0, ordinal){
  this.name_0 = name_0;
  this.ordinal = ordinal;
}

function createValueOfMap(enumConstants){
  var result, value, value$index, value$max;
  result = {};
  for (value$index = 0 , value$max = enumConstants.length; value$index < value$max; ++value$index) {
    value = enumConstants[value$index];
    result[':' + value.name_0] = value;
  }
  return result;
}

function valueOf(map, name_0){
  var result;
  result = map[':' + name_0];
  if (result) {
    return result;
  }
  if (name_0 == null) {
    throw new NullPointerException_0;
  }
  throw new IllegalArgumentException_0;
}

defineSeed(59, 1, makeCastMap([Q$Serializable, Q$Comparable, Q$Enum]));
_.compareTo$ = function compareTo(other){
  return $compareTo(this, dynamicCast(other, Q$Enum));
}
;
_.equals$ = function equals_0(other){
  return this === other;
}
;
_.hashCode$ = function hashCode_1(){
  return getHashCode(this);
}
;
_.toString$ = function toString_6(){
  return this.name_0;
}
;
_.name_0 = null;
_.ordinal = 0;
function $clinit_Style$Display(){
  $clinit_Style$Display = nullMethod;
  NONE = new Style$Display$1_0;
  BLOCK = new Style$Display$2_0;
  INLINE = new Style$Display$3_0;
  INLINE_BLOCK = new Style$Display$4_0;
  $VALUES = initValues(_3Lcom_google_gwt_dom_client_Style$Display_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Style$Display, [NONE, BLOCK, INLINE, INLINE_BLOCK]);
}

function values_0(){
  $clinit_Style$Display();
  return $VALUES;
}

defineSeed(58, 59, makeCastMap([Q$Style$Display, Q$Style$HasCssName, Q$Serializable, Q$Comparable, Q$Enum]));
var $VALUES, BLOCK, INLINE, INLINE_BLOCK, NONE;
function Style$Display$1_0(){
  Enum_0.call(this, 'NONE', 0);
}

defineSeed(60, 58, makeCastMap([Q$Style$Display, Q$Style$HasCssName, Q$Serializable, Q$Comparable, Q$Enum]), Style$Display$1_0);
function Style$Display$2_0(){
  Enum_0.call(this, 'BLOCK', 1);
}

defineSeed(61, 58, makeCastMap([Q$Style$Display, Q$Style$HasCssName, Q$Serializable, Q$Comparable, Q$Enum]), Style$Display$2_0);
function Style$Display$3_0(){
  Enum_0.call(this, 'INLINE', 2);
}

defineSeed(62, 58, makeCastMap([Q$Style$Display, Q$Style$HasCssName, Q$Serializable, Q$Comparable, Q$Enum]), Style$Display$3_0);
function Style$Display$4_0(){
  Enum_0.call(this, 'INLINE_BLOCK', 3);
}

defineSeed(63, 58, makeCastMap([Q$Style$Display, Q$Style$HasCssName, Q$Serializable, Q$Comparable, Q$Enum]), Style$Display$4_0);
function $clinit_Style$Overflow(){
  $clinit_Style$Overflow = nullMethod;
  VISIBLE = new Style$Overflow$1_0;
  HIDDEN = new Style$Overflow$2_0;
  SCROLL = new Style$Overflow$3_0;
  AUTO = new Style$Overflow$4_0;
  $VALUES_0 = initValues(_3Lcom_google_gwt_dom_client_Style$Overflow_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Style$Overflow, [VISIBLE, HIDDEN, SCROLL, AUTO]);
}

function values_1(){
  $clinit_Style$Overflow();
  return $VALUES_0;
}

defineSeed(64, 59, makeCastMap([Q$Style$HasCssName, Q$Style$Overflow, Q$Serializable, Q$Comparable, Q$Enum]));
var $VALUES_0, AUTO, HIDDEN, SCROLL, VISIBLE;
function Style$Overflow$1_0(){
  Enum_0.call(this, 'VISIBLE', 0);
}

defineSeed(65, 64, makeCastMap([Q$Style$HasCssName, Q$Style$Overflow, Q$Serializable, Q$Comparable, Q$Enum]), Style$Overflow$1_0);
function Style$Overflow$2_0(){
  Enum_0.call(this, 'HIDDEN', 1);
}

defineSeed(66, 64, makeCastMap([Q$Style$HasCssName, Q$Style$Overflow, Q$Serializable, Q$Comparable, Q$Enum]), Style$Overflow$2_0);
function Style$Overflow$3_0(){
  Enum_0.call(this, 'SCROLL', 2);
}

defineSeed(67, 64, makeCastMap([Q$Style$HasCssName, Q$Style$Overflow, Q$Serializable, Q$Comparable, Q$Enum]), Style$Overflow$3_0);
function Style$Overflow$4_0(){
  Enum_0.call(this, 'AUTO', 3);
}

defineSeed(68, 64, makeCastMap([Q$Style$HasCssName, Q$Style$Overflow, Q$Serializable, Q$Comparable, Q$Enum]), Style$Overflow$4_0);
function $clinit_Style$Position(){
  $clinit_Style$Position = nullMethod;
  STATIC = new Style$Position$1_0;
  RELATIVE = new Style$Position$2_0;
  ABSOLUTE = new Style$Position$3_0;
  FIXED = new Style$Position$4_0;
  $VALUES_1 = initValues(_3Lcom_google_gwt_dom_client_Style$Position_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Style$Position, [STATIC, RELATIVE, ABSOLUTE, FIXED]);
}

function values_2(){
  $clinit_Style$Position();
  return $VALUES_1;
}

defineSeed(69, 59, makeCastMap([Q$Style$HasCssName, Q$Style$Position, Q$Serializable, Q$Comparable, Q$Enum]));
var $VALUES_1, ABSOLUTE, FIXED, RELATIVE, STATIC;
function Style$Position$1_0(){
  Enum_0.call(this, 'STATIC', 0);
}

defineSeed(70, 69, makeCastMap([Q$Style$HasCssName, Q$Style$Position, Q$Serializable, Q$Comparable, Q$Enum]), Style$Position$1_0);
function Style$Position$2_0(){
  Enum_0.call(this, 'RELATIVE', 1);
}

defineSeed(71, 69, makeCastMap([Q$Style$HasCssName, Q$Style$Position, Q$Serializable, Q$Comparable, Q$Enum]), Style$Position$2_0);
function Style$Position$3_0(){
  Enum_0.call(this, 'ABSOLUTE', 2);
}

defineSeed(72, 69, makeCastMap([Q$Style$HasCssName, Q$Style$Position, Q$Serializable, Q$Comparable, Q$Enum]), Style$Position$3_0);
function Style$Position$4_0(){
  Enum_0.call(this, 'FIXED', 3);
}

defineSeed(73, 69, makeCastMap([Q$Style$HasCssName, Q$Style$Position, Q$Serializable, Q$Comparable, Q$Enum]), Style$Position$4_0);
function $clinit_Style$TextAlign(){
  $clinit_Style$TextAlign = nullMethod;
  CENTER = new Style$TextAlign$1_0;
  JUSTIFY = new Style$TextAlign$2_0;
  LEFT = new Style$TextAlign$3_0;
  RIGHT = new Style$TextAlign$4_0;
  $VALUES_2 = initValues(_3Lcom_google_gwt_dom_client_Style$TextAlign_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Style$TextAlign, [CENTER, JUSTIFY, LEFT, RIGHT]);
}

function values_3(){
  $clinit_Style$TextAlign();
  return $VALUES_2;
}

defineSeed(74, 59, makeCastMap([Q$Style$HasCssName, Q$Style$TextAlign, Q$Serializable, Q$Comparable, Q$Enum]));
var $VALUES_2, CENTER, JUSTIFY, LEFT, RIGHT;
function Style$TextAlign$1_0(){
  Enum_0.call(this, 'CENTER', 0);
}

defineSeed(75, 74, makeCastMap([Q$Style$HasCssName, Q$Style$TextAlign, Q$Serializable, Q$Comparable, Q$Enum]), Style$TextAlign$1_0);
function Style$TextAlign$2_0(){
  Enum_0.call(this, 'JUSTIFY', 1);
}

defineSeed(76, 74, makeCastMap([Q$Style$HasCssName, Q$Style$TextAlign, Q$Serializable, Q$Comparable, Q$Enum]), Style$TextAlign$2_0);
function Style$TextAlign$3_0(){
  Enum_0.call(this, 'LEFT', 2);
}

defineSeed(77, 74, makeCastMap([Q$Style$HasCssName, Q$Style$TextAlign, Q$Serializable, Q$Comparable, Q$Enum]), Style$TextAlign$3_0);
function Style$TextAlign$4_0(){
  Enum_0.call(this, 'RIGHT', 3);
}

defineSeed(78, 74, makeCastMap([Q$Style$HasCssName, Q$Style$TextAlign, Q$Serializable, Q$Comparable, Q$Enum]), Style$TextAlign$4_0);
function $clinit_Style$Unit(){
  $clinit_Style$Unit = nullMethod;
  PX = new Style$Unit$1_0;
  PCT = new Style$Unit$2_0;
  EM = new Style$Unit$3_0;
  EX = new Style$Unit$4_0;
  PT = new Style$Unit$5_0;
  PC = new Style$Unit$6_0;
  IN = new Style$Unit$7_0;
  CM = new Style$Unit$8_0;
  MM = new Style$Unit$9_0;
  $VALUES_3 = initValues(_3Lcom_google_gwt_dom_client_Style$Unit_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Style$Unit, [PX, PCT, EM, EX, PT, PC, IN, CM, MM]);
}

function values_4(){
  $clinit_Style$Unit();
  return $VALUES_3;
}

defineSeed(79, 59, makeCastMap([Q$Style$Unit, Q$Serializable, Q$Comparable, Q$Enum]));
var $VALUES_3, CM, EM, EX, IN, MM, PC, PCT, PT, PX;
function Style$Unit$1_0(){
  Enum_0.call(this, 'PX', 0);
}

defineSeed(80, 79, makeCastMap([Q$Style$Unit, Q$Serializable, Q$Comparable, Q$Enum]), Style$Unit$1_0);
function Style$Unit$2_0(){
  Enum_0.call(this, 'PCT', 1);
}

defineSeed(81, 79, makeCastMap([Q$Style$Unit, Q$Serializable, Q$Comparable, Q$Enum]), Style$Unit$2_0);
function Style$Unit$3_0(){
  Enum_0.call(this, 'EM', 2);
}

defineSeed(82, 79, makeCastMap([Q$Style$Unit, Q$Serializable, Q$Comparable, Q$Enum]), Style$Unit$3_0);
function Style$Unit$4_0(){
  Enum_0.call(this, 'EX', 3);
}

defineSeed(83, 79, makeCastMap([Q$Style$Unit, Q$Serializable, Q$Comparable, Q$Enum]), Style$Unit$4_0);
function Style$Unit$5_0(){
  Enum_0.call(this, 'PT', 4);
}

defineSeed(84, 79, makeCastMap([Q$Style$Unit, Q$Serializable, Q$Comparable, Q$Enum]), Style$Unit$5_0);
function Style$Unit$6_0(){
  Enum_0.call(this, 'PC', 5);
}

defineSeed(85, 79, makeCastMap([Q$Style$Unit, Q$Serializable, Q$Comparable, Q$Enum]), Style$Unit$6_0);
function Style$Unit$7_0(){
  Enum_0.call(this, 'IN', 6);
}

defineSeed(86, 79, makeCastMap([Q$Style$Unit, Q$Serializable, Q$Comparable, Q$Enum]), Style$Unit$7_0);
function Style$Unit$8_0(){
  Enum_0.call(this, 'CM', 7);
}

defineSeed(87, 79, makeCastMap([Q$Style$Unit, Q$Serializable, Q$Comparable, Q$Enum]), Style$Unit$8_0);
function Style$Unit$9_0(){
  Enum_0.call(this, 'MM', 8);
}

defineSeed(88, 79, makeCastMap([Q$Style$Unit, Q$Serializable, Q$Comparable, Q$Enum]), Style$Unit$9_0);
defineSeed(94, 1, {});
_.toString$ = function toString_7(){
  return 'An event type';
}
;
_.source = null;
function $overrideSource(this$static, source){
  this$static.source = source;
}

defineSeed(93, 94, {});
_.revive = function revive(){
  this.dead = false;
  this.source = null;
}
;
_.dead = false;
function $setNativeEvent(this$static, nativeEvent){
  this$static.nativeEvent = nativeEvent;
}

function $setRelativeElement(this$static, relativeElem){
  this$static.relativeElem = relativeElem;
}

function fireNativeEvent(nativeEvent, handlerSource, relativeElem){
  var currentNative, currentRelativeElem, typeKey;
  if (registered) {
    typeKey = dynamicCast($unsafeGet(registered, ($clinit_DOMImpl() , nativeEvent).type), Q$DomEvent$Type);
    if (typeKey) {
      currentNative = typeKey.flyweight.nativeEvent;
      currentRelativeElem = typeKey.flyweight.relativeElem;
      $setNativeEvent(typeKey.flyweight, nativeEvent);
      $setRelativeElement(typeKey.flyweight, relativeElem);
      $fireEvent_0(handlerSource, typeKey.flyweight);
      $setNativeEvent(typeKey.flyweight, currentNative);
      $setRelativeElement(typeKey.flyweight, currentRelativeElem);
    }
  }
}

defineSeed(92, 93, {});
_.getAssociatedType = function getAssociatedType(){
  return this.getAssociatedType_0();
}
;
_.nativeEvent = null;
_.relativeElem = null;
var registered = null;
defineSeed(91, 92, {});
defineSeed(90, 91, {});
function $clinit_ClickEvent(){
  $clinit_ClickEvent = nullMethod;
  TYPE = new DomEvent$Type_0('click', new ClickEvent_0);
}

function ClickEvent_0(){
}

defineSeed(89, 90, {}, ClickEvent_0);
_.dispatch = function dispatch(handler){
  $onClick(dynamicCast(handler, Q$ClickHandler));
}
;
_.getAssociatedType_0 = function getAssociatedType_0(){
  return TYPE;
}
;
var TYPE;
defineSeed(97, 1, {});
_.hashCode$ = function hashCode_2(){
  return this.index_0;
}
;
_.toString$ = function toString_8(){
  return 'Event type';
}
;
_.index_0 = 0;
var nextHashCode = 0;
function GwtEvent$Type_0(){
  this.index_0 = ++nextHashCode;
}

defineSeed(96, 97, {}, GwtEvent$Type_0);
function DomEvent$Type_0(eventName, flyweight){
  GwtEvent$Type_0.call(this);
  this.flyweight = flyweight;
  !registered && (registered = new PrivateMap_0);
  $unsafePut(registered, eventName, this);
  this.name_0 = eventName;
}

defineSeed(95, 96, makeCastMap([Q$DomEvent$Type]), DomEvent$Type_0);
_.flyweight = null;
_.name_0 = null;
function $clinit_MouseDownEvent(){
  $clinit_MouseDownEvent = nullMethod;
  TYPE_0 = new DomEvent$Type_0('mousedown', new MouseDownEvent_0);
}

function MouseDownEvent_0(){
}

defineSeed(98, 90, {}, MouseDownEvent_0);
_.dispatch = function dispatch_0(handler){
  dynamicCast(handler, Q$MouseDownHandler).onMouseDown(this);
}
;
_.getAssociatedType_0 = function getAssociatedType_1(){
  return TYPE_0;
}
;
var TYPE_0;
function $clinit_MouseMoveEvent(){
  $clinit_MouseMoveEvent = nullMethod;
  TYPE_1 = new DomEvent$Type_0('mousemove', new MouseMoveEvent_0);
}

function MouseMoveEvent_0(){
}

defineSeed(99, 90, {}, MouseMoveEvent_0);
_.dispatch = function dispatch_1(handler){
  dynamicCast(handler, Q$MouseMoveHandler).onMouseMove(this);
}
;
_.getAssociatedType_0 = function getAssociatedType_2(){
  return TYPE_1;
}
;
var TYPE_1;
function $clinit_MouseUpEvent(){
  $clinit_MouseUpEvent = nullMethod;
  TYPE_2 = new DomEvent$Type_0('mouseup', new MouseUpEvent_0);
}

function MouseUpEvent_0(){
}

defineSeed(100, 90, {}, MouseUpEvent_0);
_.dispatch = function dispatch_2(handler){
  dynamicCast(handler, Q$MouseUpHandler).onMouseUp(this);
}
;
_.getAssociatedType_0 = function getAssociatedType_3(){
  return TYPE_2;
}
;
var TYPE_2;
function $unsafeGet(this$static, key){
  return this$static.map[key];
}

function $unsafePut(this$static, key, value){
  this$static.map[key] = value;
}

function PrivateMap_0(){
  this.map = {};
}

defineSeed(101, 1, {}, PrivateMap_0);
_.map = null;
defineSeed(104, 91, {});
var impl_1 = null;
function $clinit_TouchCancelEvent(){
  $clinit_TouchCancelEvent = nullMethod;
  TYPE_3 = new DomEvent$Type_0('touchcancel', new TouchCancelEvent_0);
}

function TouchCancelEvent_0(){
}

defineSeed(103, 104, {}, TouchCancelEvent_0);
_.dispatch = function dispatch_3(handler){
  $onTouchEnd(dynamicCast(dynamicCast(handler, Q$TouchCancelHandler), Q$TouchScroller$5).this$0);
}
;
_.getAssociatedType_0 = function getAssociatedType_4(){
  return TYPE_3;
}
;
var TYPE_3;
function $clinit_TouchEndEvent(){
  $clinit_TouchEndEvent = nullMethod;
  TYPE_4 = new DomEvent$Type_0('touchend', new TouchEndEvent_0);
}

function TouchEndEvent_0(){
}

defineSeed(105, 104, {}, TouchEndEvent_0);
_.dispatch = function dispatch_4(handler){
  $onTouchEnd(dynamicCast(dynamicCast(handler, Q$TouchEndHandler), Q$TouchScroller$4).this$0);
}
;
_.getAssociatedType_0 = function getAssociatedType_5(){
  return TYPE_4;
}
;
var TYPE_4;
function TouchEvent$TouchSupportDetector_0(){
  var elem;
  this.isSupported = (elem = document.createElement('div') , elem.setAttribute('ontouchstart', 'return;') , typeof elem.ontouchstart == 'function');
}

defineSeed(106, 1, {}, TouchEvent$TouchSupportDetector_0);
function $clinit_TouchMoveEvent(){
  $clinit_TouchMoveEvent = nullMethod;
  TYPE_5 = new DomEvent$Type_0('touchmove', new TouchMoveEvent_0);
}

function $dispatch(this$static, handler){
  $onTouchMove(handler.this$0, this$static);
}

function TouchMoveEvent_0(){
}

defineSeed(107, 104, {}, TouchMoveEvent_0);
_.dispatch = function dispatch_5(handler){
  $dispatch(this, dynamicCast(handler, Q$TouchMoveHandler));
}
;
_.getAssociatedType_0 = function getAssociatedType_6(){
  return TYPE_5;
}
;
var TYPE_5;
function $clinit_TouchStartEvent(){
  $clinit_TouchStartEvent = nullMethod;
  TYPE_6 = new DomEvent$Type_0('touchstart', new TouchStartEvent_0);
}

function $dispatch_0(this$static, handler){
  $onTouchStart(handler.this$0, this$static);
}

function TouchStartEvent_0(){
}

defineSeed(108, 104, {}, TouchStartEvent_0);
_.dispatch = function dispatch_6(handler){
  $dispatch_0(this, dynamicCast(handler, Q$TouchStartHandler));
}
;
_.getAssociatedType_0 = function getAssociatedType_7(){
  return TYPE_6;
}
;
var TYPE_6;
function $dispatch_1(this$static, handler){
  this$static.attached?$setupBustClickHandler(handler.this$0):$removeBustClickHandler(handler.this$0);
}

function AttachEvent_0(attached){
  this.attached = attached;
}

function fire(source, attached){
  var event_0;
  if (TYPE_7) {
    event_0 = new AttachEvent_0(attached);
    !!source.handlerManager && $fireEvent(source.handlerManager, event_0);
  }
}

defineSeed(109, 93, {}, AttachEvent_0);
_.dispatch = function dispatch_7(handler){
  $dispatch_1(this, dynamicCast(handler, Q$AttachEvent$Handler));
}
;
_.getAssociatedType = function getAssociatedType_8(){
  return TYPE_7;
}
;
_.attached = false;
var TYPE_7 = null;
function CloseEvent_0(){
}

function fire_0(source){
  var event_0;
  if (TYPE_8) {
    event_0 = new CloseEvent_0;
    source.fireEvent_0(event_0);
  }
}

defineSeed(110, 93, {}, CloseEvent_0);
_.dispatch = function dispatch_8(handler){
  dynamicCast(handler, Q$CloseHandler).onClose(this);
}
;
_.getAssociatedType = function getAssociatedType_9(){
  return TYPE_8;
}
;
var TYPE_8 = null;
function ResizeEvent_0(){
}

function fire_1(source){
  var event_0;
  if (TYPE_9) {
    event_0 = new ResizeEvent_0;
    $fireEvent(source, event_0);
  }
}

defineSeed(111, 93, {}, ResizeEvent_0);
_.dispatch = function dispatch_9(handler){
  dynamicCast(handler, Q$ResizeHandler).onResize(this);
}
;
_.getAssociatedType = function getAssociatedType_10(){
  return TYPE_9;
}
;
var TYPE_9 = null;
function $dispatch_2(handler){
  handler.this$0.autoHideOnHistoryEvents && $hide(handler.this$0);
}

function ValueChangeEvent_0(){
}

function fire_2(source){
  var event_0;
  if (TYPE_10) {
    event_0 = new ValueChangeEvent_0;
    $fireEvent(source.handlers, event_0);
  }
}

defineSeed(112, 93, {}, ValueChangeEvent_0);
_.dispatch = function dispatch_10(handler){
  $dispatch_2(dynamicCast(handler, Q$ValueChangeHandler));
}
;
_.getAssociatedType = function getAssociatedType_11(){
  return TYPE_10;
}
;
var TYPE_10 = null;
function $addHandler(this$static, type, handler){
  return new LegacyHandlerWrapper_0($doAdd(this$static.eventBus, type, handler));
}

function $fireEvent(this$static, event_0){
  var e, oldSource;
  !event_0.dead || event_0.revive();
  oldSource = event_0.source;
  $overrideSource(event_0, this$static.source);
  try {
    $doFire(this$static.eventBus, event_0);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$UmbrellaException)) {
      e = $e0;
      throw new UmbrellaException_2(e.causes);
    }
     else 
      throw $e0;
  }
   finally {
    oldSource == null?(event_0.dead = true , event_0.source = null):(event_0.source = oldSource);
  }
}

function $isEventHandled(this$static, e){
  return $isEventHandled_0(this$static.eventBus, e);
}

function HandlerManager_0(source){
  HandlerManager_1.call(this, source, false);
}

function HandlerManager_1(source, fireInReverseOrder){
  this.eventBus = new HandlerManager$Bus_0(fireInReverseOrder);
  this.source = source;
}

defineSeed(113, 1, makeCastMap([Q$HasHandlers]), HandlerManager_0, HandlerManager_1);
_.fireEvent_0 = function fireEvent(event_0){
  $fireEvent(this, event_0);
}
;
_.eventBus = null;
_.source = null;
defineSeed(116, 1, {});
function $defer(this$static, command){
  !this$static.deferredDeltas && (this$static.deferredDeltas = new ArrayList_0);
  $add_6(this$static.deferredDeltas, command);
}

function $doAdd(this$static, type, handler){
  if (!type) {
    throw new NullPointerException_1('Cannot add a handler with a null type');
  }
  if (!handler) {
    throw new NullPointerException_1('Cannot add a null handler');
  }
  this$static.firingDepth > 0?$defer(this$static, new SimpleEventBus$2_0(this$static, type, handler)):$doAddNow(this$static, type, null, handler);
  return new SimpleEventBus$1_0(this$static, type, handler);
}

function $doAddNow(this$static, type, source, handler){
  var l_0;
  l_0 = $ensureHandlerList(this$static, type, source);
  l_0.add(handler);
}

function $doFire(this$static, event_0){
  var causes, e, handler, handlers, it;
  if (!event_0) {
    throw new NullPointerException_1('Cannot fire null event');
  }
  try {
    ++this$static.firingDepth;
    handlers = $getDispatchList(this$static, event_0.getAssociatedType());
    causes = null;
    it = this$static.isReverseOrder?handlers.listIterator_0(handlers.size_0()):handlers.listIterator();
    while (this$static.isReverseOrder?it.hasPrevious():it.hasNext()) {
      handler = this$static.isReverseOrder?it.previous():it.next_0();
      try {
        event_0.dispatch(dynamicCast(handler, Q$EventHandler));
      }
       catch ($e0) {
        $e0 = caught_0($e0);
        if (instanceOf($e0, Q$Throwable)) {
          e = $e0;
          !causes && (causes = new HashSet_0);
          $add_7(causes, e);
        }
         else 
          throw $e0;
      }
    }
    if (causes) {
      throw new UmbrellaException_1(causes);
    }
  }
   finally {
    --this$static.firingDepth;
    this$static.firingDepth == 0 && $handleQueuedAddsAndRemoves(this$static);
  }
}

function $doRemoveNow(this$static, type, source, handler){
  var l_0, removed, sourceMap;
  l_0 = $getHandlerList(this$static, type, source);
  removed = l_0.remove_1(handler);
  removed && l_0.isEmpty() && (sourceMap = dynamicCast(this$static.map.get(type), Q$Map) , dynamicCast(sourceMap.remove_2(source), Q$List) , sourceMap.isEmpty() && this$static.map.remove_2(type) , undefined);
}

function $ensureHandlerList(this$static, type, source){
  var handlers, sourceMap;
  sourceMap = dynamicCast(this$static.map.get(type), Q$Map);
  if (!sourceMap) {
    sourceMap = new HashMap_0;
    this$static.map.put(type, sourceMap);
  }
  handlers = dynamicCast(sourceMap.get(source), Q$List);
  if (!handlers) {
    handlers = new ArrayList_0;
    sourceMap.put(source, handlers);
  }
  return handlers;
}

function $getDispatchList(this$static, type){
  var directHandlers;
  directHandlers = $getHandlerList(this$static, type, null);
  return directHandlers;
}

function $getHandlerList(this$static, type, source){
  var handlers, sourceMap;
  sourceMap = dynamicCast(this$static.map.get(type), Q$Map);
  if (!sourceMap) {
    return $clinit_Collections() , $clinit_Collections() , EMPTY_LIST;
  }
  handlers = dynamicCast(sourceMap.get(source), Q$List);
  if (!handlers) {
    return $clinit_Collections() , $clinit_Collections() , EMPTY_LIST;
  }
  return handlers;
}

function $handleQueuedAddsAndRemoves(this$static){
  var c, c$iterator;
  if (this$static.deferredDeltas) {
    try {
      for (c$iterator = new AbstractList$IteratorImpl_0(this$static.deferredDeltas); c$iterator.i < c$iterator.this$0_0.size_0();) {
        c = dynamicCast($next_1(c$iterator), Q$SimpleEventBus$Command);
        c.execute_0();
      }
    }
     finally {
      this$static.deferredDeltas = null;
    }
  }
}

function $isEventHandled_0(this$static, eventKey){
  return this$static.map.containsKey(eventKey);
}

defineSeed(115, 116, {});
_.deferredDeltas = null;
_.firingDepth = 0;
_.isReverseOrder = false;
function $doRemove(this$static, type, source, handler){
  this$static.firingDepth > 0?$defer(this$static, new SimpleEventBus$3_0(this$static, type, source, handler)):$doRemoveNow(this$static, type, source, handler);
}

function HandlerManager$Bus_0(fireInReverseOrder){
  this.map = new HashMap_0;
  this.isReverseOrder = fireInReverseOrder;
}

defineSeed(114, 115, {}, HandlerManager$Bus_0);
function LegacyHandlerWrapper_0(real){
  this.real = real;
}

defineSeed(117, 1, makeCastMap([Q$HandlerRegistration]), LegacyHandlerWrapper_0);
_.real = null;
function UmbrellaException_1(causes){
  RuntimeException_2.call(this, makeMessage(causes), makeCause(causes));
  this.causes = causes;
}

function makeCause(causes){
  var iterator;
  iterator = causes.iterator();
  if (!iterator.hasNext()) {
    return null;
  }
  return dynamicCast(iterator.next_0(), Q$Throwable);
}

function makeMessage(causes){
  var b, count, first, t, t$iterator;
  count = causes.size_0();
  if (count == 0) {
    return null;
  }
  b = new StringBuilder_2(count == 1?'Exception caught: ':count + ' exceptions caught: ');
  first = true;
  for (t$iterator = causes.iterator(); t$iterator.hasNext();) {
    t = dynamicCast(t$iterator.next_0(), Q$Throwable);
    first?(first = false):(b.impl.append_2(b.data, '; ') , b);
    $append_5(b, t.getMessage());
  }
  return b.impl.toString_0(b.data);
}

defineSeed(119, 12, makeCastMap([Q$UmbrellaException, Q$Serializable, Q$Exception, Q$Throwable]), UmbrellaException_1);
_.causes = null;
function UmbrellaException_2(causes){
  UmbrellaException_1.call(this, causes);
}

defineSeed(118, 119, makeCastMap([Q$UmbrellaException, Q$Serializable, Q$Exception, Q$Throwable]), UmbrellaException_2);
function throwIfNull(value){
  if (null == value) {
    throw new NullPointerException_1('encodedURLComponent cannot be null');
  }
}

function getDirectionOnElement(elem){
  var dirPropertyValue;
  dirPropertyValue = $getPropertyString(elem, 'dir');
  if ($equalsIgnoreCase('rtl', dirPropertyValue)) {
    return $clinit_HasDirection$Direction() , RTL;
  }
   else if ($equalsIgnoreCase('ltr', dirPropertyValue)) {
    return $clinit_HasDirection$Direction() , LTR;
  }
  return $clinit_HasDirection$Direction() , DEFAULT;
}

function setDirectionOnElement(elem, direction){
  switch (direction.ordinal) {
    case 0:
      {
        elem['dir'] = 'rtl';
        break;
      }

    case 1:
      {
        elem['dir'] = 'ltr';
        break;
      }

    case 2:
      {
        getDirectionOnElement(elem) != ($clinit_HasDirection$Direction() , DEFAULT) && (elem['dir'] = '' , undefined);
        break;
      }

  }
}

function $clinit_HasDirection$Direction(){
  $clinit_HasDirection$Direction = nullMethod;
  RTL = new HasDirection$Direction_0('RTL', 0);
  LTR = new HasDirection$Direction_0('LTR', 1);
  DEFAULT = new HasDirection$Direction_0('DEFAULT', 2);
  $VALUES_4 = initValues(_3Lcom_google_gwt_i18n_client_HasDirection$Direction_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$HasDirection$Direction, [RTL, LTR, DEFAULT]);
}

function HasDirection$Direction_0(enum$name, enum$ordinal){
  Enum_0.call(this, enum$name, enum$ordinal);
}

function values_5(){
  $clinit_HasDirection$Direction();
  return $VALUES_4;
}

defineSeed(125, 59, makeCastMap([Q$HasDirection$Direction, Q$Serializable, Q$Comparable, Q$Enum]), HasDirection$Direction_0);
var $VALUES_4, DEFAULT, LTR, RTL;
function $clinit_LocaleInfo(){
  $clinit_LocaleInfo = nullMethod;
  instance_0 = new LocaleInfo_0;
}

function $getNumberConstants(this$static){
  !this$static.numberConstants && (this$static.numberConstants = new NumberConstantsImpl__0);
  return this$static.numberConstants;
}

function LocaleInfo_0(){
}

defineSeed(126, 1, {}, LocaleInfo_0);
_.numberConstants = null;
var instance_0;
function $clinit_NumberFormat(){
  $clinit_NumberFormat = nullMethod;
  $getNumberConstants(($clinit_LocaleInfo() , $clinit_LocaleInfo() , instance_0));
}

function $addExponent(this$static, digits){
  var exponentDigits, i_0;
  digits.impl.append_2(digits.data, 'E');
  if (this$static.exponent < 0) {
    this$static.exponent = -this$static.exponent;
    digits.impl.append_2(digits.data, '-');
  }
  exponentDigits = '' + this$static.exponent;
  for (i_0 = exponentDigits.length; i_0 < this$static.minExponentDigits; ++i_0) {
    digits.impl.appendNonNull(digits.data, '0');
  }
  digits.impl.append_2(digits.data, exponentDigits);
}

function $addZeroAndDecimal(this$static, digits){
  if (this$static.digitsLength == 0) {
    digits.impl.replace_0(digits.data, 0, 0, '0');
    ++this$static.decimalPosition;
    ++this$static.digitsLength;
  }
  if (this$static.decimalPosition < this$static.digitsLength || this$static.decimalSeparatorAlwaysShown) {
    $insert_0(digits, this$static.decimalPosition, '.');
    ++this$static.digitsLength;
  }
}

function $adjustFractionDigits(this$static, digits){
  var requiredDigits, toRemove;
  requiredDigits = this$static.decimalPosition + this$static.minimumFractionDigits;
  if (this$static.digitsLength < requiredDigits) {
    while (this$static.digitsLength < requiredDigits) {
      digits.impl.appendNonNull(digits.data, '0');
      ++this$static.digitsLength;
    }
  }
   else {
    toRemove = this$static.decimalPosition + this$static.maximumFractionDigits;
    toRemove > this$static.digitsLength && (toRemove = this$static.digitsLength);
    while (toRemove > requiredDigits && $charAt(digits.impl.toString_0(digits.data), toRemove - 1) == 48) {
      --toRemove;
    }
    if (toRemove < this$static.digitsLength) {
      $delete_0(digits, toRemove, this$static.digitsLength);
      this$static.digitsLength = toRemove;
    }
  }
}

function $computeExponent(this$static, digits){
  var remainder, strip;
  strip = 0;
  while (strip < this$static.digitsLength - 1 && $charAt(digits.impl.toString_0(digits.data), strip) == 48) {
    ++strip;
  }
  if (strip > 0) {
    digits.impl.replace_0(digits.data, 0, strip, '');
    this$static.digitsLength -= strip;
    this$static.exponent -= strip;
  }
  if (this$static.maximumIntegerDigits > this$static.minimumIntegerDigits && this$static.maximumIntegerDigits > 0) {
    this$static.exponent += this$static.decimalPosition - 1;
    remainder = this$static.exponent % this$static.maximumIntegerDigits;
    remainder < 0 && (remainder += this$static.maximumIntegerDigits);
    this$static.decimalPosition = remainder + 1;
    this$static.exponent -= remainder;
  }
   else {
    this$static.exponent += this$static.decimalPosition - this$static.minimumIntegerDigits;
    this$static.decimalPosition = this$static.minimumIntegerDigits;
  }
  if (this$static.digitsLength == 1 && digits.impl.toString_0(digits.data).charCodeAt(0) == 48) {
    this$static.exponent = 0;
    this$static.decimalPosition = this$static.minimumIntegerDigits;
  }
}

function $format(this$static, number){
  var buf, isNegative, preRound, scale, useExponent, currentGroupingSize;
  if (isNaN(number)) {
    return 'NaN';
  }
  isNegative = number < 0 || number == 0 && 1 / number < 0;
  isNegative && (number = -number);
  buf = new StringBuilder_0;
  if (!isFinite(number)) {
    $append_5(buf, isNegative?this$static.negativePrefix:this$static.positivePrefix);
    buf.impl.append_2(buf.data, '\u221E');
    $append_5(buf, isNegative?this$static.negativeSuffix:this$static.positiveSuffix);
    return buf.impl.toString_0(buf.data);
  }
  number *= this$static.multiplier;
  scale = toScaledString(buf, number);
  preRound = buf.impl.length_0(buf.data) + scale + this$static.maximumFractionDigits + 3;
  if (preRound > 0 && preRound < buf.impl.length_0(buf.data) && $charAt(buf.impl.toString_0(buf.data), preRound) == 57) {
    $propagateCarry(this$static, buf, preRound - 1);
    scale += buf.impl.length_0(buf.data) - preRound;
    $delete_0(buf, preRound, buf.impl.length_0(buf.data));
  }
  this$static.exponent = 0;
  this$static.digitsLength = buf.impl.length_0(buf.data);
  this$static.decimalPosition = this$static.digitsLength + scale;
  useExponent = this$static.useExponentialNotation;
  currentGroupingSize = this$static.groupingSize;
  this$static.decimalPosition > 1024 && (useExponent = true);
  useExponent && $computeExponent(this$static, buf);
  $processLeadingZeros(this$static, buf);
  $roundValue(this$static, buf);
  $insertGroupingSeparators(this$static, buf, currentGroupingSize);
  $adjustFractionDigits(this$static, buf);
  $addZeroAndDecimal(this$static, buf);
  useExponent && $addExponent(this$static, buf);
  $insert_0(buf, 0, isNegative?this$static.negativePrefix:this$static.positivePrefix);
  $append_5(buf, isNegative?this$static.negativeSuffix:this$static.positiveSuffix);
  return buf.impl.toString_0(buf.data);
}

function $insertGroupingSeparators(this$static, digits, g){
  var i_0;
  if (g > 0) {
    for (i_0 = g; i_0 < this$static.decimalPosition; i_0 += g + 1) {
      $insert_0(digits, this$static.decimalPosition - i_0, ',');
      ++this$static.decimalPosition;
      ++this$static.digitsLength;
    }
  }
}

function $parseAffix(this$static, pattern, start, affix, inNegativePattern){
  var ch, inQuote, len, pos;
  $delete(affix, affix.impl.length_0(affix.data));
  inQuote = false;
  len = pattern.length;
  for (pos = start; pos < len; ++pos) {
    ch = pattern.charCodeAt(pos);
    if (ch == 39) {
      if (pos + 1 < len && pattern.charCodeAt(pos + 1) == 39) {
        ++pos;
        affix.impl.append_2(affix.data, "'");
      }
       else {
        inQuote = !inQuote;
      }
      continue;
    }
    if (inQuote) {
      affix.impl.appendNonNull(affix.data, String.fromCharCode(ch));
    }
     else {
      switch (ch) {
        case 35:
        case 48:
        case 44:
        case 46:
        case 59:
          return pos - start;
        case 164:
          this$static.isCurrencyFormat = true;
          if (pos + 1 < len && pattern.charCodeAt(pos + 1) == 164) {
            ++pos;
            if (pos < len - 3 && pattern.charCodeAt(pos + 1) == 164 && pattern.charCodeAt(pos + 2) == 164) {
              pos += 2;
              $append_2(affix, $getSimpleCurrencySymbol(this$static.currencyData));
            }
             else {
              $append_2(affix, this$static.currencyData[0]);
            }
          }
           else {
            $append_2(affix, this$static.currencyData[1]);
          }

          break;
        case 37:
          if (!inNegativePattern) {
            if (this$static.multiplier != 1) {
              throw new IllegalArgumentException_1('Too many percent/per mille characters in pattern "' + pattern + '"');
            }
            this$static.multiplier = 100;
          }

          affix.impl.append_2(affix.data, '%');
          break;
        case 8240:
          if (!inNegativePattern) {
            if (this$static.multiplier != 1) {
              throw new IllegalArgumentException_1('Too many percent/per mille characters in pattern "' + pattern + '"');
            }
            this$static.multiplier = 1000;
          }

          affix.impl.append_2(affix.data, '\u2030');
          break;
        case 45:
          affix.impl.append_2(affix.data, '-');
          break;
        default:affix.impl.appendNonNull(affix.data, String.fromCharCode(ch));
      }
    }
  }
  return len - start;
}

function $parsePattern(this$static, pattern){
  var affix, pos;
  pos = 0;
  affix = new StringBuffer_0;
  pos += $parseAffix(this$static, pattern, 0, affix, false);
  this$static.positivePrefix = affix.impl.toString_0(affix.data);
  pos += $parseTrunk(this$static, pattern, pos, false);
  pos += $parseAffix(this$static, pattern, pos, affix, false);
  this$static.positiveSuffix = affix.impl.toString_0(affix.data);
  if (pos < pattern.length && pattern.charCodeAt(pos) == 59) {
    ++pos;
    pos += $parseAffix(this$static, pattern, pos, affix, true);
    this$static.negativePrefix = affix.impl.toString_0(affix.data);
    pos += $parseTrunk(this$static, pattern, pos, true);
    pos += $parseAffix(this$static, pattern, pos, affix, true);
    this$static.negativeSuffix = affix.impl.toString_0(affix.data);
  }
   else {
    this$static.negativePrefix = '-' + this$static.positivePrefix;
    this$static.negativeSuffix = this$static.positiveSuffix;
  }
}

function $parseTrunk(this$static, pattern, start, ignorePattern){
  var ch, decimalPos, digitLeftCount, digitRightCount, effectiveDecimalPos, groupingCount, len, loop, n, pos, totalDigits, zeroDigitCount;
  decimalPos = -1;
  digitLeftCount = 0;
  zeroDigitCount = 0;
  digitRightCount = 0;
  groupingCount = -1;
  len = pattern.length;
  pos = start;
  loop = true;
  for (; pos < len && loop; ++pos) {
    ch = pattern.charCodeAt(pos);
    switch (ch) {
      case 35:
        zeroDigitCount > 0?++digitRightCount:++digitLeftCount;
        groupingCount >= 0 && decimalPos < 0 && ++groupingCount;
        break;
      case 48:
        if (digitRightCount > 0) {
          throw new IllegalArgumentException_1("Unexpected '0' in pattern \"" + pattern + '"');
        }

        ++zeroDigitCount;
        groupingCount >= 0 && decimalPos < 0 && ++groupingCount;
        break;
      case 44:
        groupingCount = 0;
        break;
      case 46:
        if (decimalPos >= 0) {
          throw new IllegalArgumentException_1('Multiple decimal separators in pattern "' + pattern + '"');
        }

        decimalPos = digitLeftCount + zeroDigitCount + digitRightCount;
        break;
      case 69:
        if (!ignorePattern) {
          if (this$static.useExponentialNotation) {
            throw new IllegalArgumentException_1('Multiple exponential symbols in pattern "' + pattern + '"');
          }
          this$static.useExponentialNotation = true;
          this$static.minExponentDigits = 0;
        }

        while (pos + 1 < len && pattern.charCodeAt(pos + 1) == 48) {
          ++pos;
          ignorePattern || ++this$static.minExponentDigits;
        }

        if (!ignorePattern && digitLeftCount + zeroDigitCount < 1 || this$static.minExponentDigits < 1) {
          throw new IllegalArgumentException_1('Malformed exponential pattern "' + pattern + '"');
        }

        loop = false;
        break;
      default:--pos;
        loop = false;
    }
  }
  if (zeroDigitCount == 0 && digitLeftCount > 0 && decimalPos >= 0) {
    n = decimalPos;
    decimalPos == 0 && ++n;
    digitRightCount = digitLeftCount - n;
    digitLeftCount = n - 1;
    zeroDigitCount = 1;
  }
  if (decimalPos < 0 && digitRightCount > 0 || decimalPos >= 0 && (decimalPos < digitLeftCount || decimalPos > digitLeftCount + zeroDigitCount) || groupingCount == 0) {
    throw new IllegalArgumentException_1('Malformed pattern "' + pattern + '"');
  }
  if (ignorePattern) {
    return pos - start;
  }
  totalDigits = digitLeftCount + zeroDigitCount + digitRightCount;
  this$static.maximumFractionDigits = decimalPos >= 0?totalDigits - decimalPos:0;
  if (decimalPos >= 0) {
    this$static.minimumFractionDigits = digitLeftCount + zeroDigitCount - decimalPos;
    this$static.minimumFractionDigits < 0 && (this$static.minimumFractionDigits = 0);
  }
  effectiveDecimalPos = decimalPos >= 0?decimalPos:totalDigits;
  this$static.minimumIntegerDigits = effectiveDecimalPos - digitLeftCount;
  if (this$static.useExponentialNotation) {
    this$static.maximumIntegerDigits = digitLeftCount + this$static.minimumIntegerDigits;
    this$static.maximumFractionDigits == 0 && this$static.minimumIntegerDigits == 0 && (this$static.minimumIntegerDigits = 1);
  }
  this$static.groupingSize = groupingCount > 0?groupingCount:0;
  this$static.decimalSeparatorAlwaysShown = decimalPos == 0 || decimalPos == totalDigits;
  return pos - start;
}

function $processLeadingZeros(this$static, digits){
  var i_0, prefix, strip;
  if (this$static.decimalPosition > this$static.digitsLength) {
    while (this$static.digitsLength < this$static.decimalPosition) {
      digits.impl.appendNonNull(digits.data, '0');
      ++this$static.digitsLength;
    }
  }
  if (!this$static.useExponentialNotation) {
    if (this$static.decimalPosition < this$static.minimumIntegerDigits) {
      prefix = new StringBuilder_0;
      while (this$static.decimalPosition < this$static.minimumIntegerDigits) {
        prefix.impl.appendNonNull(prefix.data, '0');
        ++this$static.decimalPosition;
        ++this$static.digitsLength;
      }
      $insert_0(digits, 0, prefix.impl.toString_0(prefix.data));
    }
     else if (this$static.decimalPosition > this$static.minimumIntegerDigits) {
      strip = this$static.decimalPosition - this$static.minimumIntegerDigits;
      for (i_0 = 0; i_0 < strip; ++i_0) {
        if ($charAt(digits.impl.toString_0(digits.data), i_0) != 48) {
          strip = i_0;
          break;
        }
      }
      if (strip > 0) {
        digits.impl.replace_0(digits.data, 0, strip, '');
        this$static.digitsLength -= strip;
        this$static.decimalPosition -= strip;
      }
    }
  }
}

function $propagateCarry(this$static, digits, i_0){
  var carry, digit;
  carry = true;
  while (carry && i_0 >= 0) {
    digit = $charAt(digits.impl.toString_0(digits.data), i_0);
    if (digit == 57) {
      $setCharAt(digits, i_0--, 48);
    }
     else {
      $setCharAt(digits, i_0, digit + 1 & 65535);
      carry = false;
    }
  }
  if (carry) {
    digits.impl.replace_0(digits.data, 0, 0, '1');
    ++this$static.decimalPosition;
    ++this$static.digitsLength;
  }
}

function $roundValue(this$static, digits){
  var i_0;
  if (this$static.digitsLength > this$static.decimalPosition + this$static.maximumFractionDigits && $charAt_0(digits, this$static.decimalPosition + this$static.maximumFractionDigits) >= 53) {
    i_0 = this$static.decimalPosition + this$static.maximumFractionDigits - 1;
    $propagateCarry(this$static, digits, i_0);
  }
}

function NumberFormat_0(cdata, userSuppliedPattern){
  if (!cdata) {
    throw new IllegalArgumentException_1('Unknown currency code');
  }
  this.pattern = '0.00';
  this.currencyData = cdata;
  $parsePattern(this, this.pattern);
  if (!userSuppliedPattern && this.isCurrencyFormat) {
    this.minimumFractionDigits = this.currencyData[2] & 7;
    this.maximumFractionDigits = this.minimumFractionDigits;
  }
}

function NumberFormat_1(cdata){
  $clinit_NumberFormat();
  NumberFormat_0.call(this, cdata, true);
}

function toScaledString(buf, val){
  var dot, expDigits, expIdx, scale, startLen;
  startLen = buf.impl.length_0(buf.data);
  $append_5(buf, val.toPrecision(20));
  scale = 0;
  expIdx = $indexOf_1(buf.impl.toString_0(buf.data), 'e', startLen);
  expIdx < 0 && (expIdx = $indexOf_1(buf.impl.toString_0(buf.data), 'E', startLen));
  if (expIdx >= 0) {
    expDigits = expIdx + 1;
    expDigits < buf.impl.length_0(buf.data) && $charAt(buf.impl.toString_0(buf.data), expDigits) == 43 && ++expDigits;
    expDigits < buf.impl.length_0(buf.data) && (scale = __parseAndValidateInt($substring(buf.impl.toString_0(buf.data), expDigits), 10));
    $delete_0(buf, expIdx, buf.impl.length_0(buf.data));
  }
  dot = $indexOf_1(buf.impl.toString_0(buf.data), '.', startLen);
  if (dot >= 0) {
    buf.impl.replace_0(buf.data, dot, dot + 1, '');
    scale -= buf.impl.length_0(buf.data) - dot;
  }
  return scale;
}

defineSeed(127, 1, {}, NumberFormat_1);
_.currencyData = null;
_.decimalPosition = 0;
_.decimalSeparatorAlwaysShown = false;
_.digitsLength = 0;
_.exponent = 0;
_.groupingSize = 3;
_.isCurrencyFormat = false;
_.maximumFractionDigits = 3;
_.maximumIntegerDigits = 40;
_.minExponentDigits = 0;
_.minimumFractionDigits = 0;
_.minimumIntegerDigits = 1;
_.multiplier = 1;
_.negativePrefix = '-';
_.negativeSuffix = '';
_.pattern = null;
_.positivePrefix = '';
_.positiveSuffix = '';
_.useExponentialNotation = false;
function NumberConstantsImpl__0(){
}

defineSeed(128, 1, {}, NumberConstantsImpl__0);
function $getSimpleCurrencySymbol(this$static){
  return this$static[4] || this$static[1];
}

defineSeed(131, 1, {});
function $get(this$static, index){
  var v = this$static.jsArray[index];
  var func = ($clinit_JSONParser() , typeMap)[typeof v];
  return func?func(v):throwUnknownTypeException(typeof v);
}

function $set(this$static, index, value){
  var previous;
  previous = $get(this$static, index);
  $set0(this$static, index, value);
  return previous;
}

function $set0(this$static, index, value){
  if (value) {
    var func = value.getUnwrapper();
    value = func(value);
  }
   else {
    value = undefined;
  }
  this$static.jsArray[index] = value;
}

function JSONArray_0(){
  this.jsArray = [];
}

function JSONArray_1(arr){
  this.jsArray = arr;
}

function unwrap(value){
  return value.jsArray;
}

defineSeed(130, 131, makeCastMap([Q$JSONArray]), JSONArray_0, JSONArray_1);
_.equals$ = function equals_1(other){
  if (!instanceOf(other, Q$JSONArray)) {
    return false;
  }
  return this.jsArray == dynamicCast(other, Q$JSONArray).jsArray;
}
;
_.getUnwrapper = function getUnwrapper(){
  return unwrap;
}
;
_.hashCode$ = function hashCode_3(){
  return getHashCode(this.jsArray);
}
;
_.toString$ = function toString_9(){
  var c, i_0, sb;
  sb = new StringBuffer_0;
  sb.impl.append_2(sb.data, '[');
  for (i_0 = 0 , c = this.jsArray.length; i_0 < c; ++i_0) {
    i_0 > 0 && (sb.impl.append_2(sb.data, ',') , sb);
    $append_1(sb, $get(this, i_0));
  }
  sb.impl.append_2(sb.data, ']');
  return sb.impl.toString_0(sb.data);
}
;
_.jsArray = null;
function $clinit_JSONBoolean(){
  $clinit_JSONBoolean = nullMethod;
  FALSE = new JSONBoolean_0(false);
  TRUE = new JSONBoolean_0(true);
}

function JSONBoolean_0(value){
  this.value = value;
}

function unwrap_0(value){
  return value.value;
}

defineSeed(132, 131, {}, JSONBoolean_0);
_.getUnwrapper = function getUnwrapper_0(){
  return unwrap_0;
}
;
_.toString$ = function toString_10(){
  return $clinit_Boolean() , '' + this.value;
}
;
_.value = false;
var FALSE, TRUE;
function JSONException_0(message){
  RuntimeException_1.call(this, message);
}

defineSeed(133, 12, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), JSONException_0);
function $clinit_JSONNull(){
  $clinit_JSONNull = nullMethod;
  instance_1 = new JSONNull_0;
}

function JSONNull_0(){
}

function unwrap_1(){
  return null;
}

defineSeed(134, 131, {}, JSONNull_0);
_.getUnwrapper = function getUnwrapper_1(){
  return unwrap_1;
}
;
_.toString$ = function toString_11(){
  return 'null';
}
;
var instance_1;
function JSONNumber_0(value){
  this.value = value;
}

function unwrap_2(value){
  return value.value;
}

defineSeed(135, 131, makeCastMap([Q$JSONNumber]), JSONNumber_0);
_.equals$ = function equals_2(other){
  if (!instanceOf(other, Q$JSONNumber)) {
    return false;
  }
  return this.value == dynamicCast(other, Q$JSONNumber).value;
}
;
_.getUnwrapper = function getUnwrapper_2(){
  return unwrap_2;
}
;
_.hashCode$ = function hashCode_4(){
  return round_int((new Double_0(this.value)).value);
}
;
_.toString$ = function toString_12(){
  return this.value + '';
}
;
_.value = 0;
function $computeKeys0(this$static, result){
  var jsObject = this$static.jsObject;
  var i_0 = 0;
  for (var key in jsObject) {
    jsObject.hasOwnProperty(key) && (result[i_0++] = key);
  }
  return result;
}

function $get_0(this$static, key){
  if (key == null) {
    throw new NullPointerException_0;
  }
  return $get0(this$static, key);
}

function $get0(this$static, key){
  var jsObject = this$static.jsObject;
  var v;
  key = String(key);
  jsObject.hasOwnProperty(key) && (v = jsObject[key]);
  var func = ($clinit_JSONParser() , typeMap)[typeof v];
  var ret = func?func(v):throwUnknownTypeException(typeof v);
  return ret;
}

function $put(this$static, key, jsonValue){
  var previous;
  if (key == null) {
    throw new NullPointerException_0;
  }
  previous = $get_0(this$static, key);
  $put0(this$static, key, jsonValue);
  return previous;
}

function $put0(this$static, key, value){
  if (value) {
    var func = value.getUnwrapper();
    this$static.jsObject[key] = func(value);
  }
   else {
    delete this$static.jsObject[key];
  }
}

function JSONObject_0(){
  JSONObject_1.call(this, {});
}

function JSONObject_1(jsValue){
  this.jsObject = jsValue;
}

function unwrap_3(value){
  return value.jsObject;
}

defineSeed(136, 131, makeCastMap([Q$JSONObject]), JSONObject_0, JSONObject_1);
_.equals$ = function equals_3(other){
  if (!instanceOf(other, Q$JSONObject)) {
    return false;
  }
  return this.jsObject == dynamicCast(other, Q$JSONObject).jsObject;
}
;
_.getUnwrapper = function getUnwrapper_3(){
  return unwrap_3;
}
;
_.hashCode$ = function hashCode_5(){
  return getHashCode(this.jsObject);
}
;
_.toString$ = function toString_13(){
  var first, key, key$index, key$max, keys, sb;
  sb = new StringBuffer_0;
  sb.impl.append_2(sb.data, '{');
  first = true;
  keys = $computeKeys0(this, initDim(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, 0, 0));
  for (key$index = 0 , key$max = keys.length; key$index < key$max; ++key$index) {
    key = keys[key$index];
    first?(first = false):(sb.impl.append_2(sb.data, ', ') , sb);
    $append_2(sb, escapeValue(key));
    sb.impl.append_2(sb.data, ':');
    $append_1(sb, $get_0(this, key));
  }
  sb.impl.append_2(sb.data, '}');
  return sb.impl.toString_0(sb.data);
}
;
_.jsObject = null;
function $clinit_JSONParser(){
  $clinit_JSONParser = nullMethod;
  typeMap = {'boolean':createBoolean, number:createNumber, string:createString, object:createObject, 'function':createObject, undefined:createUndefined};
}

function createBoolean(v){
  return $clinit_JSONBoolean() , v?TRUE:FALSE;
}

function createNumber(v){
  return new JSONNumber_0(v);
}

function createObject(o){
  if (!o) {
    return $clinit_JSONNull() , instance_1;
  }
  var v = o.valueOf?o.valueOf():o;
  if (v !== o) {
    var func = typeMap[typeof v];
    return func?func(v):throwUnknownTypeException(typeof v);
  }
   else if (o instanceof Array || o instanceof $wnd.Array) {
    return new JSONArray_1(o);
  }
   else {
    return new JSONObject_1(o);
  }
}

function createString(v){
  return new JSONString_0(v);
}

function createUndefined(){
  return null;
}

function throwUnknownTypeException(typeString){
  $clinit_JSONParser();
  throw new JSONException_0("Unexpected typeof result '" + typeString + "'; please report this bug to the GWT team");
}

var typeMap;
function JSONString_0(value){
  if (value == null) {
    throw new NullPointerException_0;
  }
  this.value = value;
}

function unwrap_4(value){
  return value.value;
}

defineSeed(138, 131, makeCastMap([Q$JSONString]), JSONString_0);
_.equals$ = function equals_4(other){
  if (!instanceOf(other, Q$JSONString)) {
    return false;
  }
  return $equals_0(this.value, dynamicCast(other, Q$JSONString).value);
}
;
_.getUnwrapper = function getUnwrapper_4(){
  return unwrap_4;
}
;
_.hashCode$ = function hashCode_6(){
  return getHashCode_0(this.value);
}
;
_.toString$ = function toString_14(){
  return escapeValue(this.value);
}
;
_.value = null;
function Array_0(){
}

function cloneSubrange(array, fromIndex, toIndex){
  var a, result;
  a = array;
  result = a.slice(fromIndex, toIndex);
  initValues(a.___clazz$, a.castableTypeMap$, a.queryId$, result);
  return result;
}

function createFrom(array, length_0){
  var a, result;
  a = array;
  result = createFromSeed(0, length_0);
  initValues(a.___clazz$, a.castableTypeMap$, a.queryId$, result);
  return result;
}

function createFromSeed(seedType, length_0){
  var array = new Array(length_0);
  if (seedType == 3) {
    for (var i_0 = 0; i_0 < length_0; ++i_0) {
      var value = new Object;
      value.l = value.m = value.h = 0;
      array[i_0] = value;
    }
  }
   else if (seedType > 0) {
    var value = [null, 0, false][seedType];
    for (var i_0 = 0; i_0 < length_0; ++i_0) {
      array[i_0] = value;
    }
  }
  return array;
}

function initDim(arrayClass, castableTypeMap, queryId, length_0, seedType){
  var result;
  result = createFromSeed(seedType, length_0);
  initValues(arrayClass, castableTypeMap, queryId, result);
  return result;
}

function initDims(arrayClasses, castableTypeMapExprs, queryIdExprs, dimExprs, count, seedType){
  return initDims_0(arrayClasses, castableTypeMapExprs, queryIdExprs, dimExprs, 0, count, seedType);
}

function initDims_0(arrayClasses, castableTypeMapExprs, queryIdExprs, dimExprs, index, count, seedType){
  var i_0, isLastDim, length_0, result;
  length_0 = dimExprs[index];
  isLastDim = index == count - 1;
  result = createFromSeed(isLastDim?seedType:0, length_0);
  initValues(arrayClasses[index], castableTypeMapExprs[index], queryIdExprs[index], result);
  if (!isLastDim) {
    ++index;
    for (i_0 = 0; i_0 < length_0; ++i_0) {
      result[i_0] = initDims_0(arrayClasses, castableTypeMapExprs, queryIdExprs, dimExprs, index, count, seedType);
    }
  }
  return result;
}

function initValues(arrayClass, castableTypeMap, queryId, array){
  $clinit_Array$ExpandoWrapper();
  wrapArray(array, expandoNames_0, expandoValues_0);
  array.___clazz$ = arrayClass;
  array.castableTypeMap$ = castableTypeMap;
  array.queryId$ = queryId;
  return array;
}

function setCheck(array, index, value){
  if (value != null) {
    if (array.queryId$ > 0 && !canCastUnsafe(value, array.queryId$)) {
      throw new ArrayStoreException_0;
    }
     else if (array.queryId$ == -1 && (value.typeMarker$ == nullMethod || canCast(value, 1))) {
      throw new ArrayStoreException_0;
    }
     else if (array.queryId$ < -1 && !(value.typeMarker$ != nullMethod && !canCast(value, 1)) && !canCastUnsafe(value, -array.queryId$)) {
      throw new ArrayStoreException_0;
    }
  }
  return array[index] = value;
}

defineSeed(139, 1, {}, Array_0);
_.queryId$ = 0;
function $clinit_Array$ExpandoWrapper(){
  $clinit_Array$ExpandoWrapper = nullMethod;
  expandoNames_0 = [];
  expandoValues_0 = [];
  initExpandos(new Array_0, expandoNames_0, expandoValues_0);
}

function initExpandos(protoType, expandoNames, expandoValues){
  var i_0 = 0, value;
  for (var name_0 in protoType) {
    if (value = protoType[name_0]) {
      expandoNames[i_0] = name_0;
      expandoValues[i_0] = value;
      ++i_0;
    }
  }
}

function wrapArray(array, expandoNames, expandoValues){
  $clinit_Array$ExpandoWrapper();
  for (var i_0 = 0, c = expandoNames.length; i_0 < c; ++i_0) {
    array[expandoNames[i_0]] = expandoValues[i_0];
  }
}

var expandoNames_0, expandoValues_0;
function canCast(src, dstId){
  return src.castableTypeMap$ && !!src.castableTypeMap$[dstId];
}

function canCastUnsafe(src, dstId){
  return src.castableTypeMap$ && src.castableTypeMap$[dstId];
}

function charToString(x){
  return String.fromCharCode(x);
}

function dynamicCast(src, dstId){
  if (src != null && !canCastUnsafe(src, dstId)) {
    throw new ClassCastException_0;
  }
  return src;
}

function dynamicCastJso(src){
  if (src != null && (src.typeMarker$ == nullMethod || canCast(src, 1))) {
    throw new ClassCastException_0;
  }
  return src;
}

function instanceOf(src, dstId){
  return src != null && canCast(src, dstId);
}

function instanceOfJso(src){
  return src != null && src.typeMarker$ != nullMethod && !canCast(src, 1);
}

function isJavaObject(src){
  return src.typeMarker$ == nullMethod || canCast(src, 1);
}

function maskUndefined(src){
  return src == null?null:src;
}

function round_int(x){
  return ~~Math.max(Math.min(x, 2147483647), -2147483648);
}

function throwClassCastExceptionUnlessNull(o){
  if (o != null) {
    throw new ClassCastException_0;
  }
  return null;
}

function com_google_gwt_animation_client_AnimationScheduler(){
  switch (permutationId) {
    case 0:
      return new AnimationSchedulerImplMozilla_0;
    case 5:
      return new AnimationSchedulerImplWebkit_0;
  }
  return new AnimationSchedulerImplTimer_0;
}

function com_google_gwt_core_client_impl_StackTraceCreator_Collector(){
  switch (permutationId) {
    case 0:
      return new StackTraceCreator$CollectorMoz_0;
    case 4:
      return new StackTraceCreator$CollectorOpera_0;
    case 5:
      return new StackTraceCreator$CollectorChromeNoSourceMap_0;
  }
  return new StackTraceCreator$Collector_0;
}

function com_google_gwt_core_client_impl_StringBufferImpl(){
  switch (permutationId) {
    case 1:
    case 2:
    case 3:
      return new StringBufferImplArray_0;
  }
  return new StringBufferImplAppend_0;
}

function com_google_gwt_dom_client_DOMImpl(){
  switch (permutationId) {
    case 2:
      return new DOMImplIE8_0;
    case 3:
      return new DOMImplIE9_0;
    case 4:
      return new DOMImplOpera_0;
    case 5:
      return new DOMImplWebkit_0;
    case 1:
      return new DOMImplIE6_0;
  }
  return new DOMImplMozilla_0;
}

function com_google_gwt_user_client_impl_DOMImpl(){
  switch (permutationId) {
    case 2:
      return new DOMImplIE8_2;
    case 3:
      return new DOMImplIE9_2;
    case 1:
      return new DOMImplIE6_2;
    case 4:
      return new DOMImplOpera_2;
    case 5:
      return new DOMImplWebkit_2;
  }
  return new DOMImplMozilla_2;
}

function com_google_gwt_user_client_impl_HistoryImpl(){
  switch (permutationId) {
    case 5:
      return new HistoryImplSafari_0;
    case 4:
      return new HistoryImplTimer_0;
    case 0:
      return new HistoryImplMozilla_0;
    case 1:
      return new HistoryImplIE6_0;
  }
  return new HistoryImpl_0;
}

function com_google_gwt_user_client_impl_WindowImpl(){
  switch (permutationId) {
    case 0:
      return new WindowImplMozilla_0;
    case 4:
    case 5:
      return new WindowImpl_0;
  }
  return new WindowImplIE_0;
}

function com_google_gwt_user_client_impl_WindowImplIE_Resources(){
  if (permutationId == 1) {
    return new WindowImplIE_Resources_default_StaticClientBundleGenerator_0;
  }
  return new WindowImplIE_Resources_default_InlineClientBundleGenerator_0;
}

function com_google_gwt_user_client_ui_ScrollImpl(){
  switch (permutationId) {
    case 1:
    case 2:
    case 3:
      return new ScrollImpl$ScrollImplTrident_0;
  }
  return new ScrollImpl_0;
}

function com_google_gwt_user_client_ui_impl_PopupImpl(){
  switch (permutationId) {
    case 1:
      return new PopupImplIE6_0;
    case 0:
      return new PopupImplMozilla_0;
  }
  return new PopupImpl_0;
}

function com_google_gwt_useragent_client_UserAgentAsserter_UserAgentProperty(){
  switch (permutationId) {
    case 1:
      return new UserAgentAsserter_UserAgentPropertyImplIe6_0;
    case 2:
      return new UserAgentAsserter_UserAgentPropertyImplIe8_0;
    case 3:
      return new UserAgentAsserter_UserAgentPropertyImplIe9_0;
    case 4:
      return new UserAgentAsserter_UserAgentPropertyImplOpera_0;
    case 5:
      return new UserAgentAsserter_UserAgentPropertyImplSafari_0;
  }
  return new UserAgentAsserter_UserAgentPropertyImplGecko1_8_0;
}

var permutationId = -1;
function init(){
  !!$stats && onModuleStart('com.google.gwt.useragent.client.UserAgentAsserter');
  $onModuleLoad_1();
  !!$stats && onModuleStart('com.google.gwt.user.client.DocumentModeAsserter');
  $onModuleLoad_0();
  !!$stats && onModuleStart('com.google.gwt.logging.client.LogConfiguration');
  $onModuleLoad($clinit_LogConfiguration());
  !!$stats && onModuleStart('net.gnehzr.tnoodle.js.ScrambleJsEntryPoint');
  $onModuleLoad_2($clinit_ScrambleJsEntryPoint());
}

function caught_0(e){
  if (instanceOf(e, Q$Throwable)) {
    return e;
  }
  return new JavaScriptException_0(e);
}

function create_0(value){
  var a0, a1, a2;
  a0 = value & 4194303;
  a1 = ~~value >> 22 & 4194303;
  a2 = value < 0?1048575:0;
  return create0(a0, a1, a2);
}

function create_1(a){
  return create0(a.l, a.m, a.h);
}

function create0(l_0, m_0, h_0){
  return _ = new LongLibBase$LongEmul_0 , _.l = l_0 , _.m = m_0 , _.h = h_0 , _;
}

function divMod(a, b, computeRemainder){
  var aIsCopy, aIsMinValue, aIsNegative, bpower, c, negative;
  if (b.l == 0 && b.m == 0 && b.h == 0) {
    throw new ArithmeticException_0;
  }
  if (a.l == 0 && a.m == 0 && a.h == 0) {
    computeRemainder && (remainder_0 = create0(0, 0, 0));
    return create0(0, 0, 0);
  }
  if (b.h == 524288 && b.m == 0 && b.l == 0) {
    return divModByMinValue(a, computeRemainder);
  }
  negative = false;
  if (~~b.h >> 19 != 0) {
    b = neg(b);
    negative = true;
  }
  bpower = powerOfTwo(b);
  aIsNegative = false;
  aIsMinValue = false;
  aIsCopy = false;
  if (a.h == 524288 && a.m == 0 && a.l == 0) {
    aIsMinValue = true;
    aIsNegative = true;
    if (bpower == -1) {
      a = create_1(($clinit_LongLib$Const() , MAX_VALUE));
      aIsCopy = true;
      negative = !negative;
    }
     else {
      c = shr(a, bpower);
      negative && negate(c);
      computeRemainder && (remainder_0 = create0(0, 0, 0));
      return c;
    }
  }
   else if (~~a.h >> 19 != 0) {
    aIsNegative = true;
    a = neg(a);
    aIsCopy = true;
    negative = !negative;
  }
  if (bpower != -1) {
    return divModByShift(a, bpower, negative, aIsNegative, computeRemainder);
  }
  if (!gte_0(a, b)) {
    computeRemainder && (aIsNegative?(remainder_0 = neg(a)):(remainder_0 = create0(a.l, a.m, a.h)));
    return create0(0, 0, 0);
  }
  return divModHelper(aIsCopy?a:create0(a.l, a.m, a.h), b, negative, aIsNegative, aIsMinValue, computeRemainder);
}

function divModByMinValue(a, computeRemainder){
  if (a.h == 524288 && a.m == 0 && a.l == 0) {
    computeRemainder && (remainder_0 = create0(0, 0, 0));
    return create_1(($clinit_LongLib$Const() , ONE));
  }
  computeRemainder && (remainder_0 = create0(a.l, a.m, a.h));
  return create0(0, 0, 0);
}

function divModByShift(a, bpower, negative, aIsNegative, computeRemainder){
  var c;
  c = shr(a, bpower);
  negative && negate(c);
  if (computeRemainder) {
    a = maskRight(a, bpower);
    aIsNegative?(remainder_0 = neg(a)):(remainder_0 = create0(a.l, a.m, a.h));
  }
  return c;
}

function divModHelper(a, b, negative, aIsNegative, aIsMinValue, computeRemainder){
  var bshift, gte, quotient, shift, a1, a2, a0;
  shift = numberOfLeadingZeros(b) - numberOfLeadingZeros(a);
  bshift = shl(b, shift);
  quotient = create0(0, 0, 0);
  while (shift >= 0) {
    gte = trialSubtract(a, bshift);
    if (gte) {
      shift < 22?(quotient.l |= 1 << shift , undefined):shift < 44?(quotient.m |= 1 << shift - 22 , undefined):(quotient.h |= 1 << shift - 44 , undefined);
      if (a.l == 0 && a.m == 0 && a.h == 0) {
        break;
      }
    }
    a1 = bshift.m;
    a2 = bshift.h;
    a0 = bshift.l;
    bshift.h = ~~a2 >>> 1;
    bshift.m = ~~a1 >>> 1 | (a2 & 1) << 21;
    bshift.l = ~~a0 >>> 1 | (a1 & 1) << 21;
    --shift;
  }
  negative && negate(quotient);
  if (computeRemainder) {
    if (aIsNegative) {
      remainder_0 = neg(a);
      aIsMinValue && (remainder_0 = sub(remainder_0, ($clinit_LongLib$Const() , ONE)));
    }
     else {
      remainder_0 = create0(a.l, a.m, a.h);
    }
  }
  return quotient;
}

function maskRight(a, bits){
  var b0, b1, b2;
  if (bits <= 22) {
    b0 = a.l & (1 << bits) - 1;
    b1 = b2 = 0;
  }
   else if (bits <= 44) {
    b0 = a.l;
    b1 = a.m & (1 << bits - 22) - 1;
    b2 = 0;
  }
   else {
    b0 = a.l;
    b1 = a.m;
    b2 = a.h & (1 << bits - 44) - 1;
  }
  return create0(b0, b1, b2);
}

function negate(a){
  var neg0, neg1, neg2;
  neg0 = ~a.l + 1 & 4194303;
  neg1 = ~a.m + (neg0 == 0?1:0) & 4194303;
  neg2 = ~a.h + (neg0 == 0 && neg1 == 0?1:0) & 1048575;
  a.l = neg0;
  a.m = neg1;
  a.h = neg2;
}

function numberOfLeadingZeros(a){
  var b1, b2;
  b2 = numberOfLeadingZeros_0(a.h);
  if (b2 == 32) {
    b1 = numberOfLeadingZeros_0(a.m);
    return b1 == 32?numberOfLeadingZeros_0(a.l) + 32:b1 + 20 - 10;
  }
   else {
    return b2 - 12;
  }
}

function powerOfTwo(a){
  var h_0, l_0, m_0;
  l_0 = a.l;
  if ((l_0 & l_0 - 1) != 0) {
    return -1;
  }
  m_0 = a.m;
  if ((m_0 & m_0 - 1) != 0) {
    return -1;
  }
  h_0 = a.h;
  if ((h_0 & h_0 - 1) != 0) {
    return -1;
  }
  if (h_0 == 0 && m_0 == 0 && l_0 == 0) {
    return -1;
  }
  if (h_0 == 0 && m_0 == 0 && l_0 != 0) {
    return numberOfTrailingZeros(l_0);
  }
  if (h_0 == 0 && m_0 != 0 && l_0 == 0) {
    return numberOfTrailingZeros(m_0) + 22;
  }
  if (h_0 != 0 && m_0 == 0 && l_0 == 0) {
    return numberOfTrailingZeros(h_0) + 44;
  }
  return -1;
}

function toDoubleHelper(a){
  return a.l + a.m * 4194304 + a.h * 17592186044416;
}

function trialSubtract(a, b){
  var sum0, sum1, sum2;
  sum2 = a.h - b.h;
  if (sum2 < 0) {
    return false;
  }
  sum0 = a.l - b.l;
  sum1 = a.m - b.m + (~~sum0 >> 22);
  sum2 += ~~sum1 >> 22;
  if (sum2 < 0) {
    return false;
  }
  a.l = sum0 & 4194303;
  a.m = sum1 & 4194303;
  a.h = sum2 & 1048575;
  return true;
}

var remainder_0 = null;
function add(a, b){
  var sum0, sum1, sum2;
  sum0 = a.l + b.l;
  sum1 = a.m + b.m + (~~sum0 >> 22);
  sum2 = a.h + b.h + (~~sum1 >> 22);
  return create0(sum0 & 4194303, sum1 & 4194303, sum2 & 1048575);
}

function and(a, b){
  return create0(a.l & b.l, a.m & b.m, a.h & b.h);
}

function div_0(a, b){
  return divMod(a, b, false);
}

function eq(a, b){
  return a.l == b.l && a.m == b.m && a.h == b.h;
}

function fromDouble(value){
  var a0, a1, a2, negative, result;
  if (isNaN(value)) {
    return $clinit_LongLib$Const() , ZERO;
  }
  if (value < -9223372036854775808) {
    return $clinit_LongLib$Const() , MIN_VALUE;
  }
  if (value >= 9223372036854775807) {
    return $clinit_LongLib$Const() , MAX_VALUE;
  }
  negative = false;
  if (value < 0) {
    negative = true;
    value = -value;
  }
  a2 = 0;
  if (value >= 17592186044416) {
    a2 = round_int(value / 17592186044416);
    value -= a2 * 17592186044416;
  }
  a1 = 0;
  if (value >= 4194304) {
    a1 = round_int(value / 4194304);
    value -= a1 * 4194304;
  }
  a0 = round_int(value);
  result = create0(a0, a1, a2);
  negative && negate(result);
  return result;
}

function fromInt(value){
  var rebase, result;
  if (value > -129 && value < 128) {
    rebase = value + 128;
    boxedValues == null && (boxedValues = initDim(_3Lcom_google_gwt_lang_LongLibBase$LongEmul_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$LongLibBase$LongEmul, 256, 0));
    result = boxedValues[rebase];
    !result && (result = boxedValues[rebase] = create_0(value));
    return result;
  }
  return create_0(value);
}

function gte_0(a, b){
  var signa, signb;
  signa = ~~a.h >> 19;
  signb = ~~b.h >> 19;
  return signa == 0?signb != 0 || a.h > b.h || a.h == b.h && a.m > b.m || a.h == b.h && a.m == b.m && a.l >= b.l:!(signb == 0 || a.h < b.h || a.h == b.h && a.m < b.m || a.h == b.h && a.m == b.m && a.l < b.l);
}

function lt(a, b){
  return !gte_0(a, b);
}

function neg(a){
  var neg0, neg1, neg2;
  neg0 = ~a.l + 1 & 4194303;
  neg1 = ~a.m + (neg0 == 0?1:0) & 4194303;
  neg2 = ~a.h + (neg0 == 0 && neg1 == 0?1:0) & 1048575;
  return create0(neg0, neg1, neg2);
}

function or(a, b){
  return create0(a.l | b.l, a.m | b.m, a.h | b.h);
}

function shl(a, n){
  var res0, res1, res2;
  n &= 63;
  if (n < 22) {
    res0 = a.l << n;
    res1 = a.m << n | ~~a.l >> 22 - n;
    res2 = a.h << n | ~~a.m >> 22 - n;
  }
   else if (n < 44) {
    res0 = 0;
    res1 = a.l << n - 22;
    res2 = a.m << n - 22 | ~~a.l >> 44 - n;
  }
   else {
    res0 = 0;
    res1 = 0;
    res2 = a.l << n - 44;
  }
  return create0(res0 & 4194303, res1 & 4194303, res2 & 1048575);
}

function shr(a, n){
  var a2, negative, res0, res1, res2;
  n &= 63;
  a2 = a.h;
  negative = (a2 & 524288) != 0;
  negative && (a2 |= -1048576);
  if (n < 22) {
    res2 = ~~a2 >> n;
    res1 = ~~a.m >> n | a2 << 22 - n;
    res0 = ~~a.l >> n | a.m << 22 - n;
  }
   else if (n < 44) {
    res2 = negative?1048575:0;
    res1 = ~~a2 >> n - 22;
    res0 = ~~a.m >> n - 22 | a2 << 44 - n;
  }
   else {
    res2 = negative?1048575:0;
    res1 = negative?4194303:0;
    res0 = ~~a2 >> n - 44;
  }
  return create0(res0 & 4194303, res1 & 4194303, res2 & 1048575);
}

function shru(a, n){
  var a2, res0, res1, res2;
  n &= 63;
  a2 = a.h & 1048575;
  if (n < 22) {
    res2 = ~~a2 >>> n;
    res1 = ~~a.m >> n | a2 << 22 - n;
    res0 = ~~a.l >> n | a.m << 22 - n;
  }
   else if (n < 44) {
    res2 = 0;
    res1 = ~~a2 >>> n - 22;
    res0 = ~~a.m >> n - 22 | a.h << 44 - n;
  }
   else {
    res2 = 0;
    res1 = 0;
    res0 = ~~a2 >>> n - 44;
  }
  return create0(res0 & 4194303, res1 & 4194303, res2 & 1048575);
}

function sub(a, b){
  var sum0, sum1, sum2;
  sum0 = a.l - b.l;
  sum1 = a.m - b.m + (~~sum0 >> 22);
  sum2 = a.h - b.h + (~~sum1 >> 22);
  return create0(sum0 & 4194303, sum1 & 4194303, sum2 & 1048575);
}

function toDouble(a){
  if (eq(a, ($clinit_LongLib$Const() , MIN_VALUE))) {
    return -9223372036854775808;
  }
  if (!gte_0(a, ZERO)) {
    return -toDoubleHelper(neg(a));
  }
  return a.l + a.m * 4194304 + a.h * 17592186044416;
}

function toInt(a){
  return a.l | a.m << 22;
}

function xor(a, b){
  return create0(a.l ^ b.l, a.m ^ b.m, a.h ^ b.h);
}

var boxedValues = null;
function $clinit_LongLib$Const(){
  $clinit_LongLib$Const = nullMethod;
  MAX_VALUE = create0(4194303, 4194303, 524287);
  MIN_VALUE = create0(0, 0, 524288);
  ONE = fromInt(1);
  fromInt(2);
  ZERO = fromInt(0);
}

var MAX_VALUE, MIN_VALUE, ONE, ZERO;
function LongLibBase$LongEmul_0(){
}

defineSeed(149, 1, makeCastMap([Q$LongLibBase$LongEmul]), LongLibBase$LongEmul_0);
function onModuleStart(mainClassName){
  return $stats({moduleName:$moduleName, sessionId:$sessionId, subSystem:'startup', evtGroup:'moduleStartup', millis:(new Date).getTime(), type:'onModuleLoadStart', className:mainClassName});
}

function $getLevel(this$static){
  if (this$static.level) {
    return this$static.level;
  }
  return $clinit_Level() , ALL;
}

function $setFormatter(this$static, newFormatter){
  this$static.formatter = newFormatter;
}

function $setLevel(this$static, newLevel){
  this$static.level = newLevel;
}

defineSeed(154, 1, makeCastMap([Q$Handler]));
_.formatter = null;
_.level = null;
function ConsoleLogHandler_0(){
  $setFormatter(this, new TextLogFormatter_0(true));
  $setLevel(this, ($clinit_Level() , ALL));
}

defineSeed(153, 154, makeCastMap([Q$Handler]), ConsoleLogHandler_0);
_.publish = function publish(record){
  var msg;
  if (!(window.console != null && window.console.firebug == null && window.console.log != null && typeof window.console.log == 'function') || ($getLevel(this) , -2147483648) > record.level.intValue()) {
    return;
  }
  msg = this.formatter.format(record);
  window.console.log(msg);
}
;
function DevelopmentModeLogHandler_0(){
  $setFormatter(this, new TextLogFormatter_0(false));
  $setLevel(this, ($clinit_Level() , ALL));
}

defineSeed(155, 154, makeCastMap([Q$Handler]), DevelopmentModeLogHandler_0);
_.publish = function publish_0(record){
  return;
}
;
function FirebugLogHandler_0(){
  $setFormatter(this, new TextLogFormatter_0(true));
  $setLevel(this, ($clinit_Level() , ALL));
}

defineSeed(156, 154, makeCastMap([Q$Handler]), FirebugLogHandler_0);
_.publish = function publish_1(record){
  var msg, val;
  if (!(window.console && window.console.firebug) || ($getLevel(this) , -2147483648) > record.level.intValue()) {
    return;
  }
  msg = this.formatter.format(record);
  val = record.level.intValue();
  val <= ($clinit_Level() , 500)?(window.console.debug(msg) , undefined):val < 900?(window.console.info(msg) , undefined):val < 1000?(window.console.warn(msg) , undefined):(window.console.error(msg) , undefined);
}
;
function HasWidgetsLogHandler_0(container){
  this.widgetContainer = container;
  $setFormatter(this, new HtmlLogFormatter_0);
  $setLevel(this, ($clinit_Level() , ALL));
}

defineSeed(157, 154, makeCastMap([Q$Handler]), HasWidgetsLogHandler_0);
_.publish = function publish_2(record){
  var formatter, msg;
  if (($getLevel(this) , -2147483648) > record.level.intValue()) {
    return;
  }
  formatter = this.formatter;
  msg = formatter.format(record);
  instanceOf(formatter, Q$HtmlLogFormatter)?$add(this.widgetContainer, new HTML_0(msg)):$add(this.widgetContainer, new Label_1(msg));
}
;
_.widgetContainer = null;
defineSeed(160, 1, {});
function $getRecordInfo(event_0, newline){
  var date, s;
  date = new Date_2(event_0.millis);
  s = new StringBuilder_0;
  $append_5(s, $toString_3(date));
  s.impl.append_2(s.data, ' ');
  $append_5(s, event_0.loggerName);
  s.impl.append_2(s.data, newline);
  $append_5(s, event_0.level.getName());
  s.impl.append_2(s.data, ': ');
  return s.impl.toString_0(s.data);
}

function $getStackTraceAsString(e, newline, indent){
  var causedBy, currentCause, i_0, s, seenCauses, stackElems;
  if (!e) {
    return '';
  }
  s = new StringBuffer_1(newline);
  currentCause = e;
  causedBy = '';
  seenCauses = new HashSet_0;
  while (!!currentCause && !seenCauses.map.containsKey(currentCause)) {
    $add_7(seenCauses, currentCause);
    s.impl.append_2(s.data, causedBy);
    causedBy = newline + 'Caused by: ';
    $append_2(s, currentCause.___clazz$.typeName);
    $append_2(s, ': ' + currentCause.getMessage());
    stackElems = $getStackTrace(currentCause);
    if (stackElems != null) {
      for (i_0 = 0; i_0 < stackElems.length; ++i_0) {
        s.impl.append_2(s.data, newline + indent + 'at ');
        $append_2(s, $toString_0(stackElems[i_0]));
      }
    }
    currentCause = currentCause.cause;
  }
  return s.impl.toString_0(s.data);
}

defineSeed(159, 160, {});
function $getColor(logLevel){
  if (logLevel == ($clinit_Level() , 2147483647)) {
    return '#000';
  }
  if (logLevel >= 1000) {
    return '#F00';
  }
  if (logLevel >= 900) {
    return '#E56717';
  }
  if (logLevel >= 800) {
    return '#20b000';
  }
  if (logLevel >= 700) {
    return '#2B60DE';
  }
  if (logLevel >= 500) {
    return '#F0F';
  }
  if (logLevel >= 400) {
    return '#F0F';
  }
  if (logLevel >= 300) {
    return '#F0F';
  }
  return '#000';
}

function $getEscaped(text){
  text = $replaceAll(text, '<', '&lt;');
  text = $replaceAll(text, '>', '&gt;');
  text = $replaceAll(text, '__GWT_LOG_FORMATTER_BR__', '<br>');
  return text;
}

function $getHtmlPrefix(event_0){
  var prefix;
  prefix = new StringBuilder_0;
  prefix.impl.append_2(prefix.data, "<span style='color:");
  $append_5(prefix, $getColor(event_0.level.intValue()));
  prefix.impl.append_2(prefix.data, "'>");
  prefix.impl.append_2(prefix.data, '<code>');
  return prefix.impl.toString_0(prefix.data);
}

function HtmlLogFormatter_0(){
  this.showStackTraces = true;
}

defineSeed(158, 159, makeCastMap([Q$HtmlLogFormatter]), HtmlLogFormatter_0);
_.format = function format(event_0){
  var html;
  html = new StringBuilder_2($getHtmlPrefix(event_0));
  $append_5(html, $getHtmlPrefix(event_0));
  $append_5(html, $getRecordInfo(event_0, ' '));
  $append_5(html, $getEscaped(event_0.msg_0));
  this.showStackTraces && $append_5(html, $getEscaped($getStackTraceAsString(event_0.thrown, '__GWT_LOG_FORMATTER_BR__', '&nbsp;&nbsp;&nbsp;')));
  html.impl.append_2(html.data, '<\/code><\/span>');
  return html.impl.toString_0(html.data);
}
;
_.showStackTraces = false;
function $clinit_LogConfiguration(){
  $clinit_LogConfiguration = nullMethod;
  impl_2 = new LogConfiguration$LogConfigurationImplRegular_0;
}

function $onModuleLoad(){
  var log;
  $configureClientSideLogging(impl_2);
  if (!sUncaughtExceptionHandler) {
    log = ($clinit_Logger() , $getLoggerHelper(Lcom_google_gwt_logging_client_LogConfiguration_2_classLit.typeName));
    setUncaughtExceptionHandler(new LogConfiguration$1_0(log));
  }
}

var impl_2;
function $onUncaughtException(this$static, e){
  $log_1(this$static.val$log, ($clinit_Level() , SEVERE), e.getMessage(), e);
}

function LogConfiguration$1_0(val$log){
  this.val$log = val$log;
}

defineSeed(162, 1, {}, LogConfiguration$1_0);
_.val$log = null;
function $addHandlerIfNotNull(l_0, h_0){
  $addHandler_1(l_0.impl, h_0);
}

function $configureClientSideLogging(this$static){
  this$static.root = ($clinit_Logger() , $getLoggerHelper(''));
  this$static.root.impl.useParentHandlers = false;
  $setLevels(this$static.root);
  $setDefaultHandlers(this$static.root);
}

function $parseLevel(s){
  if (s == null) {
    return null;
  }
  if ($equals_0(s, ($clinit_Level() , 'OFF'))) {
    return OFF;
  }
   else if ($equals_0(s, 'SEVERE')) {
    return SEVERE;
  }
   else if ($equals_0(s, 'WARNING')) {
    return WARNING;
  }
   else if ($equals_0(s, 'INFO')) {
    return INFO;
  }
   else if ($equals_0(s, 'CONFIG')) {
    return CONFIG;
  }
   else if ($equals_0(s, 'FINE')) {
    return FINE;
  }
   else if ($equals_0(s, 'FINER')) {
    return FINER;
  }
   else if ($equals_0(s, 'FINEST')) {
    return FINEST;
  }
   else if ($equals_0(s, 'ALL')) {
    return ALL;
  }
  return null;
}

function $setDefaultHandlers(l_0){
  var console, dev, firebug, loggingWidget, remote, system;
  console = new ConsoleLogHandler_0;
  $addHandler_1(l_0.impl, console);
  dev = new DevelopmentModeLogHandler_0;
  $addHandler_1(l_0.impl, dev);
  firebug = new FirebugLogHandler_0;
  $addHandler_1(l_0.impl, firebug);
  system = new SystemLogHandler_0;
  $addHandler_1(l_0.impl, system);
  remote = new NullLogHandler_0;
  !!remote || $addHandler_1(l_0.impl, null);
  loggingWidget = new LoggingPopup_0;
  $addHandlerIfNotNull(l_0, new HasWidgetsLogHandler_0(loggingWidget));
}

function $setLevels(l_0){
  var paramLevel, paramsForName;
  paramLevel = $parseLevel((ensureListParameterMap() , paramsForName = dynamicCast(listParamMap.get('logLevel'), Q$List) , !paramsForName?null:dynamicCast(paramsForName.get_0(paramsForName.size_0() - 1), Q$String)));
  paramLevel?$setLevel_0(l_0.impl, paramLevel):$setLevel_1(l_0, ($clinit_Level() , INFO));
}

function LogConfiguration$LogConfigurationImplRegular_0(){
}

defineSeed(163, 1, {}, LogConfiguration$LogConfigurationImplRegular_0);
_.root = null;
function $replaceNode(node, newNode){
  var p_0 = node.parentNode;
  if (!p_0) {
    return;
  }
  p_0.insertBefore(newNode, node);
  p_0.removeChild(node);
}

function $setElement(this$static, elem){
  this$static.element = elem;
}

function $setPixelSize(this$static, width, height){
  width >= 0 && setStyleAttribute(this$static.element, 'width', width + 'px');
  height >= 0 && setStyleAttribute(this$static.element, 'height', height + 'px');
}

function $setVisible(this$static, visible){
  setVisible(this$static.element, visible);
}

function $sinkBitlessEvent(this$static, eventTypeName){
  sinkBitlessEvent(this$static.element, eventTypeName);
}

function setStyleName(elem, styleName){
  $clinit_DOM();
  elem['className'] = styleName;
}

function setVisible(elem, visible){
  elem.style.display = visible?'':'none';
  elem.setAttribute('aria-hidden', String(!visible));
}

defineSeed(169, 1, makeCastMap([Q$HasVisibility, Q$UIObject]));
_.toString$ = function toString_15(){
  if (!this.element) {
    return '(null handle)';
  }
  return $clinit_DOM() , $getString(this.element);
}
;
_.element = null;
function $addDomHandler(this$static, handler, type){
  var typeInt;
  typeInt = getTypeInt(type.name_0);
  typeInt == -1?$sinkBitlessEvent(this$static, type.name_0):this$static.eventsToSink == -1?sinkEvents(this$static.element, typeInt | ($clinit_DOM() , this$static.element.__eventBits || 0)):(this$static.eventsToSink |= typeInt);
  return $addHandler(!this$static.handlerManager?(this$static.handlerManager = new HandlerManager_0(this$static)):this$static.handlerManager, type, handler);
}

function $addHandler_0(this$static, handler, type){
  return $addHandler(!this$static.handlerManager?(this$static.handlerManager = new HandlerManager_0(this$static)):this$static.handlerManager, type, handler);
}

function $fireEvent_0(this$static, event_0){
  !!this$static.handlerManager && $fireEvent(this$static.handlerManager, event_0);
}

function $onAttach(this$static){
  var bitsToAdd;
  if (this$static.attached) {
    throw new IllegalStateException_1("Should only call onAttach when the widget is detached from the browser's document");
  }
  this$static.attached = true;
  $clinit_DOM();
  $setEventListener(this$static.element, this$static);
  bitsToAdd = this$static.eventsToSink;
  this$static.eventsToSink = -1;
  bitsToAdd > 0 && (this$static.eventsToSink == -1?sinkEvents(this$static.element, bitsToAdd | (this$static.element.__eventBits || 0)):(this$static.eventsToSink |= bitsToAdd));
  this$static.doAttachChildren();
  this$static.onLoad();
  fire(this$static, true);
}

function $onBrowserEvent(this$static, event_0){
  var related;
  switch ($clinit_DOM() , $eventGetTypeInt(($clinit_DOMImpl() , event_0).type)) {
    case 16:
    case 32:
      related = impl_0.eventGetRelatedTarget(event_0);
      if (!!related && $isOrHasChild(this$static.element, related)) {
        return;
      }

  }
  fireNativeEvent(event_0, this$static, this$static.element);
}

function $onDetach(this$static){
  if (!this$static.attached) {
    throw new IllegalStateException_1("Should only call onDetach when the widget is attached to the browser's document");
  }
  try {
    this$static.onUnload();
    fire(this$static, false);
  }
   finally {
    try {
      this$static.doDetachChildren();
    }
     finally {
      $clinit_DOM();
      this$static.element.__listener = null;
      this$static.attached = false;
    }
  }
}

function $removeFromParent(this$static){
  if (!this$static.parent_0) {
    $clinit_RootPanel();
    $contains_0(widgetsToDetach, this$static) && detachNow(this$static);
  }
   else if (this$static.parent_0) {
    this$static.parent_0.remove(this$static);
  }
   else if (this$static.parent_0) {
    throw new IllegalStateException_1("This widget's parent does not implement HasWidgets");
  }
}

function $replaceElement(this$static, elem){
  this$static.attached && ($clinit_DOM() , this$static.element.__listener = null , undefined);
  !!this$static.element && $replaceNode(this$static.element, elem);
  this$static.element = elem;
  this$static.attached && ($clinit_DOM() , $setEventListener(this$static.element, this$static));
}

function $setParent(this$static, parent_0){
  var oldParent;
  oldParent = this$static.parent_0;
  if (!parent_0) {
    try {
      !!oldParent && oldParent.attached && this$static.onDetach();
    }
     finally {
      this$static.parent_0 = null;
    }
  }
   else {
    if (oldParent) {
      throw new IllegalStateException_1('Cannot set a new parent without first clearing the old parent');
    }
    this$static.parent_0 = parent_0;
    parent_0.attached && this$static.onAttach();
  }
}

defineSeed(168, 169, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]));
_.doAttachChildren = function doAttachChildren(){
}
;
_.doDetachChildren = function doDetachChildren(){
}
;
_.fireEvent_0 = function fireEvent_0(event_0){
  $fireEvent_0(this, event_0);
}
;
_.onAttach = function onAttach(){
  $onAttach(this);
}
;
_.onBrowserEvent = function onBrowserEvent(event_0){
  $onBrowserEvent(this, event_0);
}
;
_.onDetach = function onDetach(){
  $onDetach(this);
}
;
_.onLoad = function onLoad(){
}
;
_.onUnload = function onUnload(){
}
;
_.attached = false;
_.eventsToSink = 0;
_.handlerManager = null;
_.parent_0 = null;
defineSeed(167, 168, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]));
_.doAttachChildren = function doAttachChildren_0(){
  tryCommand(this, ($clinit_AttachDetachException() , attachCommand));
}
;
_.doDetachChildren = function doDetachChildren_0(){
  tryCommand(this, ($clinit_AttachDetachException() , detachCommand));
}
;
function $remove(this$static, w){
  if (this$static.widget != w) {
    return false;
  }
  try {
    $setParent(w, null);
  }
   finally {
    $removeChild(this$static.getContainerElement(), w.element);
    this$static.widget = null;
  }
  return true;
}

function $setWidget(this$static, w){
  if (w == this$static.widget) {
    return;
  }
  !!w && $removeFromParent(w);
  !!this$static.widget && $remove(this$static, this$static.widget);
  this$static.widget = w;
  if (w) {
    $clinit_DOM();
    $appendChild(this$static.getContainerElement(), ($clinit_PotentialElement() , $resolve(this$static.widget.element)));
    $setParent(w, this$static);
  }
}

function SimplePanel_0(){
  SimplePanel_1.call(this, ($clinit_DOM() , $createDivElement($doc)));
}

function SimplePanel_1(elem){
  this.element = elem;
}

defineSeed(166, 167, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]));
_.getContainerElement = function getContainerElement(){
  return this.element;
}
;
_.iterator = function iterator_0(){
  return new SimplePanel$1_0(this);
}
;
_.remove = function remove_0(w){
  return $remove(this, w);
}
;
_.widget = null;
function $clinit_PopupPanel(){
  $clinit_PopupPanel = nullMethod;
  impl_3 = com_google_gwt_user_client_ui_impl_PopupImpl();
}

function $eventTargetsPopup(this$static, event_0){
  var target;
  target = ($clinit_DOMImpl() , impl_0).eventGetTarget(event_0);
  if (is_0(target)) {
    return $isOrHasChild(this$static.element, target);
  }
  return false;
}

function $hide(this$static){
  if (!this$static.showing) {
    return;
  }
  $setState(this$static.resizeAnimation, false, false);
  fire_0(this$static);
}

function $previewNativeEvent(this$static, event_0){
  var eventTargetsPopupOrPartner, nativeEvent, target, type;
  if (event_0.isCanceled || !this$static.previewAllNativeEvents && event_0.isConsumed) {
    this$static.modal && (event_0.isCanceled = true);
    return;
  }
  event_0.isFirstHandler && (event_0.nativeEvent , false) && (event_0.isCanceled = true);
  if (event_0.isCanceled) {
    return;
  }
  nativeEvent = event_0.nativeEvent;
  eventTargetsPopupOrPartner = $eventTargetsPopup(this$static, nativeEvent);
  eventTargetsPopupOrPartner && (event_0.isConsumed = true);
  this$static.modal && (event_0.isCanceled = true);
  type = ($clinit_DOM() , $eventGetTypeInt(($clinit_DOMImpl() , nativeEvent).type));
  switch (type) {
    case 512:
    case 256:
    case 128:
      {
        (nativeEvent.keyCode || 0) & 65535;
        (nativeEvent.shiftKey?1:0) | (nativeEvent.metaKey?8:0) | (nativeEvent.ctrlKey?2:0) | (nativeEvent.altKey?4:0);
        return;
      }

    case 4:
    case 1048576:
      if (sCaptureElem) {
        event_0.isConsumed = true;
        return;
      }

      if (!eventTargetsPopupOrPartner && this$static.autoHide) {
        $hide(this$static);
        return;
      }

      break;
    case 8:
    case 64:
    case 1:
    case 2:
    case 4194304:
      {
        if (sCaptureElem) {
          event_0.isConsumed = true;
          return;
        }
        break;
      }

    case 2048:
      {
        target = impl_0.eventGetTarget(nativeEvent);
        if (this$static.modal && !eventTargetsPopupOrPartner && !!target) {
          target.blur && target != $doc.body && target.blur();
          event_0.isCanceled = true;
          return;
        }
        break;
      }

  }
}

function $setPopupPosition(this$static, left, top_0){
  var elem;
  this$static.leftPosition = left;
  this$static.topPosition = top_0;
  left -= $getBodyOffsetLeft($doc);
  top_0 -= $getBodyOffsetTop($doc);
  elem = this$static.element;
  elem.style['left'] = left + ($clinit_Style$Unit() , 'px');
  elem.style['top'] = top_0 + 'px';
}

function $show(this$static){
  if (this$static.showing) {
    return;
  }
   else 
    this$static.attached && $removeFromParent(this$static);
  $setState(this$static.resizeAnimation, true, false);
}

function $updateHandlers(this$static){
  if (this$static.nativePreviewHandlerRegistration) {
    $removeHandler(this$static.nativePreviewHandlerRegistration.real);
    this$static.nativePreviewHandlerRegistration = null;
  }
  if (this$static.historyHandlerRegistration) {
    $removeHandler(this$static.historyHandlerRegistration.real);
    this$static.historyHandlerRegistration = null;
  }
  if (this$static.showing) {
    this$static.nativePreviewHandlerRegistration = addNativePreviewHandler(new PopupPanel$3_0(this$static));
    this$static.historyHandlerRegistration = addValueChangeHandler(new PopupPanel$4_0(this$static));
  }
}

defineSeed(165, 166, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]));
_.getContainerElement = function getContainerElement_0(){
  return impl_3.getContainerElement_0(getFirstChild(this.element));
}
;
_.onUnload = function onUnload_0(){
  this.showing && $setState(this.resizeAnimation, false, true);
}
;
_.autoHide = false;
_.autoHideOnHistoryEvents = false;
_.glass = null;
_.historyHandlerRegistration = null;
_.isGlassEnabled = false;
_.leftPosition = -1;
_.modal = false;
_.nativePreviewHandlerRegistration = null;
_.previewAllNativeEvents = false;
_.showing = false;
_.topPosition = -1;
var impl_3;
function $add(this$static, w){
  $add_3(this$static.logArea, w);
  $setScrollPosition(this$static.scrollPanel, this$static.scrollPanel.element.scrollHeight || 0);
}

function LoggingPopup_0(){
  $clinit_PopupPanel();
  var bottomBar, mainPanel, maxmin, titleBar;
  SimplePanel_0.call(this);
  this.glassResizer = new PopupPanel$1_0;
  this.resizeAnimation = new PopupPanel$ResizeAnimation_0(this);
  $appendChild(this.element, impl_3.createElement_1());
  $setPopupPosition(this, 0, 0);
  setStyleName(impl_3.getStyleElement(getFirstChild(this.element)), 'gwt-PopupPanel');
  setStyleName(impl_3.getContainerElement_0(($clinit_DOM() , $getFirstChildElement(this.element))), 'popupContent');
  this.autoHide = false;
  this.autoHideOnHistoryEvents = false;
  this.modal = false;
  mainPanel = new VerticalPanel_0;
  mainPanel.table['border'] = '1';
  mainPanel.element.style['backgroundColor'] = 'white';
  titleBar = new HTML_0('<center><b>Logging<\/b><\/center>');
  $add_3(mainPanel, titleBar);
  new LoggingPopup$WindowMoveHandler_0(this, titleBar);
  this.scrollPanel = new LoggingPopup$ScrollPanelWithMinSize_0;
  $add_3(mainPanel, this.scrollPanel);
  this.logArea = new VerticalPanel_0;
  $setWidget(this.scrollPanel, this.logArea);
  $setPixelSize_0(this.scrollPanel, 300, 200);
  bottomBar = new HorizontalPanel_0;
  $add_3(mainPanel, bottomBar);
  setStyleAttribute(bottomBar.element, 'width', '100%');
  $setVerticalAlignment(bottomBar, ($clinit_HasVerticalAlignment() , ALIGN_BOTTOM));
  maxmin = new Button_0;
  $add_2(bottomBar, maxmin);
  $addDomHandler(maxmin, new LoggingPopup$1_0(this, maxmin), ($clinit_ClickEvent() , $clinit_ClickEvent() , TYPE));
  this.resizeIcon = new HTML_0("<div style='font-size:200%; line-height:75%'>\u21F2<\/div>");
  $setAutoHorizontalAlignment(this.resizeIcon, ($clinit_HasHorizontalAlignment() , ALIGN_RIGHT));
  $add_2(bottomBar, this.resizeIcon);
  new LoggingPopup$WindowResizeHandler_0(this, this.resizeIcon);
  $setWidget(this, mainPanel);
  $show(this);
}

defineSeed(164, 165, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]), LoggingPopup_0);
_.logArea = null;
_.resizeIcon = null;
_.scrollPanel = null;
function $onClick(this$static){
  if ($equals_0($getInnerText(this$static.val$maxmin.element), 'Minimize')) {
    $setText(this$static.val$maxmin, 'Maximize');
    $setVisible(this$static.this$0.scrollPanel, false);
    $setVisible(this$static.this$0.resizeIcon, false);
  }
   else {
    $setVisible(this$static.this$0.scrollPanel, true);
    $setVisible(this$static.this$0.resizeIcon, true);
    $setText(this$static.val$maxmin, 'Minimize');
  }
}

function LoggingPopup$1_0(this$0, val$maxmin){
  this.this$0 = this$0;
  this.val$maxmin = val$maxmin;
}

defineSeed(170, 1, makeCastMap([Q$ClickHandler, Q$EventHandler]), LoggingPopup$1_0);
_.this$0 = null;
_.val$maxmin = null;
function LoggingPopup$MouseDragHandler_0(dragHandle){
  this.dragHandle = dragHandle;
  $addDomHandler(dragHandle, this, ($clinit_MouseDownEvent() , $clinit_MouseDownEvent() , TYPE_0));
  $addDomHandler(dragHandle, this, ($clinit_MouseUpEvent() , $clinit_MouseUpEvent() , TYPE_2));
  $addDomHandler(dragHandle, this, ($clinit_MouseMoveEvent() , $clinit_MouseMoveEvent() , TYPE_1));
}

defineSeed(171, 1, makeCastMap([Q$MouseDownHandler, Q$MouseMoveHandler, Q$MouseUpHandler, Q$EventHandler]));
_.onMouseDown = function onMouseDown(event_0){
  this.dragging = true;
  setCapture(this.dragHandle.element);
  this.dragStartX = $getClientX(event_0.nativeEvent);
  this.dragStartY = $getClientY(event_0.nativeEvent);
  $clinit_DOM();
  $preventDefault(currentEvent);
}
;
_.onMouseMove = function onMouseMove(event_0){
  if (this.dragging) {
    this.handleDrag($getClientX(event_0.nativeEvent) - this.dragStartX, $getClientY(event_0.nativeEvent) - this.dragStartY);
    this.dragStartX = $getClientX(event_0.nativeEvent);
    this.dragStartY = $getClientY(event_0.nativeEvent);
  }
}
;
_.onMouseUp = function onMouseUp(event_0){
  this.dragging = false;
  releaseCapture(this.dragHandle.element);
}
;
_.dragHandle = null;
_.dragStartX = 0;
_.dragStartY = 0;
_.dragging = false;
function $getMaximumHorizontalScrollPosition(this$static){
  return $getMaximumHorizontalScrollPosition_0((!impl_7 && (impl_7 = com_google_gwt_user_client_ui_ScrollImpl()) , impl_7), this$static.scrollableElem);
}

function $getMaximumVerticalScrollPosition(this$static){
  return (this$static.scrollableElem.scrollHeight || 0) - this$static.scrollableElem.clientHeight;
}

function $getMinimumHorizontalScrollPosition(this$static){
  return $getMinimumHorizontalScrollPosition_0((!impl_7 && (impl_7 = com_google_gwt_user_client_ui_ScrollImpl()) , impl_7), this$static.scrollableElem);
}

function $setHorizontalScrollPosition(this$static, position){
  $setScrollLeft(this$static.scrollableElem, position);
}

function $setScrollPosition(this$static, position){
  $setScrollTop(this$static.scrollableElem, position);
}

function $setTouchScrollingDisabled(this$static){
  var scroller, ua;
  if (this$static.touchScroller) {
    return false;
  }
  this$static.touchScroller = (scroller = (!isSupported && (isSupported = ($clinit_Boolean() , !impl_1 && (impl_1 = new TouchEvent$TouchSupportDetector_0) , impl_1.isSupported && !(ua = navigator.userAgent.toLowerCase() , /android ([3-9]+)\.([0-9]+)/.exec(ua) != null)?TRUE_0:FALSE_0)) , isSupported.value?new TouchScroller_0:null) , !!scroller && $setTargetWidget(scroller, this$static) , scroller);
  return !this$static.touchScroller;
}

function $setVerticalScrollPosition(this$static, position){
  $setScrollTop(this$static.scrollableElem, position);
}

defineSeed(173, 166, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]));
_.getContainerElement = function getContainerElement_1(){
  return this.containerElem;
}
;
_.onAttach = function onAttach_0(){
  $onAttach(this);
  setEventListener(this.scrollableElem, this);
}
;
_.onDetach = function onDetach_0(){
  setEventListener(this.scrollableElem, null);
  $onDetach(this);
}
;
_.containerElem = null;
_.scrollableElem = null;
_.touchScroller = null;
function $incrementPixelSize(this$static, width, height){
  $setPixelSize_0(this$static, this$static.scrollPanelWidth + width, this$static.scrollPanelHeight + height);
}

function $setPixelSize_0(this$static, width, height){
  $setPixelSize(this$static, this$static.scrollPanelWidth = width > 100?width:100, this$static.scrollPanelHeight = height > 100?height:100);
}

function LoggingPopup$ScrollPanelWithMinSize_0(){
  SimplePanel_0.call(this);
  this.scrollableElem = this.element;
  this.containerElem = $createDivElement($doc);
  $appendChild(this.scrollableElem, this.containerElem);
  this.scrollableElem.style['overflow'] = ($clinit_Style$Overflow() , 'auto');
  this.scrollableElem.style['position'] = ($clinit_Style$Position() , 'relative');
  this.containerElem.style['position'] = 'relative';
  this.scrollableElem.style['zoom'] = '1';
  this.containerElem.style['zoom'] = '1';
  $setTouchScrollingDisabled(this);
  (!impl_7 && (impl_7 = com_google_gwt_user_client_ui_ScrollImpl()) , impl_7).initialize(this.scrollableElem, this.containerElem);
}

defineSeed(172, 173, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]), LoggingPopup$ScrollPanelWithMinSize_0);
_.scrollPanelHeight = 0;
_.scrollPanelWidth = 0;
function LoggingPopup$WindowMoveHandler_0(this$0, dragHandle){
  this.this$0 = this$0;
  LoggingPopup$MouseDragHandler_0.call(this, dragHandle);
}

defineSeed(174, 171, makeCastMap([Q$MouseDownHandler, Q$MouseMoveHandler, Q$MouseUpHandler, Q$EventHandler]), LoggingPopup$WindowMoveHandler_0);
_.handleDrag = function handleDrag(absX, absY){
  var moveTarget;
  moveTarget = this.this$0;
  $setWidgetPosition(($clinit_RootPanel() , get()), moveTarget, getAbsoluteLeft_6(moveTarget.element) + absX, getAbsoluteTop_6(moveTarget.element) + absY);
}
;
_.this$0 = null;
function LoggingPopup$WindowResizeHandler_0(this$0, dragHandle){
  this.this$0 = this$0;
  LoggingPopup$MouseDragHandler_0.call(this, dragHandle);
}

defineSeed(175, 171, makeCastMap([Q$MouseDownHandler, Q$MouseMoveHandler, Q$MouseUpHandler, Q$EventHandler]), LoggingPopup$WindowResizeHandler_0);
_.handleDrag = function handleDrag_0(absX, absY){
  $incrementPixelSize(this.this$0.scrollPanel, absX, absY);
}
;
_.this$0 = null;
function NullLogHandler_0(){
}

defineSeed(176, 154, makeCastMap([Q$Handler]), NullLogHandler_0);
_.publish = function publish_3(record){
}
;
function SystemLogHandler_0(){
  $setFormatter(this, new TextLogFormatter_0(true));
  $setLevel(this, ($clinit_Level() , ALL));
}

defineSeed(177, 154, makeCastMap([Q$Handler]), SystemLogHandler_0);
_.publish = function publish_4(record){
  return;
}
;
function TextLogFormatter_0(showStackTraces){
  this.showStackTraces = showStackTraces;
}

defineSeed(178, 159, {}, TextLogFormatter_0);
_.format = function format_0(event_0){
  var message;
  message = new StringBuilder_0;
  $append_5(message, $getRecordInfo(event_0, '\n'));
  $append_5(message, event_0.msg_0);
  this.showStackTraces && $append_5(message, $getStackTraceAsString(event_0.thrown, '\n', '\t'));
  return message.impl.toString_0(message.data);
}
;
_.showStackTraces = false;
function $parse(name_0){
  if ($equalsIgnoreCase(name_0, 'ALL')) {
    return $clinit_Level() , ALL;
  }
   else if ($equalsIgnoreCase(name_0, 'CONFIG')) {
    return $clinit_Level() , CONFIG;
  }
   else if ($equalsIgnoreCase(name_0, 'FINE')) {
    return $clinit_Level() , FINE;
  }
   else if ($equalsIgnoreCase(name_0, 'FINER')) {
    return $clinit_Level() , FINER;
  }
   else if ($equalsIgnoreCase(name_0, 'FINEST')) {
    return $clinit_Level() , FINEST;
  }
   else if ($equalsIgnoreCase(name_0, 'INFO')) {
    return $clinit_Level() , INFO;
  }
   else if ($equalsIgnoreCase(name_0, 'OFF')) {
    return $clinit_Level() , OFF;
  }
   else if ($equalsIgnoreCase(name_0, 'SEVERE')) {
    return $clinit_Level() , SEVERE;
  }
   else if ($equalsIgnoreCase(name_0, 'WARNING')) {
    return $clinit_Level() , WARNING;
  }
  return null;
}

function $addHandler_1(this$static, handler){
  $add_6(this$static.handlers, handler);
}

function $fine(this$static, msg){
  $log(this$static, ($clinit_Level() , FINE), msg, null);
}

function $getEffectiveLevel(this$static){
  var effectiveLevel, logger;
  if (this$static.level) {
    return this$static.level;
  }
  logger = this$static.parent_0;
  while (logger) {
    effectiveLevel = logger.impl.level;
    if (effectiveLevel) {
      return effectiveLevel;
    }
    logger = logger.impl.parent_0;
  }
  return $clinit_Level() , INFO;
}

function $getHandlers(this$static){
  return dynamicCast($toArray_0(this$static.handlers, initDim(_3Ljava_util_logging_Handler_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$Handler_$1]), Q$Handler, this$static.handlers.size, 0)), Q$Handler_$1);
}

function $getLoggerHelper(name_0){
  var logger, manager, newLogger;
  manager = (!singleton_0 && (singleton_0 = new LogManager_0) , singleton_0);
  logger = dynamicCast(manager.loggerList.get(name_0), Q$Logger);
  if (!logger) {
    newLogger = new LoggerWithExposedConstructor_0(name_0);
    $addLogger(manager, newLogger);
    return newLogger;
  }
  return logger;
}

function $isLoggable(this$static, messageLevel){
  return $getEffectiveLevel(this$static).intValue() <= messageLevel.intValue();
}

function $log(this$static, level, msg, thrown){
  var record;
  if ($getEffectiveLevel(this$static).intValue() <= level.intValue()) {
    record = new LogRecord_0(level, msg);
    record.thrown = thrown;
    $setLoggerName(record, this$static.name_0);
    $log_0(this$static, record);
  }
}

function $log_0(this$static, record){
  var handler, handler$array, handler$index, handler$max, logger;
  if ($isLoggable(this$static, record.level)) {
    for (handler$array = dynamicCast($toArray_0(this$static.handlers, initDim(_3Ljava_util_logging_Handler_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$Handler_$1]), Q$Handler, this$static.handlers.size, 0)), Q$Handler_$1) , handler$index = 0 , handler$max = handler$array.length; handler$index < handler$max; ++handler$index) {
      handler = handler$array[handler$index];
      handler.publish(record);
    }
    logger = this$static.useParentHandlers?this$static.parent_0:null;
    while (logger) {
      for (handler$array = $getHandlers(logger.impl) , handler$index = 0 , handler$max = handler$array.length; handler$index < handler$max; ++handler$index) {
        handler = handler$array[handler$index];
        handler.publish(record);
      }
      logger = logger.impl.useParentHandlers?logger.impl.parent_0:null;
    }
  }
}

function $setLevel_0(this$static, newLevel){
  this$static.level = newLevel;
}

function $setName(this$static, newName){
  this$static.name_0 = newName;
}

function $setParent_0(this$static, newParent){
  !!newParent && (this$static.parent_0 = newParent);
}

function $severe(this$static, msg){
  $log(this$static, ($clinit_Level() , SEVERE), msg, null);
}

function LoggerImplRegular_0(){
  this.useParentHandlers = true;
  this.handlers = new ArrayList_0;
}

defineSeed(180, 1, {}, LoggerImplRegular_0);
_.handlers = null;
_.level = null;
_.name_0 = null;
_.parent_0 = null;
_.useParentHandlers = false;
function $clinit_Logger(){
  $clinit_Logger = nullMethod;
  new LoggerImplRegular_0;
}

function $fine_0(this$static, msg){
  $fine(this$static.impl, msg);
}

function $log_1(this$static, level, msg, thrown){
  $log(this$static.impl, level, msg, thrown);
}

function $log_2(this$static, record){
  $log_0(this$static.impl, record);
}

function $setLevel_1(this$static, newLevel){
  $setLevel_0(this$static.impl, newLevel);
}

function $severe_0(this$static, msg){
  $severe(this$static.impl, msg);
}

function Logger_0(name_0){
  $clinit_Logger();
  this.impl = new LoggerImplRegular_0;
  $setName(this.impl, name_0);
}

defineSeed(182, 1, makeCastMap([Q$Logger]), Logger_0);
_.impl = null;
function LoggerWithExposedConstructor_0(name_0){
  $clinit_Logger();
  Logger_0.call(this, name_0);
}

defineSeed(181, 182, makeCastMap([Q$Logger]), LoggerWithExposedConstructor_0);
function SafeUriString_0(uri){
  if (uri == null) {
    throw new NullPointerException_1('uri is null');
  }
  this.uri = uri;
}

defineSeed(184, 1, makeCastMap([Q$SafeUri, Q$SafeUriString]), SafeUriString_0);
_.equals$ = function equals_5(obj){
  if (!instanceOf(obj, Q$SafeUri)) {
    return false;
  }
  return $equals_0(this.uri, dynamicCast(dynamicCast(obj, Q$SafeUri), Q$SafeUriString).uri);
}
;
_.hashCode$ = function hashCode_7(){
  return getHashCode_0(this.uri);
}
;
_.uri = null;
function $clinit_UriUtils(){
  $clinit_UriUtils = nullMethod;
  new RegExp('%5B', 'g');
  new RegExp('%5D', 'g');
}

function $calcNewVelocity(initialVelocity, decelFactor, oldVelocity, minDecel){
  var maxVelocityX, minVelocityX, newVelocity;
  newVelocity = initialVelocity * decelFactor;
  if (oldVelocity >= 0) {
    maxVelocityX = 0 > oldVelocity - minDecel?0:oldVelocity - minDecel;
    newVelocity = newVelocity < maxVelocityX?newVelocity:maxVelocityX;
  }
   else {
    minVelocityX = 0 < oldVelocity + minDecel?0:oldVelocity + minDecel;
    newVelocity = newVelocity > minVelocityX?newVelocity:minVelocityX;
  }
  return newVelocity;
}

function $updateState(state){
  var decelFactor, dist, elapsedMillis, ellapsedMillis, initialVelocity, minDecel, newVelocity, newVelocityX, newVelocityY, oldVelocity, position, totalEllapsedMillis;
  ellapsedMillis = state.elapsedMillis;
  totalEllapsedMillis = state.cumulativeElapsedMillis;
  initialVelocity = state.initialVelocity;
  oldVelocity = state.velocity;
  decelFactor = Math.pow(0.9993, totalEllapsedMillis);
  minDecel = ellapsedMillis * 5.0E-4;
  newVelocityX = $calcNewVelocity(initialVelocity.x, decelFactor, oldVelocity.x, minDecel);
  newVelocityY = $calcNewVelocity(initialVelocity.y, decelFactor, oldVelocity.y, minDecel);
  newVelocity = new Point_0(newVelocityX, newVelocityY);
  state.velocity = newVelocity;
  elapsedMillis = state.elapsedMillis;
  dist = $mult(newVelocity, new Point_0(elapsedMillis, elapsedMillis));
  position = state.position_0;
  $setPosition(state, new Point_0(position.x + dist.x, position.y + dist.y));
  if (abs(newVelocity.x) < 0.02 && abs(newVelocity.y) < 0.02) {
    return false;
  }
  return true;
}

function DefaultMomentum_0(){
}

defineSeed(186, 1, {}, DefaultMomentum_0);
function $setCumulativeElapsedMillis(this$static, cumulativeElapsedMillis){
  this$static.cumulativeElapsedMillis = cumulativeElapsedMillis;
}

function $setElapsedMillis(this$static, elapsedMillis){
  this$static.elapsedMillis = elapsedMillis;
}

function $setPosition(this$static, position){
  this$static.position_0 = position;
}

function Momentum$State_0(initialPosition, initialVelocity){
  this.initialVelocity = initialVelocity;
  this.position_0 = new Point_1(initialPosition);
  this.velocity = new Point_1(initialVelocity);
}

defineSeed(187, 1, {}, Momentum$State_0);
_.cumulativeElapsedMillis = 0;
_.elapsedMillis = 0;
_.initialVelocity = null;
_.position_0 = null;
_.velocity = null;
function $minus(this$static, c){
  return new Point_0(this$static.x - c.x, this$static.y - c.y);
}

function $mult(this$static, c){
  return new Point_0(this$static.x * c.x, this$static.y * c.y);
}

function $plus(this$static, c){
  return new Point_0(this$static.x + c.x, this$static.y + c.y);
}

function Point_0(x, y){
  this.x = x;
  this.y = y;
}

function Point_1(c){
  Point_0.call(this, c.x, c.y);
}

defineSeed(188, 1, makeCastMap([Q$Point]), Point_0, Point_1);
_.equals$ = function equals_6(obj){
  var c;
  if (!instanceOf(obj, Q$Point)) {
    return false;
  }
  c = dynamicCast(obj, Q$Point);
  return this.x == c.x && this.y == c.y;
}
;
_.hashCode$ = function hashCode_8(){
  return round_int(this.x) ^ round_int(this.y);
}
;
_.toString$ = function toString_16(){
  return 'Point(' + this.x + ',' + this.y + ')';
}
;
_.x = 0;
_.y = 0;
function $calculateEndVelocity(from, to){
  var dist, time;
  time = to.time - from.time;
  if (time <= 0) {
    return null;
  }
  dist = $minus(from.point, to.point);
  return new Point_0(dist.x / time, dist.y / time);
}

function $cancelAll(this$static){
  this$static.touching = false;
  this$static.dragging = false;
  this$static.momentumCommand = null;
}

function $getTouchFromEvent(event_0){
  var touches;
  touches = $getTouches(event_0.nativeEvent);
  return touches.length > 0?touches[0]:null;
}

function $getWidgetScrollPosition(this$static){
  return new Point_0($getScrollLeft(this$static.widget.scrollableElem), this$static.widget.scrollableElem.scrollTop || 0);
}

function $hitTest(point1, point2){
  var absDiffX, absDiffY, diff;
  diff = new Point_0(point1.x - point2.x, point1.y - point2.y);
  absDiffX = abs(diff.x);
  absDiffY = abs(diff.y);
  return absDiffX <= 25 && absDiffY <= 25;
}

function $isClickScrollTriggeringTouch(this$static, clickPoint){
  if (this$static.recentScrollTriggeringTouchPosition.point) {
    return $hitTest(clickPoint, this$static.recentScrollTriggeringTouchPosition.point);
  }
  return false;
}

function $isClickTouchPositionDuringMomentum(this$static, clickPoint){
  var currentTime, point, point$iterator, same;
  currentTime = currentTimeMillis();
  same = false;
  for (point$iterator = new AbstractList$IteratorImpl_0(this$static.touchPositionsDuringMomentum); point$iterator.i < point$iterator.this$0_0.size_0();) {
    point = dynamicCast($next_1(point$iterator), Q$TouchScroller$TemporalPoint);
    if (currentTime - point.time <= 2500 && $hitTest(clickPoint, point.point)) {
      same = true;
      break;
    }
  }
  return same;
}

function $onDragEnd(this$static){
  var endVelocity;
  if (!this$static.momentum) {
    return;
  }
  endVelocity = $calculateEndVelocity(this$static.recentTouchPosition, this$static.lastTouchPosition);
  if (endVelocity) {
    this$static.momentumCommand = new TouchScroller$MomentumCommand_0(this$static, endVelocity);
    scheduleFixedDelayImpl(($clinit_SchedulerImpl() , this$static.momentumCommand), 16);
  }
}

function $onTouchEnd(this$static){
  if (!this$static.touching) {
    return;
  }
  this$static.touching = false;
  if (this$static.dragging) {
    this$static.dragging = false;
    $onDragEnd(this$static);
  }
}

function $onTouchMove(this$static, event_0){
  var absDiffX, absDiffY, diff, hMax, hMin, hPosition, touch, touchPoint, touchTime, trackingTime, vMax, vPosition, diff_0, curScrollPosition;
  if (!this$static.touching) {
    return;
  }
  touch = $getTouchFromEvent(event_0);
  touchPoint = new Point_0(($clinit_DOMImpl() , touch).pageX, touch.pageY);
  touchTime = currentTimeMillis();
  $setTemporalPoint(this$static.lastTouchPosition, touchPoint, touchTime);
  if (!this$static.dragging) {
    diff = $minus(touchPoint, this$static.startTouchPosition);
    absDiffX = abs(diff.x);
    absDiffY = abs(diff.y);
    if (absDiffX > 5 || absDiffY > 5) {
      $setTemporalPoint(this$static.recentScrollTriggeringTouchPosition, this$static.recentTouchPosition.point, this$static.recentTouchPosition.time);
      if (absDiffX > absDiffY) {
        hPosition = $getScrollLeft(this$static.widget.scrollableElem);
        hMin = $getMinimumHorizontalScrollPosition(this$static.widget);
        hMax = $getMaximumHorizontalScrollPosition(this$static.widget);
        if (diff.x < 0 && hMax <= hPosition) {
          $cancelAll(this$static);
          return;
        }
         else if (diff.x > 0 && hMin >= hPosition) {
          $cancelAll(this$static);
          return;
        }
      }
       else {
        vPosition = this$static.widget.scrollableElem.scrollTop || 0;
        vMax = $getMaximumVerticalScrollPosition(this$static.widget);
        if (diff.y < 0 && vMax <= vPosition) {
          $cancelAll(this$static);
          return;
        }
         else if (diff.y > 0 && 0 >= vPosition) {
          $cancelAll(this$static);
          return;
        }
      }
      this$static.dragging = true;
    }
  }
  $preventDefault(event_0.nativeEvent);
  if (this$static.dragging) {
    diff_0 = $minus(this$static.startTouchPosition, this$static.lastTouchPosition.point);
    curScrollPosition = $plus(this$static.startScrollPosition, diff_0);
    $setHorizontalScrollPosition(this$static.widget, round_int(curScrollPosition.x));
    $setVerticalScrollPosition(this$static.widget, round_int(curScrollPosition.y));
    trackingTime = touchTime - this$static.recentTouchPosition.time;
    if (trackingTime > 200 && !!this$static.recentTouchPositionOnDeck) {
      $setTemporalPoint(this$static.recentTouchPosition, this$static.recentTouchPositionOnDeck.point, this$static.recentTouchPositionOnDeck.time);
      this$static.recentTouchPositionOnDeck = null;
    }
     else 
      trackingTime > 100 && !this$static.recentTouchPositionOnDeck && (this$static.recentTouchPositionOnDeck = new TouchScroller$TemporalPoint_1(touchPoint, touchTime));
  }
}

function $onTouchStart(this$static, event_0){
  var startTouchTime, touch;
  $setTemporalPoint(this$static.recentScrollTriggeringTouchPosition, null, 0);
  if (this$static.touching) {
    return;
  }
  touch = $getTouchFromEvent(event_0);
  this$static.startTouchPosition = new Point_0(($clinit_DOMImpl() , touch).pageX, touch.pageY);
  startTouchTime = currentTimeMillis();
  $setTemporalPoint(this$static.recentTouchPosition, this$static.startTouchPosition, startTouchTime);
  $setTemporalPoint(this$static.lastTouchPosition, this$static.startTouchPosition, startTouchTime);
  this$static.recentTouchPositionOnDeck = null;
  if (this$static.momentumCommand) {
    $add_6(this$static.touchPositionsDuringMomentum, new TouchScroller$TemporalPoint_1(this$static.startTouchPosition, startTouchTime));
    scheduleFixedDelayImpl(($clinit_SchedulerImpl() , this$static.momentumTouchRemovalCommand), 2500);
  }
  this$static.startScrollPosition = new Point_0($getScrollLeft(this$static.widget.scrollableElem), this$static.widget.scrollableElem.scrollTop || 0);
  $cancelAll(this$static);
  this$static.touching = true;
}

function $removeAttachHandler(this$static){
  if (this$static.attachHandlerReg) {
    $removeHandler(this$static.attachHandlerReg.real);
    this$static.attachHandlerReg = null;
  }
}

function $removeBustClickHandler(this$static){
  if (this$static.bustClickHandlerReg) {
    $removeHandler(this$static.bustClickHandlerReg.real);
    this$static.bustClickHandlerReg = null;
  }
}

function $setMomentum(this$static, momentum){
  this$static.momentum = momentum;
  !momentum && (this$static.momentumCommand = null);
}

function $setTargetWidget(this$static, widget){
  var reg, reg$iterator;
  if (this$static.widget == widget) {
    return;
  }
  $cancelAll(this$static);
  for (reg$iterator = new AbstractList$IteratorImpl_0(this$static.handlerRegs); reg$iterator.i < reg$iterator.this$0_0.size_0();) {
    reg = dynamicCast($next_1(reg$iterator), Q$HandlerRegistration);
    $removeHandler(reg.real);
  }
  $clear(this$static.handlerRegs);
  $removeAttachHandler(this$static);
  $removeBustClickHandler(this$static);
  this$static.widget = widget;
  if (widget) {
    widget.attached && ($removeBustClickHandler(this$static) , this$static.bustClickHandlerReg = addNativePreviewHandler(new TouchScroller$6_0(this$static)));
    this$static.attachHandlerReg = $addHandler_0(widget, new TouchScroller$1_0(this$static), (!TYPE_7 && (TYPE_7 = new GwtEvent$Type_0) , TYPE_7));
    $add_6(this$static.handlerRegs, $addDomHandler(widget, new TouchScroller$2_0(this$static), ($clinit_TouchStartEvent() , $clinit_TouchStartEvent() , TYPE_6)));
    $add_6(this$static.handlerRegs, $addDomHandler(widget, new TouchScroller$3_0(this$static), ($clinit_TouchMoveEvent() , $clinit_TouchMoveEvent() , TYPE_5)));
    $add_6(this$static.handlerRegs, $addDomHandler(widget, new TouchScroller$4_0(this$static), ($clinit_TouchEndEvent() , $clinit_TouchEndEvent() , TYPE_4)));
    $add_6(this$static.handlerRegs, $addDomHandler(widget, new TouchScroller$5_0(this$static), ($clinit_TouchCancelEvent() , $clinit_TouchCancelEvent() , TYPE_3)));
  }
}

function $setWidgetScrollPosition(this$static, position){
  $setHorizontalScrollPosition(this$static.widget, round_int(position.x));
  $setVerticalScrollPosition(this$static.widget, round_int(position.y));
}

function $setupBustClickHandler(this$static){
  $removeBustClickHandler(this$static);
  this$static.bustClickHandlerReg = addNativePreviewHandler(new TouchScroller$6_0(this$static));
}

function TouchScroller_0(){
  this.handlerRegs = new ArrayList_0;
  this.lastTouchPosition = new TouchScroller$TemporalPoint_0;
  this.recentTouchPosition = new TouchScroller$TemporalPoint_0;
  this.recentScrollTriggeringTouchPosition = new TouchScroller$TemporalPoint_0;
  this.touchPositionsDuringMomentum = new ArrayList_0;
  this.momentumTouchRemovalCommand = new TouchScroller$MomentumTouchRemovalCommand_0(this);
  $setMomentum(this, new DefaultMomentum_0);
}

defineSeed(189, 1, {}, TouchScroller_0);
_.attachHandlerReg = null;
_.bustClickHandlerReg = null;
_.dragging = false;
_.momentum = null;
_.momentumCommand = null;
_.recentTouchPositionOnDeck = null;
_.startScrollPosition = null;
_.startTouchPosition = null;
_.touching = false;
_.widget = null;
var isSupported = null;
function TouchScroller$1_0(this$0){
  this.this$0 = this$0;
}

defineSeed(190, 1, makeCastMap([Q$AttachEvent$Handler, Q$EventHandler]), TouchScroller$1_0);
_.this$0 = null;
function TouchScroller$2_0(this$0){
  this.this$0 = this$0;
}

defineSeed(191, 1, makeCastMap([Q$TouchStartHandler, Q$EventHandler]), TouchScroller$2_0);
_.this$0 = null;
function TouchScroller$3_0(this$0){
  this.this$0 = this$0;
}

defineSeed(192, 1, makeCastMap([Q$TouchMoveHandler, Q$EventHandler]), TouchScroller$3_0);
_.this$0 = null;
function TouchScroller$4_0(this$0){
  this.this$0 = this$0;
}

defineSeed(193, 1, makeCastMap([Q$TouchEndHandler, Q$EventHandler, Q$TouchScroller$4]), TouchScroller$4_0);
_.this$0 = null;
function TouchScroller$5_0(this$0){
  this.this$0 = this$0;
}

defineSeed(194, 1, makeCastMap([Q$TouchCancelHandler, Q$EventHandler, Q$TouchScroller$5]), TouchScroller$5_0);
_.this$0 = null;
function TouchScroller$6_0(this$0){
  this.this$0 = this$0;
}

defineSeed(195, 1, makeCastMap([Q$EventHandler, Q$Event$NativePreviewHandler]), TouchScroller$6_0);
_.onPreviewNativeEvent = function onPreviewNativeEvent(event_0){
  var clickPoint;
  if (1 == $getTypeInt(event_0.nativeEvent)) {
    clickPoint = new Point_0($getClientX(event_0.nativeEvent), $getClientY(event_0.nativeEvent));
    if ($isClickScrollTriggeringTouch(this.this$0, clickPoint) || $isClickTouchPositionDuringMomentum(this.this$0, clickPoint)) {
      event_0.isCanceled = true;
      $stopPropagation(event_0.nativeEvent);
      $preventDefault(event_0.nativeEvent);
    }
  }
}
;
_.this$0 = null;
function $finish(this$static){
  if (this$static.windowResizeHandler) {
    $removeHandler(this$static.windowResizeHandler.real);
    this$static.windowResizeHandler = null;
  }
  this$static == this$static.this$0.momentumCommand && (this$static.this$0.momentumCommand = null);
}

function TouchScroller$MomentumCommand_0(this$0, endVelocity){
  this.this$0 = this$0;
  this.duration = new Duration_0;
  this.initialPosition = $getWidgetScrollPosition(this.this$0);
  this.state = new Momentum$State_0(this.initialPosition, endVelocity);
  this.windowResizeHandler = addResizeHandler(new TouchScroller$MomentumCommand$1_0(this));
}

defineSeed(196, 1, {}, TouchScroller$MomentumCommand_0);
_.execute = function execute_2(){
  var cumulativeElapsedMillis, hMax, hMin, hPos, notDone, vMax, vPos;
  if (this != this.this$0.momentumCommand) {
    $finish(this);
    return false;
  }
  cumulativeElapsedMillis = $elapsedMillis(this.duration);
  $setElapsedMillis(this.state, cumulativeElapsedMillis - this.lastElapsedMillis);
  this.lastElapsedMillis = cumulativeElapsedMillis;
  $setCumulativeElapsedMillis(this.state, cumulativeElapsedMillis);
  notDone = $updateState(this.state);
  notDone || $finish(this);
  $setWidgetScrollPosition(this.this$0, this.state.position_0);
  hPos = round_int(this.state.position_0.x);
  hMin = $getMinimumHorizontalScrollPosition(this.this$0.widget);
  hMax = $getMaximumHorizontalScrollPosition(this.this$0.widget);
  vMax = $getMaximumVerticalScrollPosition(this.this$0.widget);
  vPos = round_int(this.state.position_0.y);
  if ((vMax <= vPos || 0 >= vPos) && (hMax <= hPos || hMin >= hPos)) {
    $finish(this);
    return false;
  }
  return notDone;
}
;
_.lastElapsedMillis = 0;
_.state = null;
_.this$0 = null;
_.windowResizeHandler = null;
function TouchScroller$MomentumCommand$1_0(this$1){
  this.this$1 = this$1;
}

defineSeed(197, 1, makeCastMap([Q$ResizeHandler, Q$EventHandler]), TouchScroller$MomentumCommand$1_0);
_.onResize = function onResize(event_0){
  $finish(this.this$1);
}
;
_.this$1 = null;
function TouchScroller$MomentumTouchRemovalCommand_0(this$0){
  this.this$0 = this$0;
}

defineSeed(198, 1, {}, TouchScroller$MomentumTouchRemovalCommand_0);
_.execute = function execute_3(){
  var currentTime, iter, point;
  currentTime = currentTimeMillis();
  iter = new AbstractList$IteratorImpl_0(this.this$0.touchPositionsDuringMomentum);
  while (iter.i < iter.this$0_0.size_0()) {
    point = dynamicCast($next_1(iter), Q$TouchScroller$TemporalPoint);
    currentTime - point.time >= 2500 && $remove_4(iter);
  }
  return this.this$0.touchPositionsDuringMomentum.size != 0;
}
;
_.this$0 = null;
function $setTemporalPoint(this$static, point, time){
  this$static.point = point;
  this$static.time = time;
}

function TouchScroller$TemporalPoint_0(){
}

function TouchScroller$TemporalPoint_1(point, time){
  this.point = point;
  this.time = time;
}

defineSeed(199, 1, makeCastMap([Q$TouchScroller$TemporalPoint]), TouchScroller$TemporalPoint_0, TouchScroller$TemporalPoint_1);
_.point = null;
_.time = 0;
function $clinit_DOM(){
  $clinit_DOM = nullMethod;
  impl_4 = com_google_gwt_user_client_impl_DOMImpl();
}

function dispatchEvent_3(evt, elem, listener){
  $clinit_DOM();
  var prevCurrentEvent;
  prevCurrentEvent = currentEvent;
  currentEvent = evt;
  elem == sCaptureElem && $eventGetTypeInt(($clinit_DOMImpl() , evt).type) == 8192 && (sCaptureElem = null);
  listener.onBrowserEvent(evt);
  currentEvent = prevCurrentEvent;
}

function getAbsoluteLeft_6(elem){
  $clinit_DOM();
  return ($clinit_DOMImpl() , impl_0).getAbsoluteLeft(elem);
}

function getAbsoluteTop_6(elem){
  $clinit_DOM();
  return ($clinit_DOMImpl() , impl_0).getAbsoluteTop(elem);
}

function getFirstChild(elem){
  $clinit_DOM();
  return $getFirstChildElement_0(($clinit_DOMImpl() , elem));
}

function previewEvent(evt){
  $clinit_DOM();
  var ret;
  ret = fire_3(handlers_0, evt);
  if (!ret && !!evt) {
    evt.cancelBubble = true;
    ($clinit_DOMImpl() , impl_0).eventPreventDefault(evt);
  }
  return ret;
}

function releaseCapture(elem){
  $clinit_DOM();
  !!sCaptureElem && elem == sCaptureElem && (sCaptureElem = null);
  impl_4.releaseCapture_0(elem);
}

function setCapture(elem){
  $clinit_DOM();
  sCaptureElem = elem;
  impl_4.setCapture_0(elem);
}

function setStyleAttribute(elem, attr, value){
  $clinit_DOM();
  elem.style[attr] = value;
}

function sinkBitlessEvent(elem, eventTypeName){
  $clinit_DOM();
  impl_4.sinkBitlessEvent(elem, eventTypeName);
}

function sinkEvents(elem, eventBits){
  $clinit_DOM();
  impl_4.sinkEvents(elem, eventBits);
}

var currentEvent = null, impl_4, sCaptureElem = null;
function $onModuleLoad_0(){
  var allowedModes, currentMode, i_0;
  currentMode = $doc.compatMode;
  allowedModes = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ['CSS1Compat']);
  for (i_0 = 0; i_0 < allowedModes.length; ++i_0) {
    if ($equals_0(allowedModes[i_0], currentMode)) {
      return;
    }
  }
  allowedModes.length == 1 && $equals_0('CSS1Compat', allowedModes[0]) && $equals_0('BackCompat', currentMode)?"GWT no longer supports Quirks Mode (document.compatMode=' BackCompat').<br>Make sure your application's host HTML page has a Standards Mode (document.compatMode=' CSS1Compat') doctype,<br>e.g. by using &lt;!doctype html&gt; at the start of your application's HTML page.<br><br>To continue using this unsupported rendering mode and risk layout problems, suppress this message by adding<br>the following line to your*.gwt.xml module file:<br>&nbsp;&nbsp;&lt;extend-configuration-property name=\"document.compatMode\" value=\"" + currentMode + '"/&gt;':"Your *.gwt.xml module configuration prohibits the use of the current doucment rendering mode (document.compatMode=' " + currentMode + "').<br>Modify your application's host HTML page doctype, or update your custom 'document.compatMode' configuration property settings.";
}

function $getTypeInt(this$static){
  return $clinit_DOM() , $eventGetTypeInt(($clinit_DOMImpl() , this$static).type);
}

function addNativePreviewHandler(handler){
  $clinit_DOM();
  $maybeInitializeEventSystem(impl_4);
  !TYPE_11 && (TYPE_11 = new GwtEvent$Type_0);
  if (!handlers_0) {
    handlers_0 = new HandlerManager_1(null, true);
    singleton = new Event$NativePreviewEvent_0;
  }
  return $addHandler(handlers_0, TYPE_11, handler);
}

function getTypeInt(typeName){
  return $eventGetTypeInt(($clinit_DOM() , typeName));
}

function setEventListener(elem, listener){
  $clinit_DOM();
  elem.__listener = listener;
}

function sinkEvents_0(elem){
  $clinit_DOM();
  impl_4.sinkEvents(elem, 32768);
}

var handlers_0 = null;
function $revive(this$static){
  this$static.dead = false;
  this$static.source = null;
  this$static.isCanceled = false;
  this$static.isConsumed = false;
  this$static.isFirstHandler = true;
  this$static.nativeEvent = null;
}

function $setNativeEvent_0(this$static, nativeEvent){
  this$static.nativeEvent = nativeEvent;
}

function Event$NativePreviewEvent_0(){
}

function fire_3(handlers, nativeEvent){
  var lastIsCanceled, lastIsConsumed, lastIsFirstHandler, lastNativeEvent, ret;
  if (!!TYPE_11 && !!handlers && $isEventHandled(handlers, TYPE_11)) {
    lastIsCanceled = singleton.isCanceled;
    lastIsConsumed = singleton.isConsumed;
    lastIsFirstHandler = singleton.isFirstHandler;
    lastNativeEvent = singleton.nativeEvent;
    $revive(singleton);
    $setNativeEvent_0(singleton, nativeEvent);
    $fireEvent(handlers, singleton);
    ret = !(singleton.isCanceled && !singleton.isConsumed);
    singleton.isCanceled = lastIsCanceled;
    singleton.isConsumed = lastIsConsumed;
    singleton.isFirstHandler = lastIsFirstHandler;
    singleton.nativeEvent = lastNativeEvent;
    return ret;
  }
  return true;
}

defineSeed(204, 93, {}, Event$NativePreviewEvent_0);
_.dispatch = function dispatch_11(handler){
  dynamicCast(handler, Q$Event$NativePreviewHandler).onPreviewNativeEvent(this);
  singleton.isFirstHandler = false;
}
;
_.getAssociatedType = function getAssociatedType_12(){
  return TYPE_11;
}
;
_.revive = function revive_0(){
  $revive(this);
}
;
_.isCanceled = false;
_.isConsumed = false;
_.isFirstHandler = false;
_.nativeEvent = null;
var TYPE_11 = null, singleton = null;
function $clinit_History(){
  $clinit_History = nullMethod;
  impl_5 = com_google_gwt_user_client_impl_HistoryImpl();
  impl_5.init() || (impl_5 = null);
}

function addValueChangeHandler(handler){
  $clinit_History();
  return impl_5?$addValueChangeHandler(impl_5, handler):null;
}

var impl_5 = null;
function $clinit_Timer(){
  $clinit_Timer = nullMethod;
  timers = new ArrayList_0;
  addCloseHandler(new Timer$1_0);
}

var timers;
function Timer$1_0(){
}

defineSeed(207, 1, makeCastMap([Q$CloseHandler, Q$EventHandler]), Timer$1_0);
_.onClose = function onClose(event_0){
  while (($clinit_Timer() , timers).size > 0) {
    throwClassCastExceptionUnlessNull($get_4(timers, 0)).nullMethod();
  }
}
;
function $clinit_Window(){
  $clinit_Window = nullMethod;
  impl_6 = com_google_gwt_user_client_impl_WindowImpl();
}

function addCloseHandler(handler){
  $clinit_Window();
  maybeInitializeCloseHandlers();
  return addHandler(TYPE_8?TYPE_8:(TYPE_8 = new GwtEvent$Type_0), handler);
}

function addHandler(type, handler){
  return $addHandler((!handlers_1 && (handlers_1 = new Window$WindowHandlers_0) , handlers_1), type, handler);
}

function addResizeHandler(handler){
  $clinit_Window();
  maybeInitializeCloseHandlers();
  maybeInitializeResizeHandlers();
  return addHandler((!TYPE_9 && (TYPE_9 = new GwtEvent$Type_0) , TYPE_9), handler);
}

function maybeInitializeCloseHandlers(){
  if (!closeHandlersInitialized) {
    impl_6.initWindowCloseHandler();
    closeHandlersInitialized = true;
  }
}

function maybeInitializeResizeHandlers(){
  if (!resizeHandlersInitialized) {
    impl_6.initWindowResizeHandler();
    resizeHandlersInitialized = true;
  }
}

function onClosed(){
  $clinit_Window();
  closeHandlersInitialized && fire_0((!handlers_1 && (handlers_1 = new Window$WindowHandlers_0) , handlers_1));
}

function onClosing(){
  $clinit_Window();
  var event_0;
  if (closeHandlersInitialized) {
    event_0 = new Window$ClosingEvent_0;
    !!handlers_1 && $fireEvent(handlers_1, event_0);
    return null;
  }
  return null;
}

function onResize_0(){
  $clinit_Window();
  var height, width;
  if (resizeHandlersInitialized) {
    width = $getClientWidth($doc);
    height = $getClientHeight($doc);
    if (lastResizeWidth != width || lastResizeHeight != height) {
      lastResizeWidth = width;
      lastResizeHeight = height;
      fire_1((!handlers_1 && (handlers_1 = new Window$WindowHandlers_0) , handlers_1));
    }
  }
}

var closeHandlersInitialized = false, handlers_1 = null, impl_6, lastResizeHeight = 0, lastResizeWidth = 0, resizeHandlersInitialized = false;
function $clinit_Window$ClosingEvent(){
  $clinit_Window$ClosingEvent = nullMethod;
  TYPE_12 = new GwtEvent$Type_0;
}

function Window$ClosingEvent_0(){
  $clinit_Window$ClosingEvent();
}

defineSeed(209, 93, {}, Window$ClosingEvent_0);
_.dispatch = function dispatch_12(handler){
  throwClassCastExceptionUnlessNull(handler);
  null.nullMethod();
}
;
_.getAssociatedType = function getAssociatedType_13(){
  return TYPE_12;
}
;
var TYPE_12;
function buildListParamMap(queryString){
  var entry, entry$iterator, kv, kvPair, kvPair$array, kvPair$index, kvPair$max, out, qs, values, regexp;
  out = new HashMap_0;
  if (queryString != null && queryString.length > 1) {
    qs = $substring(queryString, 1);
    for (kvPair$array = $split(qs, '&', 0) , kvPair$index = 0 , kvPair$max = kvPair$array.length; kvPair$index < kvPair$max; ++kvPair$index) {
      kvPair = kvPair$array[kvPair$index];
      kv = $split(kvPair, '=', 2);
      if (kv[0].length == 0) {
        continue;
      }
      values = dynamicCast(out.get(kv[0]), Q$List);
      if (!values) {
        values = new ArrayList_0;
        out.put(kv[0], values);
      }
      values.add(kv.length > 1?(throwIfNull(kv[1]) , regexp = /\+/g , decodeURIComponent(kv[1].replace(regexp, '%20'))):'');
    }
  }
  for (entry$iterator = out.entrySet_0().iterator(); entry$iterator.hasNext();) {
    entry = dynamicCast(entry$iterator.next_0(), Q$Map$Entry);
    entry.setValue(unmodifiableList(dynamicCast(entry.getValue(), Q$List)));
  }
  out = ($clinit_Collections() , new Collections$UnmodifiableMap_0(out));
  return out;
}

function ensureListParameterMap(){
  var currentQueryString;
  currentQueryString = ($clinit_Window() , impl_6).getQueryString();
  if (!listParamMap || !$equals_0(cachedQueryString, currentQueryString)) {
    listParamMap = buildListParamMap(currentQueryString);
    cachedQueryString = currentQueryString;
  }
}

var cachedQueryString = '', listParamMap = null;
function Window$WindowHandlers_0(){
  HandlerManager_0.call(this, null);
}

defineSeed(211, 113, makeCastMap([Q$HasHandlers]), Window$WindowHandlers_0);
function $eventGetTypeInt(eventType){
  switch (eventType) {
    case 'blur':
      return 4096;
    case 'change':
      return 1024;
    case 'click':
      return 1;
    case 'dblclick':
      return 2;
    case 'focus':
      return 2048;
    case 'keydown':
      return 128;
    case 'keypress':
      return 256;
    case 'keyup':
      return 512;
    case 'load':
      return 32768;
    case 'losecapture':
      return 8192;
    case 'mousedown':
      return 4;
    case 'mousemove':
      return 64;
    case 'mouseout':
      return 32;
    case 'mouseover':
      return 16;
    case 'mouseup':
      return 8;
    case 'scroll':
      return 16384;
    case 'error':
      return 65536;
    case 'DOMMouseScroll':
    case 'mousewheel':
      return 131072;
    case 'contextmenu':
      return 262144;
    case 'paste':
      return 524288;
    case 'touchstart':
      return 1048576;
    case 'touchmove':
      return 2097152;
    case 'touchend':
      return 4194304;
    case 'touchcancel':
      return 8388608;
    case 'gesturestart':
      return 16777216;
    case 'gesturechange':
      return 33554432;
    case 'gestureend':
      return 67108864;
    default:return -1;
  }
}

function $maybeInitializeEventSystem(this$static){
  if (!eventSystemIsInitialized) {
    this$static.initEventSystem();
    eventSystemIsInitialized = true;
  }
}

function $setEventListener(elem, listener){
  elem.__listener = listener;
}

function isMyListener(object){
  return !instanceOfJso(object) && instanceOf(object, Q$EventListener);
}

defineSeed(212, 1, {});
var eventSystemIsInitialized = false;
function $sinkEventsImpl(elem, bits){
  var chMask = (elem.__eventBits || 0) ^ bits;
  elem.__eventBits = bits;
  if (!chMask)
    return;
  chMask & 1 && (elem.onclick = bits & 1?callDispatchEvent:null);
  chMask & 3 && (elem.ondblclick = bits & 3?callDispatchDblClickEvent:null);
  chMask & 4 && (elem.onmousedown = bits & 4?callDispatchEvent:null);
  chMask & 8 && (elem.onmouseup = bits & 8?callDispatchEvent:null);
  chMask & 16 && (elem.onmouseover = bits & 16?callDispatchEvent:null);
  chMask & 32 && (elem.onmouseout = bits & 32?callDispatchEvent:null);
  chMask & 64 && (elem.onmousemove = bits & 64?callDispatchEvent:null);
  chMask & 128 && (elem.onkeydown = bits & 128?callDispatchEvent:null);
  chMask & 256 && (elem.onkeypress = bits & 256?callDispatchEvent:null);
  chMask & 512 && (elem.onkeyup = bits & 512?callDispatchEvent:null);
  chMask & 1024 && (elem.onchange = bits & 1024?callDispatchEvent:null);
  chMask & 2048 && (elem.onfocus = bits & 2048?callDispatchEvent:null);
  chMask & 4096 && (elem.onblur = bits & 4096?callDispatchEvent:null);
  chMask & 8192 && (elem.onlosecapture = bits & 8192?callDispatchEvent:null);
  chMask & 16384 && (elem.onscroll = bits & 16384?callDispatchEvent:null);
  chMask & 32768 && (elem.nodeName == 'IFRAME'?bits & 32768?elem.attachEvent('onload', callDispatchOnLoadEvent):elem.detachEvent('onload', callDispatchOnLoadEvent):(elem.onload = bits & 32768?callDispatchUnhandledEvent:null));
  chMask & 65536 && (elem.onerror = bits & 65536?callDispatchEvent:null);
  chMask & 131072 && (elem.onmousewheel = bits & 131072?callDispatchEvent:null);
  chMask & 262144 && (elem.oncontextmenu = bits & 262144?callDispatchEvent:null);
  chMask & 524288 && (elem.onpaste = bits & 524288?callDispatchEvent:null);
}

function previewEventImpl(){
  var isCancelled = false;
  for (var i_0 = 0; i_0 < $wnd.__gwt_globalEventArray.length; i_0++) {
    !$wnd.__gwt_globalEventArray[i_0]() && (isCancelled = true);
  }
  return !isCancelled;
}

defineSeed(214, 212, {});
_.initEventSystem = function initEventSystem(){
  $wnd.__gwt_globalEventArray == null && ($wnd.__gwt_globalEventArray = new Array);
  $wnd.__gwt_globalEventArray[$wnd.__gwt_globalEventArray.length] = $entry(function(){
    return previewEvent($wnd.event);
  }
  );
  var dispatchEvent_0 = $entry(function(){
    var oldEventTarget = ($clinit_DOMImpl() , currentEventTarget);
    currentEventTarget = this;
    if ($wnd.event.returnValue == null) {
      $wnd.event.returnValue = true;
      if (!previewEventImpl()) {
        currentEventTarget = oldEventTarget;
        return;
      }
    }
    var listener, curElem = this;
    while (curElem && !(listener = curElem.__listener)) {
      curElem = curElem.parentElement;
    }
    listener && isMyListener(listener) && dispatchEvent_3($wnd.event, curElem, listener);
    currentEventTarget = oldEventTarget;
  }
  );
  var dispatchDblClickEvent = $entry(function(){
    var newEvent = $doc.createEventObject();
    $wnd.event.returnValue == null && $wnd.event.srcElement.fireEvent && $wnd.event.srcElement.fireEvent('onclick', newEvent);
    if (this.__eventBits & 2) {
      dispatchEvent_0.call(this);
    }
     else if ($wnd.event.returnValue == null) {
      $wnd.event.returnValue = true;
      previewEventImpl();
    }
  }
  );
  var dispatchUnhandledEvent = $entry(function(){
    this.__gwtLastUnhandledEvent = $wnd.event.type;
    dispatchEvent_0.call(this);
  }
  );
  var moduleName = $moduleName.replace(/\./g, '_');
  $wnd['__gwt_dispatchEvent_' + moduleName] = dispatchEvent_0;
  callDispatchEvent = (new Function('w', 'return function() { w.__gwt_dispatchEvent_' + moduleName + '.call(this) }'))($wnd);
  $wnd['__gwt_dispatchDblClickEvent_' + moduleName] = dispatchDblClickEvent;
  callDispatchDblClickEvent = (new Function('w', 'return function() { w.__gwt_dispatchDblClickEvent_' + moduleName + '.call(this)}'))($wnd);
  $wnd['__gwt_dispatchUnhandledEvent_' + moduleName] = dispatchUnhandledEvent;
  callDispatchUnhandledEvent = (new Function('w', 'return function() { w.__gwt_dispatchUnhandledEvent_' + moduleName + '.call(this)}'))($wnd);
  callDispatchOnLoadEvent = (new Function('w', 'return function() { w.__gwt_dispatchUnhandledEvent_' + moduleName + '.call(w.event.srcElement)}'))($wnd);
  var bodyDispatcher = $entry(function(){
    dispatchEvent_0.call($doc.body);
  }
  );
  var bodyDblClickDispatcher = $entry(function(){
    dispatchDblClickEvent.call($doc.body);
  }
  );
  $doc.body.attachEvent('onclick', bodyDispatcher);
  $doc.body.attachEvent('onmousedown', bodyDispatcher);
  $doc.body.attachEvent('onmouseup', bodyDispatcher);
  $doc.body.attachEvent('onmousemove', bodyDispatcher);
  $doc.body.attachEvent('onmousewheel', bodyDispatcher);
  $doc.body.attachEvent('onkeydown', bodyDispatcher);
  $doc.body.attachEvent('onkeypress', bodyDispatcher);
  $doc.body.attachEvent('onkeyup', bodyDispatcher);
  $doc.body.attachEvent('onfocus', bodyDispatcher);
  $doc.body.attachEvent('onblur', bodyDispatcher);
  $doc.body.attachEvent('ondblclick', bodyDblClickDispatcher);
  $doc.body.attachEvent('oncontextmenu', bodyDispatcher);
}
;
_.releaseCapture_0 = function releaseCapture_0(elem){
  $maybeInitializeEventSystem(this);
  elem.releaseCapture();
}
;
_.setCapture_0 = function setCapture_0(elem){
  $maybeInitializeEventSystem(this);
  elem.setCapture();
}
;
_.sinkBitlessEvent = function sinkBitlessEvent_0(elem, eventTypeName){
}
;
_.sinkEvents = function sinkEvents_1(elem, bits){
  $maybeInitializeEventSystem(this);
  $sinkEventsImpl(elem, bits);
}
;
var callDispatchDblClickEvent = null, callDispatchEvent = null, callDispatchOnLoadEvent = null, callDispatchUnhandledEvent = null;
function DOMImplIE6_2(){
}

defineSeed(213, 214, {}, DOMImplIE6_2);
function DOMImplIE8_2(){
}

defineSeed(215, 214, {}, DOMImplIE8_2);
function $initEventSystem(){
  dispatchCapturedEvent = $entry(function(evt){
    if (!previewEvent(evt)) {
      evt.stopPropagation();
      evt.preventDefault();
      return false;
    }
    return true;
  }
  );
  dispatchEvent_4 = $entry(function(evt){
    var listener, curElem = this;
    while (curElem && !(listener = curElem.__listener)) {
      curElem = curElem.parentNode;
    }
    curElem && curElem.nodeType != 1 && (curElem = null);
    listener && isMyListener(listener) && dispatchEvent_3(evt, curElem, listener);
  }
  );
  dispatchDragEvent = $entry(function(evt){
    evt.preventDefault();
    dispatchEvent_4.call(this, evt);
  }
  );
  dispatchUnhandledEvent_0 = $entry(function(evt){
    this.__gwtLastUnhandledEvent = evt.type;
    dispatchEvent_4.call(this, evt);
  }
  );
  dispatchCapturedMouseEvent = $entry(function(evt){
    var dispatchCapturedEventFn = dispatchCapturedEvent;
    if (dispatchCapturedEventFn(evt)) {
      var cap = captureElem;
      if (cap && cap.__listener) {
        if (isMyListener(cap.__listener)) {
          dispatchEvent_3(evt, cap, cap.__listener);
          evt.stopPropagation();
        }
      }
    }
  }
  );
  $wnd.addEventListener('click', dispatchCapturedMouseEvent, true);
  $wnd.addEventListener('dblclick', dispatchCapturedMouseEvent, true);
  $wnd.addEventListener('mousedown', dispatchCapturedMouseEvent, true);
  $wnd.addEventListener('mouseup', dispatchCapturedMouseEvent, true);
  $wnd.addEventListener('mousemove', dispatchCapturedMouseEvent, true);
  $wnd.addEventListener('mouseover', dispatchCapturedMouseEvent, true);
  $wnd.addEventListener('mouseout', dispatchCapturedMouseEvent, true);
  $wnd.addEventListener('mousewheel', dispatchCapturedMouseEvent, true);
  $wnd.addEventListener('keydown', dispatchCapturedEvent, true);
  $wnd.addEventListener('keyup', dispatchCapturedEvent, true);
  $wnd.addEventListener('keypress', dispatchCapturedEvent, true);
  $wnd.addEventListener('touchstart', dispatchCapturedMouseEvent, true);
  $wnd.addEventListener('touchmove', dispatchCapturedMouseEvent, true);
  $wnd.addEventListener('touchend', dispatchCapturedMouseEvent, true);
  $wnd.addEventListener('touchcancel', dispatchCapturedMouseEvent, true);
  $wnd.addEventListener('gesturestart', dispatchCapturedMouseEvent, true);
  $wnd.addEventListener('gesturechange', dispatchCapturedMouseEvent, true);
  $wnd.addEventListener('gestureend', dispatchCapturedMouseEvent, true);
}

function $sinkBitlessEventImpl(elem, eventTypeName){
  switch (eventTypeName) {
    case 'drag':
      elem.ondrag = dispatchEvent_4;
      break;
    case 'dragend':
      elem.ondragend = dispatchEvent_4;
      break;
    case 'dragenter':
      elem.ondragenter = dispatchDragEvent;
      break;
    case 'dragleave':
      elem.ondragleave = dispatchEvent_4;
      break;
    case 'dragover':
      elem.ondragover = dispatchDragEvent;
      break;
    case 'dragstart':
      elem.ondragstart = dispatchEvent_4;
      break;
    case 'drop':
      elem.ondrop = dispatchEvent_4;
      break;
    case 'canplaythrough':
    case 'ended':
    case 'progress':
      elem.removeEventListener(eventTypeName, dispatchEvent_4, false);
      elem.addEventListener(eventTypeName, dispatchEvent_4, false);
      break;
    default:throw 'Trying to sink unknown event type ' + eventTypeName;
  }
}

function $sinkEventsImpl_0(elem, bits){
  var chMask = (elem.__eventBits || 0) ^ bits;
  elem.__eventBits = bits;
  if (!chMask)
    return;
  chMask & 1 && (elem.onclick = bits & 1?dispatchEvent_4:null);
  chMask & 2 && (elem.ondblclick = bits & 2?dispatchEvent_4:null);
  chMask & 4 && (elem.onmousedown = bits & 4?dispatchEvent_4:null);
  chMask & 8 && (elem.onmouseup = bits & 8?dispatchEvent_4:null);
  chMask & 16 && (elem.onmouseover = bits & 16?dispatchEvent_4:null);
  chMask & 32 && (elem.onmouseout = bits & 32?dispatchEvent_4:null);
  chMask & 64 && (elem.onmousemove = bits & 64?dispatchEvent_4:null);
  chMask & 128 && (elem.onkeydown = bits & 128?dispatchEvent_4:null);
  chMask & 256 && (elem.onkeypress = bits & 256?dispatchEvent_4:null);
  chMask & 512 && (elem.onkeyup = bits & 512?dispatchEvent_4:null);
  chMask & 1024 && (elem.onchange = bits & 1024?dispatchEvent_4:null);
  chMask & 2048 && (elem.onfocus = bits & 2048?dispatchEvent_4:null);
  chMask & 4096 && (elem.onblur = bits & 4096?dispatchEvent_4:null);
  chMask & 8192 && (elem.onlosecapture = bits & 8192?dispatchEvent_4:null);
  chMask & 16384 && (elem.onscroll = bits & 16384?dispatchEvent_4:null);
  chMask & 32768 && (elem.onload = bits & 32768?dispatchUnhandledEvent_0:null);
  chMask & 65536 && (elem.onerror = bits & 65536?dispatchEvent_4:null);
  chMask & 131072 && (elem.onmousewheel = bits & 131072?dispatchEvent_4:null);
  chMask & 262144 && (elem.oncontextmenu = bits & 262144?dispatchEvent_4:null);
  chMask & 524288 && (elem.onpaste = bits & 524288?dispatchEvent_4:null);
  chMask & 1048576 && (elem.ontouchstart = bits & 1048576?dispatchEvent_4:null);
  chMask & 2097152 && (elem.ontouchmove = bits & 2097152?dispatchEvent_4:null);
  chMask & 4194304 && (elem.ontouchend = bits & 4194304?dispatchEvent_4:null);
  chMask & 8388608 && (elem.ontouchcancel = bits & 8388608?dispatchEvent_4:null);
  chMask & 16777216 && (elem.ongesturestart = bits & 16777216?dispatchEvent_4:null);
  chMask & 33554432 && (elem.ongesturechange = bits & 33554432?dispatchEvent_4:null);
  chMask & 67108864 && (elem.ongestureend = bits & 67108864?dispatchEvent_4:null);
}

defineSeed(218, 212, {});
_.initEventSystem = function initEventSystem_0(){
  $initEventSystem();
}
;
_.releaseCapture_0 = function releaseCapture_1(elem){
  $maybeInitializeEventSystem(this);
  elem === captureElem && (captureElem = null);
}
;
_.setCapture_0 = function setCapture_1(elem){
  $maybeInitializeEventSystem(this);
  captureElem = elem;
}
;
_.sinkBitlessEvent = function sinkBitlessEvent_1(elem, eventTypeName){
  $maybeInitializeEventSystem(this);
  this.sinkBitlessEventImpl(elem, eventTypeName);
}
;
_.sinkBitlessEventImpl = function sinkBitlessEventImpl(elem, eventTypeName){
  $sinkBitlessEventImpl(elem, eventTypeName);
}
;
_.sinkEvents = function sinkEvents_2(elem, bits){
  $maybeInitializeEventSystem(this);
  this.sinkEventsImpl(elem, bits);
}
;
_.sinkEventsImpl = function sinkEventsImpl(elem, bits){
  $sinkEventsImpl_0(elem, bits);
}
;
var captureElem = null, dispatchCapturedEvent = null, dispatchCapturedMouseEvent = null, dispatchDragEvent = null, dispatchEvent_4 = null, dispatchUnhandledEvent_0 = null;
defineSeed(217, 218, {});
function $initEventSystemIE(){
  dispatchDragEvent = $entry(function(evt){
    dispatchEvent_4.call(this, evt);
    return false;
  }
  );
}

function DOMImplIE9_2(){
}

defineSeed(216, 217, {}, DOMImplIE9_2);
_.initEventSystem = function initEventSystem_1(){
  $initEventSystem();
  $initEventSystemIE();
}
;
_.sinkBitlessEventImpl = function sinkBitlessEventImpl_0(elem, eventTypeName){
  $sinkBitlessEventImpl(elem, eventTypeName);
  $equals_0('dragover', eventTypeName) && $sinkBitlessEventImpl(elem, 'dragenter');
}
;
function $initSyntheticMouseUpEvents(){
  $wnd.addEventListener('mouseout', $entry(function(evt){
    var cap = captureElem;
    if (cap && !evt.relatedTarget) {
      if ('html' == evt.target.tagName.toLowerCase()) {
        var muEvent = $doc.createEvent('MouseEvents');
        muEvent.initMouseEvent('mouseup', true, true, $wnd, 0, evt.screenX, evt.screenY, evt.clientX, evt.clientY, evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, evt.button, null);
        cap.dispatchEvent(muEvent);
      }
    }
  }
  ), true);
  $wnd.addEventListener('DOMMouseScroll', dispatchCapturedMouseEvent, true);
}

function DOMImplMozilla_2(){
}

defineSeed(219, 218, {}, DOMImplMozilla_2);
_.initEventSystem = function initEventSystem_2(){
  $initEventSystem();
  $initSyntheticMouseUpEvents();
}
;
_.sinkBitlessEventImpl = function sinkBitlessEventImpl_1(elem, eventTypeName){
  var geckoVersion;
  $equals_0('dragleave', eventTypeName) && ($clinit_DOMImpl() , geckoVersion = getGeckoVersion() , geckoVersion != -1 && geckoVersion <= 1009000)?('dragexit' == 'dragexit' && (elem.ondragexit = dispatchDragEvent) , undefined):$sinkBitlessEventImpl(elem, eventTypeName);
}
;
_.sinkEvents = function sinkEvents_3(elem, bits){
  $maybeInitializeEventSystem(this);
  $sinkEventsImpl_0(elem, bits);
  bits & 131072 && elem.addEventListener('DOMMouseScroll', dispatchEvent_4, false);
}
;
function DOMImplOpera_2(){
}

defineSeed(220, 218, {}, DOMImplOpera_2);
_.sinkEventsImpl = function sinkEventsImpl_0(elem, bits){
  elem.__eventBits = bits;
  elem.onclick = bits & 1?dispatchEvent_4:null;
  elem.ondblclick = bits & 2?dispatchEvent_4:null;
  elem.onmousedown = bits & 4?dispatchEvent_4:null;
  elem.onmouseup = bits & 8?dispatchEvent_4:null;
  elem.onmouseover = bits & 16?dispatchEvent_4:null;
  elem.onmouseout = bits & 32?dispatchEvent_4:null;
  elem.onmousemove = bits & 64?dispatchEvent_4:null;
  elem.onkeydown = bits & 128?dispatchEvent_4:null;
  elem.onkeypress = bits & 256?dispatchEvent_4:null;
  elem.onkeyup = bits & 512?dispatchEvent_4:null;
  elem.onchange = bits & 1024?dispatchEvent_4:null;
  elem.onfocus = bits & 2048?dispatchEvent_4:null;
  elem.onblur = bits & 4096?dispatchEvent_4:null;
  elem.onlosecapture = bits & 8192?dispatchEvent_4:null;
  elem.onscroll = bits & 16384?dispatchEvent_4:null;
  elem.onload = bits & 32768?dispatchUnhandledEvent_0:null;
  elem.onerror = bits & 65536?dispatchEvent_4:null;
  elem.onmousewheel = bits & 131072?dispatchEvent_4:null;
  elem.oncontextmenu = bits & 262144?dispatchEvent_4:null;
  elem.onpaste = bits & 524288?dispatchEvent_4:null;
}
;
function DOMImplWebkit_2(){
}

defineSeed(221, 217, {}, DOMImplWebkit_2);
function $addValueChangeHandler(this$static, handler){
  return $addHandler(this$static.handlers, (!TYPE_10 && (TYPE_10 = new GwtEvent$Type_0) , TYPE_10), handler);
}

function HistoryImpl_0(){
  this.handlers = new HandlerManager_0(null);
}

function setToken(token){
  token_1 = token;
}

defineSeed(222, 1, makeCastMap([Q$HasHandlers]), HistoryImpl_0);
_.decodeFragment = function decodeFragment(encodedFragment){
  return decodeURI(encodedFragment.replace('%23', '#'));
}
;
_.encodeFragment = function encodeFragment(fragment){
  return encodeURI(fragment).replace('#', '%23');
}
;
_.fireEvent_0 = function fireEvent_1(event_0){
  $fireEvent(this.handlers, event_0);
}
;
_.init = function init_0(){
  var token_0 = '';
  var hash_0 = $wnd.location.hash;
  hash_0.length > 0 && (token_0 = this.decodeFragment(hash_0.substring(1)));
  setToken(token_0);
  var historyImpl = this;
  var oldHandler = $wnd.onhashchange;
  $wnd.onhashchange = $entry(function(){
    var token = '', hash = $wnd.location.hash;
    hash.length > 0 && (token = historyImpl.decodeFragment(hash.substring(1)));
    historyImpl.newItemOnEvent(token);
    oldHandler && oldHandler();
  }
  );
  return true;
}
;
_.nativeUpdateOnEvent = function nativeUpdateOnEvent(historyToken){
}
;
_.newItemOnEvent = function newItemOnEvent(historyToken){
  historyToken = historyToken == null?'':historyToken;
  if (!$equals_0(historyToken, token_1 == null?'':token_1)) {
    token_1 = historyToken;
    this.nativeUpdateOnEvent(historyToken);
    fire_2(this);
  }
}
;
var token_1 = '';
function $initHistoryToken(this$static){
  var token = '';
  var hash = getLocationHash();
  if (hash.length > 0) {
    try {
      token = this$static.decodeFragment(hash.substring(1));
    }
     catch (e) {
      $wnd.location.hash = '';
    }
  }
  token_1 = token;
}

function $initUrlCheckTimer(this$static){
  var historyImplRef = this$static;
  var urlChecker = $entry(function(){
    $wnd.setTimeout(urlChecker, 250);
    if (historyImplRef.handleWindowReloadCanceled()) {
      return;
    }
    var hash = getLocationHash();
    if (hash.length > 0) {
      var token = '';
      try {
        token = historyImplRef.decodeFragment(hash.substring(1));
      }
       catch (e) {
        historyImplRef.reloadWindow();
      }
      var historyToken = token_1 == null?'':token_1;
      historyToken && token != historyToken && historyImplRef.reloadWindow();
    }
  }
  );
  urlChecker();
}

function $injectGlobalHandler(this$static){
  var historyImplRef = this$static;
  var oldOnLoad = $wnd.__gwt_onHistoryLoad;
  $wnd.__gwt_onHistoryLoad = $entry(function(token){
    historyImplRef.newItemOnEvent(token);
    oldOnLoad && oldOnLoad(token);
  }
  );
}

function $navigateFrame(this$static, token){
  var escaped = (div = ($clinit_DOM() , $createDivElement($doc)) , $clinit_DOM() , ($clinit_DOMImpl() , impl_0).setInnerText(div, token) , $clinit_DOM() , div.innerHTML), div;
  var doc = this$static.historyFrame.contentWindow.document;
  doc.open();
  doc.write('<html><body onload="if(parent.__gwt_onHistoryLoad)parent.__gwt_onHistoryLoad(__gwt_historyToken.innerText)"><div id="__gwt_historyToken">' + escaped + '<\/div><\/body><\/html>');
  doc.close();
}

function $updateHash(this$static, token){
  $wnd.location.hash = this$static.encodeFragment(token);
}

function HistoryImplIE6_0(){
  HistoryImpl_0.call(this);
}

function getLocationHash(){
  var href = $wnd.location.href;
  var hashLoc = href.lastIndexOf('#');
  return hashLoc > 0?href.substring(hashLoc):'';
}

function getTokenElement(historyFrame){
  if (historyFrame.contentWindow) {
    var doc = historyFrame.contentWindow.document;
    return doc.getElementById('__gwt_historyToken');
  }
}

defineSeed(223, 222, makeCastMap([Q$HasHandlers]), HistoryImplIE6_0);
_.handleWindowReloadCanceled = function handleWindowReloadCanceled(){
  if (this.reloadedWindow) {
    this.reloadedWindow = false;
    $updateHash(this, token_1 == null?'':token_1);
    return true;
  }
  return false;
}
;
_.init = function init_1(){
  var tokenElement;
  this.historyFrame = $doc.getElementById('__gwt_historyFrame');
  if (!this.historyFrame) {
    return false;
  }
  $initHistoryToken(this);
  tokenElement = getTokenElement(this.historyFrame);
  tokenElement?setToken(tokenElement.innerText):$navigateFrame(this, token_1 == null?'':token_1);
  $injectGlobalHandler(this);
  $initUrlCheckTimer(this);
  return true;
}
;
_.nativeUpdateOnEvent = function nativeUpdateOnEvent_0(historyToken){
  $updateHash(this, historyToken);
}
;
_.reloadWindow = function reloadWindow(){
  this.reloadedWindow = true;
  $wnd.location.reload();
}
;
_.historyFrame = null;
_.reloadedWindow = false;
function HistoryImplTimer_0(){
  HistoryImpl_0.call(this);
}

defineSeed(225, 222, makeCastMap([Q$HasHandlers]), HistoryImplTimer_0);
_.init = function init_2(){
  var token_0 = '';
  var hash_0 = $wnd.location.hash;
  hash_0.length > 0 && (token_0 = this.decodeFragment(hash_0.substring(1)));
  setToken(token_0);
  var historyImpl = this;
  var checkHistory = $entry(function(){
    var token = '', hash = $wnd.location.hash;
    hash.length > 0 && (token = historyImpl.decodeFragment(hash.substring(1)));
    historyImpl.newItemOnEvent(token);
  }
  );
  var checkHistoryCycle = function(){
    $wnd.setTimeout(checkHistoryCycle, 250);
    checkHistory();
  }
  ;
  checkHistoryCycle();
  return true;
}
;
function HistoryImplMozilla_0(){
  HistoryImplTimer_0.call(this);
}

defineSeed(224, 225, makeCastMap([Q$HasHandlers]), HistoryImplMozilla_0);
_.decodeFragment = function decodeFragment_0(encodedFragment){
  return encodedFragment;
}
;
function HistoryImplSafari_0(){
  HistoryImplTimer_0.call(this);
}

defineSeed(226, 225, makeCastMap([Q$HasHandlers]), HistoryImplSafari_0);
function WindowImpl_0(){
}

defineSeed(227, 1, {}, WindowImpl_0);
_.getQueryString = function getQueryString(){
  return $wnd.location.search;
}
;
_.initWindowCloseHandler = function initWindowCloseHandler(){
  var oldOnBeforeUnload = $wnd.onbeforeunload;
  var oldOnUnload = $wnd.onunload;
  $wnd.onbeforeunload = function(evt){
    var ret, oldRet;
    try {
      ret = $entry(onClosing)();
    }
     finally {
      oldRet = oldOnBeforeUnload && oldOnBeforeUnload(evt);
    }
    if (ret != null) {
      return ret;
    }
    if (oldRet != null) {
      return oldRet;
    }
  }
  ;
  $wnd.onunload = $entry(function(evt){
    try {
      $clinit_Window();
      closeHandlersInitialized && fire_0((!handlers_1 && (handlers_1 = new Window$WindowHandlers_0) , handlers_1));
    }
     finally {
      oldOnUnload && oldOnUnload(evt);
      $wnd.onresize = null;
      $wnd.onscroll = null;
      $wnd.onbeforeunload = null;
      $wnd.onunload = null;
    }
  }
  );
}
;
_.initWindowResizeHandler = function initWindowResizeHandler(){
  var oldOnResize = $wnd.onresize;
  $wnd.onresize = $entry(function(evt){
    try {
      onResize_0();
    }
     finally {
      oldOnResize && oldOnResize(evt);
    }
  }
  );
}
;
function $initHandler(initFunc, cmd){
  var scriptElem;
  scriptElem = $createScriptElement($doc, initFunc);
  $appendChild($doc.body, scriptElem);
  cmd.execute_0();
  $removeChild($doc.body, scriptElem);
}

function WindowImplIE_0(){
}

defineSeed(228, 227, {}, WindowImplIE_0);
_.getQueryString = function getQueryString_0(){
  var href = $wnd.location.href;
  var hashLoc = href.indexOf('#');
  hashLoc >= 0 && (href = href.substring(0, hashLoc));
  var questionLoc = href.indexOf('?');
  return questionLoc > 0?href.substring(questionLoc):'';
}
;
_.initWindowCloseHandler = function initWindowCloseHandler_0(){
  $initHandler(($clinit_WindowImplIE$Resources() , INSTANCE_0).initWindowCloseHandler_0().getText(), new WindowImplIE$1_0);
}
;
_.initWindowResizeHandler = function initWindowResizeHandler_0(){
  $initHandler(($clinit_WindowImplIE$Resources() , INSTANCE_0).initWindowResizeHandler_0().getText(), new WindowImplIE$2_0);
}
;
function WindowImplIE$1_0(){
}

defineSeed(229, 1, {}, WindowImplIE$1_0);
_.execute_0 = function execute_4(){
  $wnd.__gwt_initWindowCloseHandler($entry(onClosing), $entry(onClosed));
}
;
function WindowImplIE$2_0(){
}

defineSeed(230, 1, {}, WindowImplIE$2_0);
_.execute_0 = function execute_5(){
  $wnd.__gwt_initWindowResizeHandler($entry(onResize_0));
}
;
function $clinit_WindowImplIE$Resources(){
  $clinit_WindowImplIE$Resources = nullMethod;
  INSTANCE_0 = dynamicCast(com_google_gwt_user_client_impl_WindowImplIE_Resources(), Q$WindowImplIE$Resources);
}

var INSTANCE_0;
function WindowImplIE_Resources_default_InlineClientBundleGenerator_0(){
}

defineSeed(231, 1, makeCastMap([Q$WindowImplIE$Resources]), WindowImplIE_Resources_default_InlineClientBundleGenerator_0);
_.initWindowCloseHandler_0 = function initWindowCloseHandler_2(){
  return $clinit_WindowImplIE_Resources_default_InlineClientBundleGenerator$initWindowCloseHandlerInitializer() , initWindowCloseHandler_1;
}
;
_.initWindowResizeHandler_0 = function initWindowResizeHandler_2(){
  return $clinit_WindowImplIE_Resources_default_InlineClientBundleGenerator$initWindowResizeHandlerInitializer() , initWindowResizeHandler_1;
}
;
var initWindowCloseHandler_1 = null, initWindowResizeHandler_1 = null;
function WindowImplIE_Resources_default_InlineClientBundleGenerator$1_0(){
}

defineSeed(232, 1, {}, WindowImplIE_Resources_default_InlineClientBundleGenerator$1_0);
_.getText = function getText(){
  return 'function __gwt_initWindowCloseHandler(beforeunload, unload) {\n  var wnd = window\n  , oldOnBeforeUnload = wnd.onbeforeunload\n  , oldOnUnload = wnd.onunload;\n  \n  wnd.onbeforeunload = function(evt) {\n    var ret, oldRet;\n    try {\n      ret = beforeunload();\n    } finally {\n      oldRet = oldOnBeforeUnload && oldOnBeforeUnload(evt);\n    }\n    // Avoid returning null as IE6 will coerce it into a string.\n    // Ensure that "" gets returned properly.\n    if (ret != null) {\n      return ret;\n    }\n    if (oldRet != null) {\n      return oldRet;\n    }\n    // returns undefined.\n  };\n  \n  wnd.onunload = function(evt) {\n    try {\n      unload();\n    } finally {\n      oldOnUnload && oldOnUnload(evt);\n      wnd.onresize = null;\n      wnd.onscroll = null;\n      wnd.onbeforeunload = null;\n      wnd.onunload = null;\n    }\n  };\n  \n  // Remove the reference once we\'ve initialize the handler\n  wnd.__gwt_initWindowCloseHandler = undefined;\n}\n';
}
;
function WindowImplIE_Resources_default_InlineClientBundleGenerator$2_0(){
}

defineSeed(233, 1, {}, WindowImplIE_Resources_default_InlineClientBundleGenerator$2_0);
_.getText = function getText_0(){
  return "function __gwt_initWindowResizeHandler(resize) {\n  var wnd = window, oldOnResize = wnd.onresize;\n  \n  wnd.onresize = function(evt) {\n    try {\n      resize();\n    } finally {\n      oldOnResize && oldOnResize(evt);\n    }\n  };\n  \n  // Remove the reference once we've initialize the handler\n  wnd.__gwt_initWindowResizeHandler = undefined;\n}\n";
}
;
function $clinit_WindowImplIE_Resources_default_InlineClientBundleGenerator$initWindowCloseHandlerInitializer(){
  $clinit_WindowImplIE_Resources_default_InlineClientBundleGenerator$initWindowCloseHandlerInitializer = nullMethod;
  initWindowCloseHandler_1 = new WindowImplIE_Resources_default_InlineClientBundleGenerator$1_0;
}

function $clinit_WindowImplIE_Resources_default_InlineClientBundleGenerator$initWindowResizeHandlerInitializer(){
  $clinit_WindowImplIE_Resources_default_InlineClientBundleGenerator$initWindowResizeHandlerInitializer = nullMethod;
  initWindowResizeHandler_1 = new WindowImplIE_Resources_default_InlineClientBundleGenerator$2_0;
}

function WindowImplIE_Resources_default_StaticClientBundleGenerator_0(){
}

defineSeed(236, 1, makeCastMap([Q$WindowImplIE$Resources]), WindowImplIE_Resources_default_StaticClientBundleGenerator_0);
_.initWindowCloseHandler_0 = function initWindowCloseHandler_4(){
  return $clinit_WindowImplIE_Resources_default_StaticClientBundleGenerator$initWindowCloseHandlerInitializer() , initWindowCloseHandler_3;
}
;
_.initWindowResizeHandler_0 = function initWindowResizeHandler_4(){
  return $clinit_WindowImplIE_Resources_default_StaticClientBundleGenerator$initWindowResizeHandlerInitializer() , initWindowResizeHandler_3;
}
;
var initWindowCloseHandler_3 = null, initWindowResizeHandler_3 = null;
function WindowImplIE_Resources_default_StaticClientBundleGenerator$1_0(){
}

defineSeed(237, 1, {}, WindowImplIE_Resources_default_StaticClientBundleGenerator$1_0);
_.getText = function getText_1(){
  return 'function __gwt_initWindowCloseHandler(beforeunload, unload) {\n  var wnd = window\n  , oldOnBeforeUnload = wnd.onbeforeunload\n  , oldOnUnload = wnd.onunload;\n  \n  wnd.onbeforeunload = function(evt) {\n    var ret, oldRet;\n    try {\n      ret = beforeunload();\n    } finally {\n      oldRet = oldOnBeforeUnload && oldOnBeforeUnload(evt);\n    }\n    // Avoid returning null as IE6 will coerce it into a string.\n    // Ensure that "" gets returned properly.\n    if (ret != null) {\n      return ret;\n    }\n    if (oldRet != null) {\n      return oldRet;\n    }\n    // returns undefined.\n  };\n  \n  wnd.onunload = function(evt) {\n    try {\n      unload();\n    } finally {\n      oldOnUnload && oldOnUnload(evt);\n      wnd.onresize = null;\n      wnd.onscroll = null;\n      wnd.onbeforeunload = null;\n      wnd.onunload = null;\n    }\n  };\n  \n  // Remove the reference once we\'ve initialize the handler\n  wnd.__gwt_initWindowCloseHandler = undefined;\n}\n';
}
;
function WindowImplIE_Resources_default_StaticClientBundleGenerator$2_0(){
}

defineSeed(238, 1, {}, WindowImplIE_Resources_default_StaticClientBundleGenerator$2_0);
_.getText = function getText_2(){
  return "function __gwt_initWindowResizeHandler(resize) {\n  var wnd = window, oldOnResize = wnd.onresize;\n  \n  wnd.onresize = function(evt) {\n    try {\n      resize();\n    } finally {\n      oldOnResize && oldOnResize(evt);\n    }\n  };\n  \n  // Remove the reference once we've initialize the handler\n  wnd.__gwt_initWindowResizeHandler = undefined;\n}\n";
}
;
function $clinit_WindowImplIE_Resources_default_StaticClientBundleGenerator$initWindowCloseHandlerInitializer(){
  $clinit_WindowImplIE_Resources_default_StaticClientBundleGenerator$initWindowCloseHandlerInitializer = nullMethod;
  initWindowCloseHandler_3 = new WindowImplIE_Resources_default_StaticClientBundleGenerator$1_0;
}

function $clinit_WindowImplIE_Resources_default_StaticClientBundleGenerator$initWindowResizeHandlerInitializer(){
  $clinit_WindowImplIE_Resources_default_StaticClientBundleGenerator$initWindowResizeHandlerInitializer = nullMethod;
  initWindowResizeHandler_3 = new WindowImplIE_Resources_default_StaticClientBundleGenerator$2_0;
}

function WindowImplMozilla_0(){
}

defineSeed(241, 227, {}, WindowImplMozilla_0);
function $add_0(this$static, child, container){
  $removeFromParent(child);
  $add_4(this$static.children, child);
  $clinit_DOM();
  $appendChild(container, ($clinit_PotentialElement() , $resolve(child.element)));
  $setParent(child, this$static);
}

function $remove_0(this$static, w){
  var elem;
  if (w.parent_0 != this$static) {
    return false;
  }
  try {
    $setParent(w, null);
  }
   finally {
    elem = w.element;
    $clinit_DOM();
    $removeChild($getParentElement_0(($clinit_DOMImpl() , elem)), elem);
    $remove_3(this$static.children, w);
  }
  return true;
}

function ComplexPanel_0(){
  this.children = new WidgetCollection_0(this);
}

defineSeed(243, 167, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]));
_.iterator = function iterator_1(){
  return new WidgetCollection$WidgetIterator_0(this.children);
}
;
_.remove = function remove_1(w){
  return $remove_0(this, w);
}
;
function $add_1(this$static, w){
  $add_0(this$static, w, this$static.element);
}

function $checkWidgetParent(this$static, w){
  if (w.parent_0 != this$static) {
    throw new IllegalArgumentException_1('Widget must be a child of this panel.');
  }
}

function $remove_1(this$static, w){
  var removed;
  removed = $remove_0(this$static, w);
  removed && changeToStaticPositioning(w.element);
  return removed;
}

function $setWidgetPosition(this$static, w, left, top_0){
  $checkWidgetParent(this$static, w);
  this$static.setWidgetPositionImpl(w, left, top_0);
}

function $setWidgetPositionImpl(w, left, top_0){
  var h_0;
  h_0 = w.element;
  if (left == -1 && top_0 == -1) {
    changeToStaticPositioning(h_0);
  }
   else {
    $clinit_DOM();
    h_0.style['position'] = 'absolute';
    h_0.style['left'] = left + 'px';
    h_0.style['top'] = top_0 + 'px';
  }
}

function changeToStaticPositioning(elem){
  $clinit_DOM();
  elem.style['left'] = '';
  elem.style['top'] = '';
  elem.style['position'] = '';
}

defineSeed(242, 243, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]));
_.remove = function remove_2(w){
  return $remove_1(this, w);
}
;
_.setWidgetPositionImpl = function setWidgetPositionImpl(w, left, top_0){
  $setWidgetPositionImpl(w, left, top_0);
}
;
function $clinit_AttachDetachException(){
  $clinit_AttachDetachException = nullMethod;
  attachCommand = new AttachDetachException$1_0;
  detachCommand = new AttachDetachException$2_0;
}

function AttachDetachException_0(causes){
  UmbrellaException_2.call(this, causes);
}

function tryCommand(hasWidgets, c){
  $clinit_AttachDetachException();
  var caught, e, w, w$iterator;
  caught = null;
  for (w$iterator = hasWidgets.iterator(); w$iterator.hasNext();) {
    w = dynamicCast(w$iterator.next_0(), Q$Widget);
    try {
      c.execute_1(w);
    }
     catch ($e0) {
      $e0 = caught_0($e0);
      if (instanceOf($e0, Q$Throwable)) {
        e = $e0;
        !caught && (caught = new HashSet_0);
        $add_7(caught, e);
      }
       else 
        throw $e0;
    }
  }
  if (caught) {
    throw new AttachDetachException_0(caught);
  }
}

defineSeed(244, 118, makeCastMap([Q$UmbrellaException, Q$Serializable, Q$Exception, Q$Throwable]), AttachDetachException_0);
var attachCommand, detachCommand;
function AttachDetachException$1_0(){
}

defineSeed(245, 1, {}, AttachDetachException$1_0);
_.execute_1 = function execute_6(w){
  w.onAttach();
}
;
function AttachDetachException$2_0(){
}

defineSeed(246, 1, {}, AttachDetachException$2_0);
_.execute_1 = function execute_7(w){
  w.onDetach();
}
;
defineSeed(249, 168, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]));
_.onAttach = function onAttach_1(){
  var tabIndex;
  $onAttach(this);
  tabIndex = $getTabIndex(this.element);
  -1 == tabIndex && (this.element.tabIndex = 0 , undefined);
}
;
function $setText(this$static, text){
  $setInnerText(this$static.element, text);
}

function ButtonBase_0(elem){
  this.element = elem;
}

defineSeed(248, 249, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]));
function Button_0(){
  ButtonBase_0.call(this, $createPushButtonElement($doc));
  setStyleName(this.element, 'gwt-Button');
  $setInnerHTML(this.element, 'Minimize');
}

defineSeed(247, 248, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]), Button_0);
function $setCellHorizontalAlignment(td, align){
  $clinit_DOM();
  td['align'] = align.textAlignString;
}

function CellPanel_0(){
  ComplexPanel_0.call(this);
  this.table = ($clinit_DOM() , $createTableElement($doc));
  this.body_0 = $createTBodyElement($doc);
  $appendChild(this.table, ($clinit_PotentialElement() , $resolve(this.body_0)));
  $setElement(this, this.table);
}

defineSeed(250, 243, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]));
_.body_0 = null;
_.table = null;
function $setTextOrHtml(this$static, content_0, isHtml){
  isHtml?$setInnerHTML(this$static.element, content_0):$setInnerText(this$static.element, content_0);
  if (this$static.textDir != this$static.initialElementDir) {
    this$static.textDir = this$static.initialElementDir;
    setDirectionOnElement(this$static.element, this$static.initialElementDir);
  }
}

function DirectionalTextHelper_0(element){
  this.element = element;
  this.initialElementDir = getDirectionOnElement(element);
  this.textDir = this.initialElementDir;
}

defineSeed(251, 1, {}, DirectionalTextHelper_0);
_.element = null;
_.initialElementDir = null;
_.textDir = null;
function $setAutoHorizontalAlignment(this$static, autoAlignment){
  this$static.autoHorizontalAlignment = autoAlignment;
  $updateHorizontalAlignment(this$static);
}

function $updateHorizontalAlignment(this$static){
  var align;
  !this$static.autoHorizontalAlignment?(align = null):this$static.autoHorizontalAlignment?(align = this$static.autoHorizontalAlignment):(align = this$static.autoHorizontalAlignment == ($clinit_HasAutoHorizontalAlignment() , ALIGN_CONTENT_START)?startOf(this$static.directionalTextHelper.textDir):endOf(this$static.directionalTextHelper.textDir));
  if (align != this$static.horzAlign) {
    this$static.horzAlign = align;
    this$static.element.style['textAlign'] = !this$static.horzAlign?'':this$static.horzAlign.textAlignString;
  }
}

function LabelBase_0(element){
  this.element = element;
  this.directionalTextHelper = new DirectionalTextHelper_0(this.element);
}

defineSeed(254, 168, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]));
_.autoHorizontalAlignment = null;
_.directionalTextHelper = null;
_.horzAlign = null;
function Label_0(element){
  LabelBase_0.call(this, element, $equalsIgnoreCase('span', ($clinit_DOMImpl() , impl_0).getTagName(element)));
}

function Label_1(text){
  LabelBase_0.call(this, $createDivElement($doc));
  setStyleName(this.element, 'gwt-Label');
  $setTextOrHtml(this.directionalTextHelper, text, false);
  $updateHorizontalAlignment(this);
}

defineSeed(253, 254, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]), Label_1);
function HTML_0(html){
  Label_0.call(this, $createDivElement($doc));
  setStyleName(this.element, 'gwt-HTML');
  $setTextOrHtml(this.directionalTextHelper, html, true);
  $updateHorizontalAlignment(this);
}

defineSeed(252, 253, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]), HTML_0);
function $clinit_HasAutoHorizontalAlignment(){
  $clinit_HasAutoHorizontalAlignment = nullMethod;
  ALIGN_CONTENT_START = new HasHorizontalAlignment$AutoHorizontalAlignmentConstant_0;
}

var ALIGN_CONTENT_START;
function $clinit_HasHorizontalAlignment(){
  $clinit_HasHorizontalAlignment = nullMethod;
  new HasHorizontalAlignment$HorizontalAlignmentConstant_0(($clinit_Style$TextAlign() , 'center'));
  new HasHorizontalAlignment$HorizontalAlignmentConstant_0('justify');
  ALIGN_LEFT = new HasHorizontalAlignment$HorizontalAlignmentConstant_0('left');
  ALIGN_RIGHT = new HasHorizontalAlignment$HorizontalAlignmentConstant_0('right');
  ALIGN_LOCALE_START = ($clinit_LocaleInfo() , ALIGN_LEFT);
  ALIGN_LOCALE_END = ALIGN_RIGHT;
  ALIGN_DEFAULT = ALIGN_LOCALE_START;
}

var ALIGN_DEFAULT, ALIGN_LEFT, ALIGN_LOCALE_END, ALIGN_LOCALE_START, ALIGN_RIGHT;
function HasHorizontalAlignment$AutoHorizontalAlignmentConstant_0(){
}

defineSeed(255, 1, {}, HasHorizontalAlignment$AutoHorizontalAlignmentConstant_0);
function HasHorizontalAlignment$HorizontalAlignmentConstant_0(textAlignString){
  this.textAlignString = textAlignString;
}

function endOf(direction){
  return direction == ($clinit_HasDirection$Direction() , LTR)?($clinit_HasHorizontalAlignment() , ALIGN_RIGHT):direction == RTL?($clinit_HasHorizontalAlignment() , ALIGN_LEFT):($clinit_HasHorizontalAlignment() , ALIGN_LOCALE_END);
}

function startOf(direction){
  return direction == ($clinit_HasDirection$Direction() , LTR)?($clinit_HasHorizontalAlignment() , ALIGN_LEFT):direction == RTL?($clinit_HasHorizontalAlignment() , ALIGN_RIGHT):($clinit_HasHorizontalAlignment() , ALIGN_LOCALE_START);
}

defineSeed(256, 255, {}, HasHorizontalAlignment$HorizontalAlignmentConstant_0);
_.textAlignString = null;
function $clinit_HasVerticalAlignment(){
  $clinit_HasVerticalAlignment = nullMethod;
  ALIGN_BOTTOM = new HasVerticalAlignment$VerticalAlignmentConstant_0('bottom');
  new HasVerticalAlignment$VerticalAlignmentConstant_0('middle');
  ALIGN_TOP = new HasVerticalAlignment$VerticalAlignmentConstant_0('top');
}

var ALIGN_BOTTOM, ALIGN_TOP;
function HasVerticalAlignment$VerticalAlignmentConstant_0(verticalAlignString){
  this.verticalAlignString = verticalAlignString;
}

defineSeed(257, 1, {}, HasVerticalAlignment$VerticalAlignmentConstant_0);
_.verticalAlignString = null;
function $add_2(this$static, w){
  var td, td_0;
  td = (td_0 = ($clinit_DOM() , $createTDElement($doc)) , $setCellHorizontalAlignment(td_0, this$static.horzAlign) , setStyleAttribute(td_0, 'verticalAlign', this$static.vertAlign.verticalAlignString) , td_0);
  $appendChild(this$static.tableRow, ($clinit_PotentialElement() , $resolve(td)));
  $add_0(this$static, w, td);
}

function $setVerticalAlignment(this$static, align){
  this$static.vertAlign = align;
}

function HorizontalPanel_0(){
  CellPanel_0.call(this);
  this.horzAlign = ($clinit_HasHorizontalAlignment() , ALIGN_DEFAULT);
  this.vertAlign = ($clinit_HasVerticalAlignment() , ALIGN_TOP);
  this.tableRow = ($clinit_DOM() , $createTRElement($doc));
  $appendChild(this.body_0, ($clinit_PotentialElement() , $resolve(this.tableRow)));
  this.table['cellSpacing'] = '0';
  this.table['cellPadding'] = '0';
}

defineSeed(258, 250, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]), HorizontalPanel_0);
_.remove = function remove_3(w){
  var removed, td;
  td = ($clinit_DOM() , $getParentElement(w.element));
  removed = $remove_0(this, w);
  removed && $removeChild(this.tableRow, td);
  return removed;
}
;
_.tableRow = null;
function $clinit_Image(){
  $clinit_Image = nullMethod;
  new HashMap_0;
}

function $changeState(this$static, newState){
  this$static.state = newState;
}

function Image_1(){
  $clinit_Image();
  $changeState(this, new Image$UnclippedState_0(this));
  setStyleName(this.element, 'gwt-Image');
}

defineSeed(259, 168, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]), Image_1);
_.onBrowserEvent = function onBrowserEvent_0(event_0){
  ($clinit_DOM() , $eventGetTypeInt(($clinit_DOMImpl() , event_0).type)) == 32768 && !!this.state && (this.element['__gwtLastUnhandledEvent'] = '' , undefined);
  $onBrowserEvent(this, event_0);
}
;
_.onLoad = function onLoad_0(){
  $onLoad(this.state, this);
}
;
_.state = null;
function $onLoad(this$static, image){
  var unhandledEvent;
  unhandledEvent = $getPropertyString(image.element, '__gwtLastUnhandledEvent');
  $equals_0('load', unhandledEvent) && (this$static.syntheticEventCommand = new Image$State$1_0(this$static, image) , $scheduleDeferred(($clinit_SchedulerImpl() , INSTANCE), this$static.syntheticEventCommand));
}

defineSeed(260, 1, {});
_.syntheticEventCommand = null;
function Image$State$1_0(this$1, val$image){
  this.this$1 = this$1;
  this.val$image = val$image;
}

defineSeed(261, 1, {}, Image$State$1_0);
_.execute_0 = function execute_8(){
  var evt;
  if (this.val$image.state != this.this$1 || this != this.this$1.syntheticEventCommand) {
    return;
  }
  this.this$1.syntheticEventCommand = null;
  if (!this.val$image.attached) {
    this.val$image.element['__gwtLastUnhandledEvent'] = 'load';
    return;
  }
  evt = $createLoadEvent($doc);
  $dispatchEvent(this.val$image.element, evt);
}
;
_.this$1 = null;
_.val$image = null;
function $setUrl(image, url){
  !!image.state && (image.element['__gwtLastUnhandledEvent'] = '' , undefined);
  $setSrc(image.element, url.uri);
}

function Image$UnclippedState_0(image){
  $replaceElement(image, $createImageElement($doc));
  sinkEvents_0(image.element);
  image.eventsToSink == -1?sinkEvents(image.element, 133398655 | ($clinit_DOM() , image.element.__eventBits || 0)):(image.eventsToSink |= 133398655);
}

defineSeed(262, 260, {}, Image$UnclippedState_0);
function $onResize(){
  var height, style, width, winHeight, winWidth;
  style = null.nullMethod();
  winWidth = ($clinit_Window() , $getClientWidth($doc));
  winHeight = $getClientHeight($doc);
  style['display'] = ($clinit_Style$Display() , 'none');
  style['width'] = 0 + ($clinit_Style$Unit() , 'px');
  style['height'] = '0px';
  width = $getScrollWidth($doc);
  height = $getScrollHeight($doc);
  style['width'] = (width > winWidth?width:winWidth) + 'px';
  style['height'] = (height > winHeight?height:winHeight) + 'px';
  style['display'] = 'block';
}

function PopupPanel$1_0(){
}

defineSeed(263, 1, makeCastMap([Q$ResizeHandler, Q$EventHandler]), PopupPanel$1_0);
_.onResize = function onResize_1(event_0){
  $onResize();
}
;
function PopupPanel$3_0(this$0){
  this.this$0 = this$0;
}

defineSeed(264, 1, makeCastMap([Q$EventHandler, Q$Event$NativePreviewHandler]), PopupPanel$3_0);
_.onPreviewNativeEvent = function onPreviewNativeEvent_0(event_0){
  $previewNativeEvent(this.this$0, event_0);
}
;
_.this$0 = null;
function PopupPanel$4_0(this$0){
  this.this$0 = this$0;
}

defineSeed(265, 1, makeCastMap([Q$ValueChangeHandler, Q$EventHandler]), PopupPanel$4_0);
_.this$0 = null;
function $maybeShowGlass(this$static){
  if (this$static.showing) {
    if (this$static.curPanel.isGlassEnabled) {
      $appendChild($doc.body, this$static.curPanel.glass);
      ($clinit_PopupPanel() , impl_3).onShow(this$static.curPanel.glass);
      this$static.resizeRegistration = addResizeHandler(this$static.curPanel.glassResizer);
      $onResize();
      this$static.glassShowing = true;
    }
  }
   else if (this$static.glassShowing) {
    $removeChild($doc.body, this$static.curPanel.glass);
    ($clinit_PopupPanel() , impl_3).onHide(this$static.curPanel.glass);
    $removeHandler(this$static.resizeRegistration.real);
    this$static.resizeRegistration = null;
    this$static.glassShowing = false;
  }
}

function $onComplete(this$static){
  if (!this$static.showing) {
    $maybeShowGlass(this$static);
    this$static.isUnloading || $remove_1(($clinit_RootPanel() , get()), this$static.curPanel);
    ($clinit_PopupPanel() , impl_3).onHide(this$static.curPanel.element);
  }
  ($clinit_PopupPanel() , impl_3).setClip(this$static.curPanel.element, 'rect(auto, auto, auto, auto)');
  setStyleAttribute(this$static.curPanel.element, 'overflow', 'visible');
}

function $onInstantaneousRun(this$static){
  $maybeShowGlass(this$static);
  if (this$static.showing) {
    setStyleAttribute(this$static.curPanel.element, 'position', 'absolute');
    this$static.curPanel.topPosition != -1 && $setPopupPosition(this$static.curPanel, this$static.curPanel.leftPosition, this$static.curPanel.topPosition);
    $add_1(($clinit_RootPanel() , get()), this$static.curPanel);
    ($clinit_PopupPanel() , impl_3).onShow(this$static.curPanel.element);
  }
   else {
    this$static.isUnloading || $remove_1(($clinit_RootPanel() , get()), this$static.curPanel);
    ($clinit_PopupPanel() , impl_3).onHide(this$static.curPanel.element);
  }
  setStyleAttribute(this$static.curPanel.element, 'overflow', 'visible');
}

function $setState(this$static, showing, isUnloading){
  this$static.isUnloading = isUnloading;
  $cancel(this$static);
  this$static.curPanel.showing = showing;
  $updateHandlers(this$static.curPanel);
  this$static.showing = showing;
  $onInstantaneousRun(this$static);
}

function PopupPanel$ResizeAnimation_0(panel){
  Animation_0.call(this, $clinit_AnimationSchedulerImpl());
  this.curPanel = panel;
}

defineSeed(266, 3, {}, PopupPanel$ResizeAnimation_0);
_.curPanel = null;
_.glassShowing = false;
_.isUnloading = false;
_.resizeRegistration = null;
_.showing = false;
function $clinit_PotentialElement(){
  $clinit_PotentialElement = nullMethod;
  declareShim();
}

function $resolve(this$static){
  return this$static.__gwt_resolve?this$static.__gwt_resolve():this$static;
}

function declareShim(){
  var shim = function(){
  }
  ;
  shim.prototype = {className:'', clientHeight:0, clientWidth:0, dir:'', getAttribute:function(name_0, value){
    return this[name_0];
  }
  , href:'', id:'', lang:'', nodeType:1, removeAttribute:function(name_0, value){
    this[name_0] = undefined;
  }
  , setAttribute:function(name_0, value){
    this[name_0] = value;
  }
  , src:'', style:{}, title:''};
  $wnd.GwtPotentialElementShim = shim;
}

function $clinit_RootPanel(){
  $clinit_RootPanel = nullMethod;
  maybeDetachCommand = new RootPanel$1_0;
  rootPanels = new HashMap_0;
  widgetsToDetach = new HashSet_0;
}

function RootPanel_0(elem){
  ComplexPanel_0.call(this);
  this.element = elem;
  $onAttach(this);
}

function detachNow(widget){
  $clinit_RootPanel();
  try {
    widget.onDetach();
  }
   finally {
    $remove_7(widgetsToDetach, widget);
  }
}

function detachWidgets(){
  $clinit_RootPanel();
  try {
    tryCommand(widgetsToDetach, maybeDetachCommand);
  }
   finally {
    widgetsToDetach.map.clear();
    rootPanels.clear();
  }
}

function get(){
  $clinit_RootPanel();
  var rp;
  rp = dynamicCast(rootPanels.get(null), Q$RootPanel);
  if (rp) {
    return rp;
  }
  if (rootPanels.size_0() == 0) {
    addCloseHandler(new RootPanel$2_0);
    $clinit_LocaleInfo();
  }
  rp = new RootPanel$DefaultRootPanel_0;
  rootPanels.put(null, rp);
  $add_7(widgetsToDetach, rp);
  return rp;
}

defineSeed(268, 242, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$RootPanel, Q$UIObject, Q$Widget]));
var maybeDetachCommand, rootPanels, widgetsToDetach;
function RootPanel$1_0(){
}

defineSeed(269, 1, {}, RootPanel$1_0);
_.execute_1 = function execute_9(w){
  w.attached && w.onDetach();
}
;
function RootPanel$2_0(){
}

defineSeed(270, 1, makeCastMap([Q$CloseHandler, Q$EventHandler]), RootPanel$2_0);
_.onClose = function onClose_0(closeEvent){
  detachWidgets();
}
;
function RootPanel$DefaultRootPanel_0(){
  RootPanel_0.call(this, $doc.body);
}

defineSeed(271, 268, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$RootPanel, Q$UIObject, Q$Widget]), RootPanel$DefaultRootPanel_0);
_.setWidgetPositionImpl = function setWidgetPositionImpl_0(w, left, top_0){
  left -= $getBodyOffsetLeft($doc);
  top_0 -= $getBodyOffsetTop($doc);
  $setWidgetPositionImpl(w, left, top_0);
}
;
function $getMaximumHorizontalScrollPosition_0(this$static, scrollable){
  return this$static.isRtl(scrollable)?0:(scrollable.scrollWidth || 0) - scrollable.clientWidth;
}

function $getMinimumHorizontalScrollPosition_0(this$static, scrollable){
  return this$static.isRtl(scrollable)?scrollable.clientWidth - (scrollable.scrollWidth || 0):0;
}

function ScrollImpl_0(){
}

defineSeed(272, 1, {}, ScrollImpl_0);
_.initialize = function initialize(scrollable, container){
}
;
_.isRtl = function isRtl(scrollable){
  var computedStyle = $doc.defaultView.getComputedStyle(scrollable, null);
  return computedStyle.getPropertyValue('direction') == 'rtl';
}
;
var impl_7 = null;
function ScrollImpl$ScrollImplTrident_0(){
  initStaticHandlers();
}

function initStaticHandlers(){
  scrollHandler = function(){
    var scrollableElem = $wnd.event.srcElement;
    scrollableElem.__lastScrollTop = scrollableElem.scrollTop;
    scrollableElem.__lastScrollLeft = scrollableElem.scrollLeft;
  }
  ;
  resizeHandler = function(){
    var scrollableElem = $wnd.event.srcElement;
    scrollableElem.__isScrollContainer && (scrollableElem = scrollableElem.parentNode);
    setTimeout($entry(function(){
      if (scrollableElem.scrollTop != scrollableElem.__lastScrollTop || scrollableElem.scrollLeft != scrollableElem.__lastScrollLeft) {
        scrollableElem.__lastScrollTop = scrollableElem.scrollTop;
        scrollableElem.__lastScrollLeft = scrollableElem.scrollLeft;
        triggerScrollEvent(scrollableElem);
      }
    }
    ), 1);
  }
  ;
}

function triggerScrollEvent(elem){
  $dispatchEvent(elem, $createScrollEvent($doc));
}

defineSeed(273, 272, {}, ScrollImpl$ScrollImplTrident_0);
_.initialize = function initialize_0(scrollable, container){
  scrollable.__lastScrollTop = scrollable.__lastScrollLeft = 0;
  scrollable.attachEvent('onscroll', scrollHandler);
  scrollable.attachEvent('onresize', resizeHandler);
  container.attachEvent('onresize', resizeHandler);
  container.__isScrollContainer = true;
}
;
_.isRtl = function isRtl_0(scrollable){
  return scrollable.currentStyle.direction == 'rtl';
}
;
var resizeHandler = null, scrollHandler = null;
function $next(this$static){
  if (!this$static.hasElement || !this$static.this$0.widget) {
    throw new NoSuchElementException_0;
  }
  this$static.hasElement = false;
  return this$static.returned = this$static.this$0.widget;
}

function SimplePanel$1_0(this$0){
  this.this$0 = this$0;
  this.hasElement = !!this.this$0.widget;
}

defineSeed(274, 1, {}, SimplePanel$1_0);
_.hasNext = function hasNext(){
  return this.hasElement;
}
;
_.next_0 = function next_0(){
  return $next(this);
}
;
_.remove_0 = function remove_4(){
  !!this.returned && $remove(this.this$0, this.returned);
}
;
_.returned = null;
_.this$0 = null;
function $add_3(this$static, w){
  var td, tr, td_0;
  tr = ($clinit_DOM() , $createTRElement($doc));
  td = (td_0 = $createTDElement($doc) , $setCellHorizontalAlignment(td_0, this$static.horzAlign) , setStyleAttribute(td_0, 'verticalAlign', this$static.vertAlign.verticalAlignString) , td_0);
  $appendChild(tr, ($clinit_PotentialElement() , $resolve(td)));
  $appendChild(this$static.body_0, $resolve(tr));
  $add_0(this$static, w, td);
}

function VerticalPanel_0(){
  CellPanel_0.call(this);
  this.horzAlign = ($clinit_HasHorizontalAlignment() , ALIGN_DEFAULT);
  this.vertAlign = ($clinit_HasVerticalAlignment() , ALIGN_TOP);
  $clinit_DOM();
  this.table['cellSpacing'] = '0';
  this.table['cellPadding'] = '0';
}

defineSeed(275, 250, makeCastMap([Q$HasAttachHandlers, Q$HasHandlers, Q$EventListener, Q$HasVisibility, Q$IsWidget, Q$UIObject, Q$Widget]), VerticalPanel_0);
_.remove = function remove_5(w){
  var removed, td;
  td = ($clinit_DOM() , $getParentElement(w.element));
  removed = $remove_0(this, w);
  removed && $removeChild(this.body_0, $getParentElement_0(($clinit_DOMImpl() , td)));
  return removed;
}
;
function $add_4(this$static, w){
  $insert(this$static, w, this$static.size);
}

function $indexOf(this$static, w){
  var i_0;
  for (i_0 = 0; i_0 < this$static.size; ++i_0) {
    if (this$static.array[i_0] == w) {
      return i_0;
    }
  }
  return -1;
}

function $insert(this$static, w, beforeIndex){
  var i_0, newArray;
  if (beforeIndex < 0 || beforeIndex > this$static.size) {
    throw new IndexOutOfBoundsException_0;
  }
  if (this$static.size == this$static.array.length) {
    newArray = initDim(_3Lcom_google_gwt_user_client_ui_Widget_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Widget, this$static.array.length * 2, 0);
    for (i_0 = 0; i_0 < this$static.array.length; ++i_0) {
      setCheck(newArray, i_0, this$static.array[i_0]);
    }
    this$static.array = newArray;
  }
  ++this$static.size;
  for (i_0 = this$static.size - 1; i_0 > beforeIndex; --i_0) {
    setCheck(this$static.array, i_0, this$static.array[i_0 - 1]);
  }
  setCheck(this$static.array, beforeIndex, w);
}

function $remove_2(this$static, index){
  var i_0;
  if (index < 0 || index >= this$static.size) {
    throw new IndexOutOfBoundsException_0;
  }
  --this$static.size;
  for (i_0 = index; i_0 < this$static.size; ++i_0) {
    setCheck(this$static.array, i_0, this$static.array[i_0 + 1]);
  }
  setCheck(this$static.array, this$static.size, null);
}

function $remove_3(this$static, w){
  var index;
  index = $indexOf(this$static, w);
  if (index == -1) {
    throw new NoSuchElementException_0;
  }
  $remove_2(this$static, index);
}

function WidgetCollection_0(parent_0){
  this.parent_0 = parent_0;
  this.array = initDim(_3Lcom_google_gwt_user_client_ui_Widget_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Widget, 4, 0);
}

defineSeed(276, 1, {}, WidgetCollection_0);
_.iterator = function iterator_2(){
  return new WidgetCollection$WidgetIterator_0(this);
}
;
_.array = null;
_.parent_0 = null;
_.size = 0;
function $next_0(this$static){
  if (this$static.index_0 >= this$static.this$0.size) {
    throw new NoSuchElementException_0;
  }
  return this$static.this$0.array[++this$static.index_0];
}

function WidgetCollection$WidgetIterator_0(this$0){
  this.this$0 = this$0;
}

defineSeed(277, 1, {}, WidgetCollection$WidgetIterator_0);
_.hasNext = function hasNext_0(){
  return this.index_0 < this.this$0.size - 1;
}
;
_.next_0 = function next_1(){
  return $next_0(this);
}
;
_.remove_0 = function remove_6(){
  if (this.index_0 < 0 || this.index_0 >= this.this$0.size) {
    throw new IllegalStateException_0;
  }
  this.this$0.parent_0.remove(this.this$0.array[this.index_0--]);
}
;
_.index_0 = -1;
_.this$0 = null;
function $getTabIndex(elem){
  return ($clinit_DOMImpl() , impl_0).getTabIndex(elem);
}

function PopupImpl_0(){
}

defineSeed(279, 1, {}, PopupImpl_0);
_.createElement_1 = function createElement_1(){
  return $createDivElement($doc);
}
;
_.getContainerElement_0 = function getContainerElement_2(popup){
  return popup;
}
;
_.getStyleElement = function getStyleElement(popup){
  return $getParentElement_0(($clinit_DOMImpl() , popup));
}
;
_.onHide = function onHide(popup){
}
;
_.onShow = function onShow(popup){
}
;
_.setClip = function setClip(popup, rect){
  popup.style['clip'] = rect;
}
;
function PopupImplIE6_0(){
}

defineSeed(280, 279, {}, PopupImplIE6_0);
_.onHide = function onHide_0(popup){
  var frame = popup.__frame;
  if (frame) {
    frame.parentElement.removeChild(frame);
    frame.__popup = null;
    popup.__frame = null;
    popup.onresize = null;
    popup.onmove = null;
  }
}
;
_.onShow = function onShow_0(popup){
  var frame = $doc.createElement('iframe');
  frame.src = "javascript:''";
  frame.scrolling = 'no';
  frame.frameBorder = 0;
  popup.__frame = frame;
  frame.__popup = popup;
  var style = frame.style;
  style.position = 'absolute';
  style.filter = 'alpha(opacity=0)';
  style.visibility = popup.currentStyle.visibility;
  style.border = 0;
  style.padding = 0;
  style.margin = 0;
  style.left = popup.offsetLeft;
  style.top = popup.offsetTop;
  style.width = popup.offsetWidth;
  style.height = popup.offsetHeight;
  style.zIndex = popup.currentStyle.zIndex;
  popup.onmove = function(){
    frame.style.left = popup.offsetLeft;
    frame.style.top = popup.offsetTop;
  }
  ;
  popup.onresize = function(){
    frame.style.width = popup.offsetWidth;
    frame.style.height = popup.offsetHeight;
  }
  ;
  style.setExpression('zIndex', 'this.__popup.currentStyle.zIndex');
  popup.parentElement.insertBefore(frame, popup);
}
;
function $clinit_PopupImplMozilla(){
  $clinit_PopupImplMozilla = nullMethod;
  isFF2Mac = isFF2Mac_0();
}

function PopupImplMozilla_0(){
  $clinit_PopupImplMozilla();
}

function isFF2Mac_0(){
  function makeVersion(result){
    return parseInt(result[1]) * 1000 + parseInt(result[2]);
  }

  var ua = navigator.userAgent;
  if (ua.indexOf('Macintosh') != -1) {
    var result_0 = /rv:([0-9]+)\.([0-9]+)/.exec(ua);
    if (result_0 && result_0.length == 3) {
      if (makeVersion(result_0) <= 1008) {
        return true;
      }
    }
  }
  return false;
}

defineSeed(281, 279, {}, PopupImplMozilla_0);
_.createElement_1 = function createElement_2(){
  var outerElem;
  outerElem = ($clinit_DOM() , $createDivElement($doc));
  if (isFF2Mac) {
    $setInnerHTML(outerElem, '<div><\/div>');
    $scheduleDeferred(($clinit_SchedulerImpl() , INSTANCE), new PopupImplMozilla$1_0(outerElem));
  }
  return outerElem;
}
;
_.getContainerElement_0 = function getContainerElement_3(outerElem){
  return isFF2Mac?$getFirstChildElement_0(($clinit_DOMImpl() , outerElem)):outerElem;
}
;
_.getStyleElement = function getStyleElement_0(outerElem){
  return isFF2Mac?outerElem:$getParentElement_0(($clinit_DOMImpl() , outerElem));
}
;
_.setClip = function setClip_0(popup, rect){
  popup.style['clip'] = rect;
  popup.style['display'] = ($clinit_Style$Display() , 'none');
  popup.style['display'] = '';
}
;
var isFF2Mac;
function PopupImplMozilla$1_0(val$outerElem){
  this.val$outerElem = val$outerElem;
}

defineSeed(282, 1, {}, PopupImplMozilla$1_0);
_.execute_0 = function execute_10(){
  this.val$outerElem.style['overflow'] = ($clinit_Style$Overflow() , 'auto');
}
;
_.val$outerElem = null;
function $onModuleLoad_1(){
  var compileTimeValue, impl, runtimeValue;
  impl = dynamicCast(com_google_gwt_useragent_client_UserAgentAsserter_UserAgentProperty(), Q$UserAgentAsserter$UserAgentProperty);
  if (!impl.getUserAgentRuntimeWarning()) {
    return;
  }
  compileTimeValue = impl.getCompileTimeValue();
  runtimeValue = impl.getRuntimeValue();
  $equals_0(compileTimeValue, runtimeValue) || ($wnd.alert('ERROR: Possible problem with your *.gwt.xml module file.\nThe compile time user.agent value (' + compileTimeValue + ') does not match the runtime user.agent value (' + runtimeValue + '). Expect more errors.\n') , undefined);
}

function UserAgentAsserter_UserAgentPropertyImplGecko1_8_0(){
}

defineSeed(284, 1, makeCastMap([Q$UserAgentAsserter$UserAgentProperty]), UserAgentAsserter_UserAgentPropertyImplGecko1_8_0);
_.getCompileTimeValue = function getCompileTimeValue(){
  return 'gecko1_8';
}
;
_.getRuntimeValue = function getRuntimeValue(){
  var ua = navigator.userAgent.toLowerCase();
  var makeVersion = function(result){
    return parseInt(result[1]) * 1000 + parseInt(result[2]);
  }
  ;
  if (function(){
    return ua.indexOf('opera') != -1;
  }
  ())
    return 'opera';
  if (function(){
    return ua.indexOf('webkit') != -1;
  }
  ())
    return 'safari';
  if (function(){
    return ua.indexOf('msie') != -1 && $doc.documentMode >= 9;
  }
  ())
    return 'ie9';
  if (function(){
    return ua.indexOf('msie') != -1 && $doc.documentMode >= 8;
  }
  ())
    return 'ie8';
  if (function(){
    var result = /msie ([0-9]+)\.([0-9]+)/.exec(ua);
    if (result && result.length == 3)
      return makeVersion(result) >= 6000;
  }
  ())
    return 'ie6';
  if (function(){
    return ua.indexOf('gecko') != -1;
  }
  ())
    return 'gecko1_8';
  return 'unknown';
}
;
_.getUserAgentRuntimeWarning = function getUserAgentRuntimeWarning(){
  return true;
}
;
function UserAgentAsserter_UserAgentPropertyImplIe6_0(){
}

defineSeed(285, 1, makeCastMap([Q$UserAgentAsserter$UserAgentProperty]), UserAgentAsserter_UserAgentPropertyImplIe6_0);
_.getCompileTimeValue = function getCompileTimeValue_0(){
  return 'ie6';
}
;
_.getRuntimeValue = function getRuntimeValue_0(){
  var ua = navigator.userAgent.toLowerCase();
  var makeVersion = function(result){
    return parseInt(result[1]) * 1000 + parseInt(result[2]);
  }
  ;
  if (function(){
    return ua.indexOf('opera') != -1;
  }
  ())
    return 'opera';
  if (function(){
    return ua.indexOf('webkit') != -1;
  }
  ())
    return 'safari';
  if (function(){
    return ua.indexOf('msie') != -1 && $doc.documentMode >= 9;
  }
  ())
    return 'ie9';
  if (function(){
    return ua.indexOf('msie') != -1 && $doc.documentMode >= 8;
  }
  ())
    return 'ie8';
  if (function(){
    var result = /msie ([0-9]+)\.([0-9]+)/.exec(ua);
    if (result && result.length == 3)
      return makeVersion(result) >= 6000;
  }
  ())
    return 'ie6';
  if (function(){
    return ua.indexOf('gecko') != -1;
  }
  ())
    return 'gecko1_8';
  return 'unknown';
}
;
_.getUserAgentRuntimeWarning = function getUserAgentRuntimeWarning_0(){
  return true;
}
;
function UserAgentAsserter_UserAgentPropertyImplIe8_0(){
}

defineSeed(286, 1, makeCastMap([Q$UserAgentAsserter$UserAgentProperty]), UserAgentAsserter_UserAgentPropertyImplIe8_0);
_.getCompileTimeValue = function getCompileTimeValue_1(){
  return 'ie8';
}
;
_.getRuntimeValue = function getRuntimeValue_1(){
  var ua = navigator.userAgent.toLowerCase();
  var makeVersion = function(result){
    return parseInt(result[1]) * 1000 + parseInt(result[2]);
  }
  ;
  if (function(){
    return ua.indexOf('opera') != -1;
  }
  ())
    return 'opera';
  if (function(){
    return ua.indexOf('webkit') != -1;
  }
  ())
    return 'safari';
  if (function(){
    return ua.indexOf('msie') != -1 && $doc.documentMode >= 9;
  }
  ())
    return 'ie9';
  if (function(){
    return ua.indexOf('msie') != -1 && $doc.documentMode >= 8;
  }
  ())
    return 'ie8';
  if (function(){
    var result = /msie ([0-9]+)\.([0-9]+)/.exec(ua);
    if (result && result.length == 3)
      return makeVersion(result) >= 6000;
  }
  ())
    return 'ie6';
  if (function(){
    return ua.indexOf('gecko') != -1;
  }
  ())
    return 'gecko1_8';
  return 'unknown';
}
;
_.getUserAgentRuntimeWarning = function getUserAgentRuntimeWarning_1(){
  return true;
}
;
function UserAgentAsserter_UserAgentPropertyImplIe9_0(){
}

defineSeed(287, 1, makeCastMap([Q$UserAgentAsserter$UserAgentProperty]), UserAgentAsserter_UserAgentPropertyImplIe9_0);
_.getCompileTimeValue = function getCompileTimeValue_2(){
  return 'ie9';
}
;
_.getRuntimeValue = function getRuntimeValue_2(){
  var ua = navigator.userAgent.toLowerCase();
  var makeVersion = function(result){
    return parseInt(result[1]) * 1000 + parseInt(result[2]);
  }
  ;
  if (function(){
    return ua.indexOf('opera') != -1;
  }
  ())
    return 'opera';
  if (function(){
    return ua.indexOf('webkit') != -1;
  }
  ())
    return 'safari';
  if (function(){
    return ua.indexOf('msie') != -1 && $doc.documentMode >= 9;
  }
  ())
    return 'ie9';
  if (function(){
    return ua.indexOf('msie') != -1 && $doc.documentMode >= 8;
  }
  ())
    return 'ie8';
  if (function(){
    var result = /msie ([0-9]+)\.([0-9]+)/.exec(ua);
    if (result && result.length == 3)
      return makeVersion(result) >= 6000;
  }
  ())
    return 'ie6';
  if (function(){
    return ua.indexOf('gecko') != -1;
  }
  ())
    return 'gecko1_8';
  return 'unknown';
}
;
_.getUserAgentRuntimeWarning = function getUserAgentRuntimeWarning_2(){
  return true;
}
;
function UserAgentAsserter_UserAgentPropertyImplOpera_0(){
}

defineSeed(288, 1, makeCastMap([Q$UserAgentAsserter$UserAgentProperty]), UserAgentAsserter_UserAgentPropertyImplOpera_0);
_.getCompileTimeValue = function getCompileTimeValue_3(){
  return 'opera';
}
;
_.getRuntimeValue = function getRuntimeValue_3(){
  var ua = navigator.userAgent.toLowerCase();
  var makeVersion = function(result){
    return parseInt(result[1]) * 1000 + parseInt(result[2]);
  }
  ;
  if (function(){
    return ua.indexOf('opera') != -1;
  }
  ())
    return 'opera';
  if (function(){
    return ua.indexOf('webkit') != -1;
  }
  ())
    return 'safari';
  if (function(){
    return ua.indexOf('msie') != -1 && $doc.documentMode >= 9;
  }
  ())
    return 'ie9';
  if (function(){
    return ua.indexOf('msie') != -1 && $doc.documentMode >= 8;
  }
  ())
    return 'ie8';
  if (function(){
    var result = /msie ([0-9]+)\.([0-9]+)/.exec(ua);
    if (result && result.length == 3)
      return makeVersion(result) >= 6000;
  }
  ())
    return 'ie6';
  if (function(){
    return ua.indexOf('gecko') != -1;
  }
  ())
    return 'gecko1_8';
  return 'unknown';
}
;
_.getUserAgentRuntimeWarning = function getUserAgentRuntimeWarning_3(){
  return true;
}
;
function UserAgentAsserter_UserAgentPropertyImplSafari_0(){
}

defineSeed(289, 1, makeCastMap([Q$UserAgentAsserter$UserAgentProperty]), UserAgentAsserter_UserAgentPropertyImplSafari_0);
_.getCompileTimeValue = function getCompileTimeValue_4(){
  return 'safari';
}
;
_.getRuntimeValue = function getRuntimeValue_4(){
  var ua = navigator.userAgent.toLowerCase();
  var makeVersion = function(result){
    return parseInt(result[1]) * 1000 + parseInt(result[2]);
  }
  ;
  if (function(){
    return ua.indexOf('opera') != -1;
  }
  ())
    return 'opera';
  if (function(){
    return ua.indexOf('webkit') != -1;
  }
  ())
    return 'safari';
  if (function(){
    return ua.indexOf('msie') != -1 && $doc.documentMode >= 9;
  }
  ())
    return 'ie9';
  if (function(){
    return ua.indexOf('msie') != -1 && $doc.documentMode >= 8;
  }
  ())
    return 'ie8';
  if (function(){
    var result = /msie ([0-9]+)\.([0-9]+)/.exec(ua);
    if (result && result.length == 3)
      return makeVersion(result) >= 6000;
  }
  ())
    return 'ie6';
  if (function(){
    return ua.indexOf('gecko') != -1;
  }
  ())
    return 'gecko1_8';
  return 'unknown';
}
;
_.getUserAgentRuntimeWarning = function getUserAgentRuntimeWarning_4(){
  return true;
}
;
function $removeHandler(this$static){
  $doRemove(this$static.this$0, this$static.val$type, this$static.val$source, this$static.val$handler);
}

function SimpleEventBus$1_0(this$0, val$type, val$handler){
  this.this$0 = this$0;
  this.val$type = val$type;
  this.val$source = null;
  this.val$handler = val$handler;
}

defineSeed(290, 1, {}, SimpleEventBus$1_0);
_.this$0 = null;
_.val$handler = null;
_.val$source = null;
_.val$type = null;
function SimpleEventBus$2_0(this$0, val$type, val$handler){
  this.this$0 = this$0;
  this.val$type = val$type;
  this.val$source = null;
  this.val$handler = val$handler;
}

defineSeed(291, 1, makeCastMap([Q$SimpleEventBus$Command]), SimpleEventBus$2_0);
_.execute_0 = function execute_11(){
  $doAddNow(this.this$0, this.val$type, this.val$source, this.val$handler);
}
;
_.this$0 = null;
_.val$handler = null;
_.val$source = null;
_.val$type = null;
function SimpleEventBus$3_0(this$0, val$type, val$source, val$handler){
  this.this$0 = this$0;
  this.val$type = val$type;
  this.val$source = val$source;
  this.val$handler = val$handler;
}

defineSeed(292, 1, makeCastMap([Q$SimpleEventBus$Command]), SimpleEventBus$3_0);
_.execute_0 = function execute_12(){
  $doRemoveNow(this.this$0, this.val$type, this.val$source, this.val$handler);
}
;
_.this$0 = null;
_.val$handler = null;
_.val$source = null;
_.val$type = null;
function $clinit_CoordCube(){
  $clinit_CoordCube = nullMethod;
  UDSliceMove = initDims([_3_3C_classLit, _3C_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$char_$1, Q$Serializable])], [Q$char_$1, -1], [495, 18], 2, 1);
  TwistMove = initDims([_3_3C_classLit, _3C_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$char_$1, Q$Serializable])], [Q$char_$1, -1], [324, 18], 2, 1);
  FlipMove = initDims([_3_3C_classLit, _3C_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$char_$1, Q$Serializable])], [Q$char_$1, -1], [336, 18], 2, 1);
  UDSliceConj = initDims([_3_3C_classLit, _3C_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$char_$1, Q$Serializable])], [Q$char_$1, -1], [495, 8], 2, 1);
  UDSliceTwistPrun = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 20048, 1);
  UDSliceFlipPrun = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 20790, 1);
  TwistFlipPrun = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 108864, 1);
  CPermMove = initDims([_3_3C_classLit, _3C_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$char_$1, Q$Serializable])], [Q$char_$1, -1], [2768, 18], 2, 1);
  EPermMove = initDims([_3_3C_classLit, _3C_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$char_$1, Q$Serializable])], [Q$char_$1, -1], [2768, 10], 2, 1);
  MPermMove = initDims([_3_3C_classLit, _3C_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$char_$1, Q$Serializable])], [Q$char_$1, -1], [24, 10], 2, 1);
  MPermConj = initDims([_3_3C_classLit, _3C_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$char_$1, Q$Serializable])], [Q$char_$1, -1], [24, 16], 2, 1);
  MCPermPrun = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 8304, 1);
  MEPermPrun = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 8304, 1);
}

function getPruning(table, index){
  $clinit_CoordCube();
  return ~~table[~~index >> 3] >> ((index & 7) << 2) & 15;
}

function initCPermMove(){
  $clinit_CoordCube();
  var c, d, i_0, j;
  c = new CubieCube_0;
  d = new CubieCube_0;
  for (i_0 = 0; i_0 < 2768; ++i_0) {
    $setCPerm(c, ($clinit_CubieCube() , EPermS2R)[i_0]);
    for (j = 0; j < 18; ++j) {
      CornMult(c, moveCube[j], d);
      CPermMove[i_0][j] = $getCPermSym(d) & 65535;
    }
  }
}

function initEPermMove(){
  $clinit_CoordCube();
  var c, d, i_0, j;
  c = new CubieCube_0;
  d = new CubieCube_0;
  for (i_0 = 0; i_0 < 2768; ++i_0) {
    $setEPerm(c, ($clinit_CubieCube() , EPermS2R)[i_0]);
    for (j = 0; j < 10; ++j) {
      EdgeMult(c, moveCube[($clinit_Util() , ud2std)[j]], d);
      EPermMove[i_0][j] = $getEPermSym(d) & 65535;
    }
  }
}

function initFlipMove(){
  $clinit_CoordCube();
  var c, d, i_0, j;
  c = new CubieCube_0;
  d = new CubieCube_0;
  for (i_0 = 0; i_0 < 336; ++i_0) {
    $setFlip(c, ($clinit_CubieCube() , FlipS2R)[i_0]);
    for (j = 0; j < 18; ++j) {
      EdgeMult(c, moveCube[j], d);
      FlipMove[i_0][j] = $getFlipSym(d) & 65535;
    }
  }
}

function initMPermMoveConj(){
  $clinit_CoordCube();
  var c, d, i_0, j;
  c = new CubieCube_0;
  d = new CubieCube_0;
  for (i_0 = 0; i_0 < 24; ++i_0) {
    setComb(c.ep, i_0 << 9);
    for (j = 0; j < 10; ++j) {
      EdgeMult(c, ($clinit_CubieCube() , moveCube)[($clinit_Util() , ud2std)[j]], d);
      MPermMove[i_0][j] = ~~getComb(d.ep, 8) >> 9 & 65535;
    }
    for (j = 0; j < 16; ++j) {
      EdgeConjugate(c, ($clinit_CubieCube() , SymInv)[j], d);
      MPermConj[i_0][j] = ~~getComb(d.ep, 8) >> 9 & 65535;
    }
  }
}

function initRawSymPrun(PrunTable, INV_DEPTH, RawMove, RawConj, SymMove, SymState, SymSwitch, moveMap, SYM_SHIFT){
  $clinit_CoordCube();
  var N_MOVES, N_RAW, N_SIZE, N_SYM, SYM_MASK, check, depth, done, end, i_0, idx, idxx, inv, j, m_0, raw, rawx, select, sym, symState, symx, val;
  SYM_MASK = (1 << SYM_SHIFT) - 1;
  N_RAW = RawMove.length;
  N_SYM = SymMove.length;
  N_SIZE = N_RAW * N_SYM;
  N_MOVES = RawMove[0].length;
  for (i_0 = 0; i_0 < ~~((N_RAW * N_SYM + 7) / 8); ++i_0) {
    PrunTable[i_0] = -1;
  }
  PrunTable[0] ^= 15;
  depth = 0;
  done = 1;
  while (done < N_SIZE) {
    inv = depth > INV_DEPTH;
    select = inv?15:depth;
    check = inv?depth:15;
    ++depth;
    for (i_0 = 0; i_0 < N_SIZE;) {
      val = PrunTable[~~i_0 >> 3];
      if (!inv && val == -1) {
        i_0 += 8;
        continue;
      }
      for (end = i_0 + 8 < N_SIZE?i_0 + 8:N_SIZE; i_0 < end; ++i_0 , val >>= 4) {
        if ((val & 15) == select) {
          raw = i_0 % N_RAW;
          sym = ~~(i_0 / N_RAW);
          for (m_0 = 0; m_0 < N_MOVES; ++m_0) {
            symx = SymMove[sym][moveMap == null?m_0:moveMap[m_0]];
            rawx = RawConj[RawMove[raw][m_0] & 511][symx & SYM_MASK];
            symx >>>= SYM_SHIFT;
            idx = symx * N_RAW + rawx;
            if ((~~PrunTable[~~idx >> 3] >> ((idx & 7) << 2) & 15) == check) {
              ++done;
              if (inv) {
                PrunTable[~~i_0 >> 3] ^= (15 ^ depth) << ((i_0 & 7) << 2);
                break;
              }
               else {
                PrunTable[~~idx >> 3] ^= (15 ^ depth) << ((idx & 7) << 2);
                for (j = 1 , symState = SymState[symx]; (symState >>= 1) != 0; ++j) {
                  if ((symState & 1) == 1) {
                    idxx = symx * N_RAW + RawConj[rawx][j ^ (SymSwitch == null?0:SymSwitch[j])];
                    if ((~~PrunTable[~~idxx >> 3] >> ((idxx & 7) << 2) & 15) == 15) {
                      PrunTable[~~idxx >> 3] ^= (15 ^ depth) << ((idxx & 7) << 2);
                      ++done;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function initTwistFlipPrun(){
  $clinit_CoordCube();
  var check, depth, done, flip, flipx, fsym, fsymx, fsymxx, i_0, idx, idxx, inv, j, k_0, m_0, select, sym, symF, tsymx, twist, twistx;
  depth = 0;
  done = 8;
  for (i_0 = 0; i_0 < 108864; ++i_0) {
    TwistFlipPrun[i_0] = -1;
  }
  for (i_0 = 0; i_0 < 8; ++i_0) {
    setPruning(TwistFlipPrun, i_0, 0);
  }
  while (done < 870912) {
    inv = depth > 6;
    select = inv?15:depth;
    check = inv?depth:15;
    ++depth;
    for (i_0 = 0; i_0 < 870912; ++i_0) {
      if (getPruning(TwistFlipPrun, i_0) == select) {
        twist = ~~(i_0 / 2688);
        flip = i_0 % 2688;
        fsym = i_0 & 7;
        flip >>>= 3;
        for (m_0 = 0; m_0 < 18; ++m_0) {
          twistx = TwistMove[twist][m_0];
          tsymx = twistx & 7;
          twistx >>>= 3;
          flipx = FlipMove[flip][($clinit_CubieCube() , Sym8Move)[fsym][m_0]];
          fsymx = Sym8MultInv[Sym8Mult[flipx & 7][fsym]][tsymx];
          flipx >>>= 3;
          idx = twistx * 336 + flipx << 3 | fsymx;
          if (getPruning(TwistFlipPrun, idx) == check) {
            ++done;
            if (inv) {
              setPruning(TwistFlipPrun, i_0, depth);
              break;
            }
             else {
              setPruning(TwistFlipPrun, idx, depth);
              sym = SymStateTwist[twistx];
              symF = SymStateFlip[flipx];
              if (sym != 1 || symF != 1) {
                for (j = 0; j < 8; ++j , symF = ~~symF >> 1 & 65535) {
                  if ((symF & 1) == 1) {
                    fsymxx = Sym8MultInv[fsymx][j];
                    for (k_0 = 0; k_0 < 8; ++k_0) {
                      if ((sym & 1 << k_0) != 0) {
                        idxx = twistx * 2688 + (flipx << 3 | Sym8MultInv[fsymxx][k_0]);
                        if (getPruning(TwistFlipPrun, idxx) == 15) {
                          setPruning(TwistFlipPrun, idxx, depth);
                          ++done;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function initTwistMove(){
  $clinit_CoordCube();
  var c, d, i_0, j;
  c = new CubieCube_0;
  d = new CubieCube_0;
  for (i_0 = 0; i_0 < 324; ++i_0) {
    $setTwist(c, ($clinit_CubieCube() , TwistS2R)[i_0]);
    for (j = 0; j < 18; ++j) {
      CornMult(c, moveCube[j], d);
      TwistMove[i_0][j] = $getTwistSym(d) & 65535;
    }
  }
}

function initUDSliceMoveConj(){
  $clinit_CoordCube();
  var c, cx, d, i_0, j, k_0, udslice;
  c = new CubieCube_0;
  d = new CubieCube_0;
  for (i_0 = 0; i_0 < 495; ++i_0) {
    setComb(c.ep, i_0);
    for (j = 0; j < 18; j += 3) {
      EdgeMult(c, ($clinit_CubieCube() , moveCube)[j], d);
      UDSliceMove[i_0][j] = getComb(d.ep, 8) & 65535;
    }
    for (j = 0; j < 16; j += 2) {
      EdgeConjugate(c, ($clinit_CubieCube() , SymInv)[j], d);
      UDSliceConj[i_0][~~j >>> 1] = getComb(d.ep, 8) & 511 & 65535;
    }
  }
  for (i_0 = 0; i_0 < 495; ++i_0) {
    for (j = 0; j < 18; j += 3) {
      udslice = UDSliceMove[i_0][j];
      for (k_0 = 1; k_0 < 3; ++k_0) {
        cx = UDSliceMove[udslice & 511][j];
        udslice = ($clinit_Util() , permMult)[~~udslice >>> 9][~~cx >>> 9] << 9 | cx & 511;
        UDSliceMove[i_0][j + k_0] = udslice & 65535;
      }
    }
  }
}

function setPruning(table, index, value){
  table[~~index >> 3] ^= (15 ^ value) << ((index & 7) << 2);
}

var CPermMove, EPermMove, FlipMove, MCPermPrun, MEPermPrun, MPermConj, MPermMove, TwistFlipPrun, TwistMove, UDSliceConj, UDSliceFlipPrun, UDSliceMove, UDSliceTwistPrun;
function $clinit_CubieCube(){
  $clinit_CubieCube = nullMethod;
  var m_0, urfIdx, urfMoveArr, urfMoveArrInv;
  CubeSym = initDim(_3Lcs_min2phase_CubieCube_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$CubieCube, 16, 0);
  moveCube = initDim(_3Lcs_min2phase_CubieCube_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$CubieCube, 18, 0);
  SymInv = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 16, 1);
  SymMult = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [16, 16], 2, 1);
  SymMove_0 = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [16, 18], 2, 1);
  Sym8Mult = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [8, 8], 2, 1);
  Sym8Move = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [8, 18], 2, 1);
  Sym8MultInv = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [8, 8], 2, 1);
  SymMoveUD = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [16, 10], 2, 1);
  FlipS2R = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 336, 1);
  TwistS2R = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 324, 1);
  EPermS2R = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 2768, 1);
  e2c = initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [0, 0, 0, 0, 1, 3, 1, 3, 1, 3, 1, 3, 0, 0, 0, 0]);
  MtoEPerm = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 40320, 1);
  SymStateTwist = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 324, 1);
  SymStateFlip = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 336, 1);
  SymStatePerm = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 2768, 1);
  urf1 = new CubieCube_1(2531, 1373, 67026819, 1367);
  urf2 = new CubieCube_1(2089, 1906, 322752913, 2040);
  urfMove = initValues(_3_3B_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$byte_$1, [initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [6, 7, 8, 0, 1, 2, 3, 4, 5, 15, 16, 17, 9, 10, 11, 12, 13, 14]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [3, 4, 5, 6, 7, 8, 0, 1, 2, 12, 13, 14, 15, 16, 17, 9, 10, 11]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [2, 1, 0, 5, 4, 3, 8, 7, 6, 11, 10, 9, 14, 13, 12, 17, 16, 15]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [8, 7, 6, 2, 1, 0, 5, 4, 3, 17, 16, 15, 11, 10, 9, 14, 13, 12]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [5, 4, 3, 8, 7, 6, 2, 1, 0, 14, 13, 12, 17, 16, 15, 11, 10, 9])]);
  urfMoveInv = initDim(_3_3B_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$byte_$1, urfMove.length, 0);
  for (urfIdx = 0; urfIdx < urfMove.length; ++urfIdx) {
    urfMoveArr = urfMove[urfIdx];
    urfMoveArrInv = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, urfMoveArr.length, 1);
    urfMoveInv[urfIdx] = urfMoveArrInv;
    for (m_0 = 0; m_0 < urfMoveArr.length; ++m_0) {
      urfMoveArrInv[urfMoveArr[m_0]] = m_0;
    }
  }
}

function $$init(this$static){
  this$static.cp = initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [0, 1, 2, 3, 4, 5, 6, 7]);
  this$static.co = initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [0, 0, 0, 0, 0, 0, 0, 0]);
  this$static.ep = initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  this$static.eo = initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

function $copy(this$static, c){
  var i_0;
  for (i_0 = 0; i_0 < 8; ++i_0) {
    this$static.cp[i_0] = c.cp[i_0];
    this$static.co[i_0] = c.co[i_0];
  }
  for (i_0 = 0; i_0 < 12; ++i_0) {
    this$static.ep[i_0] = c.ep[i_0];
    this$static.eo[i_0] = c.eo[i_0];
  }
}

function $getCPermSym(this$static){
  var idx, k_0;
  if (EPermR2S != null) {
    idx = EPermR2S[get8Perm(this$static.cp)];
    idx ^= e2c[idx & 15];
    return idx;
  }
  !this$static.temps && (this$static.temps = new CubieCube_0);
  for (k_0 = 0; k_0 < 16; ++k_0) {
    CornConjugate(this$static, SymInv[k_0], this$static.temps);
    idx = binarySearch(EPermS2R, get8Perm(this$static.temps.cp));
    if (idx != 65535) {
      return idx << 4 | k_0;
    }
  }
  return 0;
}

function $getEPermSym(this$static){
  var idx, k_0;
  if (EPermR2S != null) {
    return EPermR2S[get8Perm(this$static.ep)];
  }
  !this$static.temps && (this$static.temps = new CubieCube_0);
  for (k_0 = 0; k_0 < 16; ++k_0) {
    EdgeConjugate(this$static, SymInv[k_0], this$static.temps);
    idx = binarySearch(EPermS2R, get8Perm(this$static.temps.ep));
    if (idx != 65535) {
      return idx << 4 | k_0;
    }
  }
  return 0;
}

function $getFlip(this$static){
  var i_0, idx;
  idx = 0;
  for (i_0 = 0; i_0 < 11; ++i_0) {
    idx <<= 1;
    idx |= this$static.eo[i_0];
  }
  return idx;
}

function $getFlipSym(this$static){
  var idx, k_0;
  if (FlipR2S != null) {
    return FlipR2S[$getFlip(this$static)];
  }
  !this$static.temps && (this$static.temps = new CubieCube_0);
  for (k_0 = 0; k_0 < 16; k_0 += 2) {
    EdgeConjugate(this$static, SymInv[k_0], this$static.temps);
    idx = binarySearch(FlipS2R, $getFlip(this$static.temps));
    if (idx != 65535) {
      return idx << 3 | ~~k_0 >> 1;
    }
  }
  return 0;
}

function $getTwist(this$static){
  var i_0, idx;
  idx = 0;
  for (i_0 = 0; i_0 < 7; ++i_0) {
    idx *= 3;
    idx += this$static.co[i_0];
  }
  return idx;
}

function $getTwistSym(this$static){
  var idx, k_0;
  if (TwistR2S != null) {
    return TwistR2S[$getTwist(this$static)];
  }
  !this$static.temps && (this$static.temps = new CubieCube_0);
  for (k_0 = 0; k_0 < 16; k_0 += 2) {
    CornConjugate(this$static, SymInv[k_0], this$static.temps);
    idx = binarySearch(TwistS2R, $getTwist(this$static.temps));
    if (idx != 65535) {
      return idx << 3 | ~~k_0 >> 1;
    }
  }
  return 0;
}

function $invCubieCube(this$static){
  var corn, edge, ori;
  for (edge = 0; edge < 12; ++edge)
    this$static.temps.ep[this$static.ep[edge]] = edge;
  for (edge = 0; edge < 12; ++edge)
    this$static.temps.eo[edge] = this$static.eo[this$static.temps.ep[edge]];
  for (corn = 0; corn < 8; ++corn)
    this$static.temps.cp[this$static.cp[corn]] = corn;
  for (corn = 0; corn < 8; ++corn) {
    ori = this$static.co[this$static.temps.cp[corn]];
    this$static.temps.co[corn] = -ori;
    this$static.temps.co[corn] < 0 && (this$static.temps.co[corn] = ~~(this$static.temps.co[corn] + 3 << 24) >> 24);
  }
  $copy(this$static, this$static.temps);
}

function $setCPerm(this$static, idx){
  set8Perm(this$static.cp, idx);
}

function $setEPerm(this$static, idx){
  set8Perm(this$static.ep, idx);
}

function $setFlip(this$static, idx){
  var i_0, parity;
  parity = 0;
  for (i_0 = 10; i_0 >= 0; --i_0) {
    parity ^= this$static.eo[i_0] = ~~((idx & 1) << 24) >> 24;
    idx >>= 1;
  }
  this$static.eo[11] = ~~(parity << 24) >> 24;
}

function $setTwist(this$static, idx){
  var i_0, twst;
  twst = 0;
  for (i_0 = 6; i_0 >= 0; --i_0) {
    twst += this$static.co[i_0] = ~~(idx % 3 << 24) >> 24;
    idx = ~~(idx / 3);
  }
  this$static.co[7] = ~~((15 - twst) % 3 << 24) >> 24;
}

function $verify(this$static){
  var c, cornMask, e, edgeMask, i_0, sum;
  sum = 0;
  edgeMask = 0;
  for (e = 0; e < 12; ++e)
    edgeMask |= 1 << this$static.ep[e];
  if (edgeMask != 4095)
    return -2;
  for (i_0 = 0; i_0 < 12; ++i_0)
    sum ^= this$static.eo[i_0];
  if (sum % 2 != 0)
    return -3;
  cornMask = 0;
  for (c = 0; c < 8; ++c)
    cornMask |= 1 << this$static.cp[c];
  if (cornMask != 255)
    return -4;
  sum = 0;
  for (i_0 = 0; i_0 < 8; ++i_0)
    sum += this$static.co[i_0];
  if (sum % 3 != 0)
    return -5;
  if ((getNParity(getNPerm(this$static.ep, 12), 12) ^ getNParity(get8Perm(this$static.cp), 8)) != 0)
    return -6;
  return 0;
}

function CornConjugate(a, idx, b){
  var corn, oriA, oriB, s, sinv;
  sinv = CubeSym[SymInv[idx]];
  s = CubeSym[idx];
  for (corn = 0; corn < 8; ++corn) {
    b.cp[corn] = sinv.cp[a.cp[s.cp[corn]]];
    oriA = sinv.co[a.cp[s.cp[corn]]];
    oriB = a.co[s.cp[corn]];
    b.co[corn] = ~~((oriA < 3?oriB:(3 - oriB) % 3) << 24) >> 24;
  }
}

function CornMult(a, b, prod){
  $clinit_CubieCube();
  var corn, ori, oriA, oriB;
  for (corn = 0; corn < 8; ++corn) {
    prod.cp[corn] = a.cp[b.cp[corn]];
    oriA = a.co[b.cp[corn]];
    oriB = b.co[corn];
    ori = oriA;
    ori = ~~(ori + (oriA < 3?oriB:6 - oriB) << 24) >> 24;
    ori = ~~(ori % 3 << 24) >> 24;
    oriA >= 3 ^ oriB >= 3 && (ori = ~~(ori + 3 << 24) >> 24);
    prod.co[corn] = ori;
  }
}

function CubieCube_0(){
  $clinit_CubieCube();
  $$init(this);
}

function CubieCube_1(cperm, twist, eperm, flip){
  $clinit_CubieCube();
  $$init(this);
  set8Perm(this.cp, cperm);
  $setTwist(this, twist);
  setNPerm(this.ep, eperm, 12);
  $setFlip(this, flip);
}

function CubieCube_2(c){
  $$init(this);
  $copy(this, c);
}

function EdgeConjugate(a, idx, b){
  $clinit_CubieCube();
  var ed, s, sinv;
  sinv = CubeSym[SymInv[idx]];
  s = CubeSym[idx];
  for (ed = 0; ed < 12; ++ed) {
    b.ep[ed] = sinv.ep[a.ep[s.ep[ed]]];
    b.eo[ed] = ~~((s.eo[ed] ^ a.eo[s.ep[ed]] ^ sinv.eo[a.ep[s.ep[ed]]]) << 24) >> 24;
  }
}

function EdgeMult(a, b, prod){
  $clinit_CubieCube();
  var ed;
  for (ed = 0; ed < 12; ++ed) {
    prod.ep[ed] = a.ep[b.ep[ed]];
    prod.eo[ed] = ~~((b.eo[ed] ^ a.eo[b.ep[ed]]) << 24) >> 24;
  }
}

function initFlipSym2Raw(){
  $clinit_CubieCube();
  var c, count, d, i_0, idx, occ, s;
  c = new CubieCube_0;
  d = new CubieCube_0;
  occ = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 64, 1);
  count = 0;
  for (i_0 = 0; i_0 < 64; occ[i_0++] = 0)
  ;
  FlipR2S = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 2048, 1);
  for (i_0 = 0; i_0 < 2048; ++i_0) {
    if ((occ[~~i_0 >> 5] & 1 << (i_0 & 31)) == 0) {
      $setFlip(c, i_0);
      for (s = 0; s < 16; s += 2) {
        EdgeConjugate(c, s, d);
        idx = $getFlip(d);
        idx == i_0 && (SymStateFlip[count] = (SymStateFlip[count] | 1 << (~~s >> 1)) & 65535);
        occ[~~idx >> 5] |= 1 << (idx & 31);
        FlipR2S[idx] = (count << 3 | ~~s >> 1) & 65535;
      }
      FlipS2R[count++] = i_0 & 65535;
    }
  }
}

function initMove(){
  $clinit_CubieCube();
  var a, p_0;
  moveCube[0] = new CubieCube_1(15120, 0, 119750400, 0);
  moveCube[3] = new CubieCube_1(21021, 1494, 323403417, 0);
  moveCube[6] = new CubieCube_1(8064, 1236, 29441808, 550);
  moveCube[9] = new CubieCube_1(9, 0, 5880, 0);
  moveCube[12] = new CubieCube_1(1230, 412, 2949660, 0);
  moveCube[15] = new CubieCube_1(224, 137, 328552, 137);
  for (a = 0; a < 18; a += 3) {
    for (p_0 = 0; p_0 < 2; ++p_0) {
      moveCube[a + p_0 + 1] = new CubieCube_0;
      EdgeMult(moveCube[a + p_0], moveCube[a], moveCube[a + p_0 + 1]);
      CornMult(moveCube[a + p_0], moveCube[a], moveCube[a + p_0 + 1]);
    }
  }
}

function initPermSym2Raw(){
  $clinit_CubieCube();
  var a, b, c, count, d, i_0, idx, m_0, occ, s;
  c = new CubieCube_0;
  d = new CubieCube_0;
  occ = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 1260, 1);
  count = 0;
  for (i_0 = 0; i_0 < 1260; occ[i_0++] = 0)
  ;
  EPermR2S = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 40320, 1);
  for (i_0 = 0; i_0 < 40320; ++i_0) {
    if ((occ[~~i_0 >> 5] & 1 << (i_0 & 31)) == 0) {
      set8Perm(c.ep, i_0);
      for (s = 0; s < 16; ++s) {
        EdgeConjugate(c, s, d);
        idx = get8Perm(d.ep);
        idx == i_0 && (SymStatePerm[count] = (SymStatePerm[count] | 1 << s) & 65535);
        occ[~~idx >> 5] |= 1 << (idx & 31);
        a = getComb(d.ep, 0);
        b = ~~getComb(d.ep, 4) >> 9;
        m_0 = 494 - (a & 511) + (~~a >> 9) * 70 + b * 1680;
        MtoEPerm[m_0] = EPermR2S[idx] = (count << 4 | s) & 65535;
      }
      EPermS2R[count++] = i_0 & 65535;
    }
  }
}

function initSym(){
  $clinit_CubieCube();
  var c, d, f2, i_0, j, k_0, lr2, m_0, s, t, u4;
  c = new CubieCube_0;
  d = new CubieCube_0;
  f2 = new CubieCube_1(28783, 0, 259268407, 0);
  u4 = new CubieCube_1(15138, 0, 119765538, 7);
  lr2 = new CubieCube_1(5167, 0, 83473207, 0);
  lr2.co = initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [3, 3, 3, 3, 3, 3, 3, 3]);
  for (i_0 = 0; i_0 < 16; ++i_0) {
    CubeSym[i_0] = new CubieCube_2(c);
    CornMult(c, u4, d);
    EdgeMult(c, u4, d);
    t = d;
    d = c;
    c = t;
    if (i_0 % 4 == 3) {
      CornMult(t, lr2, d);
      EdgeMult(t, lr2, d);
      t = d;
      d = c;
      c = t;
    }
    if (i_0 % 8 == 7) {
      CornMult(t, f2, d);
      EdgeMult(t, f2, d);
      t = d;
      d = c;
      c = t;
    }
  }
  for (i_0 = 0; i_0 < 16; ++i_0) {
    for (j = 0; j < 16; ++j) {
      CornMult(CubeSym[i_0], CubeSym[j], c);
      for (k_0 = 0; k_0 < 16; ++k_0) {
        if (CubeSym[k_0].cp[0] == c.cp[0] && CubeSym[k_0].cp[1] == c.cp[1] && CubeSym[k_0].cp[2] == c.cp[2]) {
          SymMult[i_0][j] = k_0;
          k_0 == 0 && (SymInv[i_0] = j);
          break;
        }
      }
    }
  }
  for (j = 0; j < 18; ++j) {
    for (s = 0; s < 16; ++s) {
      CornConjugate(moveCube[j], SymInv[s], c);
      CONTINUE: for (m_0 = 0; m_0 < 18; ++m_0) {
        for (i_0 = 0; i_0 < 8; i_0 += 2) {
          if (c.cp[i_0] != moveCube[m_0].cp[i_0]) {
            continue CONTINUE;
          }
        }
        SymMove_0[s][j] = m_0;
        break;
      }
    }
  }
  for (j = 0; j < 10; ++j) {
    for (s = 0; s < 16; ++s) {
      SymMoveUD[s][j] = ($clinit_Util() , std2ud)[SymMove_0[s][ud2std[j]]];
    }
  }
  for (j = 0; j < 8; ++j) {
    for (s = 0; s < 8; ++s) {
      Sym8Mult[j][s] = ~~SymMult[j << 1][s << 1] >> 1;
      Sym8MultInv[j][s] = ~~SymMult[j << 1][SymInv[s << 1]] >> 1;
    }
  }
  for (j = 0; j < 18; ++j) {
    for (s = 0; s < 8; ++s) {
      Sym8Move[s][j] = SymMove_0[s << 1][j];
    }
  }
}

function initTwistSym2Raw(){
  $clinit_CubieCube();
  var c, count, d, i_0, idx, occ, s;
  c = new CubieCube_0;
  d = new CubieCube_0;
  occ = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 69, 1);
  count = 0;
  for (i_0 = 0; i_0 < 69; occ[i_0++] = 0)
  ;
  TwistR2S = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 2187, 1);
  for (i_0 = 0; i_0 < 2187; ++i_0) {
    if ((occ[~~i_0 >> 5] & 1 << (i_0 & 31)) == 0) {
      $setTwist(c, i_0);
      for (s = 0; s < 16; s += 2) {
        CornConjugate(c, s, d);
        idx = $getTwist(d);
        idx == i_0 && (SymStateTwist[count] = (SymStateTwist[count] | 1 << (~~s >> 1)) & 65535);
        occ[~~idx >> 5] |= 1 << (idx & 31);
        TwistR2S[idx] = (count << 3 | ~~s >> 1) & 65535;
      }
      TwistS2R[count++] = i_0 & 65535;
    }
  }
}

defineSeed(294, 1, makeCastMap([Q$CubieCube]), CubieCube_0, CubieCube_1, CubieCube_2);
_.temps = null;
var CubeSym, EPermR2S = null, EPermS2R, FlipR2S = null, FlipS2R, MtoEPerm, Sym8Move, Sym8Mult, Sym8MultInv, SymInv, SymMove_0, SymMoveUD, SymMult, SymStateFlip, SymStatePerm, SymStateTwist, TwistR2S = null, TwistS2R, e2c, moveCube, urf1, urf2, urfMove, urfMoveInv;
function $initPhase2(this$static){
  var cidx, csym, cx, d4e, depth2, edge, esym, firstAxisRestrictionUd, i_0, lm, m_0, mid, prun, u4e;
  if (gte_0(($clinit_System() , fromDouble(currentTimeMillis0())), this$static.solution == null?this$static.timeOut:this$static.timeMin)) {
    return 0;
  }
  this$static.valid2 = min(this$static.valid2, this$static.valid1);
  cidx = ~~this$static.corn[this$static.valid1] >>> 4;
  csym = this$static.corn[this$static.valid1] & 15;
  for (i_0 = this$static.valid1; i_0 < this$static.depth1; ++i_0) {
    m_0 = this$static.move[i_0];
    cidx = ($clinit_CoordCube() , CPermMove)[cidx][($clinit_CubieCube() , SymMove_0)[csym][m_0]];
    csym = SymMult[cidx & 15][csym];
    cidx >>>= 4;
    this$static.corn[i_0 + 1] = cidx << 4 | csym;
    cx = UDSliceMove[this$static.mid4[i_0] & 511][m_0];
    this$static.mid4[i_0 + 1] = ($clinit_Util() , permMult)[~~this$static.mid4[i_0] >>> 9][~~cx >>> 9] << 9 | cx & 511;
  }
  this$static.valid1 = this$static.depth1;
  mid = ~~this$static.mid4[this$static.depth1] >>> 9;
  prun = getPruning(($clinit_CoordCube() , MCPermPrun), cidx * 24 + MPermConj[mid][csym]);
  if (prun >= this$static.maxDep2) {
    return prun > this$static.maxDep2?2:1;
  }
  u4e = ~~this$static.ud8e[this$static.valid2] >>> 16;
  d4e = this$static.ud8e[this$static.valid2] & 65535;
  for (i_0 = this$static.valid2; i_0 < this$static.depth1; ++i_0) {
    m_0 = this$static.move[i_0];
    cx = UDSliceMove[u4e & 511][m_0];
    u4e = ($clinit_Util() , permMult)[~~u4e >>> 9][~~cx >>> 9] << 9 | cx & 511;
    cx = UDSliceMove[d4e & 511][m_0];
    d4e = permMult[~~d4e >>> 9][~~cx >>> 9] << 9 | cx & 511;
    this$static.ud8e[i_0 + 1] = u4e << 16 | d4e;
  }
  this$static.valid2 = this$static.depth1;
  edge = ($clinit_CubieCube() , MtoEPerm)[494 - (u4e & 511) + (~~u4e >>> 9) * 70 + (~~d4e >>> 9) * 1680];
  esym = edge & 15;
  edge >>>= 4;
  prun = max(getPruning(MEPermPrun, edge * 24 + MPermConj[mid][esym]), prun);
  if (prun >= this$static.maxDep2) {
    return prun > this$static.maxDep2?2:1;
  }
  firstAxisRestrictionUd = this$static.firstAxisRestriction == -1?10:($clinit_Util() , std2ud)[~~(urfMoveInv[this$static.urfIdx][this$static.firstAxisRestriction] / 3) * 3 + 1];
  lm = this$static.depth1 == 0?firstAxisRestrictionUd:($clinit_Util() , std2ud)[~~(this$static.move[this$static.depth1 - 1] / 3) * 3 + 1];
  for (depth2 = prun; depth2 < this$static.maxDep2; ++depth2) {
    if ($phase2(this$static, edge, esym, cidx, csym, mid, depth2, this$static.depth1, lm)) {
      this$static.sol = this$static.depth1 + depth2;
      this$static.maxDep2 = min(12, this$static.sol - this$static.depth1);
      this$static.solution = $solutionToString(this$static);
      return gte_0(fromDouble(currentTimeMillis0()), this$static.timeMin)?0:1;
    }
  }
  return 1;
}

function $phase1(this$static, twist, tsym, flip, fsym, slice, maxl, lastAxis){
  var axis, flipx, fsymx, m_0, power, prun, ret, slicex, tsymx, twistx;
  if (twist == 0 && flip == 0 && slice == 0 && maxl < 5) {
    return maxl == 0?$initPhase2(this$static):1;
  }
  for (axis = 0; axis < 18; axis += 3) {
    if (axis == lastAxis || axis == lastAxis - 9) {
      continue;
    }
    for (power = 0; power < 3; ++power) {
      m_0 = axis + power;
      slicex = ($clinit_CoordCube() , UDSliceMove)[slice][m_0] & 511;
      twistx = TwistMove[twist][($clinit_CubieCube() , Sym8Move)[tsym][m_0]];
      tsymx = Sym8Mult[twistx & 7][tsym];
      twistx >>>= 3;
      prun = getPruning(UDSliceTwistPrun, twistx * 495 + UDSliceConj[slicex][tsymx]);
      if (prun > maxl) {
        break;
      }
       else if (prun == maxl) {
        continue;
      }
      flipx = FlipMove[flip][Sym8Move[fsym][m_0]];
      fsymx = Sym8Mult[flipx & 7][fsym];
      flipx >>>= 3;
      prun = getPruning(TwistFlipPrun, twistx * 336 + flipx << 3 | Sym8MultInv[fsymx][tsymx]);
      if (prun > maxl) {
        break;
      }
       else if (prun == maxl) {
        continue;
      }
      prun = getPruning(UDSliceFlipPrun, flipx * 495 + UDSliceConj[slicex][fsymx]);
      if (prun > maxl) {
        break;
      }
       else if (prun == maxl) {
        continue;
      }
      this$static.move[this$static.depth1 - maxl] = m_0;
      this$static.valid1 = min(this$static.valid1, this$static.depth1 - maxl);
      ret = $phase1(this$static, twistx, tsymx, flipx, fsymx, slicex, maxl - 1, axis);
      if (ret != 1) {
        return ~~ret >> 1;
      }
    }
  }
  return 1;
}

function $phase2(this$static, eidx, esym, cidx, csym, mid, maxl, depth, lm){
  var cidxx, csymx, eidxx, esymx, lastAxis, m_0, midx, stdLm;
  if (maxl == 0) {
    if (this$static.lastAxisRestriction != -1) {
      stdLm = ($clinit_CubieCube() , urfMove)[this$static.urfIdx][($clinit_Util() , ud2std)[lm]];
      lastAxis = ~~(stdLm / 3) * 3;
      if (this$static.lastAxisRestriction == lastAxis || this$static.lastAxisRestriction == lastAxis + 9) {
        return false;
      }
    }
    return eidx == 0 && cidx == 0 && mid == 0;
  }
  for (m_0 = 0; m_0 < 10; ++m_0) {
    if (($clinit_Util() , ckmv2)[lm][m_0]) {
      continue;
    }
    midx = ($clinit_CoordCube() , MPermMove)[mid][m_0];
    cidxx = CPermMove[cidx][($clinit_CubieCube() , SymMove_0)[csym][ud2std[m_0]]];
    csymx = SymMult[cidxx & 15][csym];
    cidxx >>>= 4;
    if (getPruning(MCPermPrun, cidxx * 24 + MPermConj[midx][csymx]) >= maxl) {
      continue;
    }
    eidxx = EPermMove[eidx][SymMoveUD[esym][m_0]];
    esymx = SymMult[eidxx & 15][esym];
    eidxx >>>= 4;
    if (getPruning(MEPermPrun, eidxx * 24 + MPermConj[midx][esymx]) >= maxl) {
      continue;
    }
    if ($phase2(this$static, eidxx, esymx, cidxx, csymx, midx, maxl - 1, depth + 1, m_0)) {
      this$static.move[depth] = ud2std[m_0];
      return true;
    }
  }
  return false;
}

function $solution(this$static, facelets, maxDepth, timeOut, timeMin, verbose, firstAxisRestrictionStr, lastAxisRestrictionStr){
  var check;
  check = $verify_0(this$static, facelets);
  if (check != 0) {
    return 'Error ' + (check < 0?-check:check);
  }
  this$static.sol = maxDepth + 1;
  this$static.timeOut = add(($clinit_System() , fromDouble(currentTimeMillis0())), timeOut);
  this$static.timeMin = add(this$static.timeOut, lt(sub(timeMin, timeOut), P0_longLit)?sub(timeMin, timeOut):P0_longLit);
  this$static.verbose = verbose;
  this$static.solution = null;
  this$static.firstAxisRestriction = -1;
  this$static.lastAxisRestriction = -1;
  if (firstAxisRestrictionStr != null) {
    if (!($clinit_Util() , str2move).containsKey(firstAxisRestrictionStr)) {
      return 'Error 9';
    }
    this$static.firstAxisRestriction = dynamicCast(str2move.get(firstAxisRestrictionStr), Q$Integer).value;
    if (this$static.firstAxisRestriction % 3 != 0) {
      return 'Error 9';
    }
    this$static.firstAxisRestriction - 9 < 0 && (this$static.firstAxisRestriction += 9);
  }
  if (lastAxisRestrictionStr != null) {
    if (!($clinit_Util() , str2move).containsKey(lastAxisRestrictionStr)) {
      return 'Error 9';
    }
    this$static.lastAxisRestriction = dynamicCast(str2move.get(lastAxisRestrictionStr), Q$Integer).value;
    if (this$static.lastAxisRestriction % 3 != 0) {
      return 'Error 9';
    }
    this$static.lastAxisRestriction - 9 < 0 && (this$static.lastAxisRestriction += 9);
  }
  return $solve(this$static, this$static.cc);
}

function $solutionToString(this$static){
  var s, sb, urf;
  sb = new StringBuffer_0;
  urf = (this$static.verbose & 2) != 0?(this$static.urfIdx + 3) % 6:this$static.urfIdx;
  if (urf < 3) {
    for (s = 0; s < this$static.depth1; ++s) {
      $append($append_2(sb, ($clinit_Util() , move2str_0)[($clinit_CubieCube() , urfMove)[urf][this$static.move[s]]]));
    }
    (this$static.verbose & 1) != 0 && (sb.impl.append_2(sb.data, '.  ') , sb);
    for (s = this$static.depth1; s < this$static.sol; ++s) {
      $append($append_2(sb, ($clinit_Util() , move2str_0)[($clinit_CubieCube() , urfMove)[urf][this$static.move[s]]]));
    }
  }
   else {
    for (s = this$static.sol - 1; s >= this$static.depth1; --s) {
      $append($append_2(sb, ($clinit_Util() , move2str_0)[($clinit_CubieCube() , urfMove)[urf][this$static.move[s]]]));
    }
    (this$static.verbose & 1) != 0 && (sb.impl.append_2(sb.data, '.  ') , sb);
    for (s = this$static.depth1 - 1; s >= 0; --s) {
      $append($append_2(sb, ($clinit_Util() , move2str_0)[($clinit_CubieCube() , urfMove)[urf][this$static.move[s]]]));
    }
  }
  (this$static.verbose & 4) != 0 && $append_2($append_0((sb.impl.append_2(sb.data, '(') , sb), this$static.sol), 'f)');
  return sb.impl.toString_0(sb.data);
}

function $solve(this$static, c){
  var conjMask, i_0, j, lm;
  init_3();
  conjMask = 0;
  for (i_0 = 0; i_0 < 6; ++i_0) {
    this$static.twist[i_0] = $getTwistSym(c);
    this$static.flip[i_0] = $getFlipSym(c);
    this$static.slice_0[i_0] = getComb(c.ep, 8);
    this$static.corn0[i_0] = $getCPermSym(c);
    this$static.ud8e0[i_0] = getComb(c.ep, 0) << 16 | getComb(c.ep, 4);
    for (j = 0; j < i_0; ++j) {
      if (this$static.twist[i_0] == this$static.twist[j] && this$static.flip[i_0] == this$static.flip[j] && this$static.slice_0[i_0] == this$static.slice_0[j] && this$static.corn0[i_0] == this$static.corn0[j] && this$static.ud8e0[i_0] == this$static.ud8e0[j]) {
        conjMask |= 1 << i_0;
        break;
      }
    }
    (conjMask & 1 << i_0) == 0 && (this$static.prun[i_0] = max(max(getPruning(($clinit_CoordCube() , UDSliceTwistPrun), (~~this$static.twist[i_0] >>> 3) * 495 + UDSliceConj[this$static.slice_0[i_0] & 511][this$static.twist[i_0] & 7]), getPruning(UDSliceFlipPrun, (~~this$static.flip[i_0] >>> 3) * 495 + UDSliceConj[this$static.slice_0[i_0] & 511][this$static.flip[i_0] & 7])), getPruning(TwistFlipPrun, (~~this$static.twist[i_0] >>> 3) * 2688 + (this$static.flip[i_0] & 65528 | ($clinit_CubieCube() , Sym8MultInv)[this$static.flip[i_0] & 7][this$static.twist[i_0] & 7]))));
    !c.temps && (c.temps = new CubieCube_0);
    CornMult(urf2, c, c.temps);
    CornMult(c.temps, urf1, c);
    EdgeMult(urf2, c, c.temps);
    EdgeMult(c.temps, urf1, c);
    i_0 == 2 && $invCubieCube(c);
  }
  for (this$static.depth1 = 0; this$static.depth1 < this$static.sol; ++this$static.depth1) {
    this$static.maxDep2 = min(12, this$static.sol - this$static.depth1);
    for (this$static.urfIdx = 0; this$static.urfIdx < 6; ++this$static.urfIdx) {
      if ((this$static.firstAxisRestriction != -1 || this$static.lastAxisRestriction != -1) && this$static.urfIdx >= 3) {
        continue;
      }
      if ((conjMask & 1 << this$static.urfIdx) != 0) {
        continue;
      }
      this$static.corn[0] = this$static.corn0[this$static.urfIdx];
      this$static.mid4[0] = this$static.slice_0[this$static.urfIdx];
      this$static.ud8e[0] = this$static.ud8e0[this$static.urfIdx];
      this$static.valid1 = 0;
      lm = this$static.firstAxisRestriction == -1?-1:~~(($clinit_CubieCube() , urfMoveInv)[this$static.urfIdx][this$static.firstAxisRestriction] / 3) * 3;
      if (this$static.prun[this$static.urfIdx] <= this$static.depth1 && $phase1(this$static, ~~this$static.twist[this$static.urfIdx] >>> 3, this$static.twist[this$static.urfIdx] & 7, ~~this$static.flip[this$static.urfIdx] >>> 3, this$static.flip[this$static.urfIdx] & 7, this$static.slice_0[this$static.urfIdx] & 511, this$static.depth1, lm) == 0) {
        return this$static.solution == null?'Error 8':this$static.solution;
      }
    }
  }
  return this$static.solution == null?'Error 7':this$static.solution;
}

function $verify_0(this$static, facelets){
  var center, count, i_0;
  count = 0;
  try {
    center = valueOf_1(initValues(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, [facelets.charCodeAt(4), facelets.charCodeAt(13), facelets.charCodeAt(22), facelets.charCodeAt(31), facelets.charCodeAt(40), facelets.charCodeAt(49)]));
    for (i_0 = 0; i_0 < 54; ++i_0) {
      this$static.f[i_0] = ~~($indexOf_0(center, fromCodePoint(facelets.charCodeAt(i_0))) << 24) >> 24;
      if (this$static.f[i_0] == -1) {
        return -1;
      }
      count += 1 << (this$static.f[i_0] << 2);
    }
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$Exception)) {
      return -1;
    }
     else 
      throw $e0;
  }
  if (count != 10066329) {
    return -1;
  }
  toCubieCube(this$static.f, this$static.cc);
  return $verify(this$static.cc);
}

function Search_0(){
  this.move = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 31, 1);
  this.corn = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 20, 1);
  this.mid4 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 20, 1);
  this.ud8e = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 20, 1);
  this.twist = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 6, 1);
  this.flip = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 6, 1);
  this.slice_0 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 6, 1);
  this.corn0 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 6, 1);
  this.ud8e0 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 6, 1);
  this.prun = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 6, 1);
  this.f = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 54, 1);
  this.cc = new CubieCube_0;
}

defineSeed(295, 1, makeCastMap([Q$Search]), Search_0);
_.depth1 = 0;
_.firstAxisRestriction = 0;
_.lastAxisRestriction = 0;
_.maxDep2 = 0;
_.sol = 0;
_.solution = null;
_.timeMin = P0_longLit;
_.timeOut = P0_longLit;
_.urfIdx = 0;
_.valid1 = 0;
_.valid2 = 0;
_.verbose = 0;
function $clinit_Tools(){
  $clinit_Tools = nullMethod;
  new Random_0;
  STATE_SOLVED = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 0, 1);
}

function init_3(){
  $clinit_Tools();
  var i_0;
  if (inited) {
    return;
  }
  for (i_0 = 0; i_0 <= 15; ++i_0) {
    initIdx(i_0);
  }
  inited = true;
}

function initIdx(idx){
  switch (idx) {
    case 0:
      initMove();
      break;
    case 1:
      initSym();
      break;
    case 2:
      initFlipSym2Raw();
      break;
    case 3:
      initTwistSym2Raw();
      break;
    case 4:
      initPermSym2Raw();
      break;
    case 5:
      initFlipMove();
      break;
    case 6:
      initTwistMove();
      break;
    case 7:
      initUDSliceMoveConj();
      break;
    case 8:
      initCPermMove();
      break;
    case 9:
      initEPermMove();
      break;
    case 10:
      initMPermMoveConj();
      break;
    case 11:
      {
        initTwistFlipPrun();
      }

      break;
    case 12:
      $clinit_CoordCube();
      initRawSymPrun(UDSliceTwistPrun, 6, UDSliceMove, UDSliceConj, TwistMove, ($clinit_CubieCube() , SymStateTwist), null, null, 3);
      break;
    case 13:
      $clinit_CoordCube();
      initRawSymPrun(UDSliceFlipPrun, 6, UDSliceMove, UDSliceConj, FlipMove, ($clinit_CubieCube() , SymStateFlip), null, null, 3);
      break;
    case 14:
      $clinit_CoordCube();
      initRawSymPrun(MEPermPrun, 7, MPermMove, MPermConj, EPermMove, ($clinit_CubieCube() , SymStatePerm), null, null, 4);
      break;
    case 15:
      $clinit_CoordCube();
      initRawSymPrun(MCPermPrun, 10, MPermMove, MPermConj, CPermMove, ($clinit_CubieCube() , SymStatePerm), e2c, ($clinit_Util() , ud2std), 4);
  }
}

function randomState_0(gen){
  $clinit_Tools();
  var cpVal, epVal, parity;
  if (null == STATE_SOLVED) {
    cpVal = parity = 0;
  }
   else {
    cpVal = $nextInt(gen, 40320);
    parity = getNParity(cpVal, 8);
  }
  do {
    epVal = $nextInt(gen, 479001600);
  }
   while (getNParity(epVal, 12) != parity);
  return toFaceCube(new CubieCube_1(cpVal, $nextInt(gen, 2187), epVal, $nextInt(gen, 2048)));
}

var STATE_SOLVED, inited = false;
function $clinit_Util(){
  $clinit_Util = nullMethod;
  var arr1, arr2, arr3, i_0, ix, j, jx, k_0;
  cornerFacelet = initValues(_3_3B_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$byte_$1, [initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [8, 9, 20]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [6, 18, 38]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [0, 36, 47]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [2, 45, 11]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [29, 26, 15]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [27, 44, 24]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [33, 53, 42]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [35, 17, 51])]);
  edgeFacelet = initValues(_3_3B_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$byte_$1, [initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [5, 10]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [7, 19]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [3, 37]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [1, 46]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [32, 16]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [28, 25]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [30, 43]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [34, 52]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [23, 12]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [21, 41]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [50, 39]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [48, 14])]);
  Cnk = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [12, 12], 2, 1);
  fact = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 13, 1);
  permMult = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [24, 24], 2, 1);
  move2str_0 = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ['U', 'U2', "U'", 'R', 'R2', "R'", 'F', 'F2', "F'", 'D', 'D2', "D'", 'L', 'L2', "L'", 'B', 'B2', "B'"]);
  str2move = new HashMap_0;
  for (i_0 = 0; i_0 < move2str_0.length; ++i_0) {
    str2move.put(move2str_0[i_0], valueOf_0(i_0));
  }
  ud2std = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 1, 2, 4, 7, 9, 10, 11, 13, 16]);
  std2ud = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 18, 1);
  ckmv2 = initDims([_3_3Z_classLit, _3Z_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$boolean_$1, Q$Serializable])], [Q$boolean_$1, -1], [11, 10], 2, 2);
  for (i_0 = 0; i_0 < 10; ++i_0) {
    std2ud[ud2std[i_0]] = i_0;
  }
  for (i_0 = 0; i_0 < 10; ++i_0) {
    for (j = 0; j < 10; ++j) {
      ix = ud2std[i_0];
      jx = ud2std[j];
      ckmv2[i_0][j] = ~~(ix / 3) == ~~(jx / 3) || ~~(ix / 3) % 3 == ~~(jx / 3) % 3 && ix >= jx;
    }
    ckmv2[10][i_0] = false;
  }
  fact[0] = 1;
  for (i_0 = 0; i_0 < 12; ++i_0) {
    Cnk[i_0][0] = Cnk[i_0][i_0] = 1;
    fact[i_0 + 1] = fact[i_0] * (i_0 + 1);
    for (j = 1; j < i_0; ++j) {
      Cnk[i_0][j] = Cnk[i_0 - 1][j - 1] + Cnk[i_0 - 1][j];
    }
  }
  arr1 = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 4, 1);
  arr2 = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 4, 1);
  arr3 = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 4, 1);
  for (i_0 = 0; i_0 < 24; ++i_0) {
    for (j = 0; j < 24; ++j) {
      setNPerm(arr1, i_0, 4);
      setNPerm(arr2, j, 4);
      for (k_0 = 0; k_0 < 4; ++k_0) {
        arr3[k_0] = arr1[arr2[k_0]];
      }
      permMult[i_0][j] = getNPerm(arr3, 4);
    }
  }
}

function binarySearch(arr, key){
  $clinit_Util();
  var l_0, length_0, mid, r, val;
  length_0 = arr.length;
  if (key <= arr[length_0 - 1]) {
    l_0 = 0;
    r = length_0 - 1;
    while (l_0 <= r) {
      mid = ~~(l_0 + r) >>> 1;
      val = arr[mid];
      if (key > val) {
        l_0 = mid + 1;
      }
       else if (key < val) {
        r = mid - 1;
      }
       else {
        return mid;
      }
    }
  }
  return 65535;
}

function get8Perm(arr){
  $clinit_Util();
  var i_0, idx, v, val;
  idx = 0;
  val = 1985229328;
  for (i_0 = 0; i_0 < 7; ++i_0) {
    v = arr[i_0] << 2;
    idx = (8 - i_0) * idx + (~~val >> v & 7);
    val -= 286331152 << v;
  }
  return idx;
}

function getComb(arr, mask){
  $clinit_Util();
  var i_0, idxC, idxP, r, v, val;
  idxC = 0;
  idxP = 0;
  r = 4;
  val = 291;
  for (i_0 = 11; i_0 >= 0; --i_0) {
    if ((arr[i_0] & 12) == mask) {
      v = (arr[i_0] & 3) << 2;
      idxP = r * idxP + (~~val >> v & 15);
      val -= ~~273 >> 12 - v;
      idxC += Cnk[i_0][r--];
    }
  }
  return idxP << 9 | 494 - idxC;
}

function getNParity(idx, n){
  $clinit_Util();
  var i_0, p_0;
  p_0 = 0;
  for (i_0 = n - 2; i_0 >= 0; --i_0) {
    p_0 ^= idx % (n - i_0);
    idx = ~~(idx / (n - i_0));
  }
  return p_0 & 1;
}

function getNPerm(arr, n){
  $clinit_Util();
  var i_0, idx, j;
  idx = 0;
  for (i_0 = 0; i_0 < n; ++i_0) {
    idx *= n - i_0;
    for (j = i_0 + 1; j < n; ++j) {
      arr[j] < arr[i_0] && ++idx;
    }
  }
  return idx;
}

function set8Perm(arr, idx){
  $clinit_Util();
  var i_0, m_0, p_0, v, val;
  val = 1985229328;
  for (i_0 = 0; i_0 < 7; ++i_0) {
    p_0 = fact[7 - i_0];
    v = ~~(idx / p_0);
    idx -= v * p_0;
    v <<= 2;
    arr[i_0] = ~~((~~val >> v & 7) << 24) >> 24;
    m_0 = (1 << v) - 1;
    val = (val & m_0) + (~~val >> 4 & ~m_0);
  }
  arr[7] = ~~(val << 24) >> 24;
}

function setComb(arr, idx){
  $clinit_Util();
  var fill, i_0, idxC, idxP, m_0, p_0, r, v, val;
  r = 4;
  fill = 11;
  val = 291;
  idxC = 494 - (idx & 511);
  idxP = ~~idx >>> 9;
  for (i_0 = 11; i_0 >= 0; --i_0) {
    if (idxC >= Cnk[i_0][r]) {
      idxC -= Cnk[i_0][r--];
      p_0 = fact[r & 3];
      v = ~~(idxP / p_0) << 2;
      idxP %= p_0;
      arr[i_0] = ~~((~~val >> v & 3 | 8) << 24) >> 24;
      m_0 = (1 << v) - 1;
      val = (val & m_0) + (~~val >> 4 & ~m_0);
    }
     else {
      (fill & 12) == 8 && (fill -= 4);
      arr[i_0] = ~~(fill-- << 24) >> 24;
    }
  }
}

function setNPerm(arr, idx, n){
  $clinit_Util();
  var i_0, j;
  arr[n - 1] = 0;
  for (i_0 = n - 2; i_0 >= 0; --i_0) {
    arr[i_0] = ~~(idx % (n - i_0) << 24) >> 24;
    idx = ~~(idx / (n - i_0));
    for (j = i_0 + 1; j < n; ++j) {
      arr[j] >= arr[i_0] && ++arr[j];
    }
  }
}

function toCubieCube(f, ccRet){
  $clinit_Util();
  var col1, col2, i_0, j, ori;
  for (i_0 = 0; i_0 < 8; ++i_0)
    ccRet.cp[i_0] = 0;
  for (i_0 = 0; i_0 < 12; ++i_0)
    ccRet.ep[i_0] = 0;
  for (i_0 = 0; i_0 < 8; ++i_0) {
    for (ori = 0; ori < 3; ++ori)
      if (f[cornerFacelet[i_0][ori]] == 0 || f[cornerFacelet[i_0][ori]] == 3)
        break;
    col1 = f[cornerFacelet[i_0][(ori + 1) % 3]];
    col2 = f[cornerFacelet[i_0][(ori + 2) % 3]];
    for (j = 0; j < 8; ++j) {
      if (col1 == ~~(cornerFacelet[j][1] / 9) && col2 == ~~(cornerFacelet[j][2] / 9)) {
        ccRet.cp[i_0] = j;
        ccRet.co[i_0] = ~~(ori % 3 << 24) >> 24;
        break;
      }
    }
  }
  for (i_0 = 0; i_0 < 12; ++i_0) {
    for (j = 0; j < 12; ++j) {
      if (f[edgeFacelet[i_0][0]] == ~~(edgeFacelet[j][0] / 9) && f[edgeFacelet[i_0][1]] == ~~(edgeFacelet[j][1] / 9)) {
        ccRet.ep[i_0] = j;
        ccRet.eo[i_0] = 0;
        break;
      }
      if (f[edgeFacelet[i_0][0]] == ~~(edgeFacelet[j][1] / 9) && f[edgeFacelet[i_0][1]] == ~~(edgeFacelet[j][0] / 9)) {
        ccRet.ep[i_0] = j;
        ccRet.eo[i_0] = 1;
        break;
      }
    }
  }
}

function toFaceCube(cc){
  $clinit_Util();
  var c, e, f, i_0, j, n, ori, ts;
  f = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 54, 1);
  ts = initValues(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, [85, 82, 70, 68, 76, 66]);
  for (i_0 = 0; i_0 < 54; ++i_0) {
    f[i_0] = ts[~~(i_0 / 9)];
  }
  for (c = 0; c < 8; ++c) {
    j = cc.cp[c];
    ori = cc.co[c];
    for (n = 0; n < 3; ++n)
      f[cornerFacelet[c][(n + ori) % 3]] = ts[~~(cornerFacelet[j][n] / 9)];
  }
  for (e = 0; e < 12; ++e) {
    j = cc.ep[e];
    ori = cc.eo[e];
    for (n = 0; n < 2; ++n)
      f[edgeFacelet[e][(n + ori) % 2]] = ts[~~(edgeFacelet[j][n] / 9)];
  }
  return valueOf_1(f);
}

var Cnk, ckmv2, cornerFacelet, edgeFacelet, fact, move2str_0, permMult, std2ud, str2move, ud2std;
function $clinit_FullCube(){
  $clinit_FullCube = nullMethod;
  new Random_0;
}

function $$init_0(this$static){
  this$static.arr = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 16, 1);
  this$static.prm = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 8, 1);
}

function $compareTo_0(this$static, f){
  if (this$static.ul != f.ul) {
    return this$static.ul - f.ul;
  }
  if (this$static.ur != f.ur) {
    return this$static.ur - f.ur;
  }
  if (this$static.dl != f.dl) {
    return this$static.dl - f.dl;
  }
  if (this$static.dr != f.dr) {
    return this$static.dr - f.dr;
  }
  return this$static.ml - f.ml;
}

function $copy_0(this$static, c){
  this$static.ul = c.ul;
  this$static.ur = c.ur;
  this$static.dl = c.dl;
  this$static.dr = c.dr;
  this$static.ml = c.ml;
}

function $doMove(this$static, move){
  var temp;
  move <<= 2;
  if (move > 24) {
    move = 48 - move;
    temp = this$static.ul;
    this$static.ul = (~~this$static.ul >> move | this$static.ur << 24 - move) & 16777215;
    this$static.ur = (~~this$static.ur >> move | temp << 24 - move) & 16777215;
  }
   else if (move > 0) {
    temp = this$static.ul;
    this$static.ul = (this$static.ul << move | ~~this$static.ur >> 24 - move) & 16777215;
    this$static.ur = (this$static.ur << move | ~~temp >> 24 - move) & 16777215;
  }
   else if (move == 0) {
    temp = this$static.ur;
    this$static.ur = this$static.dl;
    this$static.dl = temp;
    this$static.ml = 1 - this$static.ml;
  }
   else if (move >= -24) {
    move = -move;
    temp = this$static.dl;
    this$static.dl = (this$static.dl << move | ~~this$static.dr >> 24 - move) & 16777215;
    this$static.dr = (this$static.dr << move | ~~temp >> 24 - move) & 16777215;
  }
   else if (move < -24) {
    move = 48 + move;
    temp = this$static.dl;
    this$static.dl = (~~this$static.dl >> move | this$static.dr << 24 - move) & 16777215;
    this$static.dr = (~~this$static.dr >> move | temp << 24 - move) & 16777215;
  }
}

function $getParity(this$static){
  var a, b, cnt, i_0, p_0;
  cnt = 0;
  this$static.arr[0] = $pieceAt(this$static, 0);
  for (i_0 = 1; i_0 < 24; ++i_0) {
    $pieceAt(this$static, i_0) != this$static.arr[cnt] && (this$static.arr[++cnt] = $pieceAt(this$static, i_0));
  }
  p_0 = 0;
  for (a = 0; a < 16; ++a) {
    for (b = a + 1; b < 16; ++b) {
      this$static.arr[a] > this$static.arr[b] && (p_0 ^= 1);
    }
  }
  return p_0;
}

function $getShapeIdx(this$static){
  var dlx, drx, ulx, urx;
  urx = this$static.ur & 1118481;
  urx |= ~~urx >> 3;
  urx |= ~~urx >> 6;
  urx = urx & 15 | ~~urx >> 12 & 48;
  ulx = this$static.ul & 1118481;
  ulx |= ~~ulx >> 3;
  ulx |= ~~ulx >> 6;
  ulx = ulx & 15 | ~~ulx >> 12 & 48;
  drx = this$static.dr & 1118481;
  drx |= ~~drx >> 3;
  drx |= ~~drx >> 6;
  drx = drx & 15 | ~~drx >> 12 & 48;
  dlx = this$static.dl & 1118481;
  dlx |= ~~dlx >> 3;
  dlx |= ~~dlx >> 6;
  dlx = dlx & 15 | ~~dlx >> 12 & 48;
  return getShape2Idx($getParity(this$static) << 24 | ulx << 18 | urx << 12 | dlx << 6 | drx);
}

function $getSquare(this$static, sq){
  var a, b;
  for (a = 0; a < 8; ++a) {
    this$static.prm[a] = ~~(~~$pieceAt(this$static, a * 3 + 1) >> 1 << 24) >> 24;
  }
  sq.cornperm = get8Perm_0(this$static.prm);
  sq.topEdgeFirst = $pieceAt(this$static, 0) == $pieceAt(this$static, 1);
  a = sq.topEdgeFirst?2:0;
  for (b = 0; b < 4; a += 3 , ++b) {
    this$static.prm[b] = ~~(~~$pieceAt(this$static, a) >> 1 << 24) >> 24;
  }
  sq.botEdgeFirst = $pieceAt(this$static, 12) == $pieceAt(this$static, 13);
  a = sq.botEdgeFirst?14:12;
  for (; b < 8; a += 3 , ++b) {
    this$static.prm[b] = ~~(~~$pieceAt(this$static, a) >> 1 << 24) >> 24;
  }
  sq.edgeperm = get8Perm_0(this$static.prm);
  sq.ml = this$static.ml;
}

function $pieceAt(this$static, idx){
  var ret;
  idx < 6?(ret = ~~this$static.ul >> (5 - idx << 2)):idx < 12?(ret = ~~this$static.ur >> (11 - idx << 2)):idx < 18?(ret = ~~this$static.dl >> (17 - idx << 2)):(ret = ~~this$static.dr >> (23 - idx << 2));
  return ~~((ret & 15) << 24) >> 24;
}

function $setPiece(this$static, idx, value){
  if (idx < 6) {
    this$static.ul &= ~(15 << (5 - idx << 2));
    this$static.ul |= value << (5 - idx << 2);
  }
   else if (idx < 12) {
    this$static.ur &= ~(15 << (11 - idx << 2));
    this$static.ur |= value << (11 - idx << 2);
  }
   else if (idx < 18) {
    this$static.dl &= ~(15 << (17 - idx << 2));
    this$static.dl |= value << (17 - idx << 2);
  }
   else if (idx < 24) {
    this$static.dr &= ~(15 << (23 - idx << 2));
    this$static.dr |= value << (23 - idx << 2);
  }
   else {
    this$static.ml = value;
  }
}

function FullCube_0(){
  $clinit_FullCube();
  $$init_0(this);
}

function FullCube_1(){
  $clinit_FullCube();
  $$init_0(this);
}

function randomCube(r){
  $clinit_FullCube();
  var corner, edge, f, i_0, m_0, n_corner, n_edge, rnd, shape;
  shape = ($clinit_Shape() , ShapeIdx)[$nextInt(r, 3678)];
  f = new FullCube_0;
  corner = 324508639;
  edge = 38177486;
  n_corner = 8;
  n_edge = 8;
  for (i_0 = 0; i_0 < 24; ++i_0) {
    if ((~~shape >> i_0 & 1) == 0) {
      rnd = $nextInt(r, n_edge) << 2;
      $setPiece(f, 23 - i_0, ~~edge >> rnd & 15);
      m_0 = (1 << rnd) - 1;
      edge = (edge & m_0) + (~~edge >> 4 & ~m_0);
      --n_edge;
    }
     else {
      rnd = $nextInt(r, n_corner) << 2;
      $setPiece(f, 23 - i_0, ~~corner >> rnd & 15);
      $setPiece(f, 22 - i_0, ~~corner >> rnd & 15);
      m_0 = (1 << rnd) - 1;
      corner = (corner & m_0) + (~~corner >> 4 & ~m_0);
      --n_corner;
      ++i_0;
    }
  }
  f.ml = $nextInt(r, 2);
  return f;
}

defineSeed(298, 1, makeCastMap([Q$FullCube, Q$Comparable]), FullCube_0, FullCube_1);
_.compareTo$ = function compareTo_0(f){
  return $compareTo_0(this, dynamicCast(f, Q$FullCube));
}
;
_.dl = 10062778;
_.dr = 14536702;
_.ml = 0;
_.ul = 70195;
_.ur = 4544119;
function $clinit_Search(){
  $clinit_Search = nullMethod;
  init_4();
  init_5();
}

function $init2(this$static){
  var corner, edge, i_0, ml, prun;
  $copy_0(this$static.d, this$static.c);
  for (i_0 = 0; i_0 < this$static.length1; ++i_0) {
    $doMove(this$static.d, this$static.move[i_0]);
  }
  $getSquare(this$static.d, this$static.sq);
  edge = this$static.sq.edgeperm;
  corner = this$static.sq.cornperm;
  ml = this$static.sq.ml;
  prun = max(($clinit_Square() , SquarePrun)[this$static.sq.edgeperm << 1 | ml], SquarePrun[this$static.sq.cornperm << 1 | ml]);
  for (i_0 = prun; i_0 < this$static.maxlen2; ++i_0) {
    if ($phase2_0(this$static, edge, corner, this$static.sq.topEdgeFirst, this$static.sq.botEdgeFirst, ml, i_0, this$static.length1, 0)) {
      this$static.sol_string = $move2string(this$static, i_0 + this$static.length1);
      return true;
    }
  }
  return false;
}

function $move2string(this$static, len){
  var bottom, i_0, s, top_0, val;
  s = new StringBuffer_0;
  top_0 = 0;
  bottom = 0;
  for (i_0 = len - 1; i_0 >= 0; --i_0) {
    val = this$static.move[i_0];
    if (val > 0) {
      val = 12 - val;
      top_0 = val > 6?val - 12:val;
    }
     else if (val < 0) {
      val = 12 + val;
      bottom = val > 6?val - 12:val;
    }
     else {
      top_0 == 0 && bottom == 0?(s.impl.append_2(s.data, ' / ') , s):$append_2($append_0($append_2($append_0((s.impl.appendNonNull(s.data, '(') , s), top_0), ','), bottom), ') / ');
      top_0 = 0;
      bottom = 0;
    }
  }
  if (top_0 == 0 && bottom == 0)
  ;
  else {
    $append_2($append_0($append_2($append_0((s.impl.appendNonNull(s.data, '(') , s), top_0), ','), bottom), ')');
  }
  return s.impl.toString_0(s.data);
}

function $phase1_0(this$static, shape, prunvalue, maxl, depth, lm){
  var m_0, prunx, shapex;
  if (prunvalue == 0 && maxl < 4) {
    return maxl == 0 && $init2(this$static);
  }
  if (lm != 0) {
    shapex = ($clinit_Shape() , TwistMove_0)[shape];
    prunx = ShapePrun[shapex];
    if (prunx < maxl) {
      this$static.move[depth] = 0;
      if ($phase1_0(this$static, shapex, prunx, maxl - 1, depth + 1, 0)) {
        return true;
      }
    }
  }
  shapex = shape;
  if (lm <= 0) {
    m_0 = 0;
    while (true) {
      m_0 += ($clinit_Shape() , TopMove)[shapex];
      shapex = ~~m_0 >> 4;
      m_0 &= 15;
      if (m_0 >= 12) {
        break;
      }
      prunx = ShapePrun[shapex];
      if (prunx > maxl) {
        break;
      }
       else if (prunx < maxl) {
        this$static.move[depth] = m_0;
        if ($phase1_0(this$static, shapex, prunx, maxl - 1, depth + 1, 1)) {
          return true;
        }
      }
    }
  }
  shapex = shape;
  if (lm <= 1) {
    m_0 = 0;
    while (true) {
      m_0 += ($clinit_Shape() , BottomMove)[shapex];
      shapex = ~~m_0 >> 4;
      m_0 &= 15;
      if (m_0 >= 6) {
        break;
      }
      prunx = ShapePrun[shapex];
      if (prunx > maxl) {
        break;
      }
       else if (prunx < maxl) {
        this$static.move[depth] = -m_0;
        if ($phase1_0(this$static, shapex, prunx, maxl - 1, depth + 1, 2)) {
          return true;
        }
      }
    }
  }
  return false;
}

function $phase2_0(this$static, edge, corner, topEdgeFirst, botEdgeFirst, ml, maxl, depth, lm){
  var botEdgeFirstx, cornerx, edgex, m_0, prun1, prun2, topEdgeFirstx;
  if (maxl == 0 && !topEdgeFirst && botEdgeFirst) {
    return true;
  }
  if (lm != 0 && topEdgeFirst == botEdgeFirst) {
    edgex = ($clinit_Square() , TwistMove_1)[edge];
    cornerx = TwistMove_1[corner];
    if (SquarePrun[edgex << 1 | 1 - ml] < maxl && SquarePrun[cornerx << 1 | 1 - ml] < maxl) {
      this$static.move[depth] = 0;
      if ($phase2_0(this$static, edgex, cornerx, topEdgeFirst, botEdgeFirst, 1 - ml, maxl - 1, depth + 1, 0)) {
        return true;
      }
    }
  }
  if (lm <= 0) {
    topEdgeFirstx = !topEdgeFirst;
    edgex = topEdgeFirstx?($clinit_Square() , TopMove_0)[edge]:edge;
    cornerx = topEdgeFirstx?corner:($clinit_Square() , TopMove_0)[corner];
    m_0 = topEdgeFirstx?1:2;
    prun1 = ($clinit_Square() , SquarePrun)[edgex << 1 | ml];
    prun2 = SquarePrun[cornerx << 1 | ml];
    while (m_0 < 12 && prun1 <= maxl && prun1 <= maxl) {
      if (prun1 < maxl && prun2 < maxl) {
        this$static.move[depth] = m_0;
        if ($phase2_0(this$static, edgex, cornerx, topEdgeFirstx, botEdgeFirst, ml, maxl - 1, depth + 1, 1)) {
          return true;
        }
      }
      topEdgeFirstx = !topEdgeFirstx;
      if (topEdgeFirstx) {
        edgex = TopMove_0[edgex];
        prun1 = SquarePrun[edgex << 1 | ml];
        m_0 += 1;
      }
       else {
        cornerx = TopMove_0[cornerx];
        prun2 = SquarePrun[cornerx << 1 | ml];
        m_0 += 2;
      }
    }
  }
  if (lm <= 1) {
    botEdgeFirstx = !botEdgeFirst;
    edgex = botEdgeFirstx?($clinit_Square() , BottomMove_0)[edge]:edge;
    cornerx = botEdgeFirstx?corner:($clinit_Square() , BottomMove_0)[corner];
    m_0 = botEdgeFirstx?1:2;
    prun1 = ($clinit_Square() , SquarePrun)[edgex << 1 | ml];
    prun2 = SquarePrun[cornerx << 1 | ml];
    while (m_0 < (maxl > 6?6:12) && prun1 <= maxl && prun1 <= maxl) {
      if (prun1 < maxl && prun2 < maxl) {
        this$static.move[depth] = -m_0;
        if ($phase2_0(this$static, edgex, cornerx, topEdgeFirst, botEdgeFirstx, ml, maxl - 1, depth + 1, 2)) {
          return true;
        }
      }
      botEdgeFirstx = !botEdgeFirstx;
      if (botEdgeFirstx) {
        edgex = BottomMove_0[edgex];
        prun1 = SquarePrun[edgex << 1 | ml];
        m_0 += 1;
      }
       else {
        cornerx = BottomMove_0[cornerx];
        prun2 = SquarePrun[cornerx << 1 | ml];
        m_0 += 2;
      }
    }
  }
  return false;
}

function $solution_0(this$static, c){
  var shape;
  this$static.c = c;
  this$static.sol_string = null;
  shape = $getShapeIdx(c);
  for (this$static.length1 = ($clinit_Shape() , ShapePrun)[shape]; this$static.length1 < 100; ++this$static.length1) {
    this$static.maxlen2 = min(31 - this$static.length1, 17);
    if ($phase1_0(this$static, shape, ShapePrun[shape], this$static.length1, 0, -1)) {
      break;
    }
  }
  return this$static.sol_string;
}

function Search_2(){
  $clinit_Search();
  this.move = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 100, 1);
  this.d = new FullCube_1;
  this.sq = new Square_0;
}

defineSeed(299, 1, {}, Search_2);
_.c = null;
_.length1 = 0;
_.maxlen2 = 0;
_.sol_string = null;
function $clinit_Shape(){
  $clinit_Shape = nullMethod;
  halflayer = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 3, 6, 12, 15, 24, 27, 30, 48, 51, 54, 60, 63]);
  ShapeIdx = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 3678, 1);
  ShapePrun = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 7536, 1);
  ShapePrunOpt = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 7536, 1);
  TopMove = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 7356, 1);
  BottomMove = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 7356, 1);
  TwistMove_0 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 7356, 1);
}

function $bottomMove(this$static){
  var move, moveParity;
  move = 0;
  moveParity = 0;
  do {
    if ((this$static.bottom & 2048) == 0) {
      move += 1;
      this$static.bottom = this$static.bottom << 1;
    }
     else {
      move += 2;
      this$static.bottom = this$static.bottom << 2 ^ 12291;
    }
    moveParity = 1 - moveParity;
  }
   while ((bitCount(this$static.bottom & 63) & 1) != 0);
  (bitCount(this$static.bottom) & 2) == 0 && (this$static.parity ^= moveParity);
  return move;
}

function $getIdx(this$static){
  var ret;
  ret = binarySearch_0(ShapeIdx, this$static.top_0 << 12 | this$static.bottom) << 1 | this$static.parity;
  return ret;
}

function $setIdx(this$static, idx){
  this$static.parity = idx & 1;
  this$static.top_0 = ShapeIdx[~~idx >> 1];
  this$static.bottom = this$static.top_0 & 4095;
  this$static.top_0 >>= 12;
}

function $topMove(this$static){
  var move, moveParity;
  move = 0;
  moveParity = 0;
  do {
    if ((this$static.top_0 & 2048) == 0) {
      move += 1;
      this$static.top_0 = this$static.top_0 << 1;
    }
     else {
      move += 2;
      this$static.top_0 = this$static.top_0 << 2 ^ 12291;
    }
    moveParity = 1 - moveParity;
  }
   while ((bitCount(this$static.top_0 & 63) & 1) != 0);
  (bitCount(this$static.top_0) & 2) == 0 && (this$static.parity ^= moveParity);
  return move;
}

function Shape_0(){
}

function getShape2Idx(shp){
  $clinit_Shape();
  var ret;
  ret = binarySearch_0(ShapeIdx, shp & 16777215) << 1 | ~~shp >> 24;
  return ret;
}

function init_4(){
  var temp, p1, p3;
  $clinit_Shape();
  var count, depth, dl, done, done0, dr, i_0, idx, m_0, s, ul, ur, value;
  if (inited_0) {
    return;
  }
  count = 0;
  for (i_0 = 0; i_0 < 28561; ++i_0) {
    dr = halflayer[i_0 % 13];
    dl = halflayer[~~(i_0 / 13) % 13];
    ur = halflayer[~~(~~(i_0 / 13) / 13) % 13];
    ul = halflayer[~~(~~(~~(i_0 / 13) / 13) / 13)];
    value = ul << 18 | ur << 12 | dl << 6 | dr;
    bitCount(value) == 16 && (ShapeIdx[count++] = value);
  }
  $clinit_System();
  s = new Shape_0;
  for (i_0 = 0; i_0 < 7356; ++i_0) {
    $setIdx(s, i_0);
    TopMove[i_0] = $topMove(s);
    TopMove[i_0] |= $getIdx(s) << 4;
    $setIdx(s, i_0);
    BottomMove[i_0] = $bottomMove(s);
    BottomMove[i_0] |= $getIdx(s) << 4;
    $setIdx(s, i_0);
    temp = s.top_0 & 63;
    p1 = bitCount(temp);
    p3 = bitCount(s.bottom & 4032);
    s.parity ^= 1 & ~~(p1 & p3) >> 1;
    s.top_0 = s.top_0 & 4032 | ~~s.bottom >> 6 & 63;
    s.bottom = s.bottom & 63 | temp << 6;
    TwistMove_0[i_0] = $getIdx(s);
  }
  for (i_0 = 0; i_0 < 7536; ++i_0) {
    ShapePrun[i_0] = -1;
    ShapePrunOpt[i_0] = -1;
  }
  ShapePrun[getShape2Idx(14378715)] = 0;
  ShapePrun[getShape2Idx(31157686)] = 0;
  ShapePrun[getShape2Idx(23967451)] = 0;
  ShapePrun[getShape2Idx(7191990)] = 0;
  ShapePrunOpt[$getShapeIdx(new FullCube_0)] = 0;
  done = 4;
  done0 = 0;
  depth = -1;
  while (done != done0) {
    done0 = done;
    ++depth;
    for (i_0 = 0; i_0 < 7536; ++i_0) {
      if (ShapePrun[i_0] == depth) {
        m_0 = 0;
        idx = i_0;
        do {
          idx = TopMove[idx];
          m_0 += idx & 15;
          idx >>= 4;
          if (ShapePrun[idx] == -1) {
            ++done;
            ShapePrun[idx] = depth + 1;
          }
        }
         while (m_0 != 12);
        m_0 = 0;
        idx = i_0;
        do {
          idx = BottomMove[idx];
          m_0 += idx & 15;
          idx >>= 4;
          if (ShapePrun[idx] == -1) {
            ++done;
            ShapePrun[idx] = depth + 1;
          }
        }
         while (m_0 != 12);
        idx = TwistMove_0[i_0];
        if (ShapePrun[idx] == -1) {
          ++done;
          ShapePrun[idx] = depth + 1;
        }
      }
    }
  }
  done = 1;
  done0 = 0;
  depth = -1;
  while (done != done0) {
    done0 = done;
    ++depth;
    for (i_0 = 0; i_0 < 7536; ++i_0) {
      if (ShapePrunOpt[i_0] == depth) {
        m_0 = 0;
        idx = i_0;
        do {
          idx = TopMove[idx];
          m_0 += idx & 15;
          idx >>= 4;
          if (ShapePrunOpt[idx] == -1) {
            ++done;
            ShapePrunOpt[idx] = depth + 1;
          }
        }
         while (m_0 != 12);
        m_0 = 0;
        idx = i_0;
        do {
          idx = BottomMove[idx];
          m_0 += idx & 15;
          idx >>= 4;
          if (ShapePrunOpt[idx] == -1) {
            ++done;
            ShapePrunOpt[idx] = depth + 1;
          }
        }
         while (m_0 != 12);
        idx = TwistMove_0[i_0];
        if (ShapePrunOpt[idx] == -1) {
          ++done;
          ShapePrunOpt[idx] = depth + 1;
        }
      }
    }
  }
  inited_0 = true;
}

defineSeed(300, 1, {}, Shape_0);
_.bottom = 0;
_.parity = 0;
_.top_0 = 0;
var BottomMove, ShapeIdx, ShapePrun, ShapePrunOpt, TopMove, TwistMove_0, halflayer, inited_0 = false;
function $clinit_Square(){
  $clinit_Square = nullMethod;
  SquarePrun = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 80640, 1);
  TwistMove_1 = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 40320, 1);
  TopMove_0 = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 40320, 1);
  BottomMove_0 = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 40320, 1);
  fact_0 = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [1, 1, 2, 6, 24, 120, 720, 5040]);
  Cnk_0 = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [12, 12], 2, 1);
}

function Square_0(){
  $clinit_Square();
}

function get8Perm_0(arr){
  $clinit_Square();
  var i_0, idx, v, val;
  idx = 0;
  val = 1985229328;
  for (i_0 = 0; i_0 < 7; ++i_0) {
    v = arr[i_0] << 2;
    idx = (8 - i_0) * idx + (~~val >> v & 7);
    val -= 286331152 << v;
  }
  return idx & 65535;
}

function init_5(){
  $clinit_Square();
  var check, depth, done, find_0, i_0, idx, idxx, inv, j, m_0, ml, pos, temp;
  if (inited_1) {
    return;
  }
  for (i_0 = 0; i_0 < 12; ++i_0) {
    Cnk_0[i_0][0] = 1;
    Cnk_0[i_0][i_0] = 1;
    for (j = 1; j < i_0; ++j) {
      Cnk_0[i_0][j] = Cnk_0[i_0 - 1][j - 1] + Cnk_0[i_0 - 1][j];
    }
  }
  pos = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 8, 1);
  for (i_0 = 0; i_0 < 40320; ++i_0) {
    set8Perm_0(pos, i_0);
    temp = pos[2];
    pos[2] = pos[4];
    pos[4] = temp;
    temp = pos[3];
    pos[3] = pos[5];
    pos[5] = temp;
    TwistMove_1[i_0] = get8Perm_0(pos);
    set8Perm_0(pos, i_0);
    temp = pos[0];
    pos[0] = pos[1];
    pos[1] = pos[2];
    pos[2] = pos[3];
    pos[3] = temp;
    TopMove_0[i_0] = get8Perm_0(pos);
    set8Perm_0(pos, i_0);
    temp = pos[4];
    pos[4] = pos[5];
    pos[5] = pos[6];
    pos[6] = pos[7];
    pos[7] = temp;
    BottomMove_0[i_0] = get8Perm_0(pos);
  }
  for (i_0 = 0; i_0 < 80640; ++i_0) {
    SquarePrun[i_0] = -1;
  }
  SquarePrun[0] = 0;
  depth = 0;
  done = 1;
  while (done < 80640) {
    inv = depth >= 11;
    find_0 = inv?-1:depth;
    check = inv?depth:-1;
    ++depth;
    OUT: for (i_0 = 0; i_0 < 80640; ++i_0) {
      if (SquarePrun[i_0] == find_0) {
        idx = ~~i_0 >> 1;
        ml = i_0 & 1;
        idxx = TwistMove_1[idx] << 1 | 1 - ml;
        if (SquarePrun[idxx] == check) {
          ++done;
          SquarePrun[inv?i_0:idxx] = ~~(depth << 24) >> 24;
          if (inv) {
            continue OUT;
          }
        }
        idxx = idx;
        for (m_0 = 0; m_0 < 4; ++m_0) {
          idxx = TopMove_0[idxx];
          if (SquarePrun[idxx << 1 | ml] == check) {
            ++done;
            SquarePrun[inv?i_0:idxx << 1 | ml] = ~~(depth << 24) >> 24;
            if (inv) {
              continue OUT;
            }
          }
        }
        for (m_0 = 0; m_0 < 4; ++m_0) {
          idxx = BottomMove_0[idxx];
          if (SquarePrun[idxx << 1 | ml] == check) {
            ++done;
            SquarePrun[inv?i_0:idxx << 1 | ml] = ~~(depth << 24) >> 24;
            if (inv) {
              continue OUT;
            }
          }
        }
      }
    }
    $clinit_System();
    out_0.print_0(9);
  }
  inited_1 = true;
}

function set8Perm_0(arr, idx){
  var i_0, m_0, p_0, v, val;
  val = 1985229328;
  for (i_0 = 0; i_0 < 7; ++i_0) {
    p_0 = fact_0[7 - i_0];
    v = ~~(idx / p_0);
    idx -= v * p_0;
    v <<= 2;
    arr[i_0] = ~~((~~val >> v & 7) << 24) >> 24;
    m_0 = (1 << v) - 1;
    val = (val & m_0) + (~~val >> 4 & ~m_0);
  }
  arr[7] = ~~(val << 24) >> 24;
}

defineSeed(301, 1, {}, Square_0);
_.botEdgeFirst = false;
_.cornperm = 0;
_.edgeperm = 0;
_.ml = 0;
_.topEdgeFirst = false;
var BottomMove_0, Cnk_0, SquarePrun, TopMove_0, TwistMove_1, fact_0, inited_1 = false;
function $clinit_Center1(){
  $clinit_Center1 = nullMethod;
  ctsmv = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [15582, 36], 2, 1);
  sym2raw = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 15582, 1);
  csprun = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 15582, 1);
  symmult = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [48, 48], 2, 1);
  symmove = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [48, 36], 2, 1);
  syminv = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 48, 1);
  finish_0 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 48, 1);
}

function $$init_1(this$static){
  this$static.ct = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 24, 1);
}

function $equals(this$static, obj){
  var c, i_0;
  if (instanceOf(obj, Q$Center1)) {
    c = dynamicCast(obj, Q$Center1);
    for (i_0 = 0; i_0 < 24; ++i_0) {
      if (this$static.ct[i_0] != c.ct[i_0]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function $get_1(this$static){
  var i_0, idx, r;
  idx = 0;
  r = 8;
  for (i_0 = 23; i_0 >= 0; --i_0) {
    this$static.ct[i_0] == 1 && (idx += ($clinit_Util_0() , Cnk_1)[i_0][r--]);
  }
  return idx;
}

function $getsym(this$static){
  var cord, j;
  if (raw2sym != null) {
    return raw2sym[$get_1(this$static)];
  }
  for (j = 0; j < 48; ++j) {
    cord = raw2sym_0($get_1(this$static));
    if (cord != -1)
      return cord * 64 + j;
    $rot(this$static, 0);
    j % 2 == 1 && $rot(this$static, 1);
    j % 8 == 7 && $rot(this$static, 2);
    j % 16 == 15 && $rot(this$static, 3);
  }
  ($clinit_System() , out_0).print_0(101);
  return -1;
}

function $move(this$static, m_0){
  var key;
  key = m_0 % 3;
  m_0 = ~~(m_0 / 3);
  switch (m_0) {
    case 0:
      swap(this$static.ct, 0, 1, 2, 3, key);
      break;
    case 1:
      swap(this$static.ct, 16, 17, 18, 19, key);
      break;
    case 2:
      swap(this$static.ct, 8, 9, 10, 11, key);
      break;
    case 3:
      swap(this$static.ct, 4, 5, 6, 7, key);
      break;
    case 4:
      swap(this$static.ct, 20, 21, 22, 23, key);
      break;
    case 5:
      swap(this$static.ct, 12, 13, 14, 15, key);
      break;
    case 6:
      swap(this$static.ct, 0, 1, 2, 3, key);
      swap(this$static.ct, 8, 20, 12, 16, key);
      swap(this$static.ct, 9, 21, 13, 17, key);
      break;
    case 7:
      swap(this$static.ct, 16, 17, 18, 19, key);
      swap(this$static.ct, 1, 15, 5, 9, key);
      swap(this$static.ct, 2, 12, 6, 10, key);
      break;
    case 8:
      swap(this$static.ct, 8, 9, 10, 11, key);
      swap(this$static.ct, 2, 19, 4, 21, key);
      swap(this$static.ct, 3, 16, 5, 22, key);
      break;
    case 9:
      swap(this$static.ct, 4, 5, 6, 7, key);
      swap(this$static.ct, 10, 18, 14, 22, key);
      swap(this$static.ct, 11, 19, 15, 23, key);
      break;
    case 10:
      swap(this$static.ct, 20, 21, 22, 23, key);
      swap(this$static.ct, 0, 8, 4, 14, key);
      swap(this$static.ct, 3, 11, 7, 13, key);
      break;
    case 11:
      swap(this$static.ct, 12, 13, 14, 15, key);
      swap(this$static.ct, 1, 20, 7, 18, key);
      swap(this$static.ct, 0, 23, 6, 17, key);
  }
}

function $rot(this$static, r){
  switch (r) {
    case 0:
      $move(this$static, 19);
      $move(this$static, 28);
      break;
    case 1:
      $move(this$static, 21);
      $move(this$static, 32);
      break;
    case 2:
      swap(this$static.ct, 0, 3, 1, 2, 1);
      swap(this$static.ct, 8, 11, 9, 10, 1);
      swap(this$static.ct, 4, 7, 5, 6, 1);
      swap(this$static.ct, 12, 15, 13, 14, 1);
      swap(this$static.ct, 16, 19, 21, 22, 1);
      swap(this$static.ct, 17, 18, 20, 23, 1);
      break;
    case 3:
      $move(this$static, 18);
      $move(this$static, 29);
      $move(this$static, 24);
      $move(this$static, 35);
  }
}

function $rotate(this$static, r){
  var j;
  for (j = 0; j < r; ++j) {
    $rot(this$static, 0);
    j % 2 == 1 && $rot(this$static, 1);
    j % 8 == 7 && $rot(this$static, 2);
    j % 16 == 15 && $rot(this$static, 3);
  }
}

function $set_0(this$static, idx){
  var i_0, r;
  r = 8;
  for (i_0 = 23; i_0 >= 0; --i_0) {
    this$static.ct[i_0] = 0;
    if (idx >= ($clinit_Util_0() , Cnk_1)[i_0][r]) {
      idx -= Cnk_1[i_0][r--];
      this$static.ct[i_0] = 1;
    }
  }
}

function $set_1(this$static, c){
  var i_0;
  for (i_0 = 0; i_0 < 24; ++i_0) {
    this$static.ct[i_0] = c.ct[i_0];
  }
}

function Center1_0(){
  var i_0;
  $$init_1(this);
  for (i_0 = 0; i_0 < 8; ++i_0) {
    this.ct[i_0] = 1;
  }
  for (i_0 = 8; i_0 < 24; ++i_0) {
    this.ct[i_0] = 0;
  }
}

function Center1_1(c, urf){
  $clinit_Center1();
  var i_0;
  $$init_1(this);
  for (i_0 = 0; i_0 < 24; ++i_0) {
    this.ct[i_0] = ~~((~~(c.ct[i_0] / 2) == urf?1:0) << 24) >> 24;
  }
}

function Center1_2(ct){
  var i_0;
  $$init_1(this);
  for (i_0 = 0; i_0 < 24; ++i_0) {
    this.ct[i_0] = ct[i_0];
  }
}

function createMoveTable(){
  $clinit_Center1();
  var c, d, i_0, m_0;
  ($clinit_System() , out_0).println('Create Phase1 Center Move Table...');
  c = new Center1_0;
  d = new Center1_0;
  for (i_0 = 0; i_0 < 15582; ++i_0) {
    $set_0(d, sym2raw[i_0]);
    for (m_0 = 0; m_0 < 36; ++m_0) {
      $set_1(c, d);
      $move(c, m_0);
      ctsmv[i_0][m_0] = $getsym(c);
    }
  }
}

function createPrun(){
  $clinit_Center1();
  var check, depth, done, i_0, idx, inv, m_0, select;
  fill_0(csprun);
  csprun[0] = 0;
  depth = 0;
  done = 1;
  while (done != 15582) {
    inv = depth > 4;
    select = inv?-1:depth;
    check = inv?depth:-1;
    ++depth;
    for (i_0 = 0; i_0 < 15582; ++i_0) {
      if (csprun[i_0] != select) {
        continue;
      }
      for (m_0 = 0; m_0 < 27; ++m_0) {
        idx = ~~ctsmv[i_0][m_0] >>> 6;
        if (csprun[idx] != check) {
          continue;
        }
        ++done;
        if (inv) {
          csprun[i_0] = ~~(depth << 24) >> 24;
          break;
        }
         else {
          csprun[idx] = ~~(depth << 24) >> 24;
        }
      }
    }
  }
}

function getSolvedSym(cube){
  $clinit_Center1();
  var c, check, i_0, j;
  c = new Center1_2(cube.ct);
  for (j = 0; j < 48; ++j) {
    check = true;
    for (i_0 = 0; i_0 < 24; ++i_0) {
      if (c.ct[i_0] != ~~(i_0 / 4)) {
        check = false;
        break;
      }
    }
    if (check) {
      return j;
    }
    $rot(c, 0);
    j % 2 == 1 && $rot(c, 1);
    j % 8 == 7 && $rot(c, 2);
    j % 16 == 15 && $rot(c, 3);
  }
  return -1;
}

function initSym_0(){
  $clinit_Center1();
  var c, d, e, f, i_0, j, k_0;
  c = new Center1_0;
  for (i_0 = 0; i_0 < 24; ++i_0) {
    c.ct[i_0] = i_0;
  }
  d = new Center1_2(c.ct);
  e = new Center1_2(c.ct);
  f = new Center1_2(c.ct);
  for (i_0 = 0; i_0 < 48; ++i_0) {
    for (j = 0; j < 48; ++j) {
      for (k_0 = 0; k_0 < 48; ++k_0) {
        if ($equals(c, d)) {
          symmult[i_0][j] = k_0;
          k_0 == 0 && (syminv[i_0] = j);
        }
        $rot(d, 0);
        k_0 % 2 == 1 && $rot(d, 1);
        k_0 % 8 == 7 && $rot(d, 2);
        k_0 % 16 == 15 && $rot(d, 3);
      }
      $rot(c, 0);
      j % 2 == 1 && $rot(c, 1);
      j % 8 == 7 && $rot(c, 2);
      j % 16 == 15 && $rot(c, 3);
    }
    $rot(c, 0);
    i_0 % 2 == 1 && $rot(c, 1);
    i_0 % 8 == 7 && $rot(c, 2);
    i_0 % 16 == 15 && $rot(c, 3);
  }
  for (i_0 = 0; i_0 < 48; ++i_0) {
    $set_1(c, e);
    $rotate(c, syminv[i_0]);
    for (j = 0; j < 36; ++j) {
      $set_1(d, c);
      $move(d, j);
      $rotate(d, i_0);
      for (k_0 = 0; k_0 < 36; ++k_0) {
        $set_1(f, e);
        $move(f, k_0);
        if ($equals(f, d)) {
          symmove[i_0][j] = k_0;
          break;
        }
      }
    }
  }
  $set_0(c, 0);
  for (i_0 = 0; i_0 < 48; ++i_0) {
    finish_0[syminv[i_0]] = $get_1(c);
    $rot(c, 0);
    i_0 % 2 == 1 && $rot(c, 1);
    i_0 % 8 == 7 && $rot(c, 2);
    i_0 % 16 == 15 && $rot(c, 3);
  }
}

function initSym2Raw(){
  $clinit_Center1();
  var c, count, i_0, idx, j, occ;
  c = new Center1_0;
  occ = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 22984, 1);
  count = 0;
  for (i_0 = 0; i_0 < 735471; ++i_0) {
    if ((occ[~~i_0 >>> 5] & 1 << (i_0 & 31)) == 0) {
      $set_0(c, i_0);
      for (j = 0; j < 48; ++j) {
        idx = $get_1(c);
        occ[~~idx >>> 5] |= 1 << (idx & 31);
        raw2sym != null && (raw2sym[idx] = count << 6 | syminv[j]);
        $rot(c, 0);
        j % 2 == 1 && $rot(c, 1);
        j % 8 == 7 && $rot(c, 2);
        j % 16 == 15 && $rot(c, 3);
      }
      sym2raw[count++] = i_0;
    }
  }
}

function raw2sym_0(n){
  var m_0;
  m_0 = binarySearch_0(sym2raw, n);
  return m_0 >= 0?m_0:-1;
}

defineSeed(302, 1, makeCastMap([Q$Center1]), Center1_0, Center1_1, Center1_2);
_.equals$ = function equals_7(obj){
  return $equals(this, obj);
}
;
_.hashCode$ = function hashCode_9(){
  throw new UnsupportedOperationException_0;
}
;
var csprun, ctsmv, finish_0, raw2sym = null, sym2raw, syminv, symmove, symmult;
function $clinit_Center2(){
  $clinit_Center2 = nullMethod;
  rlmv = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [70, 28], 2, 1);
  ctmv = initDims([_3_3C_classLit, _3C_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$char_$1, Q$Serializable])], [Q$char_$1, -1], [6435, 28], 2, 1);
  rlrot = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [70, 16], 2, 1);
  ctrot = initDims([_3_3C_classLit, _3C_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$char_$1, Q$Serializable])], [Q$char_$1, -1], [6435, 16], 2, 1);
  ctprun = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 450450, 1);
  pmv = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0]);
}

function $getct(this$static){
  var i_0, idx, r;
  idx = 0;
  r = 8;
  for (i_0 = 14; i_0 >= 0; --i_0) {
    this$static.ct[i_0] != this$static.ct[15] && (idx += ($clinit_Util_0() , Cnk_1)[i_0][r--]);
  }
  return idx;
}

function $getrl(this$static){
  var i_0, idx, r;
  idx = 0;
  r = 4;
  for (i_0 = 6; i_0 >= 0; --i_0) {
    this$static.rl[i_0] != this$static.rl[7] && (idx += ($clinit_Util_0() , Cnk_1)[i_0][r--]);
  }
  return idx * 2 + this$static.parity;
}

function $move_0(this$static, m_0){
  var key;
  this$static.parity ^= pmv[m_0];
  key = m_0 % 3;
  m_0 = ~~(m_0 / 3);
  switch (m_0) {
    case 0:
      swap_0(this$static.ct, 0, 1, 2, 3, key);
      break;
    case 1:
      swap_0(this$static.rl, 0, 1, 2, 3, key);
      break;
    case 2:
      swap_0(this$static.ct, 8, 9, 10, 11, key);
      break;
    case 3:
      swap_0(this$static.ct, 4, 5, 6, 7, key);
      break;
    case 4:
      swap_0(this$static.rl, 4, 5, 6, 7, key);
      break;
    case 5:
      swap_0(this$static.ct, 12, 13, 14, 15, key);
      break;
    case 6:
      swap_0(this$static.ct, 0, 1, 2, 3, key);
      swap_0(this$static.rl, 0, 5, 4, 1, key);
      swap_0(this$static.ct, 8, 9, 12, 13, key);
      break;
    case 7:
      swap_0(this$static.rl, 0, 1, 2, 3, key);
      swap_0(this$static.ct, 1, 15, 5, 9, key);
      swap_0(this$static.ct, 2, 12, 6, 10, key);
      break;
    case 8:
      swap_0(this$static.ct, 8, 9, 10, 11, key);
      swap_0(this$static.rl, 0, 3, 6, 5, key);
      swap_0(this$static.ct, 3, 2, 5, 4, key);
      break;
    case 9:
      swap_0(this$static.ct, 4, 5, 6, 7, key);
      swap_0(this$static.rl, 3, 2, 7, 6, key);
      swap_0(this$static.ct, 11, 10, 15, 14, key);
      break;
    case 10:
      swap_0(this$static.rl, 4, 5, 6, 7, key);
      swap_0(this$static.ct, 0, 8, 4, 14, key);
      swap_0(this$static.ct, 3, 11, 7, 13, key);
      break;
    case 11:
      swap_0(this$static.ct, 12, 13, 14, 15, key);
      swap_0(this$static.rl, 1, 4, 7, 2, key);
      swap_0(this$static.ct, 1, 0, 7, 6, key);
  }
}

function $rot_0(this$static, r){
  switch (r) {
    case 0:
      $move_0(this$static, 19);
      $move_0(this$static, 28);
      break;
    case 1:
      $move_0(this$static, 21);
      $move_0(this$static, 32);
      break;
    case 2:
      swap_0(this$static.ct, 0, 3, 1, 2, 1);
      swap_0(this$static.ct, 8, 11, 9, 10, 1);
      swap_0(this$static.ct, 4, 7, 5, 6, 1);
      swap_0(this$static.ct, 12, 15, 13, 14, 1);
      swap_0(this$static.rl, 0, 3, 5, 6, 1);
      swap_0(this$static.rl, 1, 2, 4, 7, 1);
  }
}

function $set_2(this$static, c, edgeParity){
  var i_0;
  for (i_0 = 0; i_0 < 16; ++i_0) {
    this$static.ct[i_0] = ~~(c.ct[i_0] / 2);
  }
  for (i_0 = 0; i_0 < 8; ++i_0) {
    this$static.rl[i_0] = c.ct[i_0 + 16];
  }
  this$static.parity = edgeParity;
}

function $setct(this$static, idx){
  var i_0, r;
  r = 8;
  this$static.ct[15] = 0;
  for (i_0 = 14; i_0 >= 0; --i_0) {
    if (idx >= ($clinit_Util_0() , Cnk_1)[i_0][r]) {
      idx -= Cnk_1[i_0][r--];
      this$static.ct[i_0] = 1;
    }
     else {
      this$static.ct[i_0] = 0;
    }
  }
}

function $setrl(this$static, idx){
  var i_0, r;
  this$static.parity = idx & 1;
  idx >>>= 1;
  r = 4;
  this$static.rl[7] = 0;
  for (i_0 = 6; i_0 >= 0; --i_0) {
    if (idx >= ($clinit_Util_0() , Cnk_1)[i_0][r]) {
      idx -= Cnk_1[i_0][r--];
      this$static.rl[i_0] = 1;
    }
     else {
      this$static.rl[i_0] = 0;
    }
  }
}

function Center2_0(){
  $clinit_Center2();
  this.rl = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 8, 1);
  this.ct = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 16, 1);
}

function init_6(){
  $clinit_Center2();
  var c, ct, ctx, depth, done, i_0, idx, j, m_0, rl, rlx;
  c = new Center2_0;
  for (i_0 = 0; i_0 < 70; ++i_0) {
    for (m_0 = 0; m_0 < 28; ++m_0) {
      $setrl(c, i_0);
      $move_0(c, ($clinit_Moves() , move2std)[m_0]);
      rlmv[i_0][m_0] = $getrl(c);
    }
  }
  for (i_0 = 0; i_0 < 70; ++i_0) {
    $setrl(c, i_0);
    for (j = 0; j < 16; ++j) {
      rlrot[i_0][j] = $getrl(c);
      $rot_0(c, 0);
      j % 2 == 1 && $rot_0(c, 1);
      j % 8 == 7 && $rot_0(c, 2);
    }
  }
  for (i_0 = 0; i_0 < 6435; ++i_0) {
    $setct(c, i_0);
    for (j = 0; j < 16; ++j) {
      ctrot[i_0][j] = $getct(c) & 65535;
      $rot_0(c, 0);
      j % 2 == 1 && $rot_0(c, 1);
      j % 8 == 7 && $rot_0(c, 2);
    }
  }
  for (i_0 = 0; i_0 < 6435; ++i_0) {
    for (m_0 = 0; m_0 < 28; ++m_0) {
      $setct(c, i_0);
      $move_0(c, ($clinit_Moves() , move2std)[m_0]);
      ctmv[i_0][m_0] = $getct(c) & 65535;
    }
  }
  fill_0(ctprun);
  ctprun[0] = ctprun[18] = ctprun[28] = ctprun[46] = ctprun[54] = ctprun[56] = 0;
  depth = 0;
  done = 6;
  while (done != 450450) {
    for (i_0 = 0; i_0 < 450450; ++i_0) {
      if (ctprun[i_0] != depth) {
        continue;
      }
      ct = ~~(i_0 / 70);
      rl = i_0 % 70;
      for (m_0 = 0; m_0 < 23; ++m_0) {
        ctx = ctmv[ct][m_0];
        rlx = rlmv[rl][m_0];
        idx = ctx * 70 + rlx;
        if (ctprun[idx] == -1) {
          ctprun[idx] = ~~(depth + 1 << 24) >> 24;
          ++done;
        }
      }
    }
    ++depth;
  }
}

defineSeed(303, 1, {}, Center2_0);
_.parity = 0;
var ctmv, ctprun, ctrot, pmv, rlmv, rlrot;
function $clinit_Center3(){
  $clinit_Center3 = nullMethod;
  ctmove = initDims([_3_3C_classLit, _3C_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$char_$1, Q$Serializable])], [Q$char_$1, -1], [29400, 20], 2, 1);
  pmove = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]);
  prun_0 = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 29400, 1);
  rl2std = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 9, 14, 23, 27, 28, 41, 42, 46, 55, 60, 69]);
  std2rl = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 70, 1);
}

function $getct_0(this$static){
  var check, i_0, idx, idxrl, r;
  idx = 0;
  r = 4;
  for (i_0 = 6; i_0 >= 0; --i_0) {
    this$static.ud[i_0] != this$static.ud[7] && (idx += ($clinit_Util_0() , Cnk_1)[i_0][r--]);
  }
  idx *= 35;
  r = 4;
  for (i_0 = 6; i_0 >= 0; --i_0) {
    this$static.fb[i_0] != this$static.fb[7] && (idx += ($clinit_Util_0() , Cnk_1)[i_0][r--]);
  }
  idx *= 12;
  check = this$static.fb[7] ^ this$static.ud[7];
  idxrl = 0;
  r = 4;
  for (i_0 = 7; i_0 >= 0; --i_0) {
    this$static.rl[i_0] != check && (idxrl += ($clinit_Util_0() , Cnk_1)[i_0][r--]);
  }
  return this$static.parity + 2 * (idx + std2rl[idxrl]);
}

function $move_1(this$static, i_0){
  this$static.parity ^= pmove[i_0];
  switch (i_0) {
    case 0:
    case 1:
    case 2:
      swap_0(this$static.ud, 0, 1, 2, 3, i_0 % 3);
      break;
    case 3:
      swap_0(this$static.rl, 0, 1, 2, 3, 1);
      break;
    case 4:
    case 5:
    case 6:
      swap_0(this$static.fb, 0, 1, 2, 3, (i_0 - 1) % 3);
      break;
    case 7:
    case 8:
    case 9:
      swap_0(this$static.ud, 4, 5, 6, 7, (i_0 - 1) % 3);
      break;
    case 10:
      swap_0(this$static.rl, 4, 5, 6, 7, 1);
      break;
    case 11:
    case 12:
    case 13:
      swap_0(this$static.fb, 4, 5, 6, 7, (i_0 + 1) % 3);
      break;
    case 14:
      swap_0(this$static.ud, 0, 1, 2, 3, 1);
      swap_0(this$static.rl, 0, 5, 4, 1, 1);
      swap_0(this$static.fb, 0, 5, 4, 1, 1);
      break;
    case 15:
      swap_0(this$static.rl, 0, 1, 2, 3, 1);
      swap_0(this$static.fb, 1, 4, 7, 2, 1);
      swap_0(this$static.ud, 1, 6, 5, 2, 1);
      break;
    case 16:
      swap_0(this$static.fb, 0, 1, 2, 3, 1);
      swap_0(this$static.ud, 3, 2, 5, 4, 1);
      swap_0(this$static.rl, 0, 3, 6, 5, 1);
      break;
    case 17:
      swap_0(this$static.ud, 4, 5, 6, 7, 1);
      swap_0(this$static.rl, 3, 2, 7, 6, 1);
      swap_0(this$static.fb, 3, 2, 7, 6, 1);
      break;
    case 18:
      swap_0(this$static.rl, 4, 5, 6, 7, 1);
      swap_0(this$static.fb, 0, 3, 6, 5, 1);
      swap_0(this$static.ud, 0, 3, 4, 7, 1);
      break;
    case 19:
      swap_0(this$static.fb, 4, 5, 6, 7, 1);
      swap_0(this$static.ud, 0, 7, 6, 1, 1);
      swap_0(this$static.rl, 1, 4, 7, 2, 1);
  }
}

function $set_3(this$static, c, eXc_parity){
  var i_0, parity;
  parity = c.ct[0] > c.ct[8] ^ c.ct[8] > c.ct[16] ^ c.ct[0] > c.ct[16]?1:0;
  for (i_0 = 0; i_0 < 8; ++i_0) {
    this$static.ud[i_0] = c.ct[i_0] & 1 ^ 1;
    this$static.fb[i_0] = c.ct[i_0 + 8] & 1 ^ 1;
    this$static.rl[i_0] = c.ct[i_0 + 16] & 1 ^ 1 ^ parity;
  }
  this$static.parity = parity ^ eXc_parity;
}

function $setct_0(this$static, idx){
  var i_0, idxfb, idxrl, r;
  this$static.parity = idx & 1;
  idx >>>= 1;
  idxrl = rl2std[idx % 12];
  idx = ~~(idx / 12);
  r = 4;
  for (i_0 = 7; i_0 >= 0; --i_0) {
    this$static.rl[i_0] = 0;
    if (idxrl >= ($clinit_Util_0() , Cnk_1)[i_0][r]) {
      idxrl -= Cnk_1[i_0][r--];
      this$static.rl[i_0] = 1;
    }
  }
  idxfb = idx % 35;
  idx = ~~(idx / 35);
  r = 4;
  this$static.fb[7] = 0;
  for (i_0 = 6; i_0 >= 0; --i_0) {
    if (idxfb >= ($clinit_Util_0() , Cnk_1)[i_0][r]) {
      idxfb -= Cnk_1[i_0][r--];
      this$static.fb[i_0] = 1;
    }
     else {
      this$static.fb[i_0] = 0;
    }
  }
  r = 4;
  this$static.ud[7] = 0;
  for (i_0 = 6; i_0 >= 0; --i_0) {
    if (idx >= ($clinit_Util_0() , Cnk_1)[i_0][r]) {
      idx -= Cnk_1[i_0][r--];
      this$static.ud[i_0] = 1;
    }
     else {
      this$static.ud[i_0] = 0;
    }
  }
}

function Center3_0(){
  $clinit_Center3();
  this.ud = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 8, 1);
  this.rl = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 8, 1);
  this.fb = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 8, 1);
}

function init_7(){
  $clinit_Center3();
  var c, depth, done, i_0, m_0;
  for (i_0 = 0; i_0 < 12; ++i_0) {
    std2rl[rl2std[i_0]] = i_0;
  }
  c = new Center3_0;
  for (i_0 = 0; i_0 < 29400; ++i_0) {
    for (m_0 = 0; m_0 < 20; ++m_0) {
      $setct_0(c, i_0);
      $move_1(c, m_0);
      ctmove[i_0][m_0] = $getct_0(c) & 65535;
    }
  }
  fill_0(prun_0);
  prun_0[0] = 0;
  depth = 0;
  done = 1;
  while (done != 29400) {
    for (i_0 = 0; i_0 < 29400; ++i_0) {
      if (prun_0[i_0] != depth) {
        continue;
      }
      for (m_0 = 0; m_0 < 17; ++m_0) {
        if (prun_0[ctmove[i_0][m_0]] == -1) {
          prun_0[ctmove[i_0][m_0]] = ~~(depth + 1 << 24) >> 24;
          ++done;
        }
      }
    }
    ++depth;
  }
}

defineSeed(304, 1, {}, Center3_0);
_.parity = 0;
var ctmove, pmove, prun_0, rl2std, std2rl;
function $clinit_CenterCube(){
  $clinit_CenterCube = nullMethod;
  center333Map = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 4, 2, 1, 5, 3]);
}

function $copy_1(this$static, c){
  var i_0;
  for (i_0 = 0; i_0 < 24; ++i_0) {
    this$static.ct[i_0] = c.ct[i_0];
  }
}

function $fill333Facelet(this$static, facelet){
  var i_0, idx;
  for (i_0 = 0; i_0 < 6; ++i_0) {
    idx = center333Map[i_0] << 2;
    if (this$static.ct[idx] != this$static.ct[idx + 1] || this$static.ct[idx + 1] != this$static.ct[idx + 2] || this$static.ct[idx + 2] != this$static.ct[idx + 3]) {
      throw new RuntimeException_1('Unsolved Center');
    }
    facelet[4 + i_0 * 9] = ($clinit_Util_0() , colorMap4to3)[this$static.ct[idx]];
  }
}

function $move_2(this$static, m_0){
  var key;
  key = m_0 % 3;
  m_0 = ~~(m_0 / 3);
  switch (m_0) {
    case 0:
      swap(this$static.ct, 0, 1, 2, 3, key);
      break;
    case 1:
      swap(this$static.ct, 16, 17, 18, 19, key);
      break;
    case 2:
      swap(this$static.ct, 8, 9, 10, 11, key);
      break;
    case 3:
      swap(this$static.ct, 4, 5, 6, 7, key);
      break;
    case 4:
      swap(this$static.ct, 20, 21, 22, 23, key);
      break;
    case 5:
      swap(this$static.ct, 12, 13, 14, 15, key);
      break;
    case 6:
      swap(this$static.ct, 0, 1, 2, 3, key);
      swap(this$static.ct, 8, 20, 12, 16, key);
      swap(this$static.ct, 9, 21, 13, 17, key);
      break;
    case 7:
      swap(this$static.ct, 16, 17, 18, 19, key);
      swap(this$static.ct, 1, 15, 5, 9, key);
      swap(this$static.ct, 2, 12, 6, 10, key);
      break;
    case 8:
      swap(this$static.ct, 8, 9, 10, 11, key);
      swap(this$static.ct, 2, 19, 4, 21, key);
      swap(this$static.ct, 3, 16, 5, 22, key);
      break;
    case 9:
      swap(this$static.ct, 4, 5, 6, 7, key);
      swap(this$static.ct, 10, 18, 14, 22, key);
      swap(this$static.ct, 11, 19, 15, 23, key);
      break;
    case 10:
      swap(this$static.ct, 20, 21, 22, 23, key);
      swap(this$static.ct, 0, 8, 4, 14, key);
      swap(this$static.ct, 3, 11, 7, 13, key);
      break;
    case 11:
      swap(this$static.ct, 12, 13, 14, 15, key);
      swap(this$static.ct, 1, 20, 7, 18, key);
      swap(this$static.ct, 0, 23, 6, 17, key);
  }
}

function CenterCube_0(){
  $clinit_CenterCube();
  var i_0;
  this.ct = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 24, 1);
  for (i_0 = 0; i_0 < 24; ++i_0) {
    this.ct[i_0] = ~~(~~(i_0 / 4) << 24) >> 24;
  }
}

function CenterCube_1(r){
  $clinit_CenterCube();
  var i_0, m_0, t;
  CenterCube_0.call(this);
  for (i_0 = 0; i_0 < 23; ++i_0) {
    t = i_0 + $nextInt(r, 24 - i_0);
    if (this.ct[t] != this.ct[i_0]) {
      m_0 = this.ct[i_0];
      this.ct[i_0] = this.ct[t];
      this.ct[t] = m_0;
    }
  }
}

defineSeed(305, 1, {}, CenterCube_0, CenterCube_1);
var center333Map;
function $clinit_CornerCube(){
  $clinit_CornerCube = nullMethod;
  moveCube_0 = initDim(_3Lcs_threephase_CornerCube_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$CornerCube, 18, 0);
  cornerFacelet_0 = initValues(_3_3B_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$byte_$1, [initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [8, 9, 20]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [6, 18, 38]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [0, 36, 47]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [2, 45, 11]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [29, 26, 15]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [27, 44, 24]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [33, 53, 42]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [35, 17, 51])]);
  initMove_0();
}

function $$init_2(this$static){
  this$static.cp = initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [0, 1, 2, 3, 4, 5, 6, 7]);
  this$static.co = initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [0, 0, 0, 0, 0, 0, 0, 0]);
}

function $copy_2(this$static, c){
  var i_0;
  for (i_0 = 0; i_0 < 8; ++i_0) {
    this$static.cp[i_0] = c.cp[i_0];
    this$static.co[i_0] = c.co[i_0];
  }
}

function $fill333Facelet_0(this$static, facelet){
  var corn, j, n, ori;
  for (corn = 0; corn < 8; ++corn) {
    j = this$static.cp[corn];
    ori = this$static.co[corn];
    for (n = 0; n < 3; ++n) {
      facelet[cornerFacelet_0[corn][(n + ori) % 3]] = $charAt('URFDLB', ~~(cornerFacelet_0[j][n] / 9));
    }
  }
}

function $move_3(this$static, idx){
  !this$static.temps && (this$static.temps = new CornerCube_0);
  CornMult_0(this$static, moveCube_0[idx], this$static.temps);
  $copy_2(this$static, this$static.temps);
}

function $setTwist_0(this$static, idx){
  var i_0, twst;
  twst = 0;
  for (i_0 = 6; i_0 >= 0; --i_0) {
    twst += this$static.co[i_0] = ~~(idx % 3 << 24) >> 24;
    idx = ~~(idx / 3);
  }
  this$static.co[7] = ~~((15 - twst) % 3 << 24) >> 24;
}

function CornMult_0(a, b, prod){
  var corn, ori, oriA, oriB;
  for (corn = 0; corn < 8; ++corn) {
    prod.cp[corn] = a.cp[b.cp[corn]];
    oriA = a.co[b.cp[corn]];
    oriB = b.co[corn];
    ori = oriA;
    ori = ~~(ori + (oriA < 3?oriB:6 - oriB) << 24) >> 24;
    ori = ~~(ori % 3 << 24) >> 24;
    oriA >= 3 ^ oriB >= 3 && (ori = ~~(ori + 3 << 24) >> 24);
    prod.co[corn] = ori;
  }
}

function CornerCube_0(){
  $clinit_CornerCube();
  $$init_2(this);
}

function CornerCube_1(cperm, twist){
  $$init_2(this);
  set8Perm_1(this.cp, cperm);
  $setTwist_0(this, twist);
}

function CornerCube_2(r){
  $clinit_CornerCube();
  CornerCube_1.call(this, $nextInt(r, 40320), $nextInt(r, 2187));
}

function initMove_0(){
  var a, p_0;
  moveCube_0[0] = new CornerCube_1(15120, 0);
  moveCube_0[3] = new CornerCube_1(21021, 1494);
  moveCube_0[6] = new CornerCube_1(8064, 1236);
  moveCube_0[9] = new CornerCube_1(9, 0);
  moveCube_0[12] = new CornerCube_1(1230, 412);
  moveCube_0[15] = new CornerCube_1(224, 137);
  for (a = 0; a < 18; a += 3) {
    for (p_0 = 0; p_0 < 2; ++p_0) {
      moveCube_0[a + p_0 + 1] = new CornerCube_0;
      CornMult_0(moveCube_0[a + p_0], moveCube_0[a], moveCube_0[a + p_0 + 1]);
    }
  }
}

defineSeed(306, 1, makeCastMap([Q$CornerCube]), CornerCube_0, CornerCube_1, CornerCube_2);
_.temps = null;
var cornerFacelet_0, moveCube_0;
function $clinit_Edge3(){
  $clinit_Edge3 = nullMethod;
  prunValues = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [1, 4, 16, 55, 324, 1922, 12275, 77640, 485359, 2778197, 11742425, 27492416, 31002941, 31006080]);
  eprun = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 1937880, 1);
  sym2raw_0 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 1538, 1);
  symstate = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 1538, 1);
  raw2sym_1 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 11880, 1);
  syminv_0 = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 1, 6, 3, 4, 5, 2, 7]);
  mvrot = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [160, 12], 2, 1);
  mvroto = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [160, 12], 2, 1);
  factX = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [1, 1, 1, 3, 12, 60, 360, 2520, 20160, 181440, 1814400, 19958400, 239500800]);
  FullEdgeMap = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 2, 4, 6, 1, 3, 7, 5, 8, 9, 10, 11]);
}

function $circle(arr, a, b, c, d){
  var temp;
  temp = arr[d];
  arr[d] = arr[c];
  arr[c] = arr[b];
  arr[b] = arr[a];
  arr[a] = temp;
}

function $circlex(this$static, a, b, c, d){
  var temp;
  temp = this$static.edgeo[d];
  this$static.edgeo[d] = this$static.edge[c];
  this$static.edge[c] = this$static.edgeo[b];
  this$static.edgeo[b] = this$static.edge[a];
  this$static.edge[a] = temp;
}

function $get_2(this$static, end){
  var i_0, idx, v, val;
  this$static.isStd || $std(this$static);
  idx = 0;
  val = Pba9876543210_longLit;
  for (i_0 = 0; i_0 < end; ++i_0) {
    v = this$static.edge[i_0] << 2;
    idx *= 12 - i_0;
    idx = toInt(add(fromInt(idx), and(shr(val, v), Pf_longLit)));
    val = sub(val, shl(P111111111110_longLit, v));
  }
  return idx;
}

function $getsym_0(this$static){
  var cord1x, cord2x, symcord1x, symx;
  cord1x = $get_2(this$static, 4);
  symcord1x = raw2sym_1[cord1x];
  symx = symcord1x & 7;
  symcord1x >>= 3;
  $rotate_0(this$static, symx);
  cord2x = $get_2(this$static, 10) % 20160;
  return symcord1x * 20160 + cord2x;
}

function $move_4(this$static, i_0){
  this$static.isStd = false;
  switch (i_0) {
    case 0:
      $circle(this$static.edge, 0, 4, 1, 5);
      $circle(this$static.edgeo, 0, 4, 1, 5);
      break;
    case 1:
      $swap_0(this$static.edge, 0, 4, 1, 5);
      $swap_0(this$static.edgeo, 0, 4, 1, 5);
      break;
    case 2:
      $circle(this$static.edge, 0, 5, 1, 4);
      $circle(this$static.edgeo, 0, 5, 1, 4);
      break;
    case 3:
      $swap_0(this$static.edge, 5, 10, 6, 11);
      $swap_0(this$static.edgeo, 5, 10, 6, 11);
      break;
    case 4:
      $circle(this$static.edge, 0, 11, 3, 8);
      $circle(this$static.edgeo, 0, 11, 3, 8);
      break;
    case 5:
      $swap_0(this$static.edge, 0, 11, 3, 8);
      $swap_0(this$static.edgeo, 0, 11, 3, 8);
      break;
    case 6:
      $circle(this$static.edge, 0, 8, 3, 11);
      $circle(this$static.edgeo, 0, 8, 3, 11);
      break;
    case 7:
      $circle(this$static.edge, 2, 7, 3, 6);
      $circle(this$static.edgeo, 2, 7, 3, 6);
      break;
    case 8:
      $swap_0(this$static.edge, 2, 7, 3, 6);
      $swap_0(this$static.edgeo, 2, 7, 3, 6);
      break;
    case 9:
      $circle(this$static.edge, 2, 6, 3, 7);
      $circle(this$static.edgeo, 2, 6, 3, 7);
      break;
    case 10:
      $swap_0(this$static.edge, 4, 8, 7, 9);
      $swap_0(this$static.edgeo, 4, 8, 7, 9);
      break;
    case 11:
      $circle(this$static.edge, 1, 9, 2, 10);
      $circle(this$static.edgeo, 1, 9, 2, 10);
      break;
    case 12:
      $swap_0(this$static.edge, 1, 9, 2, 10);
      $swap_0(this$static.edgeo, 1, 9, 2, 10);
      break;
    case 13:
      $circle(this$static.edge, 1, 10, 2, 9);
      $circle(this$static.edgeo, 1, 10, 2, 9);
      break;
    case 14:
      $swap_0(this$static.edge, 0, 4, 1, 5);
      $swap_0(this$static.edgeo, 0, 4, 1, 5);
      $swap(this$static.edge, 9, 11);
      $swap(this$static.edgeo, 8, 10);
      break;
    case 15:
      $swap_0(this$static.edge, 5, 10, 6, 11);
      $swap_0(this$static.edgeo, 5, 10, 6, 11);
      $swap(this$static.edge, 1, 3);
      $swap(this$static.edgeo, 0, 2);
      break;
    case 16:
      $swap_0(this$static.edge, 0, 11, 3, 8);
      $swap_0(this$static.edgeo, 0, 11, 3, 8);
      $swap(this$static.edge, 5, 7);
      $swap(this$static.edgeo, 4, 6);
      break;
    case 17:
      $swap_0(this$static.edge, 2, 7, 3, 6);
      $swap_0(this$static.edgeo, 2, 7, 3, 6);
      $swap(this$static.edge, 8, 10);
      $swap(this$static.edgeo, 9, 11);
      break;
    case 18:
      $swap_0(this$static.edge, 4, 8, 7, 9);
      $swap_0(this$static.edgeo, 4, 8, 7, 9);
      $swap(this$static.edge, 0, 2);
      $swap(this$static.edgeo, 1, 3);
      break;
    case 19:
      $swap_0(this$static.edge, 1, 9, 2, 10);
      $swap_0(this$static.edgeo, 1, 9, 2, 10);
      $swap(this$static.edge, 4, 6);
      $swap(this$static.edgeo, 5, 7);
  }
}

function $rot_1(this$static, r){
  this$static.isStd = false;
  switch (r) {
    case 0:
      $move_4(this$static, 14);
      $move_4(this$static, 17);
      break;
    case 1:
      $circlex(this$static, 11, 5, 10, 6);
      $circlex(this$static, 5, 10, 6, 11);
      $circlex(this$static, 1, 2, 3, 0);
      $circlex(this$static, 4, 9, 7, 8);
      $circlex(this$static, 8, 4, 9, 7);
      $circlex(this$static, 0, 1, 2, 3);
      break;
    case 2:
      $swapx(this$static, 4, 5);
      $swapx(this$static, 5, 4);
      $swapx(this$static, 11, 8);
      $swapx(this$static, 8, 11);
      $swapx(this$static, 7, 6);
      $swapx(this$static, 6, 7);
      $swapx(this$static, 9, 10);
      $swapx(this$static, 10, 9);
      $swapx(this$static, 1, 1);
      $swapx(this$static, 0, 0);
      $swapx(this$static, 3, 3);
      $swapx(this$static, 2, 2);
  }
}

function $rotate_0(this$static, r){
  while (r >= 2) {
    r -= 2;
    $rot_1(this$static, 1);
    $rot_1(this$static, 2);
  }
  r != 0 && $rot_1(this$static, 0);
}

function $set_4(this$static, idx){
  var i_0, m_0, p_0, parity, v, val;
  val = Pba9876543210_longLit;
  parity = 0;
  for (i_0 = 0; i_0 < 11; ++i_0) {
    p_0 = factX[11 - i_0];
    v = ~~(idx / p_0);
    idx = idx % p_0;
    parity ^= v;
    v <<= 2;
    this$static.edge[i_0] = toInt(and(shr(val, v), Pf_longLit));
    m_0 = sub(shl(P1_longLit, v), P1_longLit);
    val = add(and(val, m_0), and(shr(val, 4), create0(~m_0.l & 4194303, ~m_0.m & 4194303, ~m_0.h & 1048575)));
  }
  if ((parity & 1) == 0) {
    this$static.edge[11] = toInt(val);
  }
   else {
    this$static.edge[11] = this$static.edge[10];
    this$static.edge[10] = toInt(val);
  }
  for (i_0 = 0; i_0 < 12; ++i_0) {
    this$static.edgeo[i_0] = i_0;
  }
  this$static.isStd = true;
}

function $set_5(this$static, e){
  var i_0;
  for (i_0 = 0; i_0 < 12; ++i_0) {
    this$static.edge[i_0] = e.edge[i_0];
    this$static.edgeo[i_0] = e.edgeo[i_0];
  }
  this$static.isStd = e.isStd;
}

function $set_6(this$static, c){
  var i_0, parity, s, t;
  this$static.temp == null && (this$static.temp = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 12, 1));
  for (i_0 = 0; i_0 < 12; ++i_0) {
    this$static.temp[i_0] = i_0;
    this$static.edge[i_0] = c.ep[FullEdgeMap[i_0] + 12] % 12;
  }
  parity = 1;
  for (i_0 = 0; i_0 < 12; ++i_0) {
    while (this$static.edge[i_0] != i_0) {
      t = this$static.edge[i_0];
      this$static.edge[i_0] = this$static.edge[t];
      this$static.edge[t] = t;
      s = this$static.temp[i_0];
      this$static.temp[i_0] = this$static.temp[t];
      this$static.temp[t] = s;
      parity ^= 1;
    }
  }
  for (i_0 = 0; i_0 < 12; ++i_0) {
    this$static.edge[i_0] = this$static.temp[c.ep[FullEdgeMap[i_0]] % 12];
  }
  return parity;
}

function $std(this$static){
  var i_0;
  this$static.temp == null && (this$static.temp = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 12, 1));
  for (i_0 = 0; i_0 < 12; ++i_0) {
    this$static.temp[this$static.edgeo[i_0]] = i_0;
  }
  for (i_0 = 0; i_0 < 12; ++i_0) {
    this$static.edge[i_0] = this$static.temp[this$static.edge[i_0]];
    this$static.edgeo[i_0] = i_0;
  }
  this$static.isStd = true;
}

function $swap(arr, x, y){
  var temp;
  temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
}

function $swap_0(arr, a, b, c, d){
  var temp;
  temp = arr[a];
  arr[a] = arr[c];
  arr[c] = temp;
  temp = arr[b];
  arr[b] = arr[d];
  arr[d] = temp;
}

function $swapx(this$static, x, y){
  var temp;
  temp = this$static.edge[x];
  this$static.edge[x] = this$static.edgeo[y];
  this$static.edgeo[y] = temp;
}

function Edge3_0(){
  $clinit_Edge3();
  this.edge = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 12, 1);
  this.edgeo = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 12, 1);
}

function createPrun_0(){
  $clinit_Edge3();
  var chk, cord1, cord1x, cord2, cord2x, dep1m3, depm3, depth, e, end, f, find_0, g, i_0, i_, idx, idxx, inv, j, m_0, symState, symcord1, symcord1x, symx, val;
  e = new Edge3_0;
  f = new Edge3_0;
  g = new Edge3_0;
  fill_2(eprun);
  depth = 0;
  done_0 = 1;
  setPruning_0(eprun, 0, 0);
  while (done_0 != 31006080) {
    inv = depth > 9;
    depm3 = depth % 3;
    dep1m3 = (depth + 1) % 3;
    find_0 = inv?3:depm3;
    chk = inv?depm3:3;
    if (depth >= 9) {
      break;
    }
    for (i_ = 0; i_ < 31006080; i_ += 16) {
      val = eprun[~~i_ >> 4];
      if (!inv && val == -1) {
        continue;
      }
      for (i_0 = i_ , end = i_ + 16; i_0 < end; ++i_0 , val >>= 2) {
        if ((val & 3) != find_0) {
          continue;
        }
        symcord1 = ~~(i_0 / 20160);
        cord1 = sym2raw_0[symcord1];
        cord2 = i_0 % 20160;
        $set_4(e, cord1 * 20160 + cord2);
        for (m_0 = 0; m_0 < 17; ++m_0) {
          cord1x = getmvrot(e.edge, m_0 << 3, 4);
          symcord1x = raw2sym_1[cord1x];
          symx = symcord1x & 7;
          symcord1x >>= 3;
          cord2x = getmvrot(e.edge, m_0 << 3 | symx, 10) % 20160;
          idx = symcord1x * 20160 + cord2x;
          if (getPruning_0(eprun, idx) != chk) {
            continue;
          }
          setPruning_0(eprun, inv?i_0:idx, dep1m3);
          ++done_0;
          if (inv) {
            break;
          }
          symState = symstate[symcord1x];
          if (symState == 1) {
            continue;
          }
          $set_5(f, e);
          $move_4(f, m_0);
          $rotate_0(f, symx);
          for (j = 1; (symState = ~~symState >> 1 & 65535) != 0; ++j) {
            if ((symState & 1) != 1) {
              continue;
            }
            $set_5(g, f);
            $rotate_0(g, j);
            idxx = symcord1x * 20160 + $get_2(g, 10) % 20160;
            if (getPruning_0(eprun, idxx) == chk) {
              setPruning_0(eprun, idxx, dep1m3);
              ++done_0;
            }
          }
        }
      }
    }
    ++depth;
    ($clinit_System() , out_0).println(depth + '\t' + done_0);
  }
}

function getPruning_0(table, index){
  return ~~table[~~index >> 4] >> ((index & 15) << 1) & 3;
}

function getmvrot(ep, mrIdx, end){
  $clinit_Edge3();
  var i_0, idx, mov, movo, v, valh, vall;
  movo = mvroto[mrIdx];
  mov = mvrot[mrIdx];
  idx = 0;
  vall = 1985229328;
  valh = 47768;
  for (i_0 = 0; i_0 < end; ++i_0) {
    v = movo[ep[mov[i_0]]] << 2;
    idx *= 12 - i_0;
    if (v >= 32) {
      idx += ~~valh >> v - 32 & 15;
      valh -= 4368 << v - 32;
    }
     else {
      idx += ~~vall >> v & 15;
      valh -= 4369;
      vall -= 286331152 << v;
    }
  }
  return idx;
}

function getprun(edge){
  $clinit_Edge3();
  var cord1, cord1x, cord2, cord2x, depm3, depth, e, idx, m_0, symcord1, symcord1x, symx;
  e = new Edge3_0;
  depth = 0;
  depm3 = getPruning_0(eprun, edge);
  if (depm3 == 3) {
    return 10;
  }
  while (edge != 0) {
    depm3 == 0?(depm3 = 2):--depm3;
    symcord1 = ~~(edge / 20160);
    cord1 = sym2raw_0[symcord1];
    cord2 = edge % 20160;
    $set_4(e, cord1 * 20160 + cord2);
    for (m_0 = 0; m_0 < 17; ++m_0) {
      cord1x = getmvrot(e.edge, m_0 << 3, 4);
      symcord1x = raw2sym_1[cord1x];
      symx = symcord1x & 7;
      symcord1x >>= 3;
      cord2x = getmvrot(e.edge, m_0 << 3 | symx, 10) % 20160;
      idx = symcord1x * 20160 + cord2x;
      if (getPruning_0(eprun, idx) == depm3) {
        ++depth;
        edge = idx;
        break;
      }
    }
  }
  return depth;
}

function getprun_0(edge, prun){
  $clinit_Edge3();
  var depm3;
  depm3 = getPruning_0(eprun, edge);
  if (depm3 == 3) {
    return 10;
  }
  return (depm3 - prun + 16) % 3 + prun - 1;
}

function initMvrot(){
  $clinit_Edge3();
  var e, i_0, m_0, r;
  e = new Edge3_0;
  for (m_0 = 0; m_0 < 20; ++m_0) {
    for (r = 0; r < 8; ++r) {
      $set_4(e, 0);
      $move_4(e, m_0);
      $rotate_0(e, r);
      for (i_0 = 0; i_0 < 12; ++i_0) {
        mvrot[m_0 << 3 | r][i_0] = e.edge[i_0];
      }
      $std(e);
      for (i_0 = 0; i_0 < 12; ++i_0) {
        mvroto[m_0 << 3 | r][i_0] = e.temp[i_0];
      }
    }
  }
}

function initRaw2Sym(){
  $clinit_Edge3();
  var count, e, i_0, idx, j, occ;
  e = new Edge3_0;
  occ = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 1485, 1);
  count = 0;
  for (i_0 = 0; i_0 < 11880; ++i_0) {
    if ((occ[~~i_0 >>> 3] & 1 << (i_0 & 7)) == 0) {
      $set_4(e, i_0 * factX[8]);
      for (j = 0; j < 8; ++j) {
        idx = $get_2(e, 4);
        idx == i_0 && (symstate[count] = (symstate[count] | 1 << j) & 65535);
        occ[~~idx >> 3] = ~~((occ[~~idx >> 3] | 1 << (idx & 7)) << 24) >> 24;
        raw2sym_1[idx] = count << 3 | syminv_0[j];
        $rot_1(e, 0);
        if (j % 2 == 1) {
          $rot_1(e, 1);
          $rot_1(e, 2);
        }
      }
      sym2raw_0[count++] = i_0;
    }
  }
}

function setPruning_0(table, index, value){
  table[~~index >> 4] ^= (3 ^ value) << ((index & 15) << 1);
}

defineSeed(307, 1, makeCastMap([Q$Edge3]), Edge3_0);
_.isStd = true;
_.temp = null;
var FullEdgeMap, done_0 = 0, eprun, factX, mvrot, mvroto, prunValues, raw2sym_1, sym2raw_0, syminv_0, symstate;
function $clinit_EdgeCube(){
  $clinit_EdgeCube = nullMethod;
  EdgeColor = initValues(_3_3I_classLit, makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), Q$int_$1, [initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [2, 0]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [5, 0]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [3, 0]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [4, 0]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [3, 1]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [5, 1]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [2, 1]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [4, 1]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [2, 5]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [3, 5]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [3, 4]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [2, 4])]);
  EdgeMap = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [19, 37, 46, 10, 52, 43, 25, 16, 21, 50, 48, 23, 7, 3, 1, 5, 34, 30, 28, 32, 41, 39, 14, 12]);
}

function $checkEdge(this$static){
  var ck, i_0, parity;
  ck = 0;
  parity = false;
  for (i_0 = 0; i_0 < 12; ++i_0) {
    ck |= 1 << this$static.ep[i_0];
    parity = parity != this$static.ep[i_0] >= 12;
  }
  ck &= ~~ck >> 12;
  return ck == 0 && !parity;
}

function $copy_3(this$static, c){
  var i_0;
  for (i_0 = 0; i_0 < 24; ++i_0) {
    this$static.ep[i_0] = c.ep[i_0];
  }
}

function $fill333Facelet_1(this$static, facelet){
  var i_0;
  for (i_0 = 0; i_0 < 24; ++i_0) {
    facelet[EdgeMap[i_0]] = ($clinit_Util_0() , colorMap4to3)[EdgeColor[this$static.ep[i_0] % 12][~~(this$static.ep[i_0] / 12)]];
  }
}

function $move_5(this$static, m_0){
  var key;
  key = m_0 % 3;
  m_0 = ~~(m_0 / 3);
  switch (m_0) {
    case 0:
      swap(this$static.ep, 0, 1, 2, 3, key);
      swap(this$static.ep, 12, 13, 14, 15, key);
      break;
    case 1:
      swap(this$static.ep, 11, 15, 10, 19, key);
      swap(this$static.ep, 23, 3, 22, 7, key);
      break;
    case 2:
      swap(this$static.ep, 0, 11, 6, 8, key);
      swap(this$static.ep, 12, 23, 18, 20, key);
      break;
    case 3:
      swap(this$static.ep, 4, 5, 6, 7, key);
      swap(this$static.ep, 16, 17, 18, 19, key);
      break;
    case 4:
      swap(this$static.ep, 1, 20, 5, 21, key);
      swap(this$static.ep, 13, 8, 17, 9, key);
      break;
    case 5:
      swap(this$static.ep, 2, 9, 4, 10, key);
      swap(this$static.ep, 14, 21, 16, 22, key);
      break;
    case 6:
      swap(this$static.ep, 0, 1, 2, 3, key);
      swap(this$static.ep, 12, 13, 14, 15, key);
      swap(this$static.ep, 9, 22, 11, 20, key);
      break;
    case 7:
      swap(this$static.ep, 11, 15, 10, 19, key);
      swap(this$static.ep, 23, 3, 22, 7, key);
      swap(this$static.ep, 2, 16, 6, 12, key);
      break;
    case 8:
      swap(this$static.ep, 0, 11, 6, 8, key);
      swap(this$static.ep, 12, 23, 18, 20, key);
      swap(this$static.ep, 3, 19, 5, 13, key);
      break;
    case 9:
      swap(this$static.ep, 4, 5, 6, 7, key);
      swap(this$static.ep, 16, 17, 18, 19, key);
      swap(this$static.ep, 8, 23, 10, 21, key);
      break;
    case 10:
      swap(this$static.ep, 1, 20, 5, 21, key);
      swap(this$static.ep, 13, 8, 17, 9, key);
      swap(this$static.ep, 14, 0, 18, 4, key);
      break;
    case 11:
      swap(this$static.ep, 2, 9, 4, 10, key);
      swap(this$static.ep, 14, 21, 16, 22, key);
      swap(this$static.ep, 7, 15, 1, 17, key);
  }
}

function EdgeCube_0(){
  $clinit_EdgeCube();
  var i_0;
  this.ep = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 24, 1);
  for (i_0 = 0; i_0 < 24; ++i_0) {
    this.ep[i_0] = i_0;
  }
}

function EdgeCube_1(r){
  $clinit_EdgeCube();
  var i_0, m_0, t;
  EdgeCube_0.call(this);
  for (i_0 = 0; i_0 < 23; ++i_0) {
    t = i_0 + $nextInt(r, 24 - i_0);
    if (t != i_0) {
      m_0 = this.ep[i_0];
      this.ep[i_0] = this.ep[t];
      this.ep[t] = m_0;
    }
  }
}

defineSeed(308, 1, {}, EdgeCube_0, EdgeCube_1);
var EdgeColor, EdgeMap;
function $clinit_FullCube_0(){
  $clinit_FullCube_0 = nullMethod;
  move2rot = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [35, 1, 34, 2, 4, 6, 22, 5, 19]);
}

function $$init_3(this$static){
  this$static.moveBuffer = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 60, 1);
}

function $compareTo_1(this$static, c){
  return this$static.value - c.value;
}

function $copy_4(this$static, c){
  var i_0;
  $copy_3(this$static.edge, c.edge);
  $copy_1(this$static.center, c.center);
  $copy_2(this$static.corner, c.corner);
  this$static.value = c.value;
  this$static.add1 = c.add1;
  this$static.length1 = c.length1;
  this$static.length2 = c.length2;
  this$static.length3 = c.length3;
  this$static.sym = c.sym;
  for (i_0 = 0; i_0 < 60; ++i_0) {
    this$static.moveBuffer[i_0] = c.moveBuffer[i_0];
  }
  this$static.moveLength = c.moveLength;
  this$static.edgeAvail = c.edgeAvail;
  this$static.centerAvail = c.centerAvail;
  this$static.cornerAvail = c.cornerAvail;
}

function $getCenter(this$static){
  while (this$static.centerAvail < this$static.moveLength) {
    $move_2(this$static.center, this$static.moveBuffer[this$static.centerAvail++]);
  }
  return this$static.center;
}

function $getCorner(this$static){
  while (this$static.cornerAvail < this$static.moveLength) {
    $move_3(this$static.corner, this$static.moveBuffer[this$static.cornerAvail++] % 18);
  }
  return this$static.corner;
}

function $getEdge(this$static){
  while (this$static.edgeAvail < this$static.moveLength) {
    $move_5(this$static.edge, this$static.moveBuffer[this$static.edgeAvail++]);
  }
  return this$static.edge;
}

function $getMoveString(this$static){
  var finishSym, fixedMoves, i_0, idx, move, rot, sb, sym;
  fixedMoves = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, this$static.moveLength - (this$static.add1?2:0), 1);
  idx = 0;
  for (i_0 = 0; i_0 < this$static.length1; ++i_0) {
    fixedMoves[idx++] = this$static.moveBuffer[i_0];
  }
  sym = this$static.sym;
  for (i_0 = this$static.length1 + (this$static.add1?2:0); i_0 < this$static.moveLength; ++i_0) {
    if (($clinit_Center1() , symmove)[sym][this$static.moveBuffer[i_0]] >= 27) {
      fixedMoves[idx++] = symmove[sym][this$static.moveBuffer[i_0]] - 9;
      rot = move2rot[symmove[sym][this$static.moveBuffer[i_0]] - 27];
      sym = symmult[sym][rot];
    }
     else {
      fixedMoves[idx++] = symmove[sym][this$static.moveBuffer[i_0]];
    }
  }
  finishSym = ($clinit_Center1() , symmult)[syminv[sym]][getSolvedSym($getCenter(this$static))];
  sb = new StringBuffer_0;
  sym = finishSym;
  for (i_0 = idx - 1; i_0 >= 0; --i_0) {
    move = fixedMoves[i_0];
    move = ~~(move / 3) * 3 + (2 - move % 3);
    if (symmove[sym][move] >= 27) {
      $append($append_2(sb, ($clinit_Moves() , move2str_1)[symmove[sym][move] - 9]));
      rot = move2rot[symmove[sym][move] - 27];
      sym = symmult[sym][rot];
    }
     else {
      $append($append_2(sb, ($clinit_Moves() , move2str_1)[symmove[sym][move]]));
    }
  }
  return sb.impl.toString_0(sb.data);
}

function $move_6(this$static, m_0){
  this$static.moveBuffer[this$static.moveLength++] = ~~(m_0 << 24) >> 24;
  return;
}

function FullCube_3(){
  $clinit_FullCube_0();
  $$init_3(this);
  this.edge = new EdgeCube_0;
  this.center = new CenterCube_0;
  this.corner = new CornerCube_0;
}

function FullCube_4(c){
  $clinit_FullCube_0();
  FullCube_3.call(this);
  $copy_4(this, c);
}

function FullCube_5(r){
  $clinit_FullCube_0();
  $$init_3(this);
  this.edge = new EdgeCube_1(r);
  this.center = new CenterCube_1(r);
  this.corner = new CornerCube_2(r);
}

defineSeed(309, 1, makeCastMap([Q$FullCube_0, Q$Comparable]), FullCube_3, FullCube_4, FullCube_5);
_.compareTo$ = function compareTo_1(c){
  return $compareTo_1(this, dynamicCast(c, Q$FullCube_0));
}
;
_.add1 = false;
_.center = null;
_.centerAvail = 0;
_.corner = null;
_.cornerAvail = 0;
_.edge = null;
_.edgeAvail = 0;
_.length1 = 0;
_.length2 = 0;
_.length3 = 0;
_.moveLength = 0;
_.sym = 0;
_.value = 0;
var move2rot;
function $compare(c1, c2){
  return c2.value - c1.value;
}

function $compare_0(c1, c2){
  return $compare(dynamicCast(c1, Q$FullCube_0), dynamicCast(c2, Q$FullCube_0));
}

function FullCube$ValueComparator_0(){
}

defineSeed(310, 1, {}, FullCube$ValueComparator_0);
_.compare = function compare(c1, c2){
  return $compare_0(c1, c2);
}
;
function $clinit_Moves(){
  $clinit_Moves = nullMethod;
  var i_0, j;
  move2str_1 = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ['U  ', 'U2 ', "U' ", 'R  ', 'R2 ', "R' ", 'F  ', 'F2 ', "F' ", 'D  ', 'D2 ', "D' ", 'L  ', 'L2 ', "L' ", 'B  ', 'B2 ', "B' ", 'Uw ', 'Uw2', "Uw'", 'Rw ', 'Rw2', "Rw'", 'Fw ', 'Fw2', "Fw'", 'Dw ', 'Dw2', "Dw'", 'Lw ', 'Lw2', "Lw'", 'Bw ', 'Bw2', "Bw'"]);
  move2std = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22, 23, 25, 28, 30, 31, 32, 34, 36]);
  move3std = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 1, 2, 4, 6, 7, 8, 9, 10, 11, 13, 15, 16, 17, 19, 22, 25, 28, 31, 34, 36]);
  std2move = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 37, 1);
  std3move = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 37, 1);
  ckmv = initDims([_3_3Z_classLit, _3Z_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$boolean_$1, Q$Serializable])], [Q$boolean_$1, -1], [37, 36], 2, 2);
  ckmv2_0 = initDims([_3_3Z_classLit, _3Z_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$boolean_$1, Q$Serializable])], [Q$boolean_$1, -1], [29, 28], 2, 2);
  ckmv3 = initDims([_3_3Z_classLit, _3Z_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$boolean_$1, Q$Serializable])], [Q$boolean_$1, -1], [21, 20], 2, 2);
  skipAxis = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 36, 1);
  skipAxis2 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 28, 1);
  skipAxis3 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 20, 1);
  for (i_0 = 0; i_0 < 29; ++i_0) {
    std2move[move2std[i_0]] = i_0;
  }
  for (i_0 = 0; i_0 < 21; ++i_0) {
    std3move[move3std[i_0]] = i_0;
  }
  for (i_0 = 0; i_0 < 36; ++i_0) {
    for (j = 0; j < 36; ++j) {
      ckmv[i_0][j] = ~~(i_0 / 3) == ~~(j / 3) || ~~(i_0 / 3) % 3 == ~~(j / 3) % 3 && i_0 > j;
    }
    ckmv[36][i_0] = false;
  }
  for (i_0 = 0; i_0 < 29; ++i_0) {
    for (j = 0; j < 28; ++j) {
      ckmv2_0[i_0][j] = ckmv[move2std[i_0]][move2std[j]];
    }
  }
  for (i_0 = 0; i_0 < 21; ++i_0) {
    for (j = 0; j < 20; ++j) {
      ckmv3[i_0][j] = ckmv[move3std[i_0]][move3std[j]];
    }
  }
  for (i_0 = 0; i_0 < 36; ++i_0) {
    skipAxis[i_0] = 36;
    for (j = i_0; j < 36; ++j) {
      if (!ckmv[i_0][j]) {
        skipAxis[i_0] = j - 1;
        break;
      }
    }
  }
  for (i_0 = 0; i_0 < 28; ++i_0) {
    skipAxis2[i_0] = 28;
    for (j = i_0; j < 28; ++j) {
      if (!ckmv2_0[i_0][j]) {
        skipAxis2[i_0] = j - 1;
        break;
      }
    }
  }
  for (i_0 = 0; i_0 < 20; ++i_0) {
    skipAxis3[i_0] = 20;
    for (j = i_0; j < 20; ++j) {
      if (!ckmv3[i_0][j]) {
        skipAxis3[i_0] = j - 1;
        break;
      }
    }
  }
}

var ckmv, ckmv2_0, ckmv3, move2std, move2str_1, move3std, skipAxis, skipAxis2, skipAxis3, std2move, std3move;
function $doSearch(this$static){
  var MAX_LENGTH2, MAX_LENGTH3, ct, edge, eparity, facelet, fb, fbprun, i_0, index, length_0, length12, length123, p1SolsArr, prun, rl, rlprun, s2ct, s2rl, sol, sol333, solcnt, solcube, str, ud, udprun, ret;
  init_8();
  this$static.solution = '';
  ud = $getsym(new Center1_1($getCenter(this$static.c), 0));
  fb = $getsym(new Center1_1($getCenter(this$static.c), 1));
  rl = $getsym(new Center1_1($getCenter(this$static.c), 2));
  udprun = ($clinit_Center1() , csprun)[~~ud >> 6];
  fbprun = csprun[~~fb >> 6];
  rlprun = csprun[~~rl >> 6];
  this$static.p1SolsCnt = 0;
  this$static.arr2idx = 0;
  $clear(this$static.p1sols.heap);
  for (this$static.length1 = (udprun < fbprun?udprun:fbprun) < rlprun?udprun < fbprun?udprun:fbprun:rlprun; this$static.length1 < 100; ++this$static.length1) {
    if (rlprun <= this$static.length1 && $search1(this$static, ~~rl >>> 6, rl & 63, this$static.length1, -1, 0) || udprun <= this$static.length1 && $search1(this$static, ~~ud >>> 6, ud & 63, this$static.length1, -1, 0) || fbprun <= this$static.length1 && $search1(this$static, ~~fb >>> 6, fb & 63, this$static.length1, -1, 0)) {
      break;
    }
  }
  p1SolsArr = dynamicCast($toArray_1(this$static.p1sols, initDim(_3Lcs_threephase_FullCube_2_classLit, makeCastMap([Q$FullCube_$1, Q$Serializable, Q$Object_$1]), Q$FullCube_0, 0, 0)), Q$FullCube_$1);
  mergeSort(p1SolsArr, 0, p1SolsArr.length, ($clinit_Comparators() , $clinit_Comparators() , NATURAL));
  MAX_LENGTH2 = 9;
  do {
    OUT: for (length12 = p1SolsArr[0].value; length12 < 100; ++length12) {
      for (i_0 = 0; i_0 < p1SolsArr.length; ++i_0) {
        if (p1SolsArr[i_0].value > length12) {
          break;
        }
        if (length12 - p1SolsArr[i_0].length1 > MAX_LENGTH2) {
          continue;
        }
        $copy_4(this$static.c1, p1SolsArr[i_0]);
        $set_2(this$static.ct2, $getCenter(this$static.c1), parity_0($getEdge(this$static.c1).ep));
        s2ct = $getct(this$static.ct2);
        s2rl = $getrl(this$static.ct2);
        this$static.length1 = p1SolsArr[i_0].length1;
        this$static.length2 = length12 - p1SolsArr[i_0].length1;
        if ($search2(this$static, s2ct, s2rl, this$static.length2, 28, 0)) {
          break OUT;
        }
      }
    }
    ++MAX_LENGTH2;
  }
   while (length12 == 100);
  mergeSort(this$static.arr2, 0, this$static.arr2idx, NATURAL);
  index = 0;
  solcnt = 0;
  MAX_LENGTH3 = 13;
  do {
    OUT2: for (length123 = this$static.arr2[0].value; length123 < 100; ++length123) {
      for (i_0 = 0; i_0 < min(this$static.arr2idx, 100); ++i_0) {
        if (this$static.arr2[i_0].value > length123) {
          break;
        }
        if (length123 - this$static.arr2[i_0].length1 - this$static.arr2[i_0].length2 > MAX_LENGTH3) {
          continue;
        }
        eparity = $set_6(this$static.e12, $getEdge(this$static.arr2[i_0]));
        $set_3(this$static.ct3, $getCenter(this$static.arr2[i_0]), eparity ^ parity_0($getCorner(this$static.arr2[i_0]).cp));
        ct = $getct_0(this$static.ct3);
        edge = $get_2(this$static.e12, 10);
        prun = getprun($getsym_0(this$static.e12));
        if (prun <= length123 - this$static.arr2[i_0].length1 - this$static.arr2[i_0].length2 && $search3(this$static, edge, ct, prun, length123 - this$static.arr2[i_0].length1 - this$static.arr2[i_0].length2, 20, 0)) {
          ++solcnt;
          index = i_0;
          break OUT2;
        }
      }
    }
    ++MAX_LENGTH3;
  }
   while (length123 == 100);
  solcube = new FullCube_4(this$static.arr2[index]);
  this$static.length1 = solcube.length1;
  this$static.length2 = solcube.length2;
  length_0 = length123 - this$static.length1 - this$static.length2;
  for (i_0 = 0; i_0 < length_0; ++i_0) {
    $move_6(solcube, ($clinit_Moves() , move3std)[this$static.move3[i_0]]);
  }
  facelet = (ret = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 54, 1) , $fill333Facelet_1($getEdge(solcube), ret) , $fill333Facelet($getCenter(solcube), ret) , $fill333Facelet_0($getCorner(solcube), ret) , valueOf_1(ret));
  sol = $solution(this$static.search333, facelet, 20, P64_longLit, P32_longLit, 0, null, null);
  sol.indexOf('Error 8') == 0 && (sol = $solution(this$static.search333, facelet, 21, Pf4240_longLit, P1e_longLit, 0, null, null));
  ~~(sol.length / 3);
  if (sol.indexOf('Error') == 0) {
    ($clinit_System() , out_0).println(sol);
    throw new RuntimeException_0;
  }
  sol333 = tomove(sol);
  for (i_0 = 0; i_0 < sol333.length; ++i_0) {
    $move_6(solcube, sol333[i_0]);
  }
  str = new StringBuffer_0;
  $append_2(str, $getMoveString(solcube));
  this$static.solution = str.impl.toString_0(str.data);
}

function $init2_0(this$static, sym){
  var ctp, i_0, next, s2ct, s2rl;
  $copy_4(this$static.c1, this$static.c);
  for (i_0 = 0; i_0 < this$static.length1; ++i_0) {
    $move_6(this$static.c1, this$static.move1[i_0]);
  }
  switch (($clinit_Center1() , finish_0)[sym]) {
    case 0:
      $move_6(this$static.c1, 24);
      $move_6(this$static.c1, 35);
      this$static.move1[this$static.length1] = 24;
      this$static.move1[this$static.length1 + 1] = 35;
      this$static.add1 = true;
      sym = 19;
      break;
    case 12869:
      $move_6(this$static.c1, 18);
      $move_6(this$static.c1, 29);
      this$static.move1[this$static.length1] = 18;
      this$static.move1[this$static.length1 + 1] = 29;
      this$static.add1 = true;
      sym = 34;
      break;
    case 735470:
      this$static.add1 = false;
      sym = 0;
  }
  $set_2(this$static.ct2, $getCenter(this$static.c1), parity_0($getEdge(this$static.c1).ep));
  s2ct = $getct(this$static.ct2);
  s2rl = $getrl(this$static.ct2);
  ctp = ($clinit_Center2() , ctprun)[s2ct * 70 + s2rl];
  this$static.c1.value = ctp + this$static.length1;
  this$static.c1.length1 = this$static.length1;
  this$static.c1.add1 = this$static.add1;
  this$static.c1.sym = sym;
  ++this$static.p1SolsCnt;
  if (this$static.p1sols.heap.size < 500) {
    next = new FullCube_4(this$static.c1);
  }
   else {
    next = dynamicCast($poll(this$static.p1sols), Q$FullCube_0);
    next.value > this$static.c1.value && $copy_4(next, this$static.c1);
  }
  $add_5(this$static.p1sols, next);
  return this$static.p1SolsCnt == 10000;
}

function $init3(this$static){
  var ct, eparity, i_0, prun;
  $copy_4(this$static.c2, this$static.c1);
  for (i_0 = 0; i_0 < this$static.length2; ++i_0) {
    $move_6(this$static.c2, this$static.move2[i_0]);
  }
  if (!$checkEdge($getEdge(this$static.c2))) {
    return false;
  }
  eparity = $set_6(this$static.e12, $getEdge(this$static.c2));
  $set_3(this$static.ct3, $getCenter(this$static.c2), eparity ^ parity_0($getCorner(this$static.c2).cp));
  ct = $getct_0(this$static.ct3);
  $get_2(this$static.e12, 10);
  prun = getprun($getsym_0(this$static.e12));
  !this$static.arr2[this$static.arr2idx]?(this$static.arr2[this$static.arr2idx] = new FullCube_4(this$static.c2)):$copy_4(this$static.arr2[this$static.arr2idx], this$static.c2);
  this$static.arr2[this$static.arr2idx].value = this$static.length1 + this$static.length2 + max(prun, ($clinit_Center3() , prun_0)[ct]);
  this$static.arr2[this$static.arr2idx].length2 = this$static.length2;
  ++this$static.arr2idx;
  return this$static.arr2idx == this$static.arr2.length;
}

function $randomState(this$static, r){
  this$static.c = new FullCube_5(r);
  $doSearch(this$static);
  return this$static.solution;
}

function $search1(this$static, ct, sym, maxl, lm, depth){
  var axis, ctx, m_0, power, prun, symx;
  if (ct == 0) {
    return maxl == 0 && $init2_0(this$static, sym);
  }
  for (axis = 0; axis < 27; axis += 3) {
    if (axis == lm || axis == lm - 9 || axis == lm - 18) {
      continue;
    }
    for (power = 0; power < 3; ++power) {
      m_0 = axis + power;
      ctx = ($clinit_Center1() , ctsmv)[ct][symmove[sym][m_0]];
      prun = csprun[~~ctx >>> 6];
      if (prun >= maxl) {
        if (prun > maxl) {
          break;
        }
        continue;
      }
      symx = symmult[sym][ctx & 63];
      ctx >>>= 6;
      this$static.move1[depth] = m_0;
      if ($search1(this$static, ctx, symx, maxl - 1, axis, depth + 1)) {
        return true;
      }
    }
  }
  return false;
}

function $search2(this$static, ct, rl, maxl, lm, depth){
  var ctx, m_0, prun, rlx;
  if (ct == 0 && ($clinit_Center2() , ctprun)[rl] == 0) {
    return maxl == 0 && $init3(this$static);
  }
  for (m_0 = 0; m_0 < 23; ++m_0) {
    if (($clinit_Moves() , ckmv2_0)[lm][m_0]) {
      m_0 = skipAxis2[m_0];
      continue;
    }
    ctx = ($clinit_Center2() , ctmv)[ct][m_0];
    rlx = rlmv[rl][m_0];
    prun = ctprun[ctx * 70 + rlx];
    if (prun >= maxl) {
      prun > maxl && (m_0 = skipAxis2[m_0]);
      continue;
    }
    this$static.move2[depth] = move2std[m_0];
    if ($search2(this$static, ctx, rlx, maxl - 1, m_0, depth + 1)) {
      return true;
    }
  }
  return false;
}

function $search3(this$static, edge, ct, prun, maxl, lm, depth){
  var cord1x, cord2x, ctx, edgex, m_0, prun1, prunx, symcord1x, symx;
  if (maxl == 0) {
    return edge == 0 && ct == 0;
  }
  $set_4(this$static.tempe[depth], edge);
  for (m_0 = 0; m_0 < 17; ++m_0) {
    if (($clinit_Moves() , ckmv3)[lm][m_0]) {
      m_0 = skipAxis3[m_0];
      continue;
    }
    ctx = ($clinit_Center3() , ctmove)[ct][m_0];
    prun1 = prun_0[ctx];
    if (prun1 >= maxl) {
      prun1 > maxl && m_0 < 14 && (m_0 = skipAxis3[m_0]);
      continue;
    }
    edgex = getmvrot(this$static.tempe[depth].edge, m_0 << 3, 10);
    cord1x = ~~(edgex / 20160);
    symcord1x = ($clinit_Edge3() , raw2sym_1)[cord1x];
    symx = symcord1x & 7;
    symcord1x >>= 3;
    cord2x = getmvrot(this$static.tempe[depth].edge, m_0 << 3 | symx, 10) % 20160;
    prunx = getprun_0(symcord1x * 20160 + cord2x, prun);
    if (prunx >= maxl) {
      prunx > maxl && m_0 < 14 && (m_0 = skipAxis3[m_0]);
      continue;
    }
    if ($search3(this$static, edgex, ctx, prunx, maxl - 1, m_0, depth + 1)) {
      this$static.move3[depth] = m_0;
      return true;
    }
  }
  return false;
}

function Search_4(){
  var i_0;
  this.p1sols = new PriorityQueue_0(new FullCube$ValueComparator_0);
  this.move1 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 15, 1);
  this.move2 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 20, 1);
  this.move3 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 20, 1);
  this.c1 = new FullCube_3;
  this.c2 = new FullCube_3;
  this.ct2 = new Center2_0;
  this.ct3 = new Center3_0;
  this.e12 = new Edge3_0;
  this.tempe = initDim(_3Lcs_threephase_Edge3_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Edge3, 20, 0);
  this.search333 = new Search_0;
  this.arr2 = initDim(_3Lcs_threephase_FullCube_2_classLit, makeCastMap([Q$FullCube_$1, Q$Serializable, Q$Object_$1]), Q$FullCube_0, 100, 0);
  for (i_0 = 0; i_0 < 20; ++i_0) {
    this.tempe[i_0] = new Edge3_0;
  }
}

function init_8(){
  if (inited_2) {
    return;
  }
  init_3();
  ($clinit_System() , out_0).println('Initialize Center1 Solver...');
  initSym_0();
  $clinit_Center1();
  raw2sym = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 735471, 1);
  initSym2Raw();
  createMoveTable();
  raw2sym = null;
  createPrun();
  out_0.println('Initialize Center2 Solver...');
  init_6();
  out_0.println('Initialize Center3 Solver...');
  init_7();
  out_0.println('Initialize Edge3 Solver...');
  initMvrot();
  initRaw2Sym();
  createPrun_0();
  out_0.println('OK');
  inited_2 = true;
}

defineSeed(312, 1, makeCastMap([Q$Search_0]), Search_4);
_.add1 = false;
_.arr2idx = 0;
_.c = null;
_.length1 = 0;
_.length2 = 0;
_.p1SolsCnt = 0;
_.solution = '';
var inited_2 = false;
function $clinit_Util_0(){
  $clinit_Util_0 = nullMethod;
  var i_0, j;
  Cnk_1 = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [25, 25], 2, 1);
  fact_1 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 13, 1);
  colorMap4to3 = initValues(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, [85, 68, 70, 66, 82, 76]);
  for (i_0 = 0; i_0 < 25; ++i_0) {
    Cnk_1[i_0][i_0] = 1;
    Cnk_1[i_0][0] = 1;
  }
  for (i_0 = 1; i_0 < 25; ++i_0) {
    for (j = 1; j <= i_0; ++j) {
      Cnk_1[i_0][j] = Cnk_1[i_0 - 1][j] + Cnk_1[i_0 - 1][j - 1];
    }
  }
  fact_1[0] = 1;
  for (i_0 = 0; i_0 < 12; ++i_0) {
    fact_1[i_0 + 1] = fact_1[i_0] * (i_0 + 1);
  }
}

function parity_0(arr){
  $clinit_Util_0();
  var i_0, j, len, parity;
  parity = 0;
  for (i_0 = 0 , len = arr.length; i_0 < len; ++i_0) {
    for (j = i_0; j < len; ++j) {
      arr[i_0] > arr[j] && (parity ^= 1);
    }
  }
  return parity;
}

function set8Perm_1(arr, idx){
  $clinit_Util_0();
  var i_0, m_0, p_0, v, val;
  val = 1985229328;
  for (i_0 = 0; i_0 < 7; ++i_0) {
    p_0 = fact_1[7 - i_0];
    v = ~~(idx / p_0);
    idx -= v * p_0;
    v <<= 2;
    arr[i_0] = ~~((~~val >> v & 15) << 24) >> 24;
    m_0 = (1 << v) - 1;
    val = (val & m_0) + (~~val >> 4 & ~m_0);
  }
  arr[7] = ~~(val << 24) >> 24;
}

function swap(arr, a, b, c, d, key){
  $clinit_Util_0();
  var temp;
  switch (key) {
    case 0:
      temp = arr[d];
      arr[d] = arr[c];
      arr[c] = arr[b];
      arr[b] = arr[a];
      arr[a] = temp;
      return;
    case 1:
      temp = arr[a];
      arr[a] = arr[c];
      arr[c] = temp;
      temp = arr[b];
      arr[b] = arr[d];
      arr[d] = temp;
      return;
    case 2:
      temp = arr[a];
      arr[a] = arr[b];
      arr[b] = arr[c];
      arr[c] = arr[d];
      arr[d] = temp;
      return;
  }
}

function swap_0(arr, a, b, c, d, key){
  $clinit_Util_0();
  var temp;
  switch (key) {
    case 0:
      temp = arr[d];
      arr[d] = arr[c];
      arr[c] = arr[b];
      arr[b] = arr[a];
      arr[a] = temp;
      return;
    case 1:
      temp = arr[a];
      arr[a] = arr[c];
      arr[c] = temp;
      temp = arr[b];
      arr[b] = arr[d];
      arr[d] = temp;
      return;
    case 2:
      temp = arr[a];
      arr[a] = arr[b];
      arr[b] = arr[c];
      arr[c] = arr[d];
      arr[d] = temp;
      return;
  }
}

function tomove(s){
  $clinit_Util_0();
  var arr, axis, i_0, j, length_0, ret;
  s = $replaceAll(s, '\\s', '');
  arr = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, s.length, 1);
  j = 0;
  for (i_0 = 0 , length_0 = s.length; i_0 < length_0; ++i_0) {
    switch (s.charCodeAt(i_0)) {
      case 85:
        axis = 0;
        break;
      case 82:
        axis = 1;
        break;
      case 70:
        axis = 2;
        break;
      case 68:
        axis = 3;
        break;
      case 76:
        axis = 4;
        break;
      case 66:
        axis = 5;
        break;
      case 117:
        axis = 6;
        break;
      case 114:
        axis = 7;
        break;
      case 102:
        axis = 8;
        break;
      case 100:
        axis = 9;
        break;
      case 108:
        axis = 10;
        break;
      case 98:
        axis = 11;
        break;
      default:continue;
    }
    axis *= 3;
    if (++i_0 < length_0) {
      switch (s.charCodeAt(i_0)) {
        case 50:
          ++axis;
          break;
        case 39:
          axis += 2;
          break;
        default:--i_0;
      }
    }
    arr[j++] = axis;
  }
  ret = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, j, 1);
  while (--j >= 0) {
    ret[j] = arr[j];
  }
  return ret;
}

var Cnk_1, colorMap4to3, fact_1;
defineSeed(315, 1, {});
defineSeed(314, 315, {});
function PrintStream_0(){
}

defineSeed(316, 314, {}, PrintStream_0);
_.print_0 = function print_0(x){
}
;
_.println = function println(s){
}
;
function ArithmeticException_0(){
  RuntimeException_1.call(this, 'divide by zero');
}

defineSeed(317, 12, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), ArithmeticException_0);
function ArrayStoreException_0(){
  RuntimeException_0.call(this);
}

function ArrayStoreException_1(message){
  RuntimeException_1.call(this, message);
}

defineSeed(318, 12, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), ArrayStoreException_0, ArrayStoreException_1);
function Error_1(message, cause){
  Throwable_1.call(this, message, cause);
}

defineSeed(320, 14, makeCastMap([Q$Serializable, Q$Throwable]));
function AssertionError_0(){
  Throwable_0.call(this);
}

function AssertionError_1(message){
  Error_1.call(this, '' + message, instanceOf(message, Q$Throwable)?dynamicCast(message, Q$Throwable):null);
}

defineSeed(319, 320, makeCastMap([Q$Serializable, Q$Throwable]), AssertionError_0, AssertionError_1);
function $clinit_Boolean(){
  $clinit_Boolean = nullMethod;
  FALSE_0 = new Boolean_1(false);
  TRUE_0 = new Boolean_1(true);
}

function $compareTo_2(this$static, other){
  return this$static.value == other.value?0:this$static.value?1:-1;
}

function Boolean_1(value){
  this.value = value;
}

defineSeed(321, 1, makeCastMap([Q$Serializable, Q$Boolean, Q$Comparable]), Boolean_1);
_.compareTo$ = function compareTo_2(other){
  return $compareTo_2(this, dynamicCast(other, Q$Boolean));
}
;
_.equals$ = function equals_8(o){
  return instanceOf(o, Q$Boolean) && dynamicCast(o, Q$Boolean).value == this.value;
}
;
_.hashCode$ = function hashCode_10(){
  return this.value?1231:1237;
}
;
_.toString$ = function toString_17(){
  return this.value?'true':'false';
}
;
_.value = false;
var FALSE_0, TRUE_0;
function codePointAt(cs, index, limit){
  var hiSurrogate, loSurrogate;
  hiSurrogate = $charAt(cs, index++);
  if (hiSurrogate >= 55296 && hiSurrogate <= 56319 && index < limit && isLowSurrogate(loSurrogate = cs.charCodeAt(index))) {
    return 65536 + ((hiSurrogate & 1023) << 10) + (loSurrogate & 1023);
  }
  return hiSurrogate;
}

function digit_0(c, radix){
  if (radix < 2 || radix > 36) {
    return -1;
  }
  if (c >= 48 && c < 48 + (radix < 10?radix:10)) {
    return c - 48;
  }
  if (c >= 97 && c < radix + 97 - 10) {
    return c - 97 + 10;
  }
  if (c >= 65 && c < radix + 65 - 10) {
    return c - 65 + 10;
  }
  return -1;
}

function isLowSurrogate(ch){
  return ch >= 56320 && ch <= 57343;
}

function Class_0(){
}

function createForArray(packageName, className, seedId, componentType){
  var clazz;
  clazz = new Class_0;
  clazz.typeName = packageName + className;
  isInstantiable(seedId != 0?-seedId:0) && setClassLiteral(seedId != 0?-seedId:0, clazz);
  clazz.modifiers = 4;
  clazz.superclass = Ljava_lang_Object_2_classLit;
  clazz.componentType = componentType;
  return clazz;
}

function createForClass(packageName, className, seedId, superclass){
  var clazz;
  clazz = new Class_0;
  clazz.typeName = packageName + className;
  isInstantiable(seedId) && setClassLiteral(seedId, clazz);
  clazz.superclass = superclass;
  return clazz;
}

function createForEnum(packageName, className, seedId, superclass, enumConstantsFunc){
  var clazz;
  clazz = new Class_0;
  clazz.typeName = packageName + className;
  isInstantiable(seedId) && setClassLiteral(seedId, clazz);
  clazz.modifiers = enumConstantsFunc?8:0;
  clazz.superclass = superclass;
  return clazz;
}

function createForInterface(packageName, className){
  var clazz;
  clazz = new Class_0;
  clazz.typeName = packageName + className;
  isInstantiable(0) && setClassLiteral(0, clazz);
  clazz.modifiers = 2;
  return clazz;
}

function createForPrimitive(className, seedId){
  var clazz;
  clazz = new Class_0;
  clazz.typeName = '' + className;
  isInstantiable(seedId) && setClassLiteral(seedId, clazz);
  clazz.modifiers = 1;
  return clazz;
}

function getSeedFunction(clazz){
  var func = seedTable[clazz.seedId];
  clazz = null;
  return func;
}

function isInstantiable(seedId){
  return typeof seedId == 'number' && seedId > 0;
}

function setClassLiteral(seedId, clazz){
  var proto;
  clazz.seedId = seedId;
  if (seedId == 2) {
    proto = String.prototype;
  }
   else {
    if (seedId > 0) {
      var seed = getSeedFunction(clazz);
      if (seed) {
        proto = seed.prototype;
      }
       else {
        seed = seedTable[seedId] = function(){
        }
        ;
        seed.___clazz$ = clazz;
        return;
      }
    }
     else {
      return;
    }
  }
  proto.___clazz$ = clazz;
}

defineSeed(323, 1, makeCastMap([Q$Class]), Class_0);
_.toString$ = function toString_18(){
  return ((this.modifiers & 2) != 0?'interface ':(this.modifiers & 1) != 0?'':'class ') + this.typeName;
}
;
_.componentType = null;
_.modifiers = 0;
_.seedId = 0;
_.superclass = null;
_.typeName = null;
function ClassCastException_0(){
  RuntimeException_0.call(this);
}

defineSeed(324, 12, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), ClassCastException_0);
function __parseAndValidateInt(s, radix){
  var i_0, length_0, startIndex, toReturn;
  if (s == null) {
    throw new NumberFormatException_0('null');
  }
  if (radix < 2 || radix > 36) {
    throw new NumberFormatException_0('radix ' + radix + ' out of range');
  }
  length_0 = s.length;
  startIndex = length_0 > 0 && s.charCodeAt(0) == 45?1:0;
  for (i_0 = startIndex; i_0 < length_0; ++i_0) {
    if (digit_0(s.charCodeAt(i_0), radix) == -1) {
      throw new NumberFormatException_0('For input string: "' + s + '"');
    }
  }
  toReturn = parseInt(s, radix);
  if (isNaN(toReturn)) {
    throw new NumberFormatException_0('For input string: "' + s + '"');
  }
   else if (toReturn < -2147483648 || toReturn > 2147483647) {
    throw new NumberFormatException_0('For input string: "' + s + '"');
  }
  return toReturn;
}

defineSeed(326, 1, makeCastMap([Q$Serializable, Q$Number]));
function $compareTo_3(this$static, b){
  return compare_0(this$static.value, b.value);
}

function Double_0(value){
  this.value = value;
}

function compare_0(x, y){
  if (isNaN(x)) {
    return isNaN(y)?0:1;
  }
   else if (isNaN(y)) {
    return -1;
  }
  return x < y?-1:x > y?1:0;
}

defineSeed(325, 326, makeCastMap([Q$Serializable, Q$Comparable, Q$Double, Q$Number]), Double_0);
_.compareTo$ = function compareTo_3(b){
  return $compareTo_3(this, dynamicCast(b, Q$Double));
}
;
_.equals$ = function equals_9(o){
  return instanceOf(o, Q$Double) && dynamicCast(o, Q$Double).value == this.value;
}
;
_.hashCode$ = function hashCode_11(){
  return round_int(this.value);
}
;
_.toString$ = function toString_19(){
  return '' + this.value;
}
;
_.value = 0;
function IllegalArgumentException_0(){
  RuntimeException_0.call(this);
}

function IllegalArgumentException_1(message){
  RuntimeException_1.call(this, message);
}

defineSeed(327, 12, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), IllegalArgumentException_0, IllegalArgumentException_1);
function IllegalStateException_0(){
  RuntimeException_0.call(this);
}

function IllegalStateException_1(s){
  RuntimeException_1.call(this, s);
}

defineSeed(328, 12, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), IllegalStateException_0, IllegalStateException_1);
function IndexOutOfBoundsException_0(){
  RuntimeException_0.call(this);
}

function IndexOutOfBoundsException_1(message){
  RuntimeException_1.call(this, message);
}

defineSeed(329, 12, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), IndexOutOfBoundsException_0, IndexOutOfBoundsException_1);
function $compareTo_4(this$static, b){
  return this$static.value < b.value?-1:this$static.value > b.value?1:0;
}

function Integer_0(value){
  this.value = value;
}

function bitCount(x){
  x -= ~~x >> 1 & 1431655765;
  x = (~~x >> 2 & 858993459) + (x & 858993459);
  x = (~~x >> 4) + x & 252645135;
  x += ~~x >> 8;
  x += ~~x >> 16;
  return x & 63;
}

function numberOfLeadingZeros_0(i_0){
  var m_0, n, y;
  if (i_0 < 0) {
    return 0;
  }
   else if (i_0 == 0) {
    return 32;
  }
   else {
    y = -(~~i_0 >> 16);
    m_0 = ~~y >> 16 & 16;
    n = 16 - m_0;
    i_0 = ~~i_0 >> m_0;
    y = i_0 - 256;
    m_0 = ~~y >> 16 & 8;
    n += m_0;
    i_0 <<= m_0;
    y = i_0 - 4096;
    m_0 = ~~y >> 16 & 4;
    n += m_0;
    i_0 <<= m_0;
    y = i_0 - 16384;
    m_0 = ~~y >> 16 & 2;
    n += m_0;
    i_0 <<= m_0;
    y = ~~i_0 >> 14;
    m_0 = y & ~(~~y >> 1);
    return n + 2 - m_0;
  }
}

function numberOfTrailingZeros(i_0){
  var r, rtn;
  if (i_0 == 0) {
    return 32;
  }
   else {
    rtn = 0;
    for (r = 1; (r & i_0) == 0; r <<= 1) {
      ++rtn;
    }
    return rtn;
  }
}

function toPowerOfTwoString(value){
  var buf, digits, pos;
  buf = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, 8, 1);
  digits = ($clinit_Number$__Digits() , digits_0);
  pos = 7;
  if (value >= 0) {
    while (value > 15) {
      buf[pos--] = digits[value & 15];
      value >>= 4;
    }
  }
   else {
    while (pos > 0) {
      buf[pos--] = digits[value & 15];
      value >>= 4;
    }
  }
  buf[pos] = digits[value & 15];
  return __valueOf(buf, pos, 8);
}

function valueOf_0(i_0){
  var rebase, result;
  if (i_0 > -129 && i_0 < 128) {
    rebase = i_0 + 128;
    result = ($clinit_Integer$BoxedValues() , boxedValues_0)[rebase];
    !result && (result = boxedValues_0[rebase] = new Integer_0(i_0));
    return result;
  }
  return new Integer_0(i_0);
}

defineSeed(330, 326, makeCastMap([Q$Serializable, Q$Comparable, Q$Integer, Q$Number]), Integer_0);
_.compareTo$ = function compareTo_4(b){
  return $compareTo_4(this, dynamicCast(b, Q$Integer));
}
;
_.equals$ = function equals_10(o){
  return instanceOf(o, Q$Integer) && dynamicCast(o, Q$Integer).value == this.value;
}
;
_.hashCode$ = function hashCode_12(){
  return this.value;
}
;
_.toString$ = function toString_20(){
  return '' + this.value;
}
;
_.value = 0;
function $clinit_Integer$BoxedValues(){
  $clinit_Integer$BoxedValues = nullMethod;
  boxedValues_0 = initDim(_3Ljava_lang_Integer_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Integer, 256, 0);
}

var boxedValues_0;
function signum(i_0){
  return eq(i_0, P0_longLit)?0:lt(i_0, P0_longLit)?-1:1;
}

function abs(x){
  return x <= 0?0 - x:x;
}

function ceil(x){
  return Math.ceil(x);
}

function cos_0(x){
  return Math.cos(x);
}

function floor(x){
  return Math.floor(x);
}

function max(x, y){
  return x > y?x:y;
}

function min(x, y){
  return x < y?x:y;
}

function sin_0(x){
  return Math.sin(x);
}

function sqrt(x){
  return Math.sqrt(x);
}

function NullPointerException_0(){
  RuntimeException_0.call(this);
}

function NullPointerException_1(message){
  RuntimeException_1.call(this, message);
}

defineSeed(334, 12, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), NullPointerException_0, NullPointerException_1);
function $clinit_Number$__Digits(){
  $clinit_Number$__Digits = nullMethod;
  digits_0 = initValues(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122]);
}

var digits_0;
function NumberFormatException_0(message){
  IllegalArgumentException_1.call(this, message);
}

defineSeed(336, 327, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), NumberFormatException_0);
function $toString_0(this$static){
  return this$static.className + '.' + this$static.methodName + '(' + (this$static.fileName != null?this$static.fileName:'Unknown Source') + (this$static.lineNumber >= 0?':' + this$static.lineNumber:'') + ')';
}

function StackTraceElement_0(methodName, fileName, lineNumber){
  this.className = 'Unknown';
  this.methodName = methodName;
  this.fileName = fileName;
  this.lineNumber = lineNumber;
}

defineSeed(337, 1, makeCastMap([Q$Serializable, Q$StackTraceElement]), StackTraceElement_0);
_.toString$ = function toString_21(){
  return $toString_0(this);
}
;
_.className = null;
_.fileName = null;
_.lineNumber = 0;
_.methodName = null;
function $charAt(this$static, index){
  return this$static.charCodeAt(index);
}

function $equals_0(this$static, other){
  if (!instanceOf(other, Q$String)) {
    return false;
  }
  return String(this$static) == other;
}

function $equalsIgnoreCase(this$static, other){
  if (other == null)
    return false;
  return this$static == other || this$static.toLowerCase() == other.toLowerCase();
}

function $getChars(this$static, srcEnd, dst, dstBegin){
  var srcIdx;
  for (srcIdx = 0; srcIdx < srcEnd; ++srcIdx) {
    dst[dstBegin++] = this$static.charCodeAt(srcIdx);
  }
}

function $indexOf_0(this$static, str){
  return this$static.indexOf(str);
}

function $indexOf_1(this$static, str, startIndex){
  return this$static.indexOf(str, startIndex);
}

function $lastIndexOf(this$static, str){
  return this$static.lastIndexOf(str);
}

function $lastIndexOf_0(this$static, str, start){
  return this$static.lastIndexOf(str, start);
}

function $replaceAll(this$static, regex, replace){
  replace = __translateReplaceString(replace);
  return this$static.replace(RegExp(regex, 'g'), replace);
}

function $split(this$static, regex, maxMatch){
  var compiled = new RegExp(regex, 'g');
  var out = [];
  var count = 0;
  var trail = this$static;
  var lastTrail = null;
  while (true) {
    var matchObj = compiled.exec(trail);
    if (matchObj == null || trail == '' || count == maxMatch - 1 && maxMatch > 0) {
      out[count] = trail;
      break;
    }
     else {
      out[count] = trail.substring(0, matchObj.index);
      trail = trail.substring(matchObj.index + matchObj[0].length, trail.length);
      compiled.lastIndex = 0;
      if (lastTrail == trail) {
        out[count] = trail.substring(0, 1);
        trail = trail.substring(1);
      }
      lastTrail = trail;
      count++;
    }
  }
  if (maxMatch == 0 && this$static.length > 0) {
    var lastNonEmpty = out.length;
    while (lastNonEmpty > 0 && out[lastNonEmpty - 1] == '') {
      --lastNonEmpty;
    }
    lastNonEmpty < out.length && out.splice(lastNonEmpty, out.length - lastNonEmpty);
  }
  var jr = __createArray(out.length);
  for (var i_0 = 0; i_0 < out.length; ++i_0) {
    jr[i_0] = out[i_0];
  }
  return jr;
}

function $substring(this$static, beginIndex){
  return this$static.substr(beginIndex, this$static.length - beginIndex);
}

function $substring_0(this$static, beginIndex, endIndex){
  return this$static.substr(beginIndex, endIndex - beginIndex);
}

function $toCharArray(this$static){
  var charArr, n;
  n = this$static.length;
  charArr = initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, n, 1);
  $getChars(this$static, n, charArr, 0);
  return charArr;
}

function $trim(this$static){
  if (this$static.length == 0 || this$static[0] > ' ' && this$static[this$static.length - 1] > ' ') {
    return this$static;
  }
  var r1 = this$static.replace(/^(\s*)/, '');
  var r2 = r1.replace(/\s*$/, '');
  return r2;
}

function __createArray(numElements){
  return initDim(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, numElements, 0);
}

function __translateReplaceString(replaceStr){
  var pos;
  pos = 0;
  while (0 <= (pos = replaceStr.indexOf('\\', pos))) {
    replaceStr.charCodeAt(pos + 1) == 36?(replaceStr = replaceStr.substr(0, pos - 0) + '$' + $substring(replaceStr, ++pos)):(replaceStr = replaceStr.substr(0, pos - 0) + $substring(replaceStr, ++pos));
  }
  return replaceStr;
}

function __valueOf(x, start, end){
  x = x.slice(start, end);
  return String.fromCharCode.apply(null, x);
}

function compareTo_6(thisStr, otherStr){
  thisStr = String(thisStr);
  if (thisStr == otherStr) {
    return 0;
  }
  return thisStr < otherStr?-1:1;
}

function encodeUtf8(bytes, ofs, codePoint){
  if (codePoint < 128) {
    bytes[ofs] = ~~((codePoint & 127) << 24) >> 24;
    return 1;
  }
   else if (codePoint < 2048) {
    bytes[ofs++] = ~~((~~codePoint >> 6 & 31 | 192) << 24) >> 24;
    bytes[ofs] = ~~((codePoint & 63 | 128) << 24) >> 24;
    return 2;
  }
   else if (codePoint < 65536) {
    bytes[ofs++] = ~~((~~codePoint >> 12 & 15 | 224) << 24) >> 24;
    bytes[ofs++] = ~~((~~codePoint >> 6 & 63 | 128) << 24) >> 24;
    bytes[ofs] = ~~((codePoint & 63 | 128) << 24) >> 24;
    return 3;
  }
   else if (codePoint < 2097152) {
    bytes[ofs++] = ~~((~~codePoint >> 18 & 7 | 240) << 24) >> 24;
    bytes[ofs++] = ~~((~~codePoint >> 12 & 63 | 128) << 24) >> 24;
    bytes[ofs++] = ~~((~~codePoint >> 6 & 63 | 128) << 24) >> 24;
    bytes[ofs] = ~~((codePoint & 63 | 128) << 24) >> 24;
    return 4;
  }
   else if (codePoint < 67108864) {
    bytes[ofs++] = ~~((~~codePoint >> 24 & 3 | 248) << 24) >> 24;
    bytes[ofs++] = ~~((~~codePoint >> 18 & 63 | 128) << 24) >> 24;
    bytes[ofs++] = ~~((~~codePoint >> 12 & 63 | 128) << 24) >> 24;
    bytes[ofs++] = ~~((~~codePoint >> 6 & 63 | 128) << 24) >> 24;
    bytes[ofs] = ~~((codePoint & 63 | 128) << 24) >> 24;
    return 5;
  }
  throw new IllegalArgumentException_1('Character out of range: ' + codePoint);
}

function fromCodePoint(codePoint){
  var hiSurrogate, loSurrogate;
  if (codePoint >= 65536) {
    hiSurrogate = 55296 + (~~(codePoint - 65536) >> 10 & 1023) & 65535;
    loSurrogate = 56320 + (codePoint - 65536 & 1023) & 65535;
    return String.fromCharCode(hiSurrogate) + String.fromCharCode(loSurrogate);
  }
   else {
    return String.fromCharCode(codePoint & 65535);
  }
}

function getBytesUtf8(str){
  var byteCount, bytes, ch, i_0, n, out;
  n = str.length;
  byteCount = 0;
  for (i_0 = 0; i_0 < n;) {
    ch = codePointAt(str, i_0, str.length);
    i_0 += ch >= 65536?2:1;
    ch < 128?++byteCount:ch < 2048?(byteCount += 2):ch < 65536?(byteCount += 3):ch < 2097152?(byteCount += 4):ch < 67108864 && (byteCount += 5);
  }
  bytes = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, byteCount, 1);
  out = 0;
  for (i_0 = 0; i_0 < n;) {
    ch = codePointAt(str, i_0, str.length);
    i_0 += ch >= 65536?2:1;
    out += encodeUtf8(bytes, out, ch);
  }
  return bytes;
}

function valueOf_1(x){
  return String.fromCharCode.apply(null, x);
}

_ = String.prototype;
_.castableTypeMap$ = makeCastMap([Q$String, Q$Serializable, Q$CharSequence, Q$Comparable]);
_.compareTo$ = function compareTo_5(other){
  return compareTo_6(this, dynamicCast(other, Q$String));
}
;
_.equals$ = function equals_11(other){
  return $equals_0(this, other);
}
;
_.hashCode$ = function hashCode_13(){
  return getHashCode_0(this);
}
;
_.toString$ = _.toString;
function $clinit_String$HashCache(){
  $clinit_String$HashCache = nullMethod;
  back_0 = {};
  front = {};
}

function compute(str){
  var hashCode, i_0, n, nBatch;
  hashCode = 0;
  n = str.length;
  nBatch = n - 4;
  i_0 = 0;
  while (i_0 < nBatch) {
    hashCode = str.charCodeAt(i_0 + 3) + 31 * (str.charCodeAt(i_0 + 2) + 31 * (str.charCodeAt(i_0 + 1) + 31 * (str.charCodeAt(i_0) + 31 * hashCode))) | 0;
    i_0 += 4;
  }
  while (i_0 < n) {
    hashCode = hashCode * 31 + $charAt(str, i_0++);
  }
  return hashCode | 0;
}

function getHashCode_0(str){
  $clinit_String$HashCache();
  var key = ':' + str;
  var result = front[key];
  if (result != null) {
    return result;
  }
  result = back_0[key];
  result == null && (result = compute(str));
  increment();
  return front[key] = result;
}

function increment(){
  if (count_0 == 256) {
    back_0 = front;
    front = {};
    count_0 = 0;
  }
  ++count_0;
}

var back_0, count_0 = 0, front;
function $$init_4(this$static){
  this$static.impl = com_google_gwt_core_client_impl_StringBufferImpl();
  this$static.data = this$static.impl.createData();
}

function $append(this$static){
  this$static.impl.appendNonNull(this$static.data, ' ');
  return this$static;
}

function $append_0(this$static, x){
  this$static.impl.append_0(this$static.data, x);
  return this$static;
}

function $append_1(this$static, x){
  this$static.impl.append_1(this$static.data, x);
  return this$static;
}

function $append_2(this$static, x){
  this$static.impl.append_2(this$static.data, x);
  return this$static;
}

function $delete(this$static, end){
  return this$static.impl.replace_0(this$static.data, 0, end, '') , this$static;
}

function StringBuffer_0(){
  $$init_4(this);
}

function StringBuffer_1(s){
  $$init_4(this);
  this.impl.append_2(this.data, s);
}

defineSeed(339, 1, makeCastMap([Q$CharSequence]), StringBuffer_0, StringBuffer_1);
_.toString$ = function toString_22(){
  return this.impl.toString_0(this.data);
}
;
function $$init_5(this$static){
  this$static.impl = com_google_gwt_core_client_impl_StringBufferImpl();
  this$static.data = this$static.impl.createData();
}

function $append_3(this$static, x){
  this$static.impl.appendNonNull(this$static.data, String.fromCharCode(x));
  return this$static;
}

function $append_4(this$static, x){
  this$static.impl.append(this$static.data, x);
  return this$static;
}

function $append_5(this$static, x){
  this$static.impl.append_2(this$static.data, x);
  return this$static;
}

function $append_6(this$static, x){
  this$static.impl.appendNonNull(this$static.data, valueOf_1(x));
  return this$static;
}

function $charAt_0(this$static, index){
  return $charAt(this$static.impl.toString_0(this$static.data), index);
}

function $delete_0(this$static, start, end){
  return this$static.impl.replace_0(this$static.data, start, end, '') , this$static;
}

function $insert_0(this$static, index, x){
  return this$static.impl.replace_0(this$static.data, index, index, x) , this$static;
}

function $replace(this$static, start, end, toInsert){
  this$static.impl.replace_0(this$static.data, start, end, toInsert);
  return this$static;
}

function $setCharAt(this$static, index, x){
  $replace(this$static, index, index + 1, String.fromCharCode(x));
}

function $setLength(this$static){
  var oldLength;
  oldLength = this$static.impl.length_0(this$static.data);
  0 < oldLength?(this$static.impl.replace_0(this$static.data, 0, oldLength, '') , this$static):0 > oldLength && $append_6(this$static, initDim(_3C_classLit, makeCastMap([Q$char_$1, Q$Serializable]), -1, -oldLength, 1));
}

function $toString_1(this$static){
  return this$static.impl.toString_0(this$static.data);
}

function StringBuilder_0(){
  $$init_5(this);
}

function StringBuilder_1(){
  $$init_5(this);
}

function StringBuilder_2(s){
  $$init_5(this);
  this.impl.append_2(this.data, s);
}

defineSeed(340, 1, makeCastMap([Q$CharSequence]), StringBuilder_0, StringBuilder_1, StringBuilder_2);
_.toString$ = function toString_23(){
  return $toString_1(this);
}
;
function $clinit_System(){
  $clinit_System = nullMethod;
  err = new PrintStream_0;
  out_0 = new PrintStream_0;
}

function arraycopy(src, srcOfs, dest, destOfs, len){
  $clinit_System();
  var destArray, destComp, destEnd, destType, destlen, srcArray, srcComp, srcType, srclen;
  if (src == null || dest == null) {
    throw new NullPointerException_0;
  }
  srcType = getClass__devirtual$(src);
  destType = getClass__devirtual$(dest);
  if ((srcType.modifiers & 4) == 0 || (destType.modifiers & 4) == 0) {
    throw new ArrayStoreException_1('Must be array types');
  }
  srcComp = srcType.componentType;
  destComp = destType.componentType;
  if (!((srcComp.modifiers & 1) != 0?srcComp == destComp:(destComp.modifiers & 1) == 0)) {
    throw new ArrayStoreException_1('Array types must match');
  }
  srclen = src.length;
  destlen = dest.length;
  if (srcOfs < 0 || destOfs < 0 || len < 0 || srcOfs + len > srclen || destOfs + len > destlen) {
    throw new IndexOutOfBoundsException_0;
  }
  if (((srcComp.modifiers & 1) == 0 || (srcComp.modifiers & 4) != 0) && srcType != destType) {
    srcArray = dynamicCast(src, Q$Object_$1);
    destArray = dynamicCast(dest, Q$Object_$1);
    if (maskUndefined(src) === maskUndefined(dest) && srcOfs < destOfs) {
      srcOfs += len;
      for (destEnd = destOfs + len; destEnd-- > destOfs;) {
        setCheck(destArray, destEnd, srcArray[--srcOfs]);
      }
    }
     else {
      for (destEnd = destOfs + len; destOfs < destEnd;) {
        setCheck(destArray, destOfs++, srcArray[srcOfs++]);
      }
    }
  }
   else {
    Array.prototype.splice.apply(dest, [destOfs, len].concat(src.slice(srcOfs, srcOfs + len)));
  }
}

function currentTimeMillis0(){
  $clinit_System();
  return (new Date).getTime();
}

var err, out_0;
function $get_3(this$static){
  if (!this$static.initialized) {
    this$static.value = this$static.initialValue();
    this$static.initialized = true;
  }
  return this$static.value;
}

defineSeed(342, 1, {});
_.initialValue = function initialValue(){
  return null;
}
;
_.initialized = false;
_.value = null;
function UnsupportedOperationException_0(){
  RuntimeException_0.call(this);
}

function UnsupportedOperationException_1(message){
  RuntimeException_1.call(this, message);
}

defineSeed(343, 12, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), UnsupportedOperationException_0, UnsupportedOperationException_1);
function $clinit_Random(){
  $clinit_Random = nullMethod;
  var i_0, twoToTheXMinus24Tmp, twoToTheXMinus48Tmp;
  twoToTheXMinus24 = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, 25, 1);
  twoToTheXMinus48 = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, 33, 1);
  twoToTheXMinus48Tmp = 1.52587890625E-5;
  for (i_0 = 32; i_0 >= 0; --i_0) {
    twoToTheXMinus48[i_0] = twoToTheXMinus48Tmp;
    twoToTheXMinus48Tmp *= 0.5;
  }
  twoToTheXMinus24Tmp = 1;
  for (i_0 = 24; i_0 >= 0; --i_0) {
    twoToTheXMinus24[i_0] = twoToTheXMinus24Tmp;
    twoToTheXMinus24Tmp *= 0.5;
  }
}

function $nextInt(this$static, n){
  var bits, val;
  if (n > 0) {
    if ((n & -n) == n) {
      return round_int(n * $nextInternal(this$static) * 4.6566128730773926E-10);
    }
    do {
      bits = $nextInternal(this$static);
      val = bits % n;
    }
     while (bits - val + (n - 1) < 0);
    return round_int(val);
  }
  throw new IllegalArgumentException_0;
}

function $nextInternal(this$static){
  var carry, dval, h_0, hi, l_0, lo;
  hi = this$static.seedhi * 15525485 + this$static.seedlo * 1502;
  lo = this$static.seedlo * 15525485 + 11;
  carry = Math.floor(lo * 5.9604644775390625E-8);
  hi += carry;
  lo -= carry * 16777216;
  hi %= 16777216;
  this$static.seedhi = hi;
  this$static.seedlo = lo;
  h_0 = this$static.seedhi * 128;
  l_0 = floor(this$static.seedlo * twoToTheXMinus48[31]);
  dval = h_0 + l_0;
  dval >= 2147483648 && (dval -= 4294967296);
  return dval;
}

function $setSeed(this$static, seedhi, seedlo){
  this$static.seedhi = seedhi ^ 1502;
  this$static.seedlo = seedlo ^ 15525485;
}

function Random_0(){
  $clinit_Random();
  var hi, lo, seed;
  seed = uniqueSeed++ + (new Date).getTime();
  hi = round_int(Math.floor(seed * 5.9604644775390625E-8)) & 16777215;
  lo = round_int(seed - hi * 16777216);
  this.seedhi = hi ^ 1502;
  this.seedlo = lo ^ 15525485;
}

defineSeed(345, 1, {}, Random_0);
_.seedhi = 0;
_.seedlo = 0;
var twoToTheXMinus24, twoToTheXMinus48, uniqueSeed = 0;
function $setSeed_0(this$static, seed){
  var i_0, longSeed, offset, piece;
  longSeed = P0_longLit;
  for (i_0 = 0; i_0 < seed.length; i_0 += 8) {
    piece = P0_longLit;
    for (offset = 0; offset < 8 && i_0 + offset < seed.length; ++offset) {
      piece = or(piece, fromInt(seed[i_0 + offset] << offset * 8));
    }
    longSeed = xor(longSeed, piece);
  }
  $setSeed(this$static, toInt(and(shr(longSeed, 24), Pffffff_longLit)), toInt(and(longSeed, Pffffff_longLit)));
}

function SecureRandom_0(){
  $clinit_Random();
  Random_0.call(this);
}

defineSeed(344, 345, {}, SecureRandom_0);
function $advanceToFind(iter, o){
  var t;
  while (iter.hasNext()) {
    t = iter.next_0();
    if (o == null?t == null:equals__devirtual$(o, t)) {
      return iter;
    }
  }
  return null;
}

function $toString_2(this$static){
  var comma, iter, sb, value;
  sb = new StringBuffer_0;
  comma = null;
  sb.impl.append_2(sb.data, '[');
  iter = this$static.iterator();
  while (iter.hasNext()) {
    comma != null?(sb.impl.append_2(sb.data, comma) , sb):(comma = ', ');
    value = iter.next_0();
    sb.impl.append_2(sb.data, value === this$static?'(this Collection)':'' + value);
  }
  sb.impl.append_2(sb.data, ']');
  return sb.impl.toString_0(sb.data);
}

defineSeed(346, 1, {});
_.add = function add_0(o){
  throw new UnsupportedOperationException_1('Add not supported on this collection');
}
;
_.contains_0 = function contains(o){
  var iter;
  iter = $advanceToFind(this.iterator(), o);
  return !!iter;
}
;
_.isEmpty = function isEmpty(){
  return this.size_0() == 0;
}
;
_.remove_1 = function remove_7(o){
  var iter;
  iter = $advanceToFind(this.iterator(), o);
  if (iter) {
    iter.remove_0();
    return true;
  }
   else {
    return false;
  }
}
;
_.toArray = function toArray(){
  return this.toArray_0(initDim(_3Ljava_lang_Object_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Object, this.size_0(), 0));
}
;
_.toArray_0 = function toArray_0(a){
  var i_0, it, size;
  size = this.size_0();
  a.length < size && (a = createFrom(a, size));
  it = this.iterator();
  for (i_0 = 0; i_0 < size; ++i_0) {
    setCheck(a, i_0, it.next_0());
  }
  a.length > size && setCheck(a, size, null);
  return a;
}
;
_.toString$ = function toString_24(){
  return $toString_2(this);
}
;
function $implFindEntry(this$static, key, remove){
  var entry, iter, k_0;
  for (iter = this$static.entrySet_0().iterator(); iter.hasNext();) {
    entry = dynamicCast(iter.next_0(), Q$Map$Entry);
    k_0 = entry.getKey();
    if (key == null?k_0 == null:equals__devirtual$(key, k_0)) {
      if (remove) {
        entry = new MapEntryImpl_0(entry.getKey(), entry.getValue());
        iter.remove_0();
      }
      return entry;
    }
  }
  return null;
}

function $keySet(this$static){
  var entrySet;
  entrySet = this$static.entrySet_0();
  return new AbstractMap$1_0(this$static, entrySet);
}

function $putAll(this$static, t){
  var e, iter;
  for (iter = t.entrySet_0().iterator(); iter.hasNext();) {
    e = dynamicCast(iter.next_0(), Q$Map$Entry);
    this$static.put(e.getKey(), e.getValue());
  }
}

defineSeed(348, 1, makeCastMap([Q$Map]));
_.containsKey = function containsKey(key){
  return !!$implFindEntry(this, key, false);
}
;
_.equals$ = function equals_12(obj){
  var entry, entry$iterator, otherKey, otherMap, otherValue;
  if (obj === this) {
    return true;
  }
  if (!instanceOf(obj, Q$Map)) {
    return false;
  }
  otherMap = dynamicCast(obj, Q$Map);
  if (this.size_0() != otherMap.size_0()) {
    return false;
  }
  for (entry$iterator = otherMap.entrySet_0().iterator(); entry$iterator.hasNext();) {
    entry = dynamicCast(entry$iterator.next_0(), Q$Map$Entry);
    otherKey = entry.getKey();
    otherValue = entry.getValue();
    if (!this.containsKey(otherKey)) {
      return false;
    }
    if (!equalsWithNullCheck(otherValue, this.get(otherKey))) {
      return false;
    }
  }
  return true;
}
;
_.get = function get_0(key){
  var entry;
  entry = $implFindEntry(this, key, false);
  return !entry?null:entry.getValue();
}
;
_.hashCode$ = function hashCode_14(){
  var entry, entry$iterator, hashCode;
  hashCode = 0;
  for (entry$iterator = this.entrySet_0().iterator(); entry$iterator.hasNext();) {
    entry = dynamicCast(entry$iterator.next_0(), Q$Map$Entry);
    hashCode += entry.hashCode$();
    hashCode = ~~hashCode;
  }
  return hashCode;
}
;
_.isEmpty = function isEmpty_0(){
  return this.size_0() == 0;
}
;
_.keySet_0 = function keySet_0(){
  return $keySet(this);
}
;
_.put = function put(key, value){
  throw new UnsupportedOperationException_1('Put not supported on this map');
}
;
_.remove_2 = function remove_8(key){
  var entry;
  entry = $implFindEntry(this, key, true);
  return !entry?null:entry.getValue();
}
;
_.size_0 = function size_0(){
  return this.entrySet_0().size_0();
}
;
_.toString$ = function toString_25(){
  var comma, entry, iter, s;
  s = '{';
  comma = false;
  for (iter = this.entrySet_0().iterator(); iter.hasNext();) {
    entry = dynamicCast(iter.next_0(), Q$Map$Entry);
    comma?(s += ', '):(comma = true);
    s += '' + entry.getKey();
    s += '=';
    s += '' + entry.getValue();
  }
  return s + '}';
}
;
function $addAllHashEntries(this$static, dest){
  var hashCodeMap = this$static.hashCodeMap;
  for (var hashCode in hashCodeMap) {
    var hashCodeInt = parseInt(hashCode, 10);
    if (hashCode == hashCodeInt) {
      var array = hashCodeMap[hashCodeInt];
      for (var i_0 = 0, c = array.length; i_0 < c; ++i_0) {
        dest.add(array[i_0]);
      }
    }
  }
}

function $addAllStringEntries(this$static, dest){
  var stringMap = this$static.stringMap;
  for (var key in stringMap) {
    if (key.charCodeAt(0) == 58) {
      var entry = new AbstractHashMap$MapEntryString_0(this$static, key.substring(1));
      dest.add(entry);
    }
  }
}

function $clearImpl(this$static){
  this$static.hashCodeMap = [];
  this$static.stringMap = {};
  this$static.nullSlotLive = false;
  this$static.nullSlot = null;
  this$static.size = 0;
}

function $getHashValue(this$static, key, hashCode){
  var array = this$static.hashCodeMap[hashCode];
  if (array) {
    for (var i_0 = 0, c = array.length; i_0 < c; ++i_0) {
      var entry = array[i_0];
      var entryKey = entry.getKey();
      if (this$static.equalsBridge(key, entryKey)) {
        return entry.getValue();
      }
    }
  }
  return null;
}

function $getStringValue(this$static, key){
  return this$static.stringMap[':' + key];
}

function $hasHashValue(this$static, key, hashCode){
  var array = this$static.hashCodeMap[hashCode];
  if (array) {
    for (var i_0 = 0, c = array.length; i_0 < c; ++i_0) {
      var entry = array[i_0];
      var entryKey = entry.getKey();
      if (this$static.equalsBridge(key, entryKey)) {
        return true;
      }
    }
  }
  return false;
}

function $putHashValue(this$static, key, value, hashCode){
  var array = this$static.hashCodeMap[hashCode];
  if (array) {
    for (var i_0 = 0, c = array.length; i_0 < c; ++i_0) {
      var entry = array[i_0];
      var entryKey = entry.getKey();
      if (this$static.equalsBridge(key, entryKey)) {
        var previous = entry.getValue();
        entry.setValue(value);
        return previous;
      }
    }
  }
   else {
    array = this$static.hashCodeMap[hashCode] = [];
  }
  var entry = new MapEntryImpl_0(key, value);
  array.push(entry);
  ++this$static.size;
  return null;
}

function $putNullSlot(this$static, value){
  var result;
  result = this$static.nullSlot;
  this$static.nullSlot = value;
  if (!this$static.nullSlotLive) {
    this$static.nullSlotLive = true;
    ++this$static.size;
  }
  return result;
}

function $putStringValue(this$static, key, value){
  var result, stringMap = this$static.stringMap;
  key = ':' + key;
  key in stringMap?(result = stringMap[key]):++this$static.size;
  stringMap[key] = value;
  return result;
}

function $removeHashValue(this$static, key, hashCode){
  var array = this$static.hashCodeMap[hashCode];
  if (array) {
    for (var i_0 = 0, c = array.length; i_0 < c; ++i_0) {
      var entry = array[i_0];
      var entryKey = entry.getKey();
      if (this$static.equalsBridge(key, entryKey)) {
        array.length == 1?delete this$static.hashCodeMap[hashCode]:array.splice(i_0, 1);
        --this$static.size;
        return entry.getValue();
      }
    }
  }
  return null;
}

function $removeNullSlot(this$static){
  var result;
  result = this$static.nullSlot;
  this$static.nullSlot = null;
  if (this$static.nullSlotLive) {
    this$static.nullSlotLive = false;
    --this$static.size;
  }
  return result;
}

function $removeStringValue(this$static, key){
  var result, stringMap = this$static.stringMap;
  key = ':' + key;
  if (key in stringMap) {
    result = stringMap[key];
    --this$static.size;
    delete stringMap[key];
  }
  return result;
}

defineSeed(347, 348, makeCastMap([Q$Map]));
_.clear = function clear(){
  $clearImpl(this);
}
;
_.containsKey = function containsKey_0(key){
  return key == null?this.nullSlotLive:instanceOf(key, Q$String)?':' + dynamicCast(key, Q$String) in this.stringMap:$hasHashValue(this, key, this.getHashCode(key));
}
;
_.entrySet_0 = function entrySet_0(){
  return new AbstractHashMap$EntrySet_0(this);
}
;
_.equalsBridge = function equalsBridge(value1, value2){
  return this.equals(value1, value2);
}
;
_.get = function get_1(key){
  return key == null?this.nullSlot:instanceOf(key, Q$String)?$getStringValue(this, dynamicCast(key, Q$String)):$getHashValue(this, key, this.getHashCode(key));
}
;
_.put = function put_0(key, value){
  return key == null?$putNullSlot(this, value):instanceOf(key, Q$String)?$putStringValue(this, dynamicCast(key, Q$String), value):$putHashValue(this, key, value, this.getHashCode(key));
}
;
_.remove_2 = function remove_9(key){
  return key == null?$removeNullSlot(this):instanceOf(key, Q$String)?$removeStringValue(this, dynamicCast(key, Q$String)):$removeHashValue(this, key, this.getHashCode(key));
}
;
_.size_0 = function size_1(){
  return this.size;
}
;
_.hashCodeMap = null;
_.nullSlot = null;
_.nullSlotLive = false;
_.size = 0;
_.stringMap = null;
defineSeed(350, 346, makeCastMap([Q$Set]));
_.equals$ = function equals_13(o){
  var iter, other, otherItem;
  if (o === this) {
    return true;
  }
  if (!instanceOf(o, Q$Set)) {
    return false;
  }
  other = dynamicCast(o, Q$Set);
  if (other.size_0() != this.size_0()) {
    return false;
  }
  for (iter = other.iterator(); iter.hasNext();) {
    otherItem = iter.next_0();
    if (!this.contains_0(otherItem)) {
      return false;
    }
  }
  return true;
}
;
_.hashCode$ = function hashCode_15(){
  var hashCode, iter, next;
  hashCode = 0;
  for (iter = this.iterator(); iter.hasNext();) {
    next = iter.next_0();
    if (next != null) {
      hashCode += hashCode__devirtual$(next);
      hashCode = ~~hashCode;
    }
  }
  return hashCode;
}
;
function $contains(this$static, o){
  var entry, key, value;
  if (instanceOf(o, Q$Map$Entry)) {
    entry = dynamicCast(o, Q$Map$Entry);
    key = entry.getKey();
    if (this$static.this$0.containsKey(key)) {
      value = this$static.this$0.get(key);
      return this$static.this$0.equals(entry.getValue(), value);
    }
  }
  return false;
}

function AbstractHashMap$EntrySet_0(this$0){
  this.this$0 = this$0;
}

defineSeed(349, 350, makeCastMap([Q$Set]), AbstractHashMap$EntrySet_0);
_.contains_0 = function contains_0(o){
  return $contains(this, o);
}
;
_.iterator = function iterator_3(){
  return new AbstractHashMap$EntrySetIterator_0(this.this$0);
}
;
_.remove_1 = function remove_10(entry){
  var key;
  if ($contains(this, entry)) {
    key = dynamicCast(entry, Q$Map$Entry).getKey();
    this.this$0.remove_2(key);
    return true;
  }
  return false;
}
;
_.size_0 = function size_2(){
  return this.this$0.size_0();
}
;
_.this$0 = null;
function AbstractHashMap$EntrySetIterator_0(this$0){
  var list;
  this.this$0 = this$0;
  list = new ArrayList_0;
  this$0.nullSlotLive && $add_6(list, new AbstractHashMap$MapEntryNull_0(this$0));
  $addAllStringEntries(this$0, list);
  $addAllHashEntries(this$0, list);
  this.iter = new AbstractList$IteratorImpl_0(list);
}

defineSeed(351, 1, {}, AbstractHashMap$EntrySetIterator_0);
_.hasNext = function hasNext_1(){
  return $hasNext(this.iter);
}
;
_.next_0 = function next_2(){
  return this.last = dynamicCast($next_1(this.iter), Q$Map$Entry);
}
;
_.remove_0 = function remove_11(){
  if (!this.last) {
    throw new IllegalStateException_1('Must call next() before remove().');
  }
   else {
    $remove_4(this.iter);
    this.this$0.remove_2(this.last.getKey());
    this.last = null;
  }
}
;
_.iter = null;
_.last = null;
_.this$0 = null;
defineSeed(353, 1, makeCastMap([Q$Map$Entry]));
_.equals$ = function equals_14(other){
  var entry;
  if (instanceOf(other, Q$Map$Entry)) {
    entry = dynamicCast(other, Q$Map$Entry);
    if (equalsWithNullCheck(this.getKey(), entry.getKey()) && equalsWithNullCheck(this.getValue(), entry.getValue())) {
      return true;
    }
  }
  return false;
}
;
_.hashCode$ = function hashCode_16(){
  var keyHash, valueHash;
  keyHash = 0;
  valueHash = 0;
  this.getKey() != null && (keyHash = hashCode__devirtual$(this.getKey()));
  this.getValue() != null && (valueHash = hashCode__devirtual$(this.getValue()));
  return keyHash ^ valueHash;
}
;
_.toString$ = function toString_26(){
  return this.getKey() + '=' + this.getValue();
}
;
function AbstractHashMap$MapEntryNull_0(this$0){
  this.this$0 = this$0;
}

defineSeed(352, 353, makeCastMap([Q$Map$Entry]), AbstractHashMap$MapEntryNull_0);
_.getKey = function getKey(){
  return null;
}
;
_.getValue = function getValue(){
  return this.this$0.nullSlot;
}
;
_.setValue = function setValue(object){
  return $putNullSlot(this.this$0, object);
}
;
_.this$0 = null;
function AbstractHashMap$MapEntryString_0(this$0, key){
  this.this$0 = this$0;
  this.key = key;
}

defineSeed(354, 353, makeCastMap([Q$Map$Entry]), AbstractHashMap$MapEntryString_0);
_.getKey = function getKey_0(){
  return this.key;
}
;
_.getValue = function getValue_0(){
  return $getStringValue(this.this$0, this.key);
}
;
_.setValue = function setValue_0(object){
  return $putStringValue(this.this$0, this.key, object);
}
;
_.key = null;
_.this$0 = null;
function checkIndex(index, size){
  (index < 0 || index >= size) && indexOutOfBounds(index, size);
}

function indexOutOfBounds(index, size){
  throw new IndexOutOfBoundsException_1('Index: ' + index + ', Size: ' + size);
}

defineSeed(355, 346, makeCastMap([Q$List]));
_.add_0 = function add_1(index, element){
  throw new UnsupportedOperationException_1('Add not supported on this list');
}
;
_.add = function add_2(obj){
  this.add_0(this.size_0(), obj);
  return true;
}
;
_.equals$ = function equals_15(o){
  var elem, elemOther, iter, iterOther, other;
  if (o === this) {
    return true;
  }
  if (!instanceOf(o, Q$List)) {
    return false;
  }
  other = dynamicCast(o, Q$List);
  if (this.size_0() != other.size_0()) {
    return false;
  }
  iter = this.iterator();
  iterOther = other.iterator();
  while (iter.hasNext()) {
    elem = iter.next_0();
    elemOther = iterOther.next_0();
    if (!(elem == null?elemOther == null:equals__devirtual$(elem, elemOther))) {
      return false;
    }
  }
  return true;
}
;
_.hashCode$ = function hashCode_17(){
  var iter, k_0, obj;
  k_0 = 1;
  iter = this.iterator();
  while (iter.hasNext()) {
    obj = iter.next_0();
    k_0 = 31 * k_0 + (obj == null?0:hashCode__devirtual$(obj));
    k_0 = ~~k_0;
  }
  return k_0;
}
;
_.iterator = function iterator_4(){
  return new AbstractList$IteratorImpl_0(this);
}
;
_.listIterator = function listIterator(){
  return this.listIterator_0(0);
}
;
_.listIterator_0 = function listIterator_0(from){
  return new AbstractList$ListIteratorImpl_0(this, from);
}
;
_.remove_3 = function remove_12(index){
  throw new UnsupportedOperationException_1('Remove not supported on this list');
}
;
function $hasNext(this$static){
  return this$static.i < this$static.this$0_0.size_0();
}

function $next_1(this$static){
  if (this$static.i >= this$static.this$0_0.size_0()) {
    throw new NoSuchElementException_0;
  }
  return this$static.this$0_0.get_0(this$static.last = this$static.i++);
}

function $remove_4(this$static){
  if (this$static.last < 0) {
    throw new IllegalStateException_0;
  }
  this$static.this$0_0.remove_3(this$static.last);
  this$static.i = this$static.last;
  this$static.last = -1;
}

function AbstractList$IteratorImpl_0(this$0){
  this.this$0_0 = this$0;
}

defineSeed(356, 1, {}, AbstractList$IteratorImpl_0);
_.hasNext = function hasNext_2(){
  return $hasNext(this);
}
;
_.next_0 = function next_3(){
  return $next_1(this);
}
;
_.remove_0 = function remove_13(){
  $remove_4(this);
}
;
_.i = 0;
_.last = -1;
_.this$0_0 = null;
function AbstractList$ListIteratorImpl_0(this$0, start){
  var size;
  this.this$0 = this$0;
  this.this$0_0 = this$0;
  size = this$0.size_0();
  (start < 0 || start > size) && indexOutOfBounds(start, size);
  this.i = start;
}

defineSeed(357, 356, {}, AbstractList$ListIteratorImpl_0);
_.hasPrevious = function hasPrevious(){
  return this.i > 0;
}
;
_.previous = function previous_0(){
  if (this.i <= 0) {
    throw new NoSuchElementException_0;
  }
  return this.this$0.get_0(this.last = --this.i);
}
;
_.this$0 = null;
function $iterator(this$static){
  var outerIter;
  outerIter = this$static.val$entrySet.iterator();
  return new AbstractMap$1$1_0(outerIter);
}

function AbstractMap$1_0(this$0, val$entrySet){
  this.this$0 = this$0;
  this.val$entrySet = val$entrySet;
}

defineSeed(358, 350, makeCastMap([Q$Set]), AbstractMap$1_0);
_.contains_0 = function contains_1(key){
  return this.this$0.containsKey(key);
}
;
_.iterator = function iterator_5(){
  return $iterator(this);
}
;
_.size_0 = function size_3(){
  return this.val$entrySet.size_0();
}
;
_.this$0 = null;
_.val$entrySet = null;
function $next_2(this$static){
  var entry;
  entry = dynamicCast(this$static.val$outerIter.next_0(), Q$Map$Entry);
  return entry.getKey();
}

function AbstractMap$1$1_0(val$outerIter){
  this.val$outerIter = val$outerIter;
}

defineSeed(359, 1, {}, AbstractMap$1$1_0);
_.hasNext = function hasNext_3(){
  return this.val$outerIter.hasNext();
}
;
_.next_0 = function next_4(){
  return $next_2(this);
}
;
_.remove_0 = function remove_14(){
  this.val$outerIter.remove_0();
}
;
_.val$outerIter = null;
function $add_5(this$static, o){
  if ($offer(this$static, o)) {
    return true;
  }
  throw new IllegalStateException_1('Unable to add element to queue');
}

defineSeed(360, 346, {});
_.add = function add_3(o){
  return $add_5(this, o);
}
;
defineSeed(361, 355, makeCastMap([Q$List]));
_.add_0 = function add_4(index, element){
  var iter;
  iter = $listIterator(this, index);
  $addBefore(iter.this$0, element, iter.currentNode);
  ++iter.currentIndex;
  iter.lastNode = null;
}
;
_.get_0 = function get_2(index){
  var iter;
  iter = $listIterator(this, index);
  try {
    return $next_4(iter);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$NoSuchElementException)) {
      throw new IndexOutOfBoundsException_1("Can't get element " + index);
    }
     else 
      throw $e0;
  }
}
;
_.iterator = function iterator_6(){
  return $listIterator(this, 0);
}
;
_.remove_3 = function remove_15(index){
  var iter, old;
  iter = $listIterator(this, index);
  try {
    old = $next_4(iter);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$NoSuchElementException)) {
      throw new IndexOutOfBoundsException_1("Can't remove element " + index);
    }
     else 
      throw $e0;
  }
  $remove_9(iter);
  return old;
}
;
function $$init_6(this$static){
  this$static.array = initDim(_3Ljava_lang_Object_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Object, 0, 0);
}

function $add_6(this$static, o){
  setCheck(this$static.array, this$static.size++, o);
  return true;
}

function $clear(this$static){
  this$static.array = initDim(_3Ljava_lang_Object_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Object, 0, 0);
  this$static.size = 0;
}

function $get_4(this$static, index){
  checkIndex(index, this$static.size);
  return this$static.array[index];
}

function $indexOf_2(this$static, o, index){
  for (; index < this$static.size; ++index) {
    if (equalsWithNullCheck(o, this$static.array[index])) {
      return index;
    }
  }
  return -1;
}

function $remove_5(this$static, index){
  var previous;
  previous = (checkIndex(index, this$static.size) , this$static.array[index]);
  splice_0(this$static.array, index, 1);
  --this$static.size;
  return previous;
}

function $remove_6(this$static, o){
  var i_0;
  i_0 = $indexOf_2(this$static, o, 0);
  if (i_0 == -1) {
    return false;
  }
  $remove_5(this$static, i_0);
  return true;
}

function $set_7(this$static, index, o){
  var previous;
  previous = (checkIndex(index, this$static.size) , this$static.array[index]);
  setCheck(this$static.array, index, o);
  return previous;
}

function $toArray(this$static){
  return cloneSubrange(this$static.array, 0, this$static.size);
}

function $toArray_0(this$static, out){
  var i_0;
  out.length < this$static.size && (out = createFrom(out, this$static.size));
  for (i_0 = 0; i_0 < this$static.size; ++i_0) {
    setCheck(out, i_0, this$static.array[i_0]);
  }
  out.length > this$static.size && setCheck(out, this$static.size, null);
  return out;
}

function ArrayList_0(){
  $$init_6(this);
}

function ArrayList_1(){
  $$init_6(this);
  this.array.length = 500;
}

function ArrayList_2(c){
  $$init_6(this);
  spliceArray(this.array, 0, 0, c.toArray());
  this.size = this.array.length;
}

function splice_0(array, index, deleteCount){
  array.splice(index, deleteCount);
}

function splice_1(array, index, deleteCount, value){
  array.splice(index, deleteCount, value);
}

function spliceArray(array, index, deleteCount, values){
  Array.prototype.splice.apply(array, [index, deleteCount].concat(values));
}

defineSeed(362, 355, makeCastMap([Q$Serializable, Q$List, Q$RandomAccess]), ArrayList_0, ArrayList_1, ArrayList_2);
_.add_0 = function add_5(index, o){
  (index < 0 || index > this.size) && indexOutOfBounds(index, this.size);
  splice_1(this.array, index, 0, o);
  ++this.size;
}
;
_.add = function add_6(o){
  return $add_6(this, o);
}
;
_.contains_0 = function contains_2(o){
  return $indexOf_2(this, o, 0) != -1;
}
;
_.get_0 = function get_3(index){
  return $get_4(this, index);
}
;
_.isEmpty = function isEmpty_1(){
  return this.size == 0;
}
;
_.remove_3 = function remove_16(index){
  return $remove_5(this, index);
}
;
_.remove_1 = function remove_17(o){
  return $remove_6(this, o);
}
;
_.size_0 = function size_4(){
  return this.size;
}
;
_.toArray = function toArray_1(){
  return $toArray(this);
}
;
_.toArray_0 = function toArray_2(out){
  return $toArray_0(this, out);
}
;
_.size = 0;
function binarySearch_0(sortedArray, key){
  var high, low, mid, midVal;
  low = 0;
  high = sortedArray.length - 1;
  while (low <= high) {
    mid = low + (~~(high - low) >> 1);
    midVal = sortedArray[mid];
    if (midVal < key) {
      low = mid + 1;
    }
     else if (midVal > key) {
      high = mid - 1;
    }
     else {
      return mid;
    }
  }
  return -low - 1;
}

function deepEquals(a1, a2){
  var class1, class2, i_0, n, obj1, obj2;
  if (maskUndefined(a1) === maskUndefined(a2)) {
    return true;
  }
  if (a1 == null || a2 == null) {
    return false;
  }
  if (a1.length != a2.length) {
    return false;
  }
  for (i_0 = 0 , n = a1.length; i_0 < n; ++i_0) {
    obj1 = a1[i_0];
    obj2 = a2[i_0];
    if (maskUndefined(obj1) === maskUndefined(obj2)) {
      continue;
    }
    if (obj1 == null || obj2 == null) {
      return false;
    }
    if (equals__devirtual$(obj1, obj2)) {
      continue;
    }
    class1 = getClass__devirtual$(obj1);
    class2 = getClass__devirtual$(obj2);
    if ((class1.modifiers & 4) == 0 || class1 != class2) {
      return false;
    }
    if (instanceOf(obj1, Q$Object_$1)) {
      if (!deepEquals(dynamicCast(obj1, Q$Object_$1), dynamicCast(obj2, Q$Object_$1))) {
        return false;
      }
    }
     else if (instanceOf(obj1, Q$boolean_$1)) {
      if (!equals_20(dynamicCast(obj1, Q$boolean_$1), dynamicCast(obj2, Q$boolean_$1))) {
        return false;
      }
    }
     else if (instanceOf(obj1, Q$byte_$1)) {
      if (!equals_16(dynamicCast(obj1, Q$byte_$1), dynamicCast(obj2, Q$byte_$1))) {
        return false;
      }
    }
     else if (instanceOf(obj1, Q$char_$1)) {
      if (!equals_17(dynamicCast(obj1, Q$char_$1), dynamicCast(obj2, Q$char_$1))) {
        return false;
      }
    }
     else if (instanceOf(obj1, Q$int_$1)) {
      if (!equals_19(dynamicCast(obj1, Q$int_$1), dynamicCast(obj2, Q$int_$1))) {
        return false;
      }
    }
     else if (instanceOf(obj1, Q$double_$1)) {
      if (!equals_18(dynamicCast(obj1, Q$double_$1), dynamicCast(obj2, Q$double_$1))) {
        return false;
      }
    }
  }
  return true;
}

function deepHashCode(a){
  var hash, hashCode, i_0, n, obj;
  if (a == null) {
    return 0;
  }
  hashCode = 1;
  for (i_0 = 0 , n = a.length; i_0 < n; ++i_0) {
    obj = a[i_0];
    instanceOf(obj, Q$Object_$1)?(hash = deepHashCode(dynamicCast(obj, Q$Object_$1))):instanceOf(obj, Q$boolean_$1)?(hash = hashCode_22(dynamicCast(obj, Q$boolean_$1))):instanceOf(obj, Q$byte_$1)?(hash = hashCode_18(dynamicCast(obj, Q$byte_$1))):instanceOf(obj, Q$char_$1)?(hash = hashCode_19(dynamicCast(obj, Q$char_$1))):instanceOf(obj, Q$int_$1)?(hash = hashCode_21(dynamicCast(obj, Q$int_$1))):instanceOf(obj, Q$double_$1)?(hash = hashCode_20(dynamicCast(obj, Q$double_$1))):obj != null?(hash = hashCode__devirtual$(obj)):(hash = 0);
    hashCode = 31 * hashCode + hash | 0;
  }
  return hashCode;
}

function equals_16(array1, array2){
  var i_0;
  if (maskUndefined(array1) === maskUndefined(array2)) {
    return true;
  }
  if (array1 == null || array2 == null) {
    return false;
  }
  if (array1.length != array2.length) {
    return false;
  }
  for (i_0 = 0; i_0 < array1.length; ++i_0) {
    if (array1[i_0] != array2[i_0]) {
      return false;
    }
  }
  return true;
}

function equals_17(array1, array2){
  var i_0;
  if (maskUndefined(array1) === maskUndefined(array2)) {
    return true;
  }
  if (array1 == null || array2 == null) {
    return false;
  }
  if (array1.length != array2.length) {
    return false;
  }
  for (i_0 = 0; i_0 < array1.length; ++i_0) {
    if (array1[i_0] != array2[i_0]) {
      return false;
    }
  }
  return true;
}

function equals_18(array1, array2){
  var i_0;
  if (maskUndefined(array1) === maskUndefined(array2)) {
    return true;
  }
  if (array1 == null || array2 == null) {
    return false;
  }
  if (array1.length != array2.length) {
    return false;
  }
  for (i_0 = 0; i_0 < array1.length; ++i_0) {
    if (array1[i_0] != array2[i_0]) {
      return false;
    }
  }
  return true;
}

function equals_19(array1, array2){
  var i_0;
  if (maskUndefined(array1) === maskUndefined(array2)) {
    return true;
  }
  if (array1 == null || array2 == null) {
    return false;
  }
  if (array1.length != array2.length) {
    return false;
  }
  for (i_0 = 0; i_0 < array1.length; ++i_0) {
    if (array1[i_0] != array2[i_0]) {
      return false;
    }
  }
  return true;
}

function equals_20(array1, array2){
  var i_0;
  if (maskUndefined(array1) === maskUndefined(array2)) {
    return true;
  }
  if (array1 == null || array2 == null) {
    return false;
  }
  if (array1.length != array2.length) {
    return false;
  }
  for (i_0 = 0; i_0 < array1.length; ++i_0) {
    if (array1[i_0] != array2[i_0]) {
      return false;
    }
  }
  return true;
}

function fill_0(a){
  fill_1(a, a.length);
}

function fill_1(a, toIndex){
  var i_0;
  for (i_0 = 0; i_0 < toIndex; ++i_0) {
    a[i_0] = -1;
  }
}

function fill_2(a){
  fill_3(a, a.length);
}

function fill_3(a, toIndex){
  var i_0;
  for (i_0 = 0; i_0 < toIndex; ++i_0) {
    a[i_0] = -1;
  }
}

function hashCode_18(a){
  var hashCode, i_0, n;
  if (a == null) {
    return 0;
  }
  hashCode = 1;
  for (i_0 = 0 , n = a.length; i_0 < n; ++i_0) {
    hashCode = 31 * hashCode + a[i_0] | 0;
  }
  return hashCode;
}

function hashCode_19(a){
  var hashCode, i_0, n;
  if (a == null) {
    return 0;
  }
  hashCode = 1;
  for (i_0 = 0 , n = a.length; i_0 < n; ++i_0) {
    hashCode = 31 * hashCode + a[i_0] | 0;
  }
  return hashCode;
}

function hashCode_20(a){
  var hashCode, i_0, n;
  if (a == null) {
    return 0;
  }
  hashCode = 1;
  for (i_0 = 0 , n = a.length; i_0 < n; ++i_0) {
    hashCode = 31 * hashCode + round_int(a[i_0]) | 0;
  }
  return hashCode;
}

function hashCode_21(a){
  var hashCode, i_0, n;
  if (a == null) {
    return 0;
  }
  hashCode = 1;
  for (i_0 = 0 , n = a.length; i_0 < n; ++i_0) {
    hashCode = 31 * hashCode + a[i_0] | 0;
  }
  return hashCode;
}

function hashCode_22(a){
  var hashCode, i_0, n;
  if (a == null) {
    return 0;
  }
  hashCode = 1;
  for (i_0 = 0 , n = a.length; i_0 < n; ++i_0) {
    hashCode = 31 * hashCode + (($clinit_Boolean() , a[i_0]?TRUE_0:FALSE_0).value?1231:1237) | 0;
  }
  return hashCode;
}

function insertionSort(array, low, high, comp){
  var i_0, j, t;
  for (i_0 = low + 1; i_0 < high; ++i_0) {
    for (j = i_0; j > low && comp.compare(array[j - 1], array[j]) > 0; --j) {
      t = array[j];
      setCheck(array, j, array[j - 1]);
      setCheck(array, j - 1, t);
    }
  }
}

function merge(src, srcLow, srcMid, srcHigh, dest, destLow, destHigh, comp){
  var topIdx;
  topIdx = srcMid;
  while (destLow < destHigh) {
    topIdx >= srcHigh || srcLow < srcMid && comp.compare(src[srcLow], src[topIdx]) <= 0?setCheck(dest, destLow++, src[srcLow++]):setCheck(dest, destLow++, src[topIdx++]);
  }
}

function mergeSort(x, fromIndex, toIndex, comp){
  var temp;
  temp = cloneSubrange(x, fromIndex, toIndex);
  mergeSort_0(temp, x, fromIndex, toIndex, -fromIndex, comp);
}

function mergeSort_0(temp, array, low, high, ofs, comp){
  var length_0, tempHigh, tempLow, tempMid;
  length_0 = high - low;
  if (length_0 < 7) {
    insertionSort(array, low, high, comp);
    return;
  }
  tempLow = low + ofs;
  tempHigh = high + ofs;
  tempMid = tempLow + (~~(tempHigh - tempLow) >> 1);
  mergeSort_0(array, temp, tempLow, tempMid, -ofs, comp);
  mergeSort_0(array, temp, tempMid, tempHigh, -ofs, comp);
  if (comp.compare(temp[tempMid - 1], temp[tempMid]) <= 0) {
    while (low < high) {
      setCheck(array, low++, temp[tempLow++]);
    }
    return;
  }
  merge(temp, tempLow, tempMid, tempHigh, array, low, high, comp);
}

function toString_27(a){
  var b, i_0;
  if (a == null) {
    return 'null';
  }
  b = new StringBuffer_1('[');
  for (i_0 = 0; i_0 < a.length; ++i_0) {
    i_0 != 0 && (b.impl.append_2(b.data, ', ') , b);
    b.impl.append_2(b.data, '' + a[i_0]);
  }
  b.impl.append_2(b.data, ']');
  return b.impl.toString_0(b.data);
}

function $clinit_Collections(){
  $clinit_Collections = nullMethod;
  EMPTY_LIST = new Collections$EmptyList_0;
}

function replaceContents(target, x){
  var i_0, size;
  size = target.size;
  for (i_0 = 0; i_0 < size; ++i_0) {
    $set_7(target, i_0, x[i_0]);
  }
}

function unmodifiableList(list){
  $clinit_Collections();
  return instanceOf(list, Q$RandomAccess)?new Collections$UnmodifiableRandomAccessList_0(list):new Collections$UnmodifiableList_0(list);
}

var EMPTY_LIST;
function Collections$EmptyList_0(){
}

defineSeed(365, 355, makeCastMap([Q$Serializable, Q$List, Q$RandomAccess]), Collections$EmptyList_0);
_.contains_0 = function contains_3(object){
  return false;
}
;
_.get_0 = function get_4(location_0){
  throw new IndexOutOfBoundsException_0;
}
;
_.size_0 = function size_5(){
  return 0;
}
;
defineSeed(366, 1, {});
_.add = function add_7(o){
  throw new UnsupportedOperationException_0;
}
;
_.iterator = function iterator_7(){
  return new Collections$UnmodifiableCollectionIterator_0(this.coll.iterator());
}
;
_.remove_1 = function remove_18(o){
  throw new UnsupportedOperationException_0;
}
;
_.size_0 = function size_6(){
  return this.coll.size_0();
}
;
_.toString$ = function toString_28(){
  return this.coll.toString$();
}
;
_.coll = null;
function Collections$UnmodifiableCollectionIterator_0(it){
  this.it = it;
}

defineSeed(367, 1, {}, Collections$UnmodifiableCollectionIterator_0);
_.hasNext = function hasNext_4(){
  return this.it.hasNext();
}
;
_.next_0 = function next_5(){
  return this.it.next_0();
}
;
_.remove_0 = function remove_19(){
  throw new UnsupportedOperationException_0;
}
;
_.it = null;
function Collections$UnmodifiableList_0(list){
  this.coll = list;
  this.list = list;
}

defineSeed(368, 366, makeCastMap([Q$List]), Collections$UnmodifiableList_0);
_.equals$ = function equals_21(o){
  return this.list.equals$(o);
}
;
_.get_0 = function get_5(index){
  return this.list.get_0(index);
}
;
_.hashCode$ = function hashCode_23(){
  return this.list.hashCode$();
}
;
_.isEmpty = function isEmpty_2(){
  return this.list.isEmpty();
}
;
_.listIterator = function listIterator_1(){
  return new Collections$UnmodifiableListIterator_0(this.list.listIterator_0(0));
}
;
_.listIterator_0 = function listIterator_2(from){
  return new Collections$UnmodifiableListIterator_0(this.list.listIterator_0(from));
}
;
_.list = null;
function Collections$UnmodifiableListIterator_0(lit){
  this.it = lit;
  this.lit = lit;
}

defineSeed(369, 367, {}, Collections$UnmodifiableListIterator_0);
_.hasPrevious = function hasPrevious_0(){
  return this.lit.hasPrevious();
}
;
_.previous = function previous_1(){
  return this.lit.previous();
}
;
_.lit = null;
function Collections$UnmodifiableMap_0(map){
  this.map = map;
}

defineSeed(370, 1, makeCastMap([Q$Map]), Collections$UnmodifiableMap_0);
_.containsKey = function containsKey_1(key){
  return this.map.containsKey(key);
}
;
_.entrySet_0 = function entrySet_1(){
  !this.entrySet && (this.entrySet = new Collections$UnmodifiableMap$UnmodifiableEntrySet_0(this.map.entrySet_0()));
  return this.entrySet;
}
;
_.equals$ = function equals_22(o){
  return this.map.equals$(o);
}
;
_.get = function get_6(key){
  return this.map.get(key);
}
;
_.hashCode$ = function hashCode_24(){
  return this.map.hashCode$();
}
;
_.isEmpty = function isEmpty_3(){
  return this.map.isEmpty();
}
;
_.keySet_0 = function keySet_1(){
  !this.keySet && (this.keySet = new Collections$UnmodifiableSet_0(this.map.keySet_0()));
  return this.keySet;
}
;
_.put = function put_1(key, value){
  throw new UnsupportedOperationException_0;
}
;
_.remove_2 = function remove_20(key){
  throw new UnsupportedOperationException_0;
}
;
_.size_0 = function size_7(){
  return this.map.size_0();
}
;
_.toString$ = function toString_29(){
  return this.map.toString$();
}
;
_.entrySet = null;
_.keySet = null;
_.map = null;
function Collections$UnmodifiableSet_0(set){
  this.coll = set;
}

defineSeed(372, 366, makeCastMap([Q$Set]), Collections$UnmodifiableSet_0);
_.equals$ = function equals_23(o){
  return this.coll.equals$(o);
}
;
_.hashCode$ = function hashCode_25(){
  return this.coll.hashCode$();
}
;
function Collections$UnmodifiableMap$UnmodifiableEntrySet_0(s){
  this.coll = s;
}

defineSeed(371, 372, makeCastMap([Q$Set]), Collections$UnmodifiableMap$UnmodifiableEntrySet_0);
_.iterator = function iterator_8(){
  var it;
  it = this.coll.iterator();
  return new Collections$UnmodifiableMap$UnmodifiableEntrySet$1_0(it);
}
;
function Collections$UnmodifiableMap$UnmodifiableEntrySet$1_0(val$it){
  this.val$it = val$it;
}

defineSeed(373, 1, {}, Collections$UnmodifiableMap$UnmodifiableEntrySet$1_0);
_.hasNext = function hasNext_5(){
  return this.val$it.hasNext();
}
;
_.next_0 = function next_6(){
  return new Collections$UnmodifiableMap$UnmodifiableEntrySet$UnmodifiableEntry_0(dynamicCast(this.val$it.next_0(), Q$Map$Entry));
}
;
_.remove_0 = function remove_21(){
  throw new UnsupportedOperationException_0;
}
;
_.val$it = null;
function Collections$UnmodifiableMap$UnmodifiableEntrySet$UnmodifiableEntry_0(entry){
  this.entry = entry;
}

defineSeed(374, 1, makeCastMap([Q$Map$Entry]), Collections$UnmodifiableMap$UnmodifiableEntrySet$UnmodifiableEntry_0);
_.equals$ = function equals_24(o){
  return this.entry.equals$(o);
}
;
_.getKey = function getKey_1(){
  return this.entry.getKey();
}
;
_.getValue = function getValue_1(){
  return this.entry.getValue();
}
;
_.hashCode$ = function hashCode_26(){
  return this.entry.hashCode$();
}
;
_.setValue = function setValue_1(value){
  throw new UnsupportedOperationException_0;
}
;
_.toString$ = function toString_30(){
  return this.entry.toString$();
}
;
_.entry = null;
function Collections$UnmodifiableRandomAccessList_0(list){
  Collections$UnmodifiableList_0.call(this, list);
}

defineSeed(375, 368, makeCastMap([Q$List, Q$RandomAccess]), Collections$UnmodifiableRandomAccessList_0);
function $clinit_Comparators(){
  $clinit_Comparators = nullMethod;
  NATURAL = new Comparators$1_0;
}

var NATURAL;
function Comparators$1_0(){
}

defineSeed(377, 1, {}, Comparators$1_0);
_.compare = function compare_1(o1, o2){
  return dynamicCast(o1, Q$Comparable).compareTo$(o2);
}
;
function $compareTo_5(this$static, other){
  return signum(sub(fromDouble(this$static.jsdate.getTime()), fromDouble(other.jsdate.getTime())));
}

function $toString_3(this$static){
  var hourOffset, minuteOffset, offset;
  offset = -this$static.jsdate.getTimezoneOffset();
  hourOffset = (offset >= 0?'+':'') + ~~(offset / 60);
  minuteOffset = (offset < 0?-offset:offset) % 60 < 10?'0' + (offset < 0?-offset:offset) % 60:'' + (offset < 0?-offset:offset) % 60;
  return ($clinit_Date$StringData() , DAYS)[this$static.jsdate.getDay()] + ' ' + MONTHS[this$static.jsdate.getMonth()] + ' ' + padTwo(this$static.jsdate.getDate()) + ' ' + padTwo(this$static.jsdate.getHours()) + ':' + padTwo(this$static.jsdate.getMinutes()) + ':' + padTwo(this$static.jsdate.getSeconds()) + ' GMT' + hourOffset + minuteOffset + ' ' + this$static.jsdate.getFullYear();
}

function Date_1(){
  this.jsdate = new Date;
}

function Date_2(date){
  this.jsdate = create(toDouble(date));
}

function padTwo(number){
  return number < 10?'0' + number:'' + number;
}

defineSeed(378, 1, makeCastMap([Q$Serializable, Q$Comparable, Q$Date]), Date_1, Date_2);
_.compareTo$ = function compareTo_7(other){
  return $compareTo_5(this, dynamicCast(other, Q$Date));
}
;
_.equals$ = function equals_25(obj){
  return instanceOf(obj, Q$Date) && eq(fromDouble(this.jsdate.getTime()), fromDouble(dynamicCast(obj, Q$Date).jsdate.getTime()));
}
;
_.hashCode$ = function hashCode_27(){
  var time;
  time = fromDouble(this.jsdate.getTime());
  return toInt(xor(time, shru(time, 32)));
}
;
_.toString$ = function toString_31(){
  return $toString_3(this);
}
;
_.jsdate = null;
function $clinit_Date$StringData(){
  $clinit_Date$StringData = nullMethod;
  DAYS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  MONTHS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
}

var DAYS, MONTHS;
function HashMap_0(){
  $clearImpl(this);
}

function HashMap_1(toBeCopied){
  $clearImpl(this);
  $putAll(this, toBeCopied);
}

defineSeed(380, 347, makeCastMap([Q$Serializable, Q$HashMap, Q$Map]), HashMap_0, HashMap_1);
_.equals = function equals_26(value1, value2){
  return maskUndefined(value1) === maskUndefined(value2) || value1 != null && equals__devirtual$(value1, value2);
}
;
_.getHashCode = function getHashCode_1(key){
  return ~~hashCode__devirtual$(key);
}
;
function $add_7(this$static, o){
  var old;
  old = this$static.map.put(o, this$static);
  return old == null;
}

function $contains_0(this$static, o){
  return this$static.map.containsKey(o);
}

function $remove_7(this$static, o){
  return this$static.map.remove_2(o) != null;
}

function HashSet_0(){
  this.map = new HashMap_0;
}

defineSeed(381, 350, makeCastMap([Q$Serializable, Q$Set]), HashSet_0);
_.add = function add_8(o){
  return $add_7(this, o);
}
;
_.contains_0 = function contains_4(o){
  return this.map.containsKey(o);
}
;
_.isEmpty = function isEmpty_4(){
  return this.map.size_0() == 0;
}
;
_.iterator = function iterator_9(){
  return $iterator($keySet(this.map));
}
;
_.remove_1 = function remove_22(o){
  return $remove_7(this, o);
}
;
_.size_0 = function size_8(){
  return this.map.size_0();
}
;
_.toString$ = function toString_32(){
  return $toString_2($keySet(this.map));
}
;
_.map = null;
function $containsKey(this$static, key){
  return this$static.map.containsKey(key);
}

function $get_5(this$static, key){
  var entry;
  entry = dynamicCast(this$static.map.get(key), Q$LinkedHashMap$ChainEntry);
  if (entry) {
    $recordAccess(this$static, entry);
    return entry.value;
  }
  return null;
}

function $put_0(this$static, key, value){
  var newEntry, old, oldValue;
  old = dynamicCast(this$static.map.get(key), Q$LinkedHashMap$ChainEntry);
  if (!old) {
    newEntry = new LinkedHashMap$ChainEntry_1(this$static, key, value);
    this$static.map.put(key, newEntry);
    $addToEnd(newEntry);
    return null;
  }
   else {
    oldValue = old.value;
    $setValue(old, value);
    $recordAccess(this$static, old);
    return oldValue;
  }
}

function $recordAccess(this$static, entry){
  if (this$static.accessOrder) {
    $remove_8(entry);
    $addToEnd(entry);
  }
}

function LinkedHashMap_0(){
  $clearImpl(this);
  this.head = new LinkedHashMap$ChainEntry_0(this);
  this.map = new HashMap_0;
  this.head.prev = this.head;
  this.head.next = this.head;
}

defineSeed(382, 380, makeCastMap([Q$Serializable, Q$HashMap, Q$Map]), LinkedHashMap_0);
_.clear = function clear_0(){
  this.map.clear();
  this.head.prev = this.head;
  this.head.next = this.head;
}
;
_.containsKey = function containsKey_2(key){
  return this.map.containsKey(key);
}
;
_.entrySet_0 = function entrySet_2(){
  return new LinkedHashMap$EntrySet_0(this);
}
;
_.get = function get_7(key){
  return $get_5(this, key);
}
;
_.put = function put_2(key, value){
  return $put_0(this, key, value);
}
;
_.remove_2 = function remove_23(key){
  var entry;
  entry = dynamicCast(this.map.remove_2(key), Q$LinkedHashMap$ChainEntry);
  if (entry) {
    $remove_8(entry);
    return entry.value;
  }
  return null;
}
;
_.size_0 = function size_9(){
  return this.map.size_0();
}
;
_.accessOrder = false;
function $setValue(this$static, value){
  var old;
  old = this$static.value;
  this$static.value = value;
  return old;
}

function MapEntryImpl_0(key, value){
  this.key = key;
  this.value = value;
}

defineSeed(384, 353, makeCastMap([Q$Map$Entry]), MapEntryImpl_0);
_.getKey = function getKey_2(){
  return this.key;
}
;
_.getValue = function getValue_2(){
  return this.value;
}
;
_.setValue = function setValue_2(value){
  return $setValue(this, value);
}
;
_.key = null;
_.value = null;
function $addToEnd(this$static){
  var tail;
  tail = this$static.this$0.head.prev;
  this$static.prev = tail;
  this$static.next = this$static.this$0.head;
  tail.next = this$static.this$0.head.prev = this$static;
}

function $remove_8(this$static){
  this$static.next.prev = this$static.prev;
  this$static.prev.next = this$static.next;
  this$static.next = this$static.prev = null;
}

function LinkedHashMap$ChainEntry_0(this$0){
  LinkedHashMap$ChainEntry_1.call(this, this$0, null, null);
}

function LinkedHashMap$ChainEntry_1(this$0, key, value){
  this.this$0 = this$0;
  MapEntryImpl_0.call(this, key, value);
  this.next = this.prev = null;
}

defineSeed(383, 384, makeCastMap([Q$LinkedHashMap$ChainEntry, Q$Map$Entry]), LinkedHashMap$ChainEntry_0, LinkedHashMap$ChainEntry_1);
_.next = null;
_.prev = null;
_.this$0 = null;
function LinkedHashMap$EntrySet_0(this$0){
  this.this$0 = this$0;
}

defineSeed(385, 350, makeCastMap([Q$Set]), LinkedHashMap$EntrySet_0);
_.contains_0 = function contains_5(o){
  var entry, key, value;
  if (!instanceOf(o, Q$Map$Entry)) {
    return false;
  }
  entry = dynamicCast(o, Q$Map$Entry);
  key = entry.getKey();
  if ($containsKey(this.this$0, key)) {
    value = $get_5(this.this$0, key);
    return equalsWithNullCheck(entry.getValue(), value);
  }
  return false;
}
;
_.iterator = function iterator_10(){
  return new LinkedHashMap$EntrySet$EntryIterator_0(this);
}
;
_.size_0 = function size_10(){
  return this.this$0.map.size_0();
}
;
_.this$0 = null;
function $next_3(this$static){
  if (this$static.next == this$static.this$1.this$0.head) {
    throw new NoSuchElementException_0;
  }
  this$static.last = this$static.next;
  this$static.next = this$static.next.next;
  return this$static.last;
}

function LinkedHashMap$EntrySet$EntryIterator_0(this$1){
  this.this$1 = this$1;
  this.next = this$1.this$0.head.next;
}

defineSeed(386, 1, {}, LinkedHashMap$EntrySet$EntryIterator_0);
_.hasNext = function hasNext_6(){
  return this.next != this.this$1.this$0.head;
}
;
_.next_0 = function next_7(){
  return $next_3(this);
}
;
_.remove_0 = function remove_24(){
  if (!this.last) {
    throw new IllegalStateException_1('No current entry');
  }
  $remove_8(this.last);
  this.this$1.this$0.map.remove_2(this.last.key);
  this.last = null;
}
;
_.last = null;
_.next = null;
_.this$1 = null;
function $addBefore(this$static, o, target){
  new LinkedList$Node_1(o, target);
  ++this$static.size;
}

function $addLast(this$static, o){
  new LinkedList$Node_1(o, this$static.header);
  ++this$static.size;
}

function $listIterator(this$static, index){
  var i_0, node;
  (index < 0 || index > this$static.size) && indexOutOfBounds(index, this$static.size);
  if (index >= ~~this$static.size >> 1) {
    node = this$static.header;
    for (i_0 = this$static.size; i_0 > index; --i_0) {
      node = node.prev;
    }
  }
   else {
    node = this$static.header.next;
    for (i_0 = 0; i_0 < index; ++i_0) {
      node = node.next;
    }
  }
  return new LinkedList$ListIteratorImpl_0(this$static, index, node);
}

function $removeLast(this$static){
  var node;
  $throwEmptyException(this$static);
  --this$static.size;
  node = this$static.header.prev;
  $remove_10(node);
  return node.value;
}

function $throwEmptyException(this$static){
  if (this$static.size == 0) {
    throw new NoSuchElementException_0;
  }
}

function LinkedList_0(){
  this.header = new LinkedList$Node_0;
  this.size = 0;
}

defineSeed(387, 361, makeCastMap([Q$Serializable, Q$List]), LinkedList_0);
_.add = function add_9(o){
  new LinkedList$Node_1(o, this.header);
  ++this.size;
  return true;
}
;
_.listIterator_0 = function listIterator_3(index){
  return $listIterator(this, index);
}
;
_.size_0 = function size_11(){
  return this.size;
}
;
_.header = null;
_.size = 0;
function $next_4(this$static){
  if (this$static.currentNode == this$static.this$0.header) {
    throw new NoSuchElementException_0;
  }
  this$static.lastNode = this$static.currentNode;
  this$static.currentNode = this$static.currentNode.next;
  ++this$static.currentIndex;
  return this$static.lastNode.value;
}

function $remove_9(this$static){
  $verifyCurrentElement(this$static);
  this$static.currentNode == this$static.lastNode?(this$static.currentNode = this$static.lastNode.next):--this$static.currentIndex;
  $remove_10(this$static.lastNode);
  this$static.lastNode = null;
  --this$static.this$0.size;
}

function $verifyCurrentElement(this$static){
  if (!this$static.lastNode) {
    throw new IllegalStateException_0;
  }
}

function LinkedList$ListIteratorImpl_0(this$0, index, startNode){
  this.this$0 = this$0;
  this.currentNode = startNode;
  this.currentIndex = index;
}

defineSeed(388, 1, {}, LinkedList$ListIteratorImpl_0);
_.hasNext = function hasNext_7(){
  return this.currentNode != this.this$0.header;
}
;
_.hasPrevious = function hasPrevious_1(){
  return this.currentNode.prev != this.this$0.header;
}
;
_.next_0 = function next_8(){
  return $next_4(this);
}
;
_.previous = function previous_2(){
  if (this.currentNode.prev == this.this$0.header) {
    throw new NoSuchElementException_0;
  }
  this.lastNode = this.currentNode = this.currentNode.prev;
  --this.currentIndex;
  return this.lastNode.value;
}
;
_.remove_0 = function remove_25(){
  $remove_9(this);
}
;
_.currentIndex = 0;
_.currentNode = null;
_.lastNode = null;
_.this$0 = null;
function $remove_10(this$static){
  this$static.next.prev = this$static.prev;
  this$static.prev.next = this$static.next;
  this$static.next = this$static.prev = this$static;
}

function LinkedList$Node_0(){
  this.next = this.prev = this;
}

function LinkedList$Node_1(value, nextNode){
  this.value = value;
  this.next = nextNode;
  this.prev = nextNode.prev;
  nextNode.prev.next = this;
  nextNode.prev = this;
}

defineSeed(389, 1, {}, LinkedList$Node_0, LinkedList$Node_1);
_.next = null;
_.prev = null;
_.value = null;
function NoSuchElementException_0(){
  RuntimeException_0.call(this);
}

defineSeed(390, 12, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable, Q$NoSuchElementException]), NoSuchElementException_0);
function $mergeHeaps(this$static, node){
  var heapSize, smallestChild, value, leftChild, rightChild, smallestChild_0;
  heapSize = this$static.heap.size;
  value = $get_4(this$static.heap, node);
  while (node * 2 + 1 < heapSize) {
    smallestChild = (leftChild = 2 * node + 1 , rightChild = leftChild + 1 , smallestChild_0 = leftChild , rightChild < heapSize && $compare_0($get_4(this$static.heap, rightChild), $get_4(this$static.heap, leftChild)) < 0 && (smallestChild_0 = rightChild) , smallestChild_0);
    if ($compare_0(value, $get_4(this$static.heap, smallestChild)) < 0) {
      break;
    }
    $set_7(this$static.heap, node, $get_4(this$static.heap, smallestChild));
    node = smallestChild;
  }
  $set_7(this$static.heap, node, value);
}

function $offer(this$static, e){
  var childNode, node;
  node = this$static.heap.size;
  $add_6(this$static.heap, e);
  while (node > 0) {
    childNode = node;
    node = ~~((node - 1) / 2);
    if ($compare_0($get_4(this$static.heap, node), e) <= 0) {
      $set_7(this$static.heap, childNode, e);
      return true;
    }
    $set_7(this$static.heap, childNode, $get_4(this$static.heap, node));
  }
  $set_7(this$static.heap, node, e);
  return true;
}

function $poll(this$static){
  var value;
  if (this$static.heap.size == 0) {
    return null;
  }
  value = $get_4(this$static.heap, 0);
  $removeAtIndex(this$static, 0);
  return value;
}

function $removeAtIndex(this$static, index){
  var lastValue;
  lastValue = $remove_5(this$static.heap, this$static.heap.size - 1);
  if (index < this$static.heap.size) {
    $set_7(this$static.heap, index, lastValue);
    $mergeHeaps(this$static, index);
  }
}

function $toArray_1(this$static, a){
  return $toArray_0(this$static.heap, a);
}

function PriorityQueue_0(cmp){
  this.heap = new ArrayList_1;
  this.cmp = cmp;
}

defineSeed(391, 360, {}, PriorityQueue_0);
_.contains_0 = function contains_6(o){
  return $indexOf_2(this.heap, o, 0) != -1;
}
;
_.isEmpty = function isEmpty_5(){
  return this.heap.size == 0;
}
;
_.iterator = function iterator_11(){
  return new Collections$UnmodifiableCollectionIterator_0(unmodifiableList(this.heap).coll.iterator());
}
;
_.remove_1 = function remove_26(o){
  var index;
  index = $indexOf_2(this.heap, o, 0);
  if (index < 0) {
    return false;
  }
  $removeAtIndex(this, index);
  return true;
}
;
_.size_0 = function size_12(){
  return this.heap.size;
}
;
_.toArray = function toArray_3(){
  return $toArray(this.heap);
}
;
_.toArray_0 = function toArray_4(a){
  return $toArray_0(this.heap, a);
}
;
_.toString$ = function toString_33(){
  return $toString_2(this.heap);
}
;
_.cmp = null;
_.heap = null;
function $clinit_TreeMap(){
  $clinit_TreeMap = nullMethod;
  DEFAULT_COMPARATOR = new TreeMap$1_0;
}

function $get_6(this$static, k_0){
  var entry;
  entry = $getEntry(this$static, k_0);
  return entry?entry.value:null;
}

function $getEntry(this$static, key){
  var c, tree;
  tree = this$static.root;
  while (tree) {
    c = $compare_2(key, tree.key);
    if (c == 0) {
      return tree;
    }
    c < 0?(tree = tree.child[0]):(tree = tree.child[1]);
  }
  return null;
}

function $getFirstNode(this$static){
  var node;
  if (!this$static.root) {
    return null;
  }
  node = this$static.root;
  while (node.child[0]) {
    node = node.child[0];
  }
  return node;
}

function $getNodeAtOrAfter(this$static, key){
  var c, foundNode, node;
  foundNode = null;
  node = this$static.root;
  while (node) {
    c = $compare_2(key, node.key);
    if (c == 0) {
      return node;
    }
     else if (c > 0) {
      node = node.child[1];
    }
     else {
      foundNode = node;
      node = node.child[0];
    }
  }
  return foundNode;
}

function $insert_1(this$static, tree, newNode, state){
  var c, childNum;
  if (!tree) {
    return newNode;
  }
   else {
    c = $compare_2(tree.key, newNode.key);
    if (c == 0) {
      state.value = tree.value;
      state.found = true;
      tree.value = newNode.value;
      return tree;
    }
    childNum = c > 0?0:1;
    tree.child[childNum] = $insert_1(this$static, tree.child[childNum], newNode, state);
    if ($isRed(tree.child[childNum])) {
      if ($isRed(tree.child[1 - childNum])) {
        tree.isRed = true;
        tree.child[0].isRed = false;
        tree.child[1].isRed = false;
      }
       else {
        $isRed(tree.child[childNum].child[childNum])?(tree = $rotateSingle(tree, 1 - childNum)):$isRed(tree.child[childNum].child[1 - childNum]) && (tree = (tree.child[1 - (1 - childNum)] = $rotateSingle(tree.child[1 - (1 - childNum)], 1 - (1 - childNum)) , $rotateSingle(tree, 1 - childNum)));
      }
    }
  }
  return tree;
}

function $isRed(node){
  return !!node && node.isRed;
}

function $put_1(this$static, key, value){
  var node, state;
  node = new TreeMap$Node_0(key, value);
  state = new TreeMap$State_0;
  this$static.root = $insert_1(this$static, this$static.root, node, state);
  state.found || ++this$static.size;
  this$static.root.isRed = false;
  return state.value;
}

function $remove_11(this$static, keyObj){
  var state;
  state = new TreeMap$State_0;
  $removeWithState(this$static, keyObj, state);
  return state.value;
}

function $removeWithState(this$static, key, state){
  var c, dir, dir2, found, grandparent, head, last, newNode, node, parent_0, sibling;
  if (!this$static.root) {
    return false;
  }
  found = null;
  parent_0 = null;
  head = new TreeMap$Node_0(null, null);
  dir = 1;
  head.child[1] = this$static.root;
  node = head;
  while (node.child[dir]) {
    last = dir;
    grandparent = parent_0;
    parent_0 = node;
    node = node.child[dir];
    c = $compare_2(node.key, key);
    dir = c < 0?1:0;
    c == 0 && (!state.matchValue || equals__devirtual$(node.value, state.value)) && (found = node);
    if (!(!!node && node.isRed) && !$isRed(node.child[dir])) {
      if ($isRed(node.child[1 - dir])) {
        parent_0 = parent_0.child[last] = $rotateSingle(node, dir);
      }
       else if (!$isRed(node.child[1 - dir])) {
        sibling = parent_0.child[1 - last];
        if (sibling) {
          if (!$isRed(sibling.child[1 - last]) && !$isRed(sibling.child[last])) {
            parent_0.isRed = false;
            sibling.isRed = true;
            node.isRed = true;
          }
           else {
            dir2 = grandparent.child[1] == parent_0?1:0;
            $isRed(sibling.child[last])?(grandparent.child[dir2] = (parent_0.child[1 - last] = $rotateSingle(parent_0.child[1 - last], 1 - last) , $rotateSingle(parent_0, last))):$isRed(sibling.child[1 - last]) && (grandparent.child[dir2] = $rotateSingle(parent_0, last));
            node.isRed = grandparent.child[dir2].isRed = true;
            grandparent.child[dir2].child[0].isRed = false;
            grandparent.child[dir2].child[1].isRed = false;
          }
        }
      }
    }
  }
  if (found) {
    state.found = true;
    state.value = found.value;
    if (node != found) {
      newNode = new TreeMap$Node_0(node.key, node.value);
      $replaceNode_0(this$static, head, found, newNode);
      parent_0 == found && (parent_0 = newNode);
    }
    parent_0.child[parent_0.child[1] == node?1:0] = node.child[!node.child[0]?1:0];
    --this$static.size;
  }
  this$static.root = head.child[1];
  !!this$static.root && (this$static.root.isRed = false);
  return state.found;
}

function $replaceNode_0(this$static, head, node, newNode){
  var direction, parent_0;
  parent_0 = head;
  direction = parent_0.key == null || $compare_2(node.key, parent_0.key) > 0?1:0;
  while (parent_0.child[direction] != node) {
    parent_0 = parent_0.child[direction];
    direction = $compare_2(node.key, parent_0.key) > 0?1:0;
  }
  parent_0.child[direction] = newNode;
  newNode.isRed = node.isRed;
  newNode.child[0] = node.child[0];
  newNode.child[1] = node.child[1];
  node.child[0] = null;
  node.child[1] = null;
}

function $rotateSingle(tree, rotateDirection){
  var save;
  save = tree.child[1 - rotateDirection];
  tree.child[1 - rotateDirection] = save.child[rotateDirection];
  save.child[rotateDirection] = tree;
  tree.isRed = true;
  save.isRed = false;
  return save;
}

function $subMap(this$static, fromKey, toKey){
  return new TreeMap$SubMap_0(this$static, ($clinit_TreeMap$SubMapType() , Range_0), fromKey, toKey);
}

function $tailMap(this$static, fromKey){
  return new TreeMap$SubMap_0(this$static, ($clinit_TreeMap$SubMapType() , Tail), fromKey, null);
}

function TreeMap_0(){
  $clinit_TreeMap();
  TreeMap_1.call(this, null);
}

function TreeMap_1(c){
  this.root = null;
  !c && (c = DEFAULT_COMPARATOR);
  this.cmp = c;
}

function throwNSE(node){
  $clinit_TreeMap();
  if (!node) {
    throw new NoSuchElementException_0;
  }
  return node;
}

defineSeed(392, 348, makeCastMap([Q$Serializable, Q$Map]), TreeMap_0);
_.containsKey = function containsKey_3(key){
  return !!$getEntry(this, key);
}
;
_.entrySet_0 = function entrySet_3(){
  return new TreeMap$EntrySet_0(this);
}
;
_.firstKey = function firstKey(){
  return throwNSE($getFirstNode(this)).key;
}
;
_.get = function get_8(k_0){
  return $get_6(this, k_0);
}
;
_.put = function put_3(key, value){
  return $put_1(this, key, value);
}
;
_.remove_2 = function remove_27(keyObj){
  return $remove_11(this, keyObj);
}
;
_.size_0 = function size_13(){
  return this.size;
}
;
_.tailMap = function tailMap(fromKey){
  return $tailMap(this, fromKey);
}
;
_.cmp = null;
_.root = null;
_.size = 0;
var DEFAULT_COMPARATOR;
function $compare_1(a, b){
  if (a == null || b == null) {
    throw new NullPointerException_0;
  }
  return a.compareTo$(b);
}

function $compare_2(a, b){
  return $compare_1(dynamicCast(a, Q$Comparable), dynamicCast(b, Q$Comparable));
}

function TreeMap$1_0(){
}

defineSeed(393, 1, {}, TreeMap$1_0);
_.compare = function compare_2(a, b){
  return $compare_2(a, b);
}
;
function $inOrderAdd(this$static, list, type, current, fromKey, toKey){
  if (!current) {
    return;
  }
  !!current.child[0] && $inOrderAdd(this$static, list, type, current.child[0], fromKey, toKey);
  $inRange(this$static, type, current.key, fromKey, toKey) && list.add(current);
  !!current.child[1] && $inOrderAdd(this$static, list, type, current.child[1], fromKey, toKey);
}

function $inRange(this$static, type, key, fromKey, toKey){
  if (type.toKeyValid()) {
    if ($compare_2(key, toKey) >= 0) {
      return false;
    }
  }
  if (type.fromKeyValid()) {
    if ($compare_2(key, fromKey) < 0) {
      return false;
    }
  }
  return true;
}

function TreeMap$EntryIterator_0(this$0){
  TreeMap$EntryIterator_1.call(this, this$0, ($clinit_TreeMap$SubMapType() , All), null, null);
}

function TreeMap$EntryIterator_1(this$0, type, fromKey, toKey){
  var list;
  this.this$0 = this$0;
  list = new ArrayList_0;
  $inOrderAdd(this, list, type, this$0.root, fromKey, toKey);
  this.iter = new AbstractList$IteratorImpl_0(list);
}

defineSeed(394, 1, {}, TreeMap$EntryIterator_0, TreeMap$EntryIterator_1);
_.hasNext = function hasNext_8(){
  return $hasNext(this.iter);
}
;
_.next_0 = function next_9(){
  return this.last = dynamicCast($next_1(this.iter), Q$Map$Entry);
}
;
_.remove_0 = function remove_28(){
  $remove_4(this.iter);
  $remove_11(this.this$0, this.last.getKey());
}
;
_.iter = null;
_.last = null;
_.this$0 = null;
function TreeMap$EntrySet_0(this$0){
  this.this$0 = this$0;
}

defineSeed(395, 350, makeCastMap([Q$Set]), TreeMap$EntrySet_0);
_.contains_0 = function contains_7(o){
  var entry, lookupEntry;
  if (!instanceOf(o, Q$Map$Entry)) {
    return false;
  }
  entry = dynamicCast(o, Q$Map$Entry);
  lookupEntry = $getEntry(this.this$0, entry.getKey());
  return !!lookupEntry && equalsWithNullCheck(lookupEntry.value, entry.getValue());
}
;
_.iterator = function iterator_12(){
  return new TreeMap$EntryIterator_0(this.this$0);
}
;
_.remove_1 = function remove_29(o){
  var entry, state;
  if (!instanceOf(o, Q$Map$Entry)) {
    return false;
  }
  entry = dynamicCast(o, Q$Map$Entry);
  state = new TreeMap$State_0;
  state.matchValue = true;
  state.value = entry.getValue();
  return $removeWithState(this.this$0, entry.getKey(), state);
}
;
_.size_0 = function size_14(){
  return this.this$0.size;
}
;
_.this$0 = null;
function TreeMap$Node_0(key, value){
  this.key = key;
  this.value = value;
  this.child = initDim(_3Ljava_util_TreeMap$Node_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$TreeMap$Node, 2, 0);
  this.isRed = true;
}

defineSeed(396, 1, makeCastMap([Q$Map$Entry, Q$TreeMap$Node]), TreeMap$Node_0);
_.equals$ = function equals_27(o){
  var other;
  if (!instanceOf(o, Q$Map$Entry)) {
    return false;
  }
  other = dynamicCast(o, Q$Map$Entry);
  return equalsWithNullCheck(this.key, other.getKey()) && equalsWithNullCheck(this.value, other.getValue());
}
;
_.getKey = function getKey_3(){
  return this.key;
}
;
_.getValue = function getValue_3(){
  return this.value;
}
;
_.hashCode$ = function hashCode_28(){
  var keyHash, valueHash;
  keyHash = this.key != null?hashCode__devirtual$(this.key):0;
  valueHash = this.value != null?hashCode__devirtual$(this.value):0;
  return keyHash ^ valueHash;
}
;
_.setValue = function setValue_3(value){
  var old;
  old = this.value;
  this.value = value;
  return old;
}
;
_.toString$ = function toString_34(){
  return this.key + '=' + this.value;
}
;
_.child = null;
_.isRed = false;
_.key = null;
_.value = null;
function TreeMap$State_0(){
}

defineSeed(397, 1, {}, TreeMap$State_0);
_.toString$ = function toString_35(){
  return 'State: mv=' + this.matchValue + ' value=' + this.value + ' done=' + this.done + ' found=' + this.found;
}
;
_.done = false;
_.found = false;
_.matchValue = false;
_.value = null;
function $getFirstSubmapNode(this$static){
  var node;
  this$static.type_0.fromKeyValid()?(node = $getNodeAtOrAfter(this$static.this$0, this$static.fromKey)):(node = $getFirstNode(this$static.this$0));
  return !!node && $inRange_0(this$static, node.key)?node:null;
}

function $inRange_0(this$static, key){
  if (this$static.type_0.toKeyValid()) {
    if ($compare_2(key, this$static.toKey) >= 0) {
      return false;
    }
  }
  if (this$static.type_0.fromKeyValid()) {
    if ($compare_2(key, this$static.fromKey) < 0) {
      return false;
    }
  }
  return true;
}

function TreeMap$SubMap_0(this$0, type, fromKey, toKey){
  this.this$0 = this$0;
  switch (type.ordinal) {
    case 2:
      if ($compare_2(toKey, fromKey) < 0) {
        throw new IllegalArgumentException_1('subMap: ' + toKey + ' less than ' + fromKey);
      }

      break;
    case 1:
      $compare_2(toKey, toKey);
      break;
    case 3:
      $compare_2(fromKey, fromKey);
  }
  this.type_0 = type;
  this.fromKey = fromKey;
  this.toKey = toKey;
}

defineSeed(398, 348, makeCastMap([Q$Map]), TreeMap$SubMap_0);
_.containsKey = function containsKey_4(k_0){
  if (!$inRange_0(this, k_0)) {
    return false;
  }
  return !!$getEntry(this.this$0, k_0);
}
;
_.entrySet_0 = function entrySet_4(){
  return new TreeMap$SubMap$1_0(this);
}
;
_.firstKey = function firstKey_0(){
  var node;
  node = throwNSE($getFirstSubmapNode(this));
  if (this.type_0.toKeyValid() && $compare_2(node.key, this.toKey) > 0) {
    throw new NoSuchElementException_0;
  }
  return node.key;
}
;
_.get = function get_9(k_0){
  if (!$inRange_0(this, k_0)) {
    return null;
  }
  return $get_6(this.this$0, k_0);
}
;
_.isEmpty = function isEmpty_6(){
  return !$getFirstSubmapNode(this);
}
;
_.put = function put_4(key, value){
  if (!$inRange_0(this, key)) {
    throw new IllegalArgumentException_1(key + ' outside the range ' + this.fromKey + ' to ' + this.toKey);
  }
  return $put_1(this.this$0, key, value);
}
;
_.remove_2 = function remove_30(k_0){
  if (!$inRange_0(this, k_0)) {
    return null;
  }
  return $remove_11(this.this$0, k_0);
}
;
_.tailMap = function tailMap_0(fromKey){
  if (this.type_0.fromKeyValid() && $compare_2(fromKey, this.fromKey) < 0) {
    throw new IllegalArgumentException_1('subMap: ' + fromKey + ' less than ' + this.fromKey);
  }
  return this.type_0.toKeyValid()?$subMap(this.this$0, fromKey, this.toKey):$tailMap(this.this$0, fromKey);
}
;
_.fromKey = null;
_.this$0 = null;
_.toKey = null;
_.type_0 = null;
function TreeMap$SubMap$1_0(this$1){
  this.this$1 = this$1;
}

defineSeed(399, 350, makeCastMap([Q$Set]), TreeMap$SubMap$1_0);
_.contains_0 = function contains_8(o){
  var entry, key, lookupEntry;
  if (!instanceOf(o, Q$Map$Entry)) {
    return false;
  }
  entry = dynamicCast(o, Q$Map$Entry);
  key = entry.getKey();
  if (!$inRange_0(this.this$1, key)) {
    return false;
  }
  lookupEntry = $getEntry(this.this$1.this$0, key);
  return !!lookupEntry && equalsWithNullCheck(lookupEntry.value, entry.getValue());
}
;
_.isEmpty = function isEmpty_7(){
  return !$getFirstSubmapNode(this.this$1);
}
;
_.iterator = function iterator_13(){
  return new TreeMap$EntryIterator_1(this.this$1.this$0, this.this$1.type_0, this.this$1.fromKey, this.this$1.toKey);
}
;
_.remove_1 = function remove_31(o){
  var entry, state;
  if (!instanceOf(o, Q$Map$Entry)) {
    return false;
  }
  entry = dynamicCast(o, Q$Map$Entry);
  if (!$inRange_0(this.this$1, entry.getKey())) {
    return false;
  }
  state = new TreeMap$State_0;
  state.matchValue = true;
  state.value = entry.getValue();
  return $removeWithState(this.this$1.this$0, entry.getKey(), state);
}
;
_.size_0 = function size_15(){
  var it, n;
  n = 0;
  it = new TreeMap$EntryIterator_1(this.this$1.this$0, this.this$1.type_0, this.this$1.fromKey, this.this$1.toKey);
  while ($hasNext(it.iter)) {
    it.last = dynamicCast($next_1(it.iter), Q$Map$Entry);
    ++n;
  }
  return n;
}
;
_.this$1 = null;
function $clinit_TreeMap$SubMapType(){
  $clinit_TreeMap$SubMapType = nullMethod;
  All = new TreeMap$SubMapType_0('All', 0);
  Head = new TreeMap$SubMapType$1_0;
  Range_0 = new TreeMap$SubMapType$2_0;
  Tail = new TreeMap$SubMapType$3_0;
  $VALUES_5 = initValues(_3Ljava_util_TreeMap$SubMapType_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$TreeMap$SubMapType, [All, Head, Range_0, Tail]);
}

function TreeMap$SubMapType_0(enum$name, enum$ordinal){
  Enum_0.call(this, enum$name, enum$ordinal);
}

function values_6(){
  $clinit_TreeMap$SubMapType();
  return $VALUES_5;
}

defineSeed(400, 59, makeCastMap([Q$Serializable, Q$Comparable, Q$Enum, Q$TreeMap$SubMapType]), TreeMap$SubMapType_0);
_.fromKeyValid = function fromKeyValid(){
  return false;
}
;
_.toKeyValid = function toKeyValid(){
  return false;
}
;
var $VALUES_5, All, Head, Range_0, Tail;
function TreeMap$SubMapType$1_0(){
  Enum_0.call(this, 'Head', 1);
}

defineSeed(401, 400, makeCastMap([Q$Serializable, Q$Comparable, Q$Enum, Q$TreeMap$SubMapType]), TreeMap$SubMapType$1_0);
_.toKeyValid = function toKeyValid_0(){
  return true;
}
;
function TreeMap$SubMapType$2_0(){
  Enum_0.call(this, 'Range', 2);
}

defineSeed(402, 400, makeCastMap([Q$Serializable, Q$Comparable, Q$Enum, Q$TreeMap$SubMapType]), TreeMap$SubMapType$2_0);
_.fromKeyValid = function fromKeyValid_0(){
  return true;
}
;
_.toKeyValid = function toKeyValid_1(){
  return true;
}
;
function TreeMap$SubMapType$3_0(){
  Enum_0.call(this, 'Tail', 3);
}

defineSeed(403, 400, makeCastMap([Q$Serializable, Q$Comparable, Q$Enum, Q$TreeMap$SubMapType]), TreeMap$SubMapType$3_0);
_.fromKeyValid = function fromKeyValid_1(){
  return true;
}
;
function $add_8(this$static, o){
  return this$static.map.put(o, ($clinit_Boolean() , FALSE_0)) == null;
}

function $contains_1(this$static, o){
  return this$static.map.containsKey(o);
}

function $remove_12(this$static, o){
  return this$static.map.remove_2(o) != null;
}

function $tailSet(this$static, fromElement){
  return new TreeSet_1(this$static.map.tailMap(fromElement));
}

function TreeSet_0(){
  this.map = new TreeMap_0;
}

function TreeSet_1(map){
  this.map = map;
}

defineSeed(404, 350, makeCastMap([Q$Serializable, Q$Set]), TreeSet_0, TreeSet_1);
_.add = function add_10(o){
  return $add_8(this, o);
}
;
_.contains_0 = function contains_9(o){
  return this.map.containsKey(o);
}
;
_.iterator = function iterator_14(){
  return this.map.keySet_0().iterator();
}
;
_.remove_1 = function remove_32(o){
  return $remove_12(this, o);
}
;
_.size_0 = function size_16(){
  return this.map.size_0();
}
;
_.map = null;
function equalsWithNullCheck(a, b){
  return maskUndefined(a) === maskUndefined(b) || a != null && equals__devirtual$(a, b);
}

function $clinit_Level(){
  $clinit_Level = nullMethod;
  ALL = new Level$LevelAll_0;
  CONFIG = new Level$LevelConfig_0;
  FINE = new Level$LevelFine_0;
  FINER = new Level$LevelFiner_0;
  FINEST = new Level$LevelFinest_0;
  INFO = new Level$LevelInfo_0;
  OFF = new Level$LevelOff_0;
  SEVERE = new Level$LevelSevere_0;
  WARNING = new Level$LevelWarning_0;
}

defineSeed(406, 1, makeCastMap([Q$Serializable]));
_.getName = function getName(){
  return 'DUMMY';
}
;
_.intValue = function intValue(){
  return -1;
}
;
_.toString$ = function toString_36(){
  return this.getName();
}
;
var ALL, CONFIG, FINE, FINER, FINEST, INFO, OFF, SEVERE, WARNING;
function Level$LevelAll_0(){
}

defineSeed(407, 406, makeCastMap([Q$Serializable]), Level$LevelAll_0);
_.getName = function getName_0(){
  return 'ALL';
}
;
_.intValue = function intValue_0(){
  return -2147483648;
}
;
function Level$LevelConfig_0(){
}

defineSeed(408, 406, makeCastMap([Q$Serializable]), Level$LevelConfig_0);
_.getName = function getName_1(){
  return 'CONFIG';
}
;
_.intValue = function intValue_1(){
  return 700;
}
;
function Level$LevelFine_0(){
}

defineSeed(409, 406, makeCastMap([Q$Serializable]), Level$LevelFine_0);
_.getName = function getName_2(){
  return 'FINE';
}
;
_.intValue = function intValue_2(){
  return 500;
}
;
function Level$LevelFiner_0(){
}

defineSeed(410, 406, makeCastMap([Q$Serializable]), Level$LevelFiner_0);
_.getName = function getName_3(){
  return 'FINER';
}
;
_.intValue = function intValue_3(){
  return 400;
}
;
function Level$LevelFinest_0(){
}

defineSeed(411, 406, makeCastMap([Q$Serializable]), Level$LevelFinest_0);
_.getName = function getName_4(){
  return 'FINEST';
}
;
_.intValue = function intValue_4(){
  return 300;
}
;
function Level$LevelInfo_0(){
}

defineSeed(412, 406, makeCastMap([Q$Serializable]), Level$LevelInfo_0);
_.getName = function getName_5(){
  return 'INFO';
}
;
_.intValue = function intValue_5(){
  return 800;
}
;
function Level$LevelOff_0(){
}

defineSeed(413, 406, makeCastMap([Q$Serializable]), Level$LevelOff_0);
_.getName = function getName_6(){
  return 'OFF';
}
;
_.intValue = function intValue_6(){
  return 2147483647;
}
;
function Level$LevelSevere_0(){
}

defineSeed(414, 406, makeCastMap([Q$Serializable]), Level$LevelSevere_0);
_.getName = function getName_7(){
  return 'SEVERE';
}
;
_.intValue = function intValue_7(){
  return 1000;
}
;
function Level$LevelWarning_0(){
}

defineSeed(415, 406, makeCastMap([Q$Serializable]), Level$LevelWarning_0);
_.getName = function getName_8(){
  return 'WARNING';
}
;
_.intValue = function intValue_8(){
  return 900;
}
;
function $addLogger(this$static, logger){
  if ($getLogger(this$static, logger.impl.name_0)) {
    return false;
  }
  $addLoggerWithoutDuplicationChecking(this$static, logger);
  return true;
}

function $addLoggerWithoutDuplicationChecking(this$static, logger){
  var name_0, parent_0, parentName;
  name_0 = logger.impl.name_0;
  parentName = $substring_0(name_0, 0, max(0, $lastIndexOf(name_0, fromCodePoint(46))));
  parent_0 = $getOrAddLogger(this$static, parentName);
  this$static.loggerList.put(logger.impl.name_0, logger);
  $setParent_0(logger.impl, parent_0);
}

function $getLogger(this$static, name_0){
  return dynamicCast(this$static.loggerList.get(name_0), Q$Logger);
}

function $getOrAddLogger(this$static, name_0){
  var logger, newLogger;
  logger = dynamicCast(this$static.loggerList.get(name_0), Q$Logger);
  if (!logger) {
    newLogger = new Logger_0(name_0);
    $addLoggerWithoutDuplicationChecking(this$static, newLogger);
    return newLogger;
  }
  return logger;
}

function LogManager_0(){
  this.loggerList = new HashMap_0;
  this.rootLogger = new LogManager$RootLogger_0;
  this.loggerList.put('', this.rootLogger);
}

defineSeed(416, 1, {}, LogManager_0);
_.loggerList = null;
_.rootLogger = null;
var singleton_0 = null;
function LogManager$RootLogger_0(){
  $clinit_Logger();
  Logger_0.call(this, '');
  $setLevel_1(this, ($clinit_Level() , ALL));
}

defineSeed(417, 182, makeCastMap([Q$Logger]), LogManager$RootLogger_0);
function $setLoggerName(this$static, newName){
  this$static.loggerName = newName;
}

function LogRecord_0(level, msg){
  this.level = level;
  this.msg_0 = msg;
  this.millis = fromDouble((new Date_1).jsdate.getTime());
}

defineSeed(418, 1, makeCastMap([Q$Serializable]), LogRecord_0);
_.level = null;
_.loggerName = '';
_.millis = P0_longLit;
_.msg_0 = null;
_.thrown = null;
function $consoleLog(msg){
  window.console?window.console.log(msg):(document.title = 'LOG:' + msg);
}

function $println(this$static, s){
  $append_5(this$static.buf, s);
  $consoleLog($toString_1(this$static.buf));
  $setLength(this$static.buf);
}

function ConsolePrintStream_0(){
  this.buf = new StringBuilder_0;
}

defineSeed(419, 316, {}, ConsolePrintStream_0);
_.print_0 = function print_1(c){
  c == 10?$println(this, ''):$append_3(this.buf, c);
}
;
_.println = function println_0(s){
  $println(this, s);
}
;
function $clinit_ScrambleJsEntryPoint(){
  $clinit_ScrambleJsEntryPoint = nullMethod;
  resources = new HashMap_0;
}

function $onLoadImpl(){
  var scramblers = '%%PUZZLES%%';
  var puzzles = {};
  var lines = scramblers.split('\n');
  var lastComment = null;
  for (var i_0 = 0; i_0 < lines.length; i_0++) {
    var line = lines[i_0].trim();
    if (line.length == 0) {
      lastComment = null;
      continue;
    }
    if (line[0] == '#') {
      lastComment = line.substring(1);
      continue;
    }
    var name_def = line.match(/([^\s]*)(.*)/);
    var name_0 = name_def[1];
    var definition = name_def[2];
    puzzles[name_0] = eval('new ' + definition);
  }
  $wnd.puzzlesLoaded && typeof $wnd.puzzlesLoaded == 'function' && $wnd.puzzlesLoaded(puzzles);
}

function $onModuleLoad_2(){
  var cps;
  sUncaughtExceptionHandler = null;
  $clinit_ExporterUtil();
  new Puzzle_ExporterImpl_0;
  new CubePuzzle_ExporterImpl_0;
  new TNoodleJsUtils_ExporterImpl_0;
  new ClockPuzzle_ExporterImpl_0;
  new FourByFourCubePuzzle_ExporterImpl_0;
  new FourByFourRandomTurnsCubePuzzle_ExporterImpl_0;
  new MegaminxPuzzle_ExporterImpl_0;
  new NoInspectionFiveByFiveCubePuzzle_ExporterImpl_0;
  new NoInspectionFourByFourCubePuzzle_ExporterImpl_0;
  new NoInspectionThreeByThreeCubePuzzle_ExporterImpl_0;
  new PyraminxPuzzle_ExporterImpl_0;
  new SkewbPuzzle_ExporterImpl_0;
  new SquareOnePuzzle_ExporterImpl_0;
  new SquareOneUnfilteredPuzzle_ExporterImpl_0;
  new ThreeByThreeCubeFewestMovesPuzzle_ExporterImpl_0;
  new ThreeByThreeCubePuzzle_ExporterImpl_0;
  new TwoByTwoCubePuzzle_ExporterImpl_0;
  $onLoadImpl();
  cps = new ConsolePrintStream_0;
  $clinit_System();
  out_0 = cps;
  err = cps;
}

var resources;
function getLogLevel(){
  var level;
  return level = ($clinit_Logger() , $getLoggerHelper('')).impl.level , !level?null:level.getName();
}

function getLogLevel_0(loggerStr){
  var level;
  level = ($clinit_Logger() , $getLoggerHelper(loggerStr)).impl.level;
  return !level?null:level.getName();
}

function getPuzzleIcon(puzzle){
  var filename, image;
  filename = 'net.gnehzr.tnoodle.puzzle/' + puzzle.getShortName_0() + '.png';
  if (($clinit_ScrambleJsEntryPoint() , resources).containsKey(filename)) {
    image = new Image_1;
    $setUrl(image, ($clinit_UriUtils() , new SafeUriString_0('data:image/png;base64,' + dynamicCast(resources.get(filename), Q$String))));
    return image.element;
  }
  return null;
}

function getPuzzleImageInfo(puzzle){
  var jso, pii;
  pii = $toJsonable(new PuzzleImageInfo_0(puzzle));
  jso = dynamicCast(toJSONValue(pii), Q$JSONObject);
  return jso.jsObject;
}

function scrambleToSvg(scramble, puzzle, scheme){
  var colorScheme, svg;
  colorScheme = $parseColorScheme(puzzle, scheme);
  svg = $drawScramble(puzzle, scramble, colorScheme);
  return $toString_5(svg);
}

function setLogLevel(levelStr){
  var level, logger;
  level = ($clinit_Level() , $parse(levelStr));
  azzert_1(!!level);
  logger = ($clinit_Logger() , $getLoggerHelper(''));
  $setLevel_0(logger.impl, level);
}

function setLogLevel_0(levelStr, loggerStr){
  var level, logger;
  level = ($clinit_Level() , $parse(levelStr));
  azzert_1(!!level);
  logger = ($clinit_Logger() , $getLoggerHelper(loggerStr));
  $setLevel_0(logger.impl, level);
}

function toJSONValue(obj){
  var arr, i_0, jsonArr, jsonObj, key, key$iterator, map;
  if (instanceOf(obj, Q$HashMap)) {
    map = dynamicCast(obj, Q$HashMap);
    jsonObj = new JSONObject_0;
    for (key$iterator = $iterator($keySet(map)); key$iterator.val$outerIter.hasNext();) {
      key = dynamicCast($next_2(key$iterator), Q$String);
      $put(jsonObj, key, toJSONValue(map.get(key)));
    }
    return jsonObj;
  }
   else if (instanceOf(obj, Q$String)) {
    return new JSONString_0(dynamicCast(obj, Q$String));
  }
   else if (instanceOf(obj, Q$Integer)) {
    return new JSONNumber_0(dynamicCast(obj, Q$Integer).value);
  }
   else if (instanceOf(obj, Q$double_$1)) {
    jsonArr = new JSONArray_0;
    arr = dynamicCast(obj, Q$double_$1);
    for (i_0 = 0; i_0 < arr.length; ++i_0) {
      $set(jsonArr, i_0, new JSONNumber_0(arr[i_0]));
    }
    return jsonArr;
  }
   else if (instanceOf(obj, Q$Object_$1)) {
    jsonArr = new JSONArray_0;
    arr = dynamicCast(obj, Q$Object_$1);
    for (i_0 = 0; i_0 < arr.length; ++i_0) {
      $set(jsonArr, i_0, toJSONValue(arr[i_0]));
    }
    return jsonArr;
  }
   else {
    azzert_2(false, 'Unrecognized type ' + getClass__devirtual$(obj));
    return null;
  }
}

function $export(this$static){
  if (!exported) {
    exported = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_js_TNoodleJsUtils_2_classLit, this$static);
    new Puzzle_ExporterImpl_0;
    $export0(this$static);
  }
}

function $export0(this$static){
  var pkg = declarePackage('tnoodlejs');
  var __0, __ = this$static;
  $wnd.tnoodlejs = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0]) && (g = a[0]);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.tnoodlejs.prototype = new Object;
  $wnd.tnoodlejs.getLogLevel = $entry(function(a0){
    return runDispatch(null, Lnet_gnehzr_tnoodle_js_TNoodleJsUtils_2_classLit, 1, arguments, true, false)[0];
  }
  );
  $wnd.tnoodlejs.getPuzzleIcon = $entry(function(a0){
    return getPuzzleIcon(gwtInstance(a0));
  }
  );
  $wnd.tnoodlejs.getPuzzleImageInfo = $entry(function(a0){
    return getPuzzleImageInfo(gwtInstance(a0));
  }
  );
  $wnd.tnoodlejs.getVersion = $entry(function(){
    return '%%VERSION%%';
  }
  );
  $wnd.tnoodlejs.scrambleToSvg = $entry(function(a0, a1, a2){
    return scrambleToSvg(a0, gwtInstance(a1), a2);
  }
  );
  $wnd.tnoodlejs.setLogLevel = $entry(function(a0, a1){
    runDispatch(null, Lnet_gnehzr_tnoodle_js_TNoodleJsUtils_2_classLit, 0, arguments, true, false)[0];
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_js_TNoodleJsUtils_2_classLit, {0:{1:[[setLogLevel, null, undefined, 'string']], 2:[[setLogLevel_0, null, undefined, 'string', 'string']]}, 1:{0:[[getLogLevel, null, undefined]], 1:[[getLogLevel_0, null, undefined, 'string']]}}, true);
  if (pkg)
    for (p in pkg)
      $wnd.tnoodlejs[p] === undefined && ($wnd.tnoodlejs[p] = pkg[p]);
}

function TNoodleJsUtils_ExporterImpl_0(){
  $export(this);
}

defineSeed(422, 1, {}, TNoodleJsUtils_ExporterImpl_0);
_.isAssignable = function isAssignable(o){
  return false;
}
;
var exported = false;
function $clinit_Puzzle(){
  $clinit_Puzzle = nullMethod;
  l_1 = ($clinit_Logger() , $getLoggerHelper(Lnet_gnehzr_tnoodle_scrambles_Puzzle_2_classLit.typeName));
}

function $drawScramble(this$static, scramble, colorScheme){
  var children, colorSchemeCopy, g, state, svg;
  scramble == null && (scramble = '');
  colorSchemeCopy = colorScheme;
  colorScheme = this$static.getDefaultColorScheme_0();
  !!colorSchemeCopy && $putAll(colorScheme, colorSchemeCopy);
  state = this$static.getSolvedState_0();
  state = $applyAlgorithm(state, scramble);
  svg = state.drawScramble(colorScheme);
  g = new Group_0;
  children = svg.children;
  while (children.size != 0) {
    $appendChild_0(g, dynamicCast($remove_5(children, 0), Q$Element));
  }
  $concatenate(g.transform, new Transform_1(1, 0, 0, 1, 0.5, 0.5));
  $add_6(svg.children, g);
  return svg;
}

function $generateRandomMoves(this$static, r){
  var ab, e, move, successors;
  ab = new AlgorithmBuilder_0(this$static, 0);
  while (ab.totalCost < this$static.getRandomMoveCount()) {
    successors = (azzert_1(ab.states.size == ab.moves.size + 1) , dynamicCast($get_4(ab.states, ab.states.size - 1), Q$Puzzle$PuzzleState)).getScrambleSuccessors();
    try {
      do {
        move = dynamicCast(choose(r, $keySet(successors)), Q$String);
        successors.remove_2(move);
      }
       while ($isRedundant(ab, move));
      $appendMove(ab, move);
    }
     catch ($e0) {
      $e0 = caught_0($e0);
      if (instanceOf($e0, Q$InvalidMoveException)) {
        e = $e0;
        $log_1(l_1, ($clinit_Level() , SEVERE), '', e);
        azzert_3(false, e);
        return null;
      }
       else 
        throw $e0;
    }
  }
  return new PuzzleStateAndGenerator_0((azzert_1(ab.states.size == ab.moves.size + 1) , dynamicCast($get_4(ab.states, ab.states.size - 1), Q$Puzzle$PuzzleState)), join(ab.moves, ' '));
}

function $generateScrambles(this$static, r, count){
  var i_0, scrambles;
  scrambles = initDim(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, count, 0);
  for (i_0 = 0; i_0 < count; ++i_0) {
    scrambles[i_0] = $generateWcaScramble(this$static, r);
  }
  return scrambles;
}

function $generateSeededScramble(this$static, seed){
  var r;
  r = ($clinit_Random() , new SecureRandom_0);
  $setSeed_0(r, seed);
  return $generateWcaScramble(this$static, r);
}

function $generateSeededScrambles(this$static, seed, count){
  var r;
  r = ($clinit_Random() , new SecureRandom_0);
  $setSeed_0(r, seed);
  return $generateScrambles(this$static, r, count);
}

function $generateWcaScramble(this$static, r){
  var psag;
  do {
    psag = this$static.generateRandomMoves_0(r);
  }
   while (psag.state.solveIn_1(this$static.wcaMinScrambleDistance - 1) != null);
  return psag.generator;
}

function $getFaceNames(this$static){
  var faces, x;
  faces = new ArrayList_2($keySet(this$static.getDefaultColorScheme_0()));
  $clinit_Collections();
  x = cloneSubrange(faces.array, 0, faces.size);
  mergeSort(x, 0, x.length, ($clinit_Comparators() , $clinit_Comparators() , NATURAL));
  replaceContents(faces, x);
  return dynamicCast($toArray_0(faces, initDim(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, faces.size, 0)), Q$String_$1);
}

function $parseColorScheme(this$static, scheme){
  var c, colorScheme, colors, cols, faces, i_0;
  colorScheme = this$static.getDefaultColorScheme_0();
  if (scheme != null && !!scheme.length) {
    faces = $getFaceNames(this$static);
    if ($indexOf_0(scheme, fromCodePoint(44)) > 0) {
      colors = $split(scheme, ',', 0);
    }
     else {
      cols = $toCharArray(scheme);
      colors = initDim(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, cols.length, 0);
      for (i_0 = 0; i_0 < cols.length; ++i_0) {
        colors[i_0] = String.fromCharCode(cols[i_0]) + '';
      }
    }
    if (colors.length != faces.length) {
      return null;
    }
    for (i_0 = 0; i_0 < colors.length; ++i_0) {
      try {
        c = new Color_2(colors[i_0]);
        colorScheme.put(faces[i_0], c);
      }
       catch ($e0) {
        $e0 = caught_0($e0);
        if (instanceOf($e0, Q$InvalidHexColorException)) {
          return null;
        }
         else 
          throw $e0;
      }
    }
  }
  return colorScheme;
}

function Puzzle_0(){
  $clinit_Puzzle();
  this.r = ($clinit_Random() , new SecureRandom_0);
}

defineSeed(424, 1, makeCastMap([Q$Puzzle, Q$Exportable]));
_.generateRandomMoves_0 = function generateRandomMoves(r){
  return $generateRandomMoves(this, r);
}
;
_.generateScramble_0 = function generateScramble(){
  return $generateWcaScramble(this, this.r);
}
;
_.generateScrambles_0 = function generateScrambles(count){
  return $generateScrambles(this, this.r, count);
}
;
_.generateSeededScramble_0 = function generateSeededScramble(seed){
  return $generateSeededScramble(this, getBytesUtf8(seed));
}
;
_.generateSeededScrambles_0 = function generateSeededScrambles(seed, count){
  return $generateSeededScrambles(this, getBytesUtf8(seed), count);
}
;
_.getFaceNames_0 = function getFaceNames(){
  return $getFaceNames(this);
}
;
_.getPreferredSize_1 = function getPreferredSize(maxWidth, maxHeight){
  var ratio, resultHeight, resultWidth;
  if (maxWidth == 0 && maxHeight == 0) {
    return this.getPreferredSize_0();
  }
  maxWidth == 0?(maxWidth = 2147483647):maxHeight == 0 && (maxHeight = 2147483647);
  ratio = this.getPreferredSize_0().width_0 / this.getPreferredSize_0().height_0;
  resultWidth = min(maxWidth, ($clinit_GwtSafeUtils() , round_int(Math.ceil(maxHeight * ratio))));
  resultHeight = min(maxHeight, round_int(Math.ceil(maxWidth / ratio)));
  return new Dimension_0(resultWidth, resultHeight);
}
;
_.solveIn_0 = function solveIn(ps, n){
  var bestIntersection, bestIntersectionCost, bestPossibleSolution, cost, distance, distanceFromScrambled, distanceFromSolved, e, extendSolved, fringeExtending, fringeScrambled, fringeSolved, fringeTies, linkedStates, minComparingFringe, minFringeScrambled, minFringeSolved, moveCost, moveName, movesByState, newDistanceFromScrambled, newDistanceFromSolved, next, next$iterator, nextDistance, nextState, nextStateNormalized, node, seenComparing, seenExtending, seenScrambled, seenSolved, solution, solvedNormalized, start, state, bucket, h_0;
  if ($equalsNormalized(ps, ps.this$0_0.getSolvedState_0())) {
    return '';
  }
  seenSolved = new HashMap_0;
  fringeSolved = new Puzzle$SortedBuckets_0;
  seenScrambled = new HashMap_0;
  fringeScrambled = new Puzzle$SortedBuckets_0;
  bestIntersectionCost = n + 1;
  bestIntersection = null;
  solvedNormalized = this.getSolvedState_0().getNormalized();
  $add_9(fringeSolved, solvedNormalized, 0);
  seenSolved.put(solvedNormalized, valueOf_0(0));
  $add_9(fringeScrambled, ps.getNormalized(), 0);
  seenScrambled.put(ps.getNormalized(), valueOf_0(0));
  start = new TimedLogRecordStart_0(($clinit_Level() , FINER), 'Searching for solution in ' + n + ' moves.');
  $log_2(l_1, start);
  fringeTies = 0;
  minFringeScrambled = -1;
  minFringeSolved = -1;
  while (fringeSolved.buckets.map.size_0() != 0 || fringeScrambled.buckets.map.size_0() != 0) {
    fringeScrambled.buckets.map.size_0() == 0 || (minFringeScrambled = dynamicCast(fringeScrambled.buckets.map.firstKey(), Q$Puzzle$Bucket).value);
    fringeSolved.buckets.map.size_0() == 0 || (minFringeSolved = dynamicCast(fringeSolved.buckets.map.firstKey(), Q$Puzzle$Bucket).value);
    fringeSolved.buckets.map.size_0() == 0 || fringeScrambled.buckets.map.size_0() == 0?(extendSolved = fringeSolved.buckets.map.size_0() != 0):minFringeSolved < minFringeScrambled?(extendSolved = true):minFringeSolved > minFringeScrambled?(extendSolved = false):(extendSolved = fringeTies++ % 2 == 0);
    if (extendSolved) {
      seenExtending = seenSolved;
      fringeExtending = fringeSolved;
      seenComparing = seenScrambled;
      minComparingFringe = minFringeScrambled;
    }
     else {
      seenExtending = seenScrambled;
      fringeExtending = fringeScrambled;
      seenComparing = seenSolved;
      minComparingFringe = minFringeSolved;
    }
    node = dynamicCast((bucket = dynamicCast(fringeExtending.buckets.map.firstKey(), Q$Puzzle$Bucket) , h_0 = $removeLast(bucket.contents) , bucket.contents.size == 0 && $remove_12(fringeExtending.buckets, bucket) , h_0), Q$Puzzle$PuzzleState);
    distance = dynamicCast(seenExtending.get(node), Q$Integer).value;
    if (seenComparing.containsKey(node)) {
      cost = dynamicCast(seenComparing.get(node), Q$Integer).value + distance;
      if (cost < bestIntersectionCost) {
        bestIntersection = node;
        bestIntersectionCost = cost;
      }
      continue;
    }
    bestPossibleSolution = distance + minComparingFringe;
    if (bestPossibleSolution >= bestIntersectionCost) {
      continue;
    }
    if (distance >= ~~((n + 1) / 2)) {
      continue;
    }
    movesByState = node.getCanonicalMovesByState();
    for (next$iterator = $iterator($keySet(movesByState)); next$iterator.val$outerIter.hasNext();) {
      next = dynamicCast($next_2(next$iterator), Q$Puzzle$PuzzleState);
      moveCost = node.getMoveCost(dynamicCast(movesByState.get(next), Q$String));
      nextDistance = distance + moveCost;
      next = next.getNormalized();
      if (seenExtending.containsKey(next)) {
        if (nextDistance >= dynamicCast(seenExtending.get(next), Q$Integer).value) {
          continue;
        }
      }
      $add_9(fringeExtending, next, nextDistance);
      seenExtending.put(next, valueOf_0(nextDistance));
    }
  }
  $log_2(l_1, $finishedNow(start, 'expanded ' + (seenSolved.size_0() + seenScrambled.size_0()) + ' nodes'));
  if (!bestIntersection) {
    return null;
  }
  azzert_1(bestIntersection.isNormalized());
  state = bestIntersection;
  distanceFromScrambled = dynamicCast(seenScrambled.get(bestIntersection), Q$Integer).value;
  linkedStates = initDim(_3Lnet_gnehzr_tnoodle_scrambles_Puzzle$PuzzleState_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Puzzle$PuzzleState, distanceFromScrambled + 1, 0);
  setCheck(linkedStates, distanceFromScrambled, bestIntersection);
  outer_0: while (distanceFromScrambled > 0) {
    for (next$iterator = $iterator($keySet(state.getCanonicalMovesByState())); next$iterator.val$outerIter.hasNext();) {
      next = dynamicCast($next_2(next$iterator), Q$Puzzle$PuzzleState);
      next = next.getNormalized();
      if (seenScrambled.containsKey(next)) {
        newDistanceFromScrambled = dynamicCast(seenScrambled.get(next), Q$Integer).value;
        if (newDistanceFromScrambled < distanceFromScrambled) {
          state = next;
          distanceFromScrambled = newDistanceFromScrambled;
          setCheck(linkedStates, newDistanceFromScrambled, next);
          continue outer_0;
        }
      }
    }
    azzert_1(false);
  }
  solution = new AlgorithmBuilder_1(1, ps);
  state = ps;
  distanceFromScrambled = 0;
  outer_0: while (!state.getNormalized().equals$(bestIntersection.getNormalized())) {
    for (next$iterator = state.getCanonicalMovesByState().entrySet_0().iterator(); next$iterator.hasNext();) {
      next = dynamicCast(next$iterator.next_0(), Q$Map$Entry);
      nextState = dynamicCast(next.getKey(), Q$Puzzle$PuzzleState);
      moveName = dynamicCast(next.getValue(), Q$String);
      if (nextState.getNormalized().equals$(linkedStates[distanceFromScrambled + 1].getNormalized())) {
        state = nextState;
        try {
          $appendMove(solution, moveName);
        }
         catch ($e0) {
          $e0 = caught_0($e0);
          if (instanceOf($e0, Q$InvalidMoveException)) {
            e = $e0;
            azzert_3(false, e);
          }
           else 
            throw $e0;
        }
        distanceFromScrambled = dynamicCast(seenScrambled.get(nextState.getNormalized()), Q$Integer).value;
        continue outer_0;
      }
    }
    azzert_1(false);
  }
  distanceFromSolved = dynamicCast(seenSolved.get(state.getNormalized()), Q$Integer).value;
  outer_0: while (distanceFromSolved > 0) {
    for (next$iterator = state.getCanonicalMovesByState().entrySet_0().iterator(); next$iterator.hasNext();) {
      next = dynamicCast(next$iterator.next_0(), Q$Map$Entry);
      nextState = dynamicCast(next.getKey(), Q$Puzzle$PuzzleState);
      nextStateNormalized = nextState.getNormalized();
      moveName = dynamicCast(next.getValue(), Q$String);
      if (seenSolved.containsKey(nextStateNormalized)) {
        newDistanceFromSolved = dynamicCast(seenSolved.get(nextStateNormalized), Q$Integer).value;
        if (newDistanceFromSolved < distanceFromSolved) {
          state = nextState;
          distanceFromSolved = newDistanceFromSolved;
          try {
            $appendMove(solution, moveName);
          }
           catch ($e0) {
            $e0 = caught_0($e0);
            if (instanceOf($e0, Q$InvalidMoveException)) {
              e = $e0;
              azzert_3(false, e);
            }
             else 
              throw $e0;
          }
          continue outer_0;
        }
      }
    }
    azzert_1(false);
  }
  return join(solution.moves, ' ');
}
;
_.toString$ = function toString_37(){
  return this.getLongName_0();
}
;
_.wcaMinScrambleDistance = 2;
var l_1;
function $clinit_ClockPuzzle(){
  $clinit_ClockPuzzle = nullMethod;
  $clinit_Puzzle();
  $clinit_Logger();
  $getLoggerHelper(Lnet_gnehzr_tnoodle_puzzle_ClockPuzzle_2_classLit.typeName);
  turns = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ['UR', 'DR', 'DL', 'UL', 'U', 'R', 'D', 'L', 'ALL']);
  arrowAngle = 1.5707963267948966 - Math.acos(0.2);
  moves_0 = initValues(_3_3I_classLit, makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), Q$int_$1, [initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 1, 1, 0, 1, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, -1, 0, 0]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [1, 1, 1, 1, 1, 1, 0, 0, 0, -1, 0, -1, 0, 0, 0, 0, 0, 0]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 1, 1, 0, 1, 1, 0, 1, 1, -1, 0, 0, 0, 0, 0, -1, 0, 0]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, -1, 0, -1]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 0, -1, 0, 0, 0, -1, 0, -1])]);
  defaultColorScheme = new HashMap_0;
  defaultColorScheme.put('Front', new Color_0(3372466));
  defaultColorScheme.put('Back', new Color_0(5623039));
  defaultColorScheme.put('FrontClock', new Color_0(5623039));
  defaultColorScheme.put('BackClock', new Color_0(3372466));
  defaultColorScheme.put('Hand', ($clinit_Color() , YELLOW));
  defaultColorScheme.put('HandBorder', RED);
  defaultColorScheme.put('PinUp', YELLOW);
  defaultColorScheme.put('PinDown', new Color_0(8934656));
}

function ClockPuzzle_0(){
  $clinit_ClockPuzzle();
  Puzzle_0.call(this);
}

defineSeed(423, 424, makeCastMap([Q$ClockPuzzle, Q$Puzzle, Q$Exportable]), ClockPuzzle_0);
_.generateRandomMoves_0 = function generateRandomMoves_0(r){
  var clockwise, e, isFirst, scramble, scrambleStr, state, turn, x;
  scramble = new StringBuilder_0;
  for (x = 0; x < 9; ++x) {
    turn = $nextInt(r, 12) - 5;
    clockwise = turn >= 0;
    turn = turn < 0?-turn:turn;
    $append_5(scramble, turns[x] + turn + (clockwise?'+':'-') + ' ');
  }
  scramble.impl.append_2(scramble.data, 'y2 ');
  for (x = 4; x < 9; ++x) {
    turn = $nextInt(r, 12) - 5;
    clockwise = turn >= 0;
    turn = turn < 0?-turn:turn;
    $append_5(scramble, turns[x] + turn + (clockwise?'+':'-') + ' ');
  }
  isFirst = true;
  for (x = 0; x < 4; ++x) {
    if ($nextInt(r, 2) == 1) {
      $append_5(scramble, (isFirst?'':' ') + turns[x]);
      isFirst = false;
    }
  }
  scrambleStr = $trim(scramble.impl.toString_0(scramble.data));
  state = new ClockPuzzle$ClockState_0(this);
  try {
    state = $applyAlgorithm(state, scrambleStr);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$InvalidScrambleException)) {
      e = $e0;
      azzert_3(false, e);
      return null;
    }
     else 
      throw $e0;
  }
  return new PuzzleStateAndGenerator_0(state, scrambleStr);
}
;
_.getDefaultColorScheme_0 = function getDefaultColorScheme(){
  return new HashMap_1(defaultColorScheme);
}
;
_.getLongName_0 = function getLongName(){
  return 'Clock';
}
;
_.getPreferredSize_0 = function getPreferredSize_0(){
  return new Dimension_0(300, 150);
}
;
_.getRandomMoveCount = function getRandomMoveCount(){
  return 19;
}
;
_.getShortName_0 = function getShortName(){
  return 'clock';
}
;
_.getSolvedState_0 = function getSolvedState(){
  return new ClockPuzzle$ClockState_0(this);
}
;
var arrowAngle, defaultColorScheme, moves_0, turns;
function $apply(this$static, move){
  var successors;
  successors = this$static.getSuccessorsByName();
  if (!successors.map.containsKey(move)) {
    throw new InvalidMoveException_0('Unrecognized turn ' + move);
  }
  return dynamicCast($get_5(successors, move), Q$Puzzle$PuzzleState);
}

function $applyAlgorithm(this$static, algorithm){
  var e, move, move$array, move$index, move$max, state;
  state = this$static;
  for (move$array = splitAlgorithm(algorithm) , move$index = 0 , move$max = move$array.length; move$index < move$max; ++move$index) {
    move = move$array[move$index];
    try {
      state = $apply(state, move);
    }
     catch ($e0) {
      $e0 = caught_0($e0);
      if (instanceOf($e0, Q$InvalidMoveException)) {
        e = $e0;
        throw new InvalidScrambleException_0(algorithm, e);
      }
       else 
        throw $e0;
    }
  }
  return state;
}

function $equalsNormalized(this$static, other){
  return this$static.getNormalized().equals$(other.getNormalized());
}

function $movesCommute(this$static, move1, move2){
  var state1, state2;
  try {
    state1 = $apply($apply(this$static, move1), move2);
    state2 = $apply($apply(this$static, move2), move1);
    return state1.equals$(state2);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$InvalidMoveException)) {
      return false;
    }
     else 
      throw $e0;
  }
}

defineSeed(426, 1, makeCastMap([Q$Puzzle$PuzzleState]));
_.getCanonicalMovesByState = function getCanonicalMovesByState(){
  var moveName, next, next$iterator, nextState, nextStateNormalized, statesSeenNormalized, successorsByName, uniqueSuccessors;
  successorsByName = this.getSuccessorsByName();
  uniqueSuccessors = new HashMap_0;
  statesSeenNormalized = new HashSet_0;
  $add_7(statesSeenNormalized, this.getNormalized());
  for (next$iterator = new LinkedHashMap$EntrySet$EntryIterator_0(new LinkedHashMap$EntrySet_0(successorsByName)); next$iterator.next != next$iterator.this$1.this$0.head;) {
    next = $next_3(next$iterator);
    nextState = dynamicCast(next.value, Q$Puzzle$PuzzleState);
    nextStateNormalized = nextState.getNormalized();
    moveName = dynamicCast(next.key, Q$String);
    if (!statesSeenNormalized.map.containsKey(nextStateNormalized)) {
      uniqueSuccessors.put(nextState, moveName);
      $add_7(statesSeenNormalized, nextStateNormalized);
    }
  }
  return uniqueSuccessors;
}
;
_.getMoveCost = function getMoveCost(move){
  return 1;
}
;
_.getNormalized = function getNormalized(){
  return this;
}
;
_.getScrambleSuccessors = function getScrambleSuccessors(){
  return reverseHashMap(this.getCanonicalMovesByState());
}
;
_.isNormalized = function isNormalized(){
  return this.equals$(this.getNormalized());
}
;
_.solveIn_1 = function solveIn_0(n){
  return this.this$0_0.solveIn_0(this, n);
}
;
_.this$0_0 = null;
function $drawBackground(this$static, g, colorScheme){
  var c, centerX, centerX$array, centerX$index, centerX$max, centerY, centerY$array, centerY$index, centerY$max, clockFace, colorString, i_0, j, k_0, outerCircle, s, t, tCopy, tickMark;
  this$static.rightSideUp?(colorString = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ['Front', 'Back'])):(colorString = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ['Back', 'Front']));
  for (s = 0; s < 2; ++s) {
    t = new Transform_1(1, 0, 0, 1, (s * 2 + 1) * 75, 75);
    for (centerX$array = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [-40, 40]) , centerX$index = 0 , centerX$max = centerX$array.length; centerX$index < centerX$max; ++centerX$index) {
      centerX = centerX$array[centerX$index];
      for (centerY$array = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [-40, 40]) , centerY$index = 0 , centerY$max = centerY$array.length; centerY$index < centerY$max; ++centerY$index) {
        centerY = centerY$array[centerY$index];
        c = new Circle_0(centerX, centerY, 20);
        !t?$setToIdentity(c.transform):$setTransform(c.transform, t);
        $setStroke_0(c, ($clinit_Color() , BLACK));
        $add_6(g.children, c);
      }
    }
    outerCircle = new Circle_0(0, 0, 70);
    !t?$setToIdentity(outerCircle.transform):$setTransform(outerCircle.transform, t);
    $setStroke_0(outerCircle, ($clinit_Color() , BLACK));
    $setFill(outerCircle, dynamicCast(colorScheme.get(colorString[s]), Q$Color));
    $add_6(g.children, outerCircle);
    for (centerX$array = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [-40, 40]) , centerX$index = 0 , centerX$max = centerX$array.length; centerX$index < centerX$max; ++centerX$index) {
      centerX = centerX$array[centerX$index];
      for (centerY$array = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [-40, 40]) , centerY$index = 0 , centerY$max = centerY$array.length; centerY$index < centerY$max; ++centerY$index) {
        centerY = centerY$array[centerY$index];
        c = new Circle_0(centerX, centerY, 19);
        !t?$setToIdentity(c.transform):$setTransform(c.transform, t);
        $setFill(c, dynamicCast(colorScheme.get(colorString[s]), Q$Color));
        $add_6(g.children, c);
      }
    }
    for (i_0 = -1; i_0 <= 1; ++i_0) {
      for (j = -1; j <= 1; ++j) {
        tCopy = new Transform_2(t);
        $concatenate(tCopy, new Transform_1(1, 0, 0, 1, 2 * i_0 * 20, 2 * j * 20));
        clockFace = new Circle_0(0, 0, 14);
        $setStroke_0(clockFace, BLACK);
        $setFill(clockFace, dynamicCast(colorScheme.get(colorString[s] + 'Clock'), Q$Color));
        !tCopy?$setToIdentity(clockFace.transform):$setTransform(clockFace.transform, tCopy);
        $add_6(g.children, clockFace);
        for (k_0 = 0; k_0 < 12; ++k_0) {
          tickMark = new Circle_0(0, -17, 1);
          $setFill(tickMark, dynamicCast(colorScheme.get(colorString[s] + 'Clock'), Q$Color));
          $concatenate(tickMark.transform, getRotateInstance(30 * k_0 * 0.017453292519943295));
          $concatenate(tickMark.transform, tCopy);
          $add_6(g.children, tickMark);
        }
      }
    }
  }
}

function $drawClock(g, clock, position, colorScheme){
  var arrow, deltaX, deltaY, handBase, netX, netY, t;
  t = new Transform_0;
  $concatenate(t, getRotateInstance(position * 30 * 0.017453292519943295));
  netX = 0;
  netY = 0;
  if (clock < 9) {
    $concatenate(t, new Transform_1(1, 0, 0, 1, 75, 75));
    netX += 75;
    netY += 75;
  }
   else {
    $concatenate(t, new Transform_1(1, 0, 0, 1, 225, 75));
    netX += 225;
    netY += 75;
    clock -= 9;
  }
  deltaX = 2 * (clock % 3 - 1) * 20;
  deltaY = 2 * (~~(clock / 3) - 1) * 20;
  $concatenate(t, new Transform_1(1, 0, 0, 1, deltaX, deltaY));
  netX += deltaX;
  netY += deltaY;
  arrow = new Path_0;
  $moveTo(arrow, 0, 0);
  $lineTo(arrow, 2 * cos_0(($clinit_ClockPuzzle() , arrowAngle)), -2 * sin_0(arrowAngle));
  $lineTo(arrow, 0, -10);
  $lineTo(arrow, -2 * cos_0(arrowAngle), -2 * sin_0(arrowAngle));
  azzert_0(!!arrow.commands);
  $add_6(arrow.commands, new Path$Command_0(4, null));
  $setStroke_0(arrow, dynamicCast(colorScheme.get('HandBorder'), Q$Color));
  !t?$setToIdentity(arrow.transform):$setTransform(arrow.transform, t);
  $add_6(g.children, arrow);
  handBase = new Circle_0(0, 0, 2);
  $setStroke_0(handBase, dynamicCast(colorScheme.get('HandBorder'), Q$Color));
  !t?$setToIdentity(handBase.transform):$setTransform(handBase.transform, t);
  $add_6(g.children, handBase);
  arrow = new Path_1(arrow);
  $setFill(arrow, dynamicCast(colorScheme.get('Hand'), Q$Color));
  azzert('stroke' != 'style');
  arrow.attributes.put('stroke', 'none');
  !t?$setToIdentity(arrow.transform):$setTransform(arrow.transform, t);
  $add_6(g.children, arrow);
  handBase = new Circle_1(handBase);
  $setFill(handBase, dynamicCast(colorScheme.get('Hand'), Q$Color));
  azzert('stroke' != 'style');
  handBase.attributes.put('stroke', 'none');
  !t?$setToIdentity(handBase.transform):$setTransform(handBase.transform, t);
  $add_6(g.children, handBase);
}

function $drawPin(g, t, pinUp, colorScheme){
  var pin;
  pin = new Circle_0(0, 0, 4);
  !t?$setToIdentity(pin.transform):$setTransform(pin.transform, t);
  $setStroke_0(pin, ($clinit_Color() , BLACK));
  $setFill(pin, dynamicCast(colorScheme.get(pinUp?'PinUp':'PinDown'), Q$Color));
  $add_6(g.children, pin);
}

function $drawPins(g, pins, colorScheme){
  var i_0, j, k_0, t, tt;
  t = new Transform_0;
  $concatenate(t, new Transform_1(1, 0, 0, 1, 75, 75));
  k_0 = 0;
  for (i_0 = -1; i_0 <= 1; i_0 += 2) {
    for (j = -1; j <= 1; j += 2) {
      tt = new Transform_2(t);
      $concatenate(tt, new Transform_1(1, 0, 0, 1, j * 20, i_0 * 20));
      $drawPin(g, tt, pins[k_0++], colorScheme);
    }
  }
  $concatenate(t, new Transform_1(1, 0, 0, 1, 150, 0));
  k_0 = 1;
  for (i_0 = -1; i_0 <= 1; i_0 += 2) {
    for (j = -1; j <= 1; j += 2) {
      tt = new Transform_2(t);
      $concatenate(tt, new Transform_1(1, 0, 0, 1, j * 20, i_0 * 20));
      $drawPin(g, tt, !pins[k_0--], colorScheme);
    }
    k_0 = 3;
  }
}

function ClockPuzzle$ClockState_0(this$0){
  this.this$0 = this$0;
  this.this$0_0 = this$0;
  this.pins = initValues(_3Z_classLit, makeCastMap([Q$boolean_$1, Q$Serializable]), -1, [false, false, false, false]);
  this.posit = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  this.rightSideUp = true;
}

function ClockPuzzle$ClockState_1(this$0, pins, posit, rightSideUp){
  this.this$0 = this$0;
  this.this$0_0 = this$0;
  this.pins = pins;
  this.posit = posit;
  this.rightSideUp = rightSideUp;
}

defineSeed(425, 426, makeCastMap([Q$ClockPuzzle$ClockState, Q$Puzzle$PuzzleState]), ClockPuzzle$ClockState_0, ClockPuzzle$ClockState_1);
_.drawScramble = function drawScramble(colorScheme){
  var i_0, svg;
  svg = new Svg_0(new Dimension_0(300, 150));
  $setStroke(svg);
  $drawBackground(this, svg, colorScheme);
  for (i_0 = 0; i_0 < 18; ++i_0) {
    $drawClock(svg, i_0, this.posit[i_0], colorScheme);
  }
  $drawPins(svg, this.pins, colorScheme);
  return svg;
}
;
_.equals$ = function equals_28(other){
  var o;
  o = dynamicCast(other, Q$ClockPuzzle$ClockState);
  return equals_19(this.posit, o.posit);
}
;
_.getSuccessorsByName = function getSuccessorsByName(){
  var clockwise, move, p_0, pin, pinI, pinsC, pinsCopy, positC, positCopy, rot, successors, turn;
  successors = new LinkedHashMap_0;
  for (turn = 0; turn < ($clinit_ClockPuzzle() , turns).length; ++turn) {
    for (rot = 0; rot < 12; ++rot) {
      positCopy = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 18, 1);
      pinsCopy = initDim(_3Z_classLit, makeCastMap([Q$boolean_$1, Q$Serializable]), -1, 4, 2);
      for (p_0 = 0; p_0 < 18; ++p_0) {
        positCopy[p_0] = (this.posit[p_0] + rot * moves_0[turn][p_0] + 12) % 12;
      }
      arraycopy(this.pins, 0, pinsCopy, 0, 4);
      clockwise = rot < 7;
      move = turns[turn] + (clockwise?rot + '+':12 - rot + '-');
      $put_0(successors, move, new ClockPuzzle$ClockState_1(this.this$0, pinsCopy, positCopy, this.rightSideUp));
    }
  }
  positCopy = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 18, 1);
  pinsCopy = initDim(_3Z_classLit, makeCastMap([Q$boolean_$1, Q$Serializable]), -1, 4, 2);
  arraycopy(this.posit, 0, positCopy, 9, 9);
  arraycopy(this.posit, 9, positCopy, 0, 9);
  arraycopy(this.pins, 0, pinsCopy, 0, 4);
  $put_0(successors, 'y2', new ClockPuzzle$ClockState_1(this.this$0, pinsCopy, positCopy, !this.rightSideUp));
  for (pin = 0; pin < 4; ++pin) {
    positC = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 18, 1);
    pinsC = initDim(_3Z_classLit, makeCastMap([Q$boolean_$1, Q$Serializable]), -1, 4, 2);
    arraycopy(this.posit, 0, positC, 0, 18);
    arraycopy(this.pins, 0, pinsC, 0, 4);
    pinI = pin == 0?1:pin == 1?3:pin == 2?2:0;
    pinsC[pinI] = true;
    $put_0(successors, turns[pin], new ClockPuzzle$ClockState_1(this.this$0, pinsC, positC, this.rightSideUp));
  }
  return successors;
}
;
_.hashCode$ = function hashCode_29(){
  return hashCode_21(this.posit);
}
;
_.pins = null;
_.posit = null;
_.rightSideUp = false;
_.this$0 = null;
function $export_0(this$static){
  if (!exported_0) {
    exported_0 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_ClockPuzzle_2_classLit, this$static);
    $export0_0(this$static);
  }
}

function $export0_0(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.ClockPuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.ClockPuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 0 && (g = new ClockPuzzle_0);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.ClockPuzzle.prototype = new Object;
  __0.generateRandomMoves = $entry(function(a0){
    return this.g.generateRandomMoves_0(gwtInstance(a0));
  }
  );
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_ClockPuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_0();
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_ClockPuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.ClockPuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.ClockPuzzle[p] = pkg[p]);
}

function ClockPuzzle_ExporterImpl_0(){
  $export_0(this);
}

defineSeed(427, 1, {}, ClockPuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_0(o){
  return o != null && instanceOf(o, Q$ClockPuzzle);
}
;
var exported_0 = false;
function $clinit_CubePuzzle(){
  $clinit_CubePuzzle = nullMethod;
  $clinit_Puzzle();
  DIR_TO_STR = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, [null, '', '2', "'"]);
  faceRotationsByName = new HashMap_0;
  faceRotationsByName.put(($clinit_CubePuzzle$Face() , R), 'x');
  faceRotationsByName.put(U, 'y');
  faceRotationsByName.put(F, 'z');
  DEFAULT_LENGTHS = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 0, 25, 25, 40, 60, 80, 100, 120, 140, 160, 180]);
  defaultColorScheme_0 = new HashMap_0;
  defaultColorScheme_0.put('B', ($clinit_Color() , BLUE));
  defaultColorScheme_0.put('D', YELLOW);
  defaultColorScheme_0.put('F', GREEN);
  defaultColorScheme_0.put('L', new Color_1(255, 128, 0));
  defaultColorScheme_0.put('R', RED);
  defaultColorScheme_0.put('U', WHITE);
}

function $cloneImage(image){
  var imageCopy;
  imageCopy = initDims([_3_3_3I_classLit, _3_3I_classLit, _3I_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$2, Q$int_$1, -1], [image.length, image[0].length, image[0][0].length], 3, 1);
  deepCopy_0(image, imageCopy);
  return imageCopy;
}

function $drawCube(this$static, g, state, colorScheme){
  $paintCubeFace(g, 2, 4 + this$static.size * 10, this$static.size, state[($clinit_CubePuzzle$Face() , L).ordinal], colorScheme);
  $paintCubeFace(g, 4 + this$static.size * 10, 6 + 2 * this$static.size * 10, this$static.size, state[D.ordinal], colorScheme);
  $paintCubeFace(g, 8 + 3 * this$static.size * 10, 4 + this$static.size * 10, this$static.size, state[B.ordinal], colorScheme);
  $paintCubeFace(g, 6 + 2 * this$static.size * 10, 4 + this$static.size * 10, this$static.size, state[R.ordinal], colorScheme);
  $paintCubeFace(g, 4 + this$static.size * 10, 2, this$static.size, state[U.ordinal], colorScheme);
  $paintCubeFace(g, 4 + this$static.size * 10, 4 + this$static.size * 10, this$static.size, state[F.ordinal], colorScheme);
}

function $getRandomOrientationMoves(this$static, thickness){
  var i_0, moves, movesArr, randomFFaceMove, randomFFaceMove$index, randomFFaceMove$max, randomFFaceMoves, randomOrientationMoves, randomUFaceMove, randomUFaceMove$index, randomUFaceMove$max, randomUFaceMoves;
  randomUFaceMoves = initValues(_3Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$CubeMove_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$CubePuzzle$CubeMove_$1]), Q$CubePuzzle$CubeMove, [null, new CubePuzzle$CubeMove_0(this$static, ($clinit_CubePuzzle$Face() , R), 1, thickness), new CubePuzzle$CubeMove_0(this$static, R, 2, thickness), new CubePuzzle$CubeMove_0(this$static, R, 3, thickness), new CubePuzzle$CubeMove_0(this$static, F, 1, thickness), new CubePuzzle$CubeMove_0(this$static, F, 3, thickness)]);
  randomFFaceMoves = initValues(_3Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$CubeMove_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$CubePuzzle$CubeMove_$1]), Q$CubePuzzle$CubeMove, [null, new CubePuzzle$CubeMove_0(this$static, U, 1, thickness), new CubePuzzle$CubeMove_0(this$static, U, 2, thickness), new CubePuzzle$CubeMove_0(this$static, U, 3, thickness)]);
  randomOrientationMoves = initDim(_3_3Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$CubeMove_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$CubePuzzle$CubeMove_$1, randomUFaceMoves.length * randomFFaceMoves.length, 0);
  i_0 = 0;
  for (randomUFaceMove$index = 0 , randomUFaceMove$max = randomUFaceMoves.length; randomUFaceMove$index < randomUFaceMove$max; ++randomUFaceMove$index) {
    randomUFaceMove = randomUFaceMoves[randomUFaceMove$index];
    for (randomFFaceMove$index = 0 , randomFFaceMove$max = randomFFaceMoves.length; randomFFaceMove$index < randomFFaceMove$max; ++randomFFaceMove$index) {
      randomFFaceMove = randomFFaceMoves[randomFFaceMove$index];
      moves = new ArrayList_0;
      !!randomUFaceMove && (setCheck(moves.array, moves.size++, randomUFaceMove) , true);
      !!randomFFaceMove && (setCheck(moves.array, moves.size++, randomFFaceMove) , true);
      movesArr = dynamicCast($toArray_0(moves, initDim(_3Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$CubeMove_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$CubePuzzle$CubeMove_$1]), Q$CubePuzzle$CubeMove, moves.size, 0)), Q$CubePuzzle$CubeMove_$1);
      randomOrientationMoves[i_0++] = movesArr;
    }
  }
  return randomOrientationMoves;
}

function $isNormalized(this$static, image){
  return image[($clinit_CubePuzzle$Face() , B).ordinal][this$static.size - 1][this$static.size - 1] == B.ordinal && image[L.ordinal][this$static.size - 1][0] == L.ordinal && image[D.ordinal][this$static.size - 1][0] == D.ordinal;
}

function $normalize(this$static, image){
  var dir, f, goal, i_0, idx, j, spins, stickersByPiece, t;
  image = $cloneImage(image);
  spins = 0;
  while (!(image[($clinit_CubePuzzle$Face() , B).ordinal][this$static.size - 1][this$static.size - 1] == B.ordinal && image[L.ordinal][this$static.size - 1][0] == L.ordinal && image[D.ordinal][this$static.size - 1][0] == D.ordinal)) {
    azzert_1(spins < 2);
    stickersByPiece = getStickersByPiece(image);
    goal = 0;
    goal |= 1 << B.ordinal;
    goal |= 1 << L.ordinal;
    goal |= 1 << D.ordinal;
    idx = -1;
    for (i_0 = 0; i_0 < stickersByPiece.length; ++i_0) {
      t = 0;
      for (j = 0; j < stickersByPiece[i_0].length; ++j) {
        t |= 1 << stickersByPiece[i_0][j];
      }
      if (t == goal) {
        idx = i_0;
        break;
      }
    }
    azzert_1(idx >= 0);
    f = null;
    dir = 1;
    if (stickersByPiece[idx][0] == D.ordinal) {
      if (idx < 4) {
        f = F;
        dir = 2;
      }
       else {
        f = U;
        switch (idx) {
          case 4:
            dir = 2;
            break;
          case 5:
            dir = 1;
            break;
          case 6:
            dir = 3;
            break;
          default:azzert_1(false);
        }
      }
    }
     else if (stickersByPiece[idx][1] == D.ordinal) {
      switch (idx) {
        case 0:
        case 6:
          f = F;
          break;
        case 1:
        case 4:
          f = L;
          break;
        case 2:
        case 7:
          f = R;
          break;
        case 3:
        case 5:
          f = B;
          break;
        default:azzert_1(false);
      }
    }
     else {
      switch (idx) {
        case 2:
        case 4:
          f = F;
          break;
        case 0:
        case 5:
          f = L;
          break;
        case 3:
        case 6:
          f = R;
          break;
        case 1:
        case 7:
          f = B;
          break;
        default:azzert_1(false);
      }
    }
    $spinCube(this$static, image, f, dir);
    ++spins;
  }
  return image;
}

function $paintCubeFace(g, x, y, size, faceColors, colorScheme){
  var col, rect, row, tempx, tempy;
  for (row = 0; row < size; ++row) {
    for (col = 0; col < size; ++col) {
      tempx = x + col * 10;
      tempy = y + row * 10;
      rect = new Rectangle_0(tempx, tempy, 10, 10);
      $setFill(rect, dynamicCast(colorScheme.get(($clinit_CubePuzzle$Face() , $clinit_CubePuzzle$Face() , $VALUES_6)[faceColors[row][col]].name_0), Q$Color));
      $setStroke_0(rect, ($clinit_Color() , BLACK));
      $add_6(g.children, rect);
    }
  }
}

function $spinCube(this$static, image, face, dir){
  var slice;
  for (slice = 0; slice < this$static.size; ++slice) {
    slice_0(face, slice, dir, image);
  }
}

function CubePuzzle_0(size){
  $clinit_CubePuzzle();
  Puzzle_0.call(this);
  azzert_2(size >= 0 && size < DEFAULT_LENGTHS.length, 'Invalid cube size');
  this.size = size;
}

function getImageSize(size){
  $clinit_CubePuzzle();
  return new Dimension_0((size * 10 + 2) * 4 + 2, (size * 10 + 2) * 3 + 2);
}

function getStickersByPiece(img){
  $clinit_CubePuzzle();
  var s;
  s = img[0].length - 1;
  return initValues(_3_3I_classLit, makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), Q$int_$1, [initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [img[($clinit_CubePuzzle$Face() , U).ordinal][s][s], img[R.ordinal][0][0], img[F.ordinal][0][s]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [img[U.ordinal][s][0], img[F.ordinal][0][0], img[L.ordinal][0][s]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [img[U.ordinal][0][s], img[B.ordinal][0][0], img[R.ordinal][0][s]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [img[U.ordinal][0][0], img[L.ordinal][0][0], img[B.ordinal][0][s]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [img[D.ordinal][0][s], img[F.ordinal][s][s], img[R.ordinal][s][0]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [img[D.ordinal][0][0], img[L.ordinal][s][s], img[F.ordinal][s][0]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [img[D.ordinal][s][s], img[R.ordinal][s][s], img[B.ordinal][s][0]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [img[D.ordinal][s][0], img[B.ordinal][s][s], img[L.ordinal][s][0]])]);
}

function slice_0(face, slice, dir, image){
  $clinit_CubePuzzle();
  var f, j, k_0, sdir, sface, size, sslice;
  size = image[0].length;
  azzert_1(slice >= 0 && slice < size);
  sface = face;
  sslice = slice;
  sdir = dir;
  if (face != ($clinit_CubePuzzle$Face() , L) && face != D && face != B) {
    sface = $VALUES_6[(face.ordinal + 3) % 6];
    sslice = size - 1 - slice;
    sdir = 4 - dir;
  }
  for (j = 0; j < size; ++j) {
    sface == L?swap_1(image, U.ordinal, j, sslice, B.ordinal, size - 1 - j, size - 1 - sslice, D.ordinal, j, sslice, F.ordinal, j, sslice, sdir):sface == D?swap_1(image, L.ordinal, size - 1 - sslice, j, B.ordinal, size - 1 - sslice, j, R.ordinal, size - 1 - sslice, j, F.ordinal, size - 1 - sslice, j, sdir):sface == B?swap_1(image, U.ordinal, sslice, j, R.ordinal, j, size - 1 - sslice, D.ordinal, size - 1 - sslice, size - 1 - j, L.ordinal, size - 1 - j, sslice, sdir):azzert_1(false);
  }
  if (slice == 0 || slice == size - 1) {
    if (slice == 0) {
      f = face.ordinal;
      sdir = 4 - dir;
    }
     else if (slice == size - 1) {
      f = $VALUES_6[(face.ordinal + 3) % 6].ordinal;
      sdir = dir;
    }
     else {
      azzert_1(false);
      return;
    }
    for (j = 0; j < ~~((size + 1) / 2); ++j) {
      for (k_0 = 0; k_0 < ~~(size / 2); ++k_0) {
        swap_1(image, f, j, k_0, f, k_0, size - 1 - j, f, size - 1 - j, size - 1 - k_0, f, size - 1 - k_0, j, sdir);
      }
    }
  }
}

function swap_1(image, f1, x1, y1, f2, x2, y2, f3, x3, y3, f4, x4, y4, dir){
  var temp;
  if (dir == 1) {
    temp = image[f1][x1][y1];
    image[f1][x1][y1] = image[f2][x2][y2];
    image[f2][x2][y2] = image[f3][x3][y3];
    image[f3][x3][y3] = image[f4][x4][y4];
    image[f4][x4][y4] = temp;
  }
   else if (dir == 2) {
    temp = image[f1][x1][y1];
    image[f1][x1][y1] = image[f3][x3][y3];
    image[f3][x3][y3] = temp;
    temp = image[f2][x2][y2];
    image[f2][x2][y2] = image[f4][x4][y4];
    image[f4][x4][y4] = temp;
  }
   else if (dir == 3) {
    temp = image[f4][x4][y4];
    image[f4][x4][y4] = image[f3][x3][y3];
    image[f3][x3][y3] = image[f2][x2][y2];
    image[f2][x2][y2] = image[f1][x1][y1];
    image[f1][x1][y1] = temp;
  }
   else {
    azzert_1(false);
  }
}

defineSeed(428, 424, makeCastMap([Q$CubePuzzle, Q$Puzzle, Q$Exportable]), CubePuzzle_0);
_.getDefaultColorScheme_0 = function getDefaultColorScheme_0(){
  return new HashMap_1(defaultColorScheme_0);
}
;
_.getLongName_0 = function getLongName_0(){
  return this.size + 'x' + this.size + 'x' + this.size;
}
;
_.getPreferredSize_0 = function getPreferredSize_1(){
  return getImageSize(this.size);
}
;
_.getRandomMoveCount = function getRandomMoveCount_0(){
  return DEFAULT_LENGTHS[this.size];
}
;
_.getShortName_0 = function getShortName_0(){
  return this.size + '' + this.size + '' + this.size;
}
;
_.getSolvedState_1 = function getSolvedState_0(){
  return new CubePuzzle$CubeState_0(this);
}
;
_.getSolvedState_0 = function getSolvedState_1(){
  return new CubePuzzle$CubeState_0(this);
}
;
_.size = 0;
var DEFAULT_LENGTHS, DIR_TO_STR, defaultColorScheme_0, faceRotationsByName;
function $toString_4(this$static){
  var f, move, rotationName;
  f = this$static.face.name_0;
  if (this$static.innerSlice == 0) {
    move = f;
  }
   else if (this$static.innerSlice == 1) {
    move = f + 'w';
  }
   else if (this$static.innerSlice == this$static.this$0.size - 1) {
    rotationName = dynamicCast(($clinit_CubePuzzle() , faceRotationsByName).get(this$static.face), Q$String);
    if (rotationName == null) {
      return null;
    }
    move = rotationName;
  }
   else {
    move = this$static.innerSlice + 1 + f + 'w';
  }
  move += ($clinit_CubePuzzle() , DIR_TO_STR)[this$static.dir];
  return move;
}

function CubePuzzle$CubeMove_0(this$0, face, dir, innerSlice){
  CubePuzzle$CubeMove_1.call(this, this$0, face, dir, innerSlice);
}

function CubePuzzle$CubeMove_1(this$0, face, dir, innerSlice){
  this.this$0 = this$0;
  this.face = face;
  this.dir = dir;
  this.innerSlice = innerSlice;
  azzert_1(true);
}

defineSeed(429, 1, makeCastMap([Q$CubePuzzle$CubeMove]), CubePuzzle$CubeMove_0, CubePuzzle$CubeMove_1);
_.toString$ = function toString_38(){
  return $toString_4(this);
}
;
_.dir = 0;
_.face = null;
_.innerSlice = 0;
_.this$0 = null;
function $getNormalized(this$static){
  var normalizedImage;
  if (!this$static.normalizedState) {
    normalizedImage = $normalize(this$static.this$0, this$static.image);
    this$static.normalizedState = new CubePuzzle$CubeState_1(this$static.this$0, normalizedImage);
  }
  return this$static.normalizedState;
}

function $getSuccessorsWithinSlice(this$static, maxSlice, includeRedundant){
  var dir, face, face$array, face$index, face$max, halfOfEvenCube, imageCopy, innerSlice, move, moveStr, slice, successors;
  successors = new LinkedHashMap_0;
  for (innerSlice = 0; innerSlice <= maxSlice; ++innerSlice) {
    for (face$array = ($clinit_CubePuzzle$Face() , $clinit_CubePuzzle$Face() , $VALUES_6) , face$index = 0 , face$max = face$array.length; face$index < face$max; ++face$index) {
      face = face$array[face$index];
      halfOfEvenCube = this$static.this$0.size % 2 == 0 && innerSlice == ~~(this$static.this$0.size / 2) - 1;
      if (!includeRedundant && face.ordinal >= 3 && halfOfEvenCube) {
        continue;
      }
      for (dir = 1; dir <= 3; ++dir) {
        move = new CubePuzzle$CubeMove_1(this$static.this$0, face, dir, innerSlice);
        moveStr = $toString_4(move);
        if (moveStr == null) {
          continue;
        }
        imageCopy = $cloneImage(this$static.image);
        for (slice = 0; slice <= innerSlice; ++slice) {
          slice_0(face, slice, dir, imageCopy);
        }
        $put_0(successors, moveStr, new CubePuzzle$CubeState_1(this$static.this$0, imageCopy));
      }
    }
  }
  return successors;
}

function $toFaceCube(this$static){
  var f, f$array, f$index, f$max, face, faceArr, i_0, j, state;
  azzert_1(this$static.this$0.size == 3);
  state = '';
  for (f$array = $toCharArray('URFDLB') , f$index = 0 , f$max = f$array.length; f$index < f$max; ++f$index) {
    f = f$array[f$index];
    face = ($clinit_CubePuzzle$Face() , dynamicCast(valueOf(($clinit_CubePuzzle$Face$Map() , $MAP), '' + String.fromCharCode(f)), Q$CubePuzzle$Face));
    faceArr = this$static.image[face.ordinal];
    for (i_0 = 0; i_0 < faceArr.length; ++i_0) {
      for (j = 0; j < faceArr[i_0].length; ++j) {
        state += $VALUES_6[faceArr[i_0][j]].name_0;
      }
    }
  }
  return state;
}

function $toTwoByTwoState(this$static){
  var bColor, clockwiseTurnsToGetToPrimaryColor, colorToVal, dColor, fColor, i_0, lColor, piece, pieceVal, pieces, rColor, state, stickers, stickersByPiece, uColor;
  state = new TwoByTwoSolver$TwoByTwoState_0;
  stickersByPiece = getStickersByPiece(this$static.image);
  dColor = stickersByPiece[7][0];
  bColor = stickersByPiece[7][1];
  lColor = stickersByPiece[7][2];
  uColor = $oppositeFace(($clinit_CubePuzzle$Face() , $clinit_CubePuzzle$Face() , $VALUES_6)[dColor]).ordinal;
  fColor = $oppositeFace($VALUES_6[bColor]).ordinal;
  rColor = $oppositeFace($VALUES_6[lColor]).ordinal;
  colorToVal = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 8, 1);
  colorToVal[uColor] = 0;
  colorToVal[fColor] = 0;
  colorToVal[rColor] = 0;
  colorToVal[lColor] = 1;
  colorToVal[bColor] = 2;
  colorToVal[dColor] = 4;
  pieces = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 7, 1);
  for (i_0 = 0; i_0 < pieces.length; ++i_0) {
    stickers = stickersByPiece[i_0];
    pieceVal = colorToVal[stickers[0]] + colorToVal[stickers[1]] + colorToVal[stickers[2]];
    clockwiseTurnsToGetToPrimaryColor = 0;
    while (stickers[clockwiseTurnsToGetToPrimaryColor] != uColor && stickers[clockwiseTurnsToGetToPrimaryColor] != dColor) {
      ++clockwiseTurnsToGetToPrimaryColor;
      azzert_1(clockwiseTurnsToGetToPrimaryColor < 3);
    }
    piece = (clockwiseTurnsToGetToPrimaryColor << 3) + pieceVal;
    pieces[i_0] = piece;
  }
  state.permutation = packPerm(pieces);
  state.orientation = packOrient(pieces);
  return state;
}

function CubePuzzle$CubeState_0(this$0){
  var face, j, k_0;
  this.this$0 = this$0;
  this.this$0_0 = this$0;
  this.image = initDims([_3_3_3I_classLit, _3_3I_classLit, _3I_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$2, Q$int_$1, -1], [6, this$0.size, this$0.size], 3, 1);
  for (face = 0; face < this.image.length; ++face) {
    for (j = 0; j < this$0.size; ++j) {
      for (k_0 = 0; k_0 < this$0.size; ++k_0) {
        this.image[face][j][k_0] = face;
      }
    }
  }
  this.normalizedState = this;
}

function CubePuzzle$CubeState_1(this$0, image){
  this.this$0 = this$0;
  this.this$0_0 = this$0;
  this.image = image;
}

defineSeed(430, 426, makeCastMap([Q$CubePuzzle$CubeState, Q$Puzzle$PuzzleState]), CubePuzzle$CubeState_0, CubePuzzle$CubeState_1);
_.drawScramble = function drawScramble_0(colorScheme){
  var svg;
  svg = new Svg_0(getImageSize(this.this$0.size));
  $drawCube(this.this$0, svg, this.image, colorScheme);
  return svg;
}
;
_.equals$ = function equals_29(other){
  return deepEquals(this.image, dynamicCast(other, Q$CubePuzzle$CubeState).image);
}
;
_.getCanonicalMovesByState = function getCanonicalMovesByState_0(){
  return reverseHashMap($getSuccessorsWithinSlice(this, ~~(this.this$0.size / 2) - 1, false));
}
;
_.getNormalized = function getNormalized_0(){
  return $getNormalized(this);
}
;
_.getScrambleSuccessors = function getScrambleSuccessors_0(){
  return $getSuccessorsWithinSlice(this, ~~(this.this$0.size / 2) - 1, false);
}
;
_.getSuccessorsByName = function getSuccessorsByName_0(){
  return $getSuccessorsWithinSlice(this, this.this$0.size - 1, true);
}
;
_.hashCode$ = function hashCode_30(){
  return deepHashCode(this.image);
}
;
_.isNormalized = function isNormalized_0(){
  return $isNormalized(this.this$0, this.image);
}
;
_.image = null;
_.normalizedState = null;
_.this$0 = null;
function $clinit_CubePuzzle$Face(){
  $clinit_CubePuzzle$Face = nullMethod;
  R = new CubePuzzle$Face_0('R', 0);
  U = new CubePuzzle$Face_0('U', 1);
  F = new CubePuzzle$Face_0('F', 2);
  L = new CubePuzzle$Face_0('L', 3);
  D = new CubePuzzle$Face_0('D', 4);
  B = new CubePuzzle$Face_0('B', 5);
  $VALUES_6 = initValues(_3Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$Face_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$CubePuzzle$Face, [R, U, F, L, D, B]);
}

function $oppositeFace(this$static){
  return $VALUES_6[(this$static.ordinal + 3) % 6];
}

function CubePuzzle$Face_0(enum$name, enum$ordinal){
  Enum_0.call(this, enum$name, enum$ordinal);
}

function values_7(){
  $clinit_CubePuzzle$Face();
  return $VALUES_6;
}

defineSeed(431, 59, makeCastMap([Q$Serializable, Q$Comparable, Q$Enum, Q$CubePuzzle$Face]), CubePuzzle$Face_0);
var $VALUES_6, B, D, F, L, R, U;
function $clinit_CubePuzzle$Face$Map(){
  $clinit_CubePuzzle$Face$Map = nullMethod;
  $MAP = createValueOfMap(($clinit_CubePuzzle$Face() , $VALUES_6));
}

var $MAP;
function $export_1(this$static){
  if (!exported_1) {
    exported_1 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_CubePuzzle_2_classLit, this$static);
    $export0_1(this$static);
  }
}

function $export0_1(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.CubePuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.CubePuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 1 && (g = new CubePuzzle_0(a[0]));
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.CubePuzzle.prototype = new Object;
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_CubePuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_1();
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_CubePuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.CubePuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.CubePuzzle[p] = pkg[p]);
}

function CubePuzzle_ExporterImpl_0(){
  $export_1(this);
}

defineSeed(433, 1, {}, CubePuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_1(o){
  return o != null && instanceOf(o, Q$CubePuzzle);
}
;
var exported_1 = false;
function $generateRandomMoves_0(this$static, r){
  var ab, e, scramble;
  scramble = $randomState(dynamicCast($get_3(this$static.threePhaseSearcher), Q$Search_0), r);
  ab = new AlgorithmBuilder_0(this$static, 1);
  try {
    $appendAlgorithm(ab, scramble);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$InvalidMoveException)) {
      e = $e0;
      azzert_3(false, new InvalidScrambleException_0(scramble, e));
    }
     else 
      throw $e0;
  }
  return new PuzzleStateAndGenerator_0((azzert_1(ab.states.size == ab.moves.size + 1) , dynamicCast($get_4(ab.states, ab.states.size - 1), Q$Puzzle$PuzzleState)), join(ab.moves, ' '));
}

function FourByFourCubePuzzle_0(){
  $clinit_CubePuzzle();
  CubePuzzle_0.call(this, 4);
  this.threePhaseSearcher = new FourByFourCubePuzzle$1_0;
}

defineSeed(434, 428, makeCastMap([Q$CubePuzzle, Q$FourByFourCubePuzzle, Q$Puzzle, Q$Exportable]), FourByFourCubePuzzle_0);
_.generateRandomMoves_0 = function generateRandomMoves_1(r){
  return $generateRandomMoves_0(this, r);
}
;
_.getInitializationStatus_0 = function getInitializationStatus(){
  return $clinit_Edge3() , done_0 / prunValues[9];
}
;
_.threePhaseSearcher = null;
function FourByFourCubePuzzle$1_0(){
}

defineSeed(435, 342, {}, FourByFourCubePuzzle$1_0);
_.initialValue = function initialValue_0(){
  return new Search_4;
}
;
function $export_2(this$static){
  if (!exported_2) {
    exported_2 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_FourByFourCubePuzzle_2_classLit, this$static);
    $export0_2(this$static);
  }
}

function $export0_2(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.FourByFourCubePuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.FourByFourCubePuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 0 && (g = new FourByFourCubePuzzle_0);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.FourByFourCubePuzzle.prototype = new Object;
  __0.generateRandomMoves = $entry(function(a0){
    return this.g.generateRandomMoves_0(gwtInstance(a0));
  }
  );
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getInitializationStatus = $entry(function(){
    return this.g.getInitializationStatus_0();
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_FourByFourCubePuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_1();
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_FourByFourCubePuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.FourByFourCubePuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.FourByFourCubePuzzle[p] = pkg[p]);
}

function FourByFourCubePuzzle_ExporterImpl_0(){
  $export_2(this);
}

defineSeed(436, 1, {}, FourByFourCubePuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_2(o){
  return o != null && instanceOf(o, Q$FourByFourCubePuzzle);
}
;
var exported_2 = false;
function FourByFourRandomTurnsCubePuzzle_0(){
  $clinit_CubePuzzle();
  CubePuzzle_0.call(this, 4);
}

defineSeed(437, 428, makeCastMap([Q$CubePuzzle, Q$FourByFourRandomTurnsCubePuzzle, Q$Puzzle, Q$Exportable]), FourByFourRandomTurnsCubePuzzle_0);
_.getLongName_0 = function getLongName_1(){
  return '4x4x4 (fast, unofficial)';
}
;
_.getShortName_0 = function getShortName_1(){
  return '444fast';
}
;
function $export_3(this$static){
  if (!exported_3) {
    exported_3 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_FourByFourRandomTurnsCubePuzzle_2_classLit, this$static);
    $export0_3(this$static);
  }
}

function $export0_3(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.FourByFourRandomTurnsCubePuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.FourByFourRandomTurnsCubePuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 0 && (g = new FourByFourRandomTurnsCubePuzzle_0);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.FourByFourRandomTurnsCubePuzzle.prototype = new Object;
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_FourByFourRandomTurnsCubePuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_1();
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_FourByFourRandomTurnsCubePuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.FourByFourRandomTurnsCubePuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.FourByFourRandomTurnsCubePuzzle[p] = pkg[p]);
}

function FourByFourRandomTurnsCubePuzzle_ExporterImpl_0(){
  $export_3(this);
}

defineSeed(438, 1, {}, FourByFourRandomTurnsCubePuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_3(o){
  return o != null && instanceOf(o, Q$FourByFourRandomTurnsCubePuzzle);
}
;
var exported_3 = false;
function $clinit_MegaminxPuzzle(){
  $clinit_MegaminxPuzzle = nullMethod;
  $clinit_Puzzle();
  UNFOLDHEIGHT = 2 + 3 * Math.sin(0.9424777960769379) + Math.sin(0.3141592653589793);
  UNFOLDWIDTH = 4 * Math.cos(0.3141592653589793) + 2 * Math.cos(0.9424777960769379);
}

function $cloneImage_0(image){
  var imageCopy;
  imageCopy = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [image.length, image[0].length], 2, 1);
  deepCopy(image, imageCopy);
  return imageCopy;
}

function $getFaceBoundaries(this$static){
  var faces;
  faces = new HashMap_0;
  faces.put(($clinit_MegaminxPuzzle$Face() , U_0), getPentagon(this$static.leftCenterX, this$static.leftCenterY, true));
  faces.put(BL, getPentagon(this$static.leftCenterX - this$static.c, this$static.leftCenterY - this$static.e, false));
  faces.put(BR, getPentagon(this$static.leftCenterX + this$static.c, this$static.leftCenterY - this$static.e, false));
  faces.put(R_0, getPentagon(this$static.leftCenterX + this$static.b, this$static.leftCenterY + this$static.d, false));
  faces.put(F_0, getPentagon(this$static.leftCenterX, this$static.leftCenterY + this$static.x, false));
  faces.put(L_0, getPentagon(this$static.leftCenterX - this$static.b, this$static.leftCenterY + this$static.d, false));
  faces.put(D_0, getPentagon(this$static.shift + 2 + this$static.a_0 + this$static.b, 2 + this$static.x + 30, false));
  faces.put(DR, getPentagon(this$static.shift + 2 + this$static.a_0 + this$static.b - this$static.c, 2 + this$static.x + this$static.e + 30, true));
  faces.put(DBR, getPentagon(this$static.shift + 2 + this$static.a_0, 2 + this$static.x - this$static.d + 30, true));
  faces.put(B_0, getPentagon(this$static.shift + 2 + this$static.a_0 + this$static.b, 32, true));
  faces.put(DBL, getPentagon(this$static.shift + 2 + this$static.a_0 + 2 * this$static.b, 2 + this$static.x - this$static.d + 30, true));
  faces.put(DL, getPentagon(this$static.shift + 2 + this$static.a_0 + this$static.b + this$static.c, 2 + this$static.x + this$static.e + 30, true));
  return faces;
}

function $isNormalized_0(image){
  return image[($clinit_MegaminxPuzzle$Face() , U_0).ordinal][10] == U_0.ordinal && image[F_0.ordinal][10] == F_0.ordinal;
}

function $normalize_0(this$static, image){
  var chooseF, face, face$array, face$index, face$max;
  if (image[($clinit_MegaminxPuzzle$Face() , U_0).ordinal][10] == U_0.ordinal && image[F_0.ordinal][10] == F_0.ordinal) {
    return image;
  }
  image = $cloneImage_0(image);
  for (face$array = $VALUES_7 , face$index = 0 , face$max = face$array.length; face$index < face$max; ++face$index) {
    face = face$array[face$index];
    if (image[face.ordinal][10] == U_0.ordinal) {
      $spinToTop(this$static, image, face);
      azzert_1(image[U_0.ordinal][10] == U_0.ordinal);
      for (chooseF = 0; chooseF < 5; ++chooseF) {
        $spinMinx(image, U_0, 1);
        if (image[U_0.ordinal][10] == U_0.ordinal && image[F_0.ordinal][10] == F_0.ordinal) {
          return image;
        }
      }
      azzert_1(false);
    }
  }
  azzert_1(false);
  return null;
}

function $spinMinx(image, face, dir){
  turn_1(image, face, dir);
  bigTurn_0(image, $oppositeFace_0(face), 5 - dir);
}

function $spinToTop(this$static, image, face){
  switch (face.ordinal) {
    case 0:
      break;
    case 1:
      $spinMinx(image, ($clinit_MegaminxPuzzle$Face() , L_0), 1);
      break;
    case 2:
      $spinMinx(image, ($clinit_MegaminxPuzzle$Face() , U_0), 1);
      $spinToTop(this$static, image, R_0);
      break;
    case 3:
      $spinMinx(image, ($clinit_MegaminxPuzzle$Face() , U_0), 1);
      $spinToTop(this$static, image, F_0);
      break;
    case 4:
      $spinMinx(image, ($clinit_MegaminxPuzzle$Face() , L_0), -1);
      break;
    case 5:
      $spinMinx(image, ($clinit_MegaminxPuzzle$Face() , U_0), 1);
      $spinToTop(this$static, image, BL);
      break;
    case 6:
      $spinMinx(image, ($clinit_MegaminxPuzzle$Face() , L_0), -2);
      $spinToTop(this$static, image, R_0);
      break;
    case 7:
      $spinMinx(image, ($clinit_MegaminxPuzzle$Face() , L_0), -1);
      $spinToTop(this$static, image, R_0);
      break;
    case 8:
      $spinMinx(image, ($clinit_MegaminxPuzzle$Face() , U_0), 1);
      $spinMinx(image, L_0, -1);
      $spinToTop(this$static, image, R_0);
      break;
    case 9:
      $spinMinx(image, ($clinit_MegaminxPuzzle$Face() , L_0), -3);
      $spinToTop(this$static, image, R_0);
      break;
    case 10:
      $spinMinx(image, ($clinit_MegaminxPuzzle$Face() , L_0), 2);
      break;
    case 11:
      $spinMinx(image, ($clinit_MegaminxPuzzle$Face() , L_0), -2);
      break;
    default:azzert_1(false);
  }
}

function MegaminxPuzzle_0(){
  $clinit_MegaminxPuzzle();
  Puzzle_0.call(this);
  this.x = 30 * sqrt(2 * (1 - Math.cos(1.8849555921538759)));
  this.a_0 = 30 * Math.cos(0.3141592653589793);
  this.b = this.x * Math.cos(0.3141592653589793);
  this.c = this.x * Math.cos(0.9424777960769379);
  this.d = this.x * Math.sin(0.3141592653589793);
  this.e = this.x * Math.sin(0.9424777960769379);
  this.leftCenterX = 2 + this.a_0 + this.b + this.d / 2;
  this.leftCenterY = 2 + this.x + 30 - this.d;
  this.f = Math.cos(0.3141592653589793);
  this.gg = Math.cos(0.6283185307179586);
  this.magicShiftNumber = this.d * 0.6 + 30 * (this.f + this.gg);
  this.shift = this.leftCenterX + this.magicShiftNumber;
}

function bigTurn(image, f){
  var i_0;
  if (f == ($clinit_MegaminxPuzzle$Face() , DBR)) {
    for (i_0 = 0; i_0 < 7; ++i_0) {
      swap_2(image, 0, (1 + i_0) % 10, 4, (3 + i_0) % 10, 11, (1 + i_0) % 10, 10, (1 + i_0) % 10, 1, (1 + i_0) % 10);
    }
    swap_2(image, 0, 10, 4, 10, 11, 10, 10, 10, 1, 10);
    swapWholeFace(image, 2, 3, 0, 7, 0, 6, 8, 9, 8);
    rotateFace(image, DBR);
  }
   else {
    azzert_1(f == D_0);
    for (i_0 = 0; i_0 < 7; ++i_0) {
      swap_2(image, 1, (9 + i_0) % 10, 2, (1 + i_0) % 10, 3, (3 + i_0) % 10, 4, (5 + i_0) % 10, 5, (7 + i_0) % 10);
    }
    swap_2(image, 1, 10, 2, 10, 3, 10, 4, 10, 5, 10);
    swapWholeFace(image, 11, 10, 8, 9, 6, 8, 4, 7, 2);
    rotateFace(image, D_0);
  }
}

function bigTurn_0(image, side, dir){
  $clinit_MegaminxPuzzle();
  var i_0;
  dir = modulo(dir, 5);
  for (i_0 = 0; i_0 < dir; ++i_0) {
    bigTurn(image, side);
  }
}

function getPentagon(x, y, up){
  var p_0;
  p_0 = pentagon(up);
  $translate(p_0, x, y);
  return p_0;
}

function pentagon(pointup){
  var angs, ch, i_0, p_0, x, y;
  angs = initValues(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, [1.3, 1.7, 0.1, 0.5, 0.9]);
  for (i_0 = 0; i_0 < angs.length; ++i_0) {
    pointup && (angs[i_0] -= 0.2);
    angs[i_0] *= 3.141592653589793;
  }
  x = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, angs.length, 1);
  y = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, angs.length, 1);
  for (i_0 = 0; i_0 < x.length; ++i_0) {
    x[i_0] = 30 * Math.cos(angs[i_0]);
    y[i_0] = 30 * Math.sin(angs[i_0]);
  }
  p_0 = new Path_0;
  $moveTo(p_0, x[0], y[0]);
  for (ch = 1; ch < x.length; ++ch) {
    $lineTo(p_0, x[ch], y[ch]);
  }
  $lineTo(p_0, x[0], y[0]);
  azzert_0(!!p_0.commands);
  $add_6(p_0.commands, new Path$Command_0(4, null));
  return p_0;
}

function rotateFace(image, f){
  swapOnFace(image, f, 0, 8, 6, 4, 2);
  swapOnFace(image, f, 1, 9, 7, 5, 3);
}

function swap_2(image, f1, s1, f2, s2, f3, s3, f4, s4, f5, s5){
  var temp;
  temp = image[f1][s1];
  image[f1][s1] = image[f2][s2];
  image[f2][s2] = image[f3][s3];
  image[f3][s3] = image[f4][s4];
  image[f4][s4] = image[f5][s5];
  image[f5][s5] = temp;
}

function swapOnFace(image, face, s1, s2, s3, s4, s5){
  var f, temp;
  f = face.ordinal;
  temp = image[f][s1];
  image[f][s1] = image[f][s2];
  image[f][s2] = image[f][s3];
  image[f][s3] = image[f][s4];
  image[f][s4] = image[f][s5];
  image[f][s5] = temp;
}

function swapOnSide(image, b, f1, s1, f2, s2, f3, s3, f4, s4, f5, s5){
  var i_0, temp;
  for (i_0 = 0; i_0 < 3; ++i_0) {
    temp = image[(f1 + b) % 12][(s1 + i_0) % 10];
    image[(f1 + b) % 12][(s1 + i_0) % 10] = image[(f2 + b) % 12][(s2 + i_0) % 10];
    image[(f2 + b) % 12][(s2 + i_0) % 10] = image[(f3 + b) % 12][(s3 + i_0) % 10];
    image[(f3 + b) % 12][(s3 + i_0) % 10] = image[(f4 + b) % 12][(s4 + i_0) % 10];
    image[(f4 + b) % 12][(s4 + i_0) % 10] = image[(f5 + b) % 12][(s5 + i_0) % 10];
    image[(f5 + b) % 12][(s5 + i_0) % 10] = temp;
  }
}

function swapWholeFace(image, f1, f2, s2, f3, s3, f4, s4, f5, s5){
  var i_0, temp;
  for (i_0 = 0; i_0 < 10; ++i_0) {
    temp = image[f1 % 12][i_0 % 10];
    image[f1 % 12][i_0 % 10] = image[f2 % 12][(s2 + i_0) % 10];
    image[f2 % 12][(s2 + i_0) % 10] = image[f3 % 12][(s3 + i_0) % 10];
    image[f3 % 12][(s3 + i_0) % 10] = image[f4 % 12][(s4 + i_0) % 10];
    image[f4 % 12][(s4 + i_0) % 10] = image[f5 % 12][(s5 + i_0) % 10];
    image[f5 % 12][(s5 + i_0) % 10] = temp;
  }
  swap_2(image, f1, 10, f2, 10, f3, 10, f4, 10, f5, 10);
}

function turn_0(image, face){
  var b, s;
  s = face.ordinal;
  b = s >= 6?6:0;
  switch (s % 6) {
    case 0:
      swapOnSide(image, b, 1, 6, 5, 4, 4, 2, 3, 0, 2, 8);
      break;
    case 1:
      swapOnSide(image, b, 0, 0, 2, 0, 9, 6, 10, 6, 5, 2);
      break;
    case 2:
      swapOnSide(image, b, 0, 2, 3, 2, 8, 4, 9, 4, 1, 4);
      break;
    case 3:
      swapOnSide(image, b, 0, 4, 4, 4, 7, 2, 8, 2, 2, 6);
      break;
    case 4:
      swapOnSide(image, b, 0, 6, 5, 6, 11, 0, 7, 0, 3, 8);
      break;
    case 5:
      swapOnSide(image, b, 0, 8, 1, 8, 10, 8, 11, 8, 4, 0);
      break;
    default:azzert_1(false);
  }
  swapOnFace(image, face, 0, 8, 6, 4, 2);
  swapOnFace(image, face, 1, 9, 7, 5, 3);
}

function turn_1(image, side, dir){
  $clinit_MegaminxPuzzle();
  var i_0;
  dir = modulo(dir, 5);
  for (i_0 = 0; i_0 < dir; ++i_0) {
    turn_0(image, side);
  }
}

defineSeed(439, 424, makeCastMap([Q$MegaminxPuzzle, Q$Puzzle, Q$Exportable]), MegaminxPuzzle_0);
_.generateRandomMoves_0 = function generateRandomMoves_2(r){
  var dir, e, i_0, j, scramble, scrambleStr, side, state;
  scramble = new StringBuilder_0;
  for (i_0 = 0; i_0 < 7; ++i_0) {
    i_0 > 0 && (scramble.impl.append_2(scramble.data, '\n') , scramble);
    dir = 0;
    for (j = 0; j < 10; ++j) {
      j > 0 && (scramble.impl.append_2(scramble.data, ' ') , scramble);
      side = j % 2 == 0?82:68;
      dir = $nextInt(r, 2);
      scramble.impl.append_2(scramble.data, String.fromCharCode(side) + (dir == 0?'++':'--'));
    }
    scramble.impl.append_2(scramble.data, ' U');
    dir != 0 && (scramble.impl.append_2(scramble.data, "'") , scramble);
  }
  scrambleStr = scramble.impl.toString_0(scramble.data);
  state = new MegaminxPuzzle$MegaminxState_0(this);
  try {
    state = $applyAlgorithm(state, scrambleStr);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$InvalidScrambleException)) {
      e = $e0;
      azzert_3(false, e);
      return null;
    }
     else 
      throw $e0;
  }
  return new PuzzleStateAndGenerator_0(state, scrambleStr);
}
;
_.getDefaultColorScheme_0 = function getDefaultColorScheme_1(){
  var colors;
  colors = new HashMap_0;
  colors.put('U', new Color_0(16777215));
  colors.put('BL', new Color_0(16763904));
  colors.put('BR', new Color_0(179));
  colors.put('R', new Color_0(14483456));
  colors.put('F', new Color_0(26112));
  colors.put('L', new Color_0(9050879));
  colors.put('D', new Color_0(10066329));
  colors.put('DR', new Color_0(16777139));
  colors.put('DBR', new Color_0(16751103));
  colors.put('B', new Color_0(7464448));
  colors.put('DBL', new Color_0(16745523));
  colors.put('DL', new Color_0(8969727));
  return colors;
}
;
_.getFaceBoundaries_0 = function getFaceBoundaries(){
  return $getFaceBoundaries(this);
}
;
_.getLongName_0 = function getLongName_2(){
  return 'Megaminx';
}
;
_.getPreferredSize_0 = function getPreferredSize_2(){
  return new Dimension_0(round_int(UNFOLDWIDTH * 2 * 30 + 6), round_int(UNFOLDHEIGHT * 30 + 4));
}
;
_.getRandomMoveCount = function getRandomMoveCount_1(){
  return 77;
}
;
_.getShortName_0 = function getShortName_2(){
  return 'minx';
}
;
_.getSolvedState_0 = function getSolvedState_2(){
  return new MegaminxPuzzle$MegaminxState_0(this);
}
;
var UNFOLDHEIGHT, UNFOLDWIDTH;
function $clinit_MegaminxPuzzle$Face(){
  $clinit_MegaminxPuzzle$Face = nullMethod;
  U_0 = new MegaminxPuzzle$Face_0('U', 0);
  BL = new MegaminxPuzzle$Face_0('BL', 1);
  BR = new MegaminxPuzzle$Face_0('BR', 2);
  R_0 = new MegaminxPuzzle$Face_0('R', 3);
  F_0 = new MegaminxPuzzle$Face_0('F', 4);
  L_0 = new MegaminxPuzzle$Face_0('L', 5);
  D_0 = new MegaminxPuzzle$Face_0('D', 6);
  DR = new MegaminxPuzzle$Face_0('DR', 7);
  DBR = new MegaminxPuzzle$Face_0('DBR', 8);
  B_0 = new MegaminxPuzzle$Face_0('B', 9);
  DBL = new MegaminxPuzzle$Face_0('DBL', 10);
  DL = new MegaminxPuzzle$Face_0('DL', 11);
  $VALUES_7 = initValues(_3Lnet_gnehzr_tnoodle_puzzle_MegaminxPuzzle$Face_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$MegaminxPuzzle$Face, [U_0, BL, BR, R_0, F_0, L_0, D_0, DR, DBR, B_0, DBL, DL]);
}

function $oppositeFace_0(this$static){
  switch (this$static.ordinal) {
    case 0:
      return D_0;
    case 1:
      return DR;
    case 2:
      return DL;
    case 3:
      return DBL;
    case 4:
      return B_0;
    case 5:
      return DBR;
    case 6:
      return U_0;
    case 7:
      return BL;
    case 8:
      return L_0;
    case 9:
      return F_0;
    case 10:
      return R_0;
    case 11:
      return BR;
    default:azzert_1(false);
      return null;
  }
}

function MegaminxPuzzle$Face_0(enum$name, enum$ordinal){
  Enum_0.call(this, enum$name, enum$ordinal);
}

function values_8(){
  $clinit_MegaminxPuzzle$Face();
  return $VALUES_7;
}

defineSeed(440, 59, makeCastMap([Q$Serializable, Q$Comparable, Q$Enum, Q$MegaminxPuzzle$Face]), MegaminxPuzzle$Face_0);
var $VALUES_7, B_0, BL, BR, D_0, DBL, DBR, DL, DR, F_0, L_0, R_0, U_0;
function $drawMinx(this$static, g, colorScheme){
  var f, face, face$iterator, label, pentagons, rotateCounterClockwise;
  pentagons = $getFaceBoundaries(this$static.this$0);
  for (face$iterator = $iterator($keySet(pentagons)); face$iterator.val$outerIter.hasNext();) {
    face = dynamicCast($next_2(face$iterator), Q$MegaminxPuzzle$Face);
    f = face.ordinal;
    if (face == ($clinit_MegaminxPuzzle$Face() , U_0)) {
      rotateCounterClockwise = 0;
    }
     else if (f >= 1 && f <= 5) {
      rotateCounterClockwise = 1;
    }
     else if (f >= 6 && f <= 11) {
      rotateCounterClockwise = 2;
    }
     else {
      azzert_1(false);
      return;
    }
    label = null;
    (face == U_0 || face == F_0) && (label = face.name_0);
    $drawPentagon(g, dynamicCast(pentagons.get(face), Q$Path), this$static.image[f], rotateCounterClockwise, label, colorScheme);
  }
}

function $drawPentagon(g, p_0, state, rotateCounterClockwise, label, colorScheme){
  var centerX, centerY, ch, coords, i_0, intpent, iter, j, labelText, ps, pt, pt$index, pt$max, type, xpoints, xs, ypoints, ys;
  xpoints = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, 5, 1);
  ypoints = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, 5, 1);
  iter = new PathIterator_0(p_0);
  for (ch = 0; ch < 5; ++ch) {
    coords = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, 6, 1);
    type = $currentSegment(iter, coords);
    if (type == 0 || type == 1) {
      xpoints[ch] = coords[0];
      ypoints[ch] = coords[1];
    }
    ++iter.index_0;
  }
  xs = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, 10, 1);
  ys = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, 10, 1);
  for (i_0 = 0; i_0 < 5; ++i_0) {
    xs[i_0] = 0.4 * xpoints[(i_0 + 1) % 5] + 0.6 * xpoints[i_0];
    ys[i_0] = 0.4 * ypoints[(i_0 + 1) % 5] + 0.6 * ypoints[i_0];
    xs[i_0 + 5] = 0.6 * xpoints[(i_0 + 1) % 5] + 0.4 * xpoints[i_0];
    ys[i_0 + 5] = 0.6 * ypoints[(i_0 + 1) % 5] + 0.4 * ypoints[i_0];
  }
  ps = initDim(_3Lnet_gnehzr_tnoodle_svglite_Path_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Path, 11, 0);
  for (i_0 = 0; i_0 < ps.length; ++i_0) {
    ps[i_0] = new Path_0;
  }
  intpent = initDim(_3Lnet_gnehzr_tnoodle_svglite_Point2D$Double_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Point2D$Double, 5, 0);
  for (i_0 = 0; i_0 < intpent.length; ++i_0) {
    intpent[i_0] = ($clinit_MegaminxPuzzle() , new Point2D$Double_0(((xs[i_0] * ys[5 + (3 + i_0) % 5] - ys[i_0] * xs[5 + (3 + i_0) % 5]) * (xs[(i_0 + 1) % 5] - xs[5 + (4 + i_0) % 5]) - (xs[i_0] - xs[5 + (3 + i_0) % 5]) * (xs[(i_0 + 1) % 5] * ys[5 + (4 + i_0) % 5] - ys[(i_0 + 1) % 5] * xs[5 + (4 + i_0) % 5])) / ((xs[i_0] - xs[5 + (3 + i_0) % 5]) * (ys[(i_0 + 1) % 5] - ys[5 + (4 + i_0) % 5]) - (ys[i_0] - ys[5 + (3 + i_0) % 5]) * (xs[(i_0 + 1) % 5] - xs[5 + (4 + i_0) % 5])), ((xs[i_0] * ys[5 + (3 + i_0) % 5] - ys[i_0] * xs[5 + (3 + i_0) % 5]) * (ys[(i_0 + 1) % 5] - ys[5 + (4 + i_0) % 5]) - (ys[i_0] - ys[5 + (3 + i_0) % 5]) * (xs[(i_0 + 1) % 5] * ys[5 + (4 + i_0) % 5] - ys[(i_0 + 1) % 5] * xs[5 + (4 + i_0) % 5])) / ((xs[i_0] - xs[5 + (3 + i_0) % 5]) * (ys[(i_0 + 1) % 5] - ys[5 + (4 + i_0) % 5]) - (ys[i_0] - ys[5 + (3 + i_0) % 5]) * (xs[(i_0 + 1) % 5] - xs[5 + (4 + i_0) % 5]))));
    i_0 == 0?$moveTo(ps[10], intpent[0].x, intpent[0].y):$lineTo(ps[10], intpent[i_0].x, intpent[i_0].y);
  }
  $closePath(ps[10]);
  for (i_0 = 0; i_0 < 5; ++i_0) {
    $moveTo(ps[2 * i_0], xpoints[i_0], ypoints[i_0]);
    $lineTo(ps[2 * i_0], xs[i_0], ys[i_0]);
    $lineTo(ps[2 * i_0], intpent[i_0].x, intpent[i_0].y);
    $lineTo(ps[2 * i_0], xs[5 + (4 + i_0) % 5], ys[5 + (4 + i_0) % 5]);
    $closePath(ps[2 * i_0]);
    $moveTo(ps[2 * i_0 + 1], xs[i_0], ys[i_0]);
    $lineTo(ps[2 * i_0 + 1], xs[i_0 + 5], ys[i_0 + 5]);
    $lineTo(ps[2 * i_0 + 1], intpent[(i_0 + 1) % 5].x, intpent[(i_0 + 1) % 5].y);
    $lineTo(ps[2 * i_0 + 1], intpent[i_0].x, intpent[i_0].y);
    $closePath(ps[2 * i_0 + 1]);
  }
  for (i_0 = 0; i_0 < ps.length; ++i_0) {
    j = i_0;
    i_0 < 10 && (j = (i_0 + 2 * rotateCounterClockwise) % 10);
    $setStroke_0(ps[i_0], ($clinit_Color() , BLACK));
    $setFill(ps[i_0], dynamicCast(colorScheme.get('' + ($clinit_MegaminxPuzzle$Face() , $clinit_MegaminxPuzzle$Face() , $VALUES_7)[state[j]]), Q$Color));
    $add_6(g.children, ps[i_0]);
  }
  if (label != null) {
    centerX = 0;
    centerY = 0;
    for (pt$index = 0 , pt$max = intpent.length; pt$index < pt$max; ++pt$index) {
      pt = intpent[pt$index];
      centerX += pt.x;
      centerY += pt.y;
    }
    centerX /= intpent.length;
    centerY /= intpent.length;
    labelText = new Text_1(label, centerX, centerY);
    azzert('text-anchor' != 'style');
    labelText.attributes.put('text-anchor', 'middle');
    azzert('dy' != 'style');
    labelText.attributes.put('dy', '0.7ex');
    $add_6(g.children, labelText);
  }
}

function $getSuccessorsByName(this$static){
  var dir, face, face$array, face$index, face$max, imageCopy, move, pochmannFaceName, pochmannFaceName$iterator, pochmannFaceNames, prettyDir, prettyPochmannDir, successors;
  successors = new LinkedHashMap_0;
  prettyDir = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, [null, '', '2', "2'", "'"]);
  for (face$array = ($clinit_MegaminxPuzzle$Face() , $clinit_MegaminxPuzzle$Face() , $VALUES_7) , face$index = 0 , face$max = face$array.length; face$index < face$max; ++face$index) {
    face = face$array[face$index];
    for (dir = 1; dir <= 4; ++dir) {
      move = face.name_0;
      move += prettyDir[dir];
      imageCopy = $cloneImage_0(this$static.image);
      turn_1(imageCopy, face, dir);
      $put_0(successors, move, new MegaminxPuzzle$MegaminxState_1(this$static.this$0, imageCopy));
    }
  }
  pochmannFaceNames = new HashMap_0;
  pochmannFaceNames.put('R', DBR);
  pochmannFaceNames.put('D', D_0);
  prettyPochmannDir = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, [null, '+', '++', '--', '-']);
  for (pochmannFaceName$iterator = $iterator($keySet(pochmannFaceNames)); pochmannFaceName$iterator.val$outerIter.hasNext();) {
    pochmannFaceName = dynamicCast($next_2(pochmannFaceName$iterator), Q$String);
    for (dir = 1; dir < 5; ++dir) {
      move = pochmannFaceName + prettyPochmannDir[dir];
      imageCopy = $cloneImage_0(this$static.image);
      bigTurn_0(imageCopy, dynamicCast(pochmannFaceNames.get(pochmannFaceName), Q$MegaminxPuzzle$Face), dir);
      $put_0(successors, move, new MegaminxPuzzle$MegaminxState_1(this$static.this$0, imageCopy));
    }
  }
  return successors;
}

function MegaminxPuzzle$MegaminxState_0(this$0){
  var i_0, j;
  this.this$0 = this$0;
  this.this$0_0 = this$0;
  this.image = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [12, 11], 2, 1);
  for (i_0 = 0; i_0 < this.image.length; ++i_0) {
    for (j = 0; j < this.image[0].length; ++j) {
      this.image[i_0][j] = i_0;
    }
  }
  this.normalizedState = this;
}

function MegaminxPuzzle$MegaminxState_1(this$0, image){
  this.this$0 = this$0;
  this.this$0_0 = this$0;
  this.image = image;
}

defineSeed(441, 426, makeCastMap([Q$MegaminxPuzzle$MegaminxState, Q$Puzzle$PuzzleState]), MegaminxPuzzle$MegaminxState_0, MegaminxPuzzle$MegaminxState_1);
_.drawScramble = function drawScramble_1(colorScheme){
  var svg;
  svg = new Svg_0(new Dimension_0(($clinit_MegaminxPuzzle() , round_int(UNFOLDWIDTH * 2 * 30 + 6)), round_int(UNFOLDHEIGHT * 30 + 4)));
  $drawMinx(this, svg, colorScheme);
  return svg;
}
;
_.equals$ = function equals_30(other){
  var o;
  o = dynamicCast(other, Q$MegaminxPuzzle$MegaminxState);
  return deepEquals(this.image, o.image);
}
;
_.getNormalized = function getNormalized_1(){
  if (!this.normalizedState) {
    $normalize_0(this.this$0, this.image);
    this.normalizedState = new MegaminxPuzzle$MegaminxState_1(this.this$0, $normalize_0(this.this$0, this.image));
  }
  return this.normalizedState;
}
;
_.getScrambleSuccessors = function getScrambleSuccessors_1(){
  var scrambleSuccessors, successors, turn, turn$array, turn$index, turn$max;
  successors = $getSuccessorsByName(this);
  scrambleSuccessors = new HashMap_0;
  for (turn$array = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ['R++', 'R--', 'D++', 'D--', 'U', 'U2', "U2'", "U'"]) , turn$index = 0 , turn$max = turn$array.length; turn$index < turn$max; ++turn$index) {
    turn = turn$array[turn$index];
    scrambleSuccessors.put(turn, dynamicCast($get_5(successors, turn), Q$MegaminxPuzzle$MegaminxState));
  }
  return scrambleSuccessors;
}
;
_.getSuccessorsByName = function getSuccessorsByName_1(){
  return $getSuccessorsByName(this);
}
;
_.hashCode$ = function hashCode_31(){
  return deepHashCode(this.image);
}
;
_.isNormalized = function isNormalized_1(){
  return $isNormalized_0(this.image);
}
;
_.image = null;
_.normalizedState = null;
_.this$0 = null;
function $export_4(this$static){
  if (!exported_4) {
    exported_4 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_MegaminxPuzzle_2_classLit, this$static);
    $export0_4(this$static);
  }
}

function $export0_4(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.MegaminxPuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.MegaminxPuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 0 && (g = new MegaminxPuzzle_0);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.MegaminxPuzzle.prototype = new Object;
  __0.generateRandomMoves = $entry(function(a0){
    return this.g.generateRandomMoves_0(gwtInstance(a0));
  }
  );
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceBoundaries = $entry(function(){
    return this.g.getFaceBoundaries_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_MegaminxPuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_0();
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_MegaminxPuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.MegaminxPuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.MegaminxPuzzle[p] = pkg[p]);
}

function MegaminxPuzzle_ExporterImpl_0(){
  $export_4(this);
}

defineSeed(442, 1, {}, MegaminxPuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_4(o){
  return o != null && instanceOf(o, Q$MegaminxPuzzle);
}
;
var exported_4 = false;
function NoInspectionFiveByFiveCubePuzzle_0(){
  $clinit_CubePuzzle();
  CubePuzzle_0.call(this, 5);
}

function applyOrientation(puzzle, randomOrientation, psag, discardRedundantMoves){
  $clinit_CubePuzzle();
  var ab, cm, cm$index, cm$max, e, firstReorientMove, im;
  if (randomOrientation.length == 0) {
    return psag;
  }
  try {
    ab = new AlgorithmBuilder_0(puzzle, 0);
    $appendAlgorithm(ab, psag.generator);
    firstReorientMove = $toString_4(randomOrientation[0]);
    while ($isRedundant(ab, firstReorientMove)) {
      azzert_1(discardRedundantMoves);
      im = $findBestIndexForMove(ab, firstReorientMove, 1);
      $popMove(ab, im.index_0);
    }
    for (cm$index = 0 , cm$max = randomOrientation.length; cm$index < cm$max; ++cm$index) {
      cm = randomOrientation[cm$index];
      $appendMove(ab, $toString_4(cm));
    }
    psag = new PuzzleStateAndGenerator_0((azzert_1(ab.states.size == ab.moves.size + 1) , dynamicCast($get_4(ab.states, ab.states.size - 1), Q$Puzzle$PuzzleState)), join(ab.moves, ' '));
    return psag;
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$InvalidMoveException)) {
      e = $e0;
      azzert_3(false, e);
      return null;
    }
     else 
      throw $e0;
  }
}

defineSeed(443, 428, makeCastMap([Q$CubePuzzle, Q$NoInspectionFiveByFiveCubePuzzle, Q$Puzzle, Q$Exportable]), NoInspectionFiveByFiveCubePuzzle_0);
_.generateRandomMoves_0 = function generateRandomMoves_3(r){
  var psag, randomOrientation, randomOrientationMoves;
  randomOrientationMoves = $getRandomOrientationMoves(this, ~~(this.size / 2));
  randomOrientation = randomOrientationMoves[$nextInt(r, randomOrientationMoves.length)];
  psag = $generateRandomMoves(this, r);
  psag = applyOrientation(this, randomOrientation, psag, true);
  return psag;
}
;
_.getLongName_0 = function getLongName_3(){
  return '5x5x5 no inspection';
}
;
_.getShortName_0 = function getShortName_3(){
  return '555ni';
}
;
function $export_5(this$static){
  if (!exported_5) {
    exported_5 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_NoInspectionFiveByFiveCubePuzzle_2_classLit, this$static);
    new CubePuzzle_ExporterImpl_0;
    $export0_5(this$static);
  }
}

function $export0_5(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.NoInspectionFiveByFiveCubePuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.NoInspectionFiveByFiveCubePuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 0 && (g = new NoInspectionFiveByFiveCubePuzzle_0);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.NoInspectionFiveByFiveCubePuzzle.prototype = new Object;
  $wnd.net.gnehzr.tnoodle.puzzle.NoInspectionFiveByFiveCubePuzzle.applyOrientation = $entry(function(a0, a1, a2, a3){
    return __static_wrapper_applyOrientation(a0 == null?null:a0.g, a1, gwtInstance(a2), a3);
  }
  );
  __0.generateRandomMoves = $entry(function(a0){
    return this.g.generateRandomMoves_0(gwtInstance(a0));
  }
  );
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_NoInspectionFiveByFiveCubePuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_1();
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_NoInspectionFiveByFiveCubePuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.NoInspectionFiveByFiveCubePuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.NoInspectionFiveByFiveCubePuzzle[p] = pkg[p]);
}

function NoInspectionFiveByFiveCubePuzzle_ExporterImpl_0(){
  $export_5(this);
}

function __static_wrapper_applyOrientation(a0, a1, a2, a3){
  return applyOrientation(a0, ($clinit_ExporterUtil() , $toArrObject(a1, initDim(_3Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$CubeMove_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$CubePuzzle$CubeMove_$1]), Q$CubePuzzle$CubeMove, a1.length, 0))), a2, a3);
}

defineSeed(444, 1, {}, NoInspectionFiveByFiveCubePuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_5(o){
  return o != null && instanceOf(o, Q$NoInspectionFiveByFiveCubePuzzle);
}
;
var exported_5 = false;
function NoInspectionFourByFourCubePuzzle_0(){
  $clinit_CubePuzzle();
  FourByFourCubePuzzle_0.call(this);
}

function applyOrientation_0(puzzle, randomOrientation, psag){
  $clinit_CubePuzzle();
  var ab, cm, cm$index, cm$max, e;
  if (randomOrientation.length == 0) {
    return psag;
  }
  try {
    ab = new AlgorithmBuilder_0(puzzle, 0);
    $appendAlgorithm(ab, psag.generator);
    for (cm$index = 0 , cm$max = randomOrientation.length; cm$index < cm$max; ++cm$index) {
      cm = randomOrientation[cm$index];
      $appendMove(ab, $toString_4(cm));
    }
    psag = new PuzzleStateAndGenerator_0((azzert_1(ab.states.size == ab.moves.size + 1) , dynamicCast($get_4(ab.states, ab.states.size - 1), Q$Puzzle$PuzzleState)), join(ab.moves, ' '));
    return psag;
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$InvalidMoveException)) {
      e = $e0;
      azzert_3(false, e);
      return null;
    }
     else 
      throw $e0;
  }
}

defineSeed(445, 434, makeCastMap([Q$CubePuzzle, Q$FourByFourCubePuzzle, Q$NoInspectionFourByFourCubePuzzle, Q$Puzzle, Q$Exportable]), NoInspectionFourByFourCubePuzzle_0);
_.generateRandomMoves_0 = function generateRandomMoves_4(r){
  var psag, randomOrientation, randomOrientationMoves;
  randomOrientationMoves = $getRandomOrientationMoves(this, this.size - 1);
  randomOrientation = randomOrientationMoves[$nextInt(r, randomOrientationMoves.length)];
  psag = $generateRandomMoves_0(this, r);
  psag = applyOrientation_0(this, randomOrientation, psag);
  return psag;
}
;
_.getLongName_0 = function getLongName_4(){
  return '4x4x4 no inspection';
}
;
_.getShortName_0 = function getShortName_4(){
  return '444ni';
}
;
function $export_6(this$static){
  if (!exported_6) {
    exported_6 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_NoInspectionFourByFourCubePuzzle_2_classLit, this$static);
    new CubePuzzle_ExporterImpl_0;
    $export0_6(this$static);
  }
}

function $export0_6(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.NoInspectionFourByFourCubePuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.NoInspectionFourByFourCubePuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 0 && (g = new NoInspectionFourByFourCubePuzzle_0);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.NoInspectionFourByFourCubePuzzle.prototype = new Object;
  $wnd.net.gnehzr.tnoodle.puzzle.NoInspectionFourByFourCubePuzzle.applyOrientation = $entry(function(a0, a1, a2, a3){
    return __static_wrapper_applyOrientation_0(a0 == null?null:a0.g, a1, gwtInstance(a2), a3);
  }
  );
  __0.generateRandomMoves = $entry(function(a0){
    return this.g.generateRandomMoves_0(gwtInstance(a0));
  }
  );
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getInitializationStatus = $entry(function(){
    return this.g.getInitializationStatus_0();
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_NoInspectionFourByFourCubePuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_1();
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_NoInspectionFourByFourCubePuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.NoInspectionFourByFourCubePuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.NoInspectionFourByFourCubePuzzle[p] = pkg[p]);
}

function NoInspectionFourByFourCubePuzzle_ExporterImpl_0(){
  $export_6(this);
}

function __static_wrapper_applyOrientation_0(a0, a1, a2, a3){
  return applyOrientation_0(a0, ($clinit_ExporterUtil() , $toArrObject(a1, initDim(_3Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$CubeMove_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$CubePuzzle$CubeMove_$1]), Q$CubePuzzle$CubeMove, a1.length, 0))), a2);
}

defineSeed(446, 1, {}, NoInspectionFourByFourCubePuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_6(o){
  return o != null && instanceOf(o, Q$NoInspectionFourByFourCubePuzzle);
}
;
var exported_6 = false;
function $clinit_ThreeByThreeCubePuzzle(){
  $clinit_ThreeByThreeCubePuzzle = nullMethod;
  $clinit_CubePuzzle();
  l_2 = ($clinit_Logger() , $getLoggerHelper(Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubePuzzle_2_classLit.typeName));
}

function $generateRandomMoves_1(this$static, r, firstAxisRestriction, lastAxisRestriction){
  var ab, e, randomState, scramble;
  randomState = ($clinit_Tools() , randomState_0(r));
  scramble = $trim($solution(dynamicCast($get_3(this$static.twoPhaseSearcher), Q$Search), randomState, 21, Pea60_longLit, Pc8_longLit, 2, firstAxisRestriction, lastAxisRestriction));
  ab = new AlgorithmBuilder_0(this$static, 1);
  try {
    $appendAlgorithm(ab, scramble);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$InvalidMoveException)) {
      e = $e0;
      azzert_3(false, new InvalidScrambleException_0(scramble, e));
    }
     else 
      throw $e0;
  }
  return new PuzzleStateAndGenerator_0((azzert_1(ab.states.size == ab.moves.size + 1) , dynamicCast($get_4(ab.states, ab.states.size - 1), Q$Puzzle$PuzzleState)), join(ab.moves, ' '));
}

function $solveIn(this$static, ps, n, firstAxisRestriction, lastAxisRestriction){
  var cs, solution;
  cs = dynamicCast(ps, Q$CubePuzzle$CubeState);
  if (this$static == new CubePuzzle$CubeState_0(this$static)) {
    return '';
  }
  solution = $trim($solution(dynamicCast($get_3(this$static.twoPhaseSearcher), Q$Search), $toFaceCube(cs), n, Pea60_longLit, P0_longLit, 0, firstAxisRestriction, lastAxisRestriction));
  if ($equals_0('Error 7', solution)) {
    return null;
  }
   else if (solution.indexOf('Error') == 0) {
    $severe_0(l_2, solution + ' while searching for solution to ' + $toFaceCube(cs));
    azzert_1(false);
    return null;
  }
  return solution;
}

function ThreeByThreeCubePuzzle_0(){
  $clinit_ThreeByThreeCubePuzzle();
  var newMinDistance;
  CubePuzzle_0.call(this, 3);
  newMinDistance = getenv('TNOODLE_333_MIN_DISTANCE');
  newMinDistance != null && (this.wcaMinScrambleDistance = __parseAndValidateInt(newMinDistance, 10));
  this.twoPhaseSearcher = new ThreeByThreeCubePuzzle$1_0;
}

defineSeed(448, 428, makeCastMap([Q$CubePuzzle, Q$ThreeByThreeCubePuzzle, Q$Puzzle, Q$Exportable]), ThreeByThreeCubePuzzle_0);
_.generateRandomMoves_0 = function generateRandomMoves_5(r){
  return $generateRandomMoves_1(this, r, null, null);
}
;
_.generateRandomMoves_1 = function generateRandomMoves_6(r, firstAxisRestriction, lastAxisRestriction){
  return $generateRandomMoves_1(this, r, firstAxisRestriction, lastAxisRestriction);
}
;
_.solveIn_0 = function solveIn_1(ps, n){
  return $solveIn(this, ps, n, null, null);
}
;
_.solveIn_2 = function solveIn_2(ps, n, firstAxisRestriction, lastAxisRestriction){
  return $solveIn(this, ps, n, firstAxisRestriction, lastAxisRestriction);
}
;
_.twoPhaseSearcher = null;
var l_2;
function NoInspectionThreeByThreeCubePuzzle_0(){
  $clinit_ThreeByThreeCubePuzzle();
  ThreeByThreeCubePuzzle_0.call(this);
}

defineSeed(447, 448, makeCastMap([Q$CubePuzzle, Q$NoInspectionThreeByThreeCubePuzzle, Q$ThreeByThreeCubePuzzle, Q$Puzzle, Q$Exportable]), NoInspectionThreeByThreeCubePuzzle_0);
_.generateRandomMoves_0 = function generateRandomMoves_7(r){
  var firstAxisRestriction, psag, randomOrientation, randomOrientationMoves, restrictedFace;
  randomOrientationMoves = $getRandomOrientationMoves(this, ~~(this.size / 2));
  randomOrientation = randomOrientationMoves[$nextInt(r, randomOrientationMoves.length)];
  if (randomOrientation.length > 0) {
    restrictedFace = randomOrientation[0].face;
    firstAxisRestriction = restrictedFace.name_0;
  }
   else {
    firstAxisRestriction = null;
  }
  psag = $generateRandomMoves_1(this, r, firstAxisRestriction, null);
  psag = applyOrientation(this, randomOrientation, psag, false);
  return psag;
}
;
_.getLongName_0 = function getLongName_5(){
  return '3x3x3 no inspection';
}
;
_.getShortName_0 = function getShortName_5(){
  return '333ni';
}
;
function $export_7(this$static){
  if (!exported_7) {
    exported_7 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_NoInspectionThreeByThreeCubePuzzle_2_classLit, this$static);
    $export0_7(this$static);
  }
}

function $export0_7(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.NoInspectionThreeByThreeCubePuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.NoInspectionThreeByThreeCubePuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 0 && (g = new NoInspectionThreeByThreeCubePuzzle_0);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.NoInspectionThreeByThreeCubePuzzle.prototype = new Object;
  __0.generateRandomMoves = $entry(function(a0, a1, a2){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_NoInspectionThreeByThreeCubePuzzle_2_classLit, 1, arguments, false, false)[0];
  }
  );
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_NoInspectionThreeByThreeCubePuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_1();
  }
  );
  __0.solveIn = $entry(function(a0, a1, a2, a3){
    return this.g.solveIn_2(gwtInstance(a0), a1, a2, a3);
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_NoInspectionThreeByThreeCubePuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}, 1:{1:[[function(){
    return this.generateRandomMoves_0.apply(this, arguments);
  }
  , null, undefined, Ljava_util_Random_2_classLit]], 3:[[function(){
    return this.generateRandomMoves_1.apply(this, arguments);
  }
  , null, undefined, Ljava_util_Random_2_classLit, 'string', 'string']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.NoInspectionThreeByThreeCubePuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.NoInspectionThreeByThreeCubePuzzle[p] = pkg[p]);
}

function NoInspectionThreeByThreeCubePuzzle_ExporterImpl_0(){
  $export_7(this);
}

defineSeed(449, 1, {}, NoInspectionThreeByThreeCubePuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_7(o){
  return o != null && instanceOf(o, Q$NoInspectionThreeByThreeCubePuzzle);
}
;
var exported_7 = false;
function $clinit_PyraminxPuzzle(){
  $clinit_PyraminxPuzzle = nullMethod;
  $clinit_Puzzle();
  $clinit_Logger();
  $getLoggerHelper(Lnet_gnehzr_tnoodle_puzzle_PyraminxPuzzle_2_classLit.typeName);
  defaultColorScheme_1 = new HashMap_0;
  defaultColorScheme_1.put('F', new Color_0(65280));
  defaultColorScheme_1.put('D', new Color_0(16776960));
  defaultColorScheme_1.put('L', new Color_0(16711680));
  defaultColorScheme_1.put('R', new Color_0(255));
}

function $drawMinx_0(g, colorScheme, image){
  $drawTriangle(g, 100, 5 + Math.sqrt(3) * 30, true, image[0], colorScheme);
  $drawTriangle(g, 100, 10 + 2 * Math.sqrt(3) * 30, false, image[1], colorScheme);
  $drawTriangle(g, 50, 5 + Math.sqrt(3) / 2 * 30, false, image[2], colorScheme);
  $drawTriangle(g, 150, 5 + Math.sqrt(3) / 2 * 30, false, image[3], colorScheme);
}

function $drawTriangle(g, x, y, up, state, colorScheme){
  var center, ch, coords, i_0, iter, p_0, ps, sticker, type, xpoints, xs, ypoints, ys;
  p_0 = triangle(up);
  $translate(p_0, x, y);
  xpoints = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, 3, 1);
  ypoints = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, 3, 1);
  iter = new PathIterator_0(p_0);
  for (ch = 0; ch < 3; ++ch) {
    coords = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, 6, 1);
    type = $currentSegment(iter, coords);
    if (type == 0 || type == 1) {
      xpoints[ch] = coords[0];
      ypoints[ch] = coords[1];
    }
    ++iter.index_0;
  }
  xs = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, 6, 1);
  ys = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, 6, 1);
  for (i_0 = 0; i_0 < 3; ++i_0) {
    xs[i_0] = 0.3333333333333333 * xpoints[(i_0 + 1) % 3] + 0.6666666666666666 * xpoints[i_0];
    ys[i_0] = 0.3333333333333333 * ypoints[(i_0 + 1) % 3] + 0.6666666666666666 * ypoints[i_0];
    xs[i_0 + 3] = 0.6666666666666666 * xpoints[(i_0 + 1) % 3] + 0.3333333333333333 * xpoints[i_0];
    ys[i_0 + 3] = 0.6666666666666666 * ypoints[(i_0 + 1) % 3] + 0.3333333333333333 * ypoints[i_0];
  }
  ps = initDim(_3Lnet_gnehzr_tnoodle_svglite_Path_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Path, 9, 0);
  for (i_0 = 0; i_0 < ps.length; ++i_0) {
    ps[i_0] = new Path_0;
  }
  center = new Point2D$Double_0(((xs[0] * ys[4] - ys[0] * xs[4]) * (xs[2] - xs[3]) - (xs[0] - xs[4]) * (xs[2] * ys[3] - ys[2] * xs[3])) / ((xs[0] - xs[4]) * (ys[2] - ys[3]) - (ys[0] - ys[4]) * (xs[2] - xs[3])), ((xs[0] * ys[4] - ys[0] * xs[4]) * (ys[2] - ys[3]) - (ys[0] - ys[4]) * (xs[2] * ys[3] - ys[2] * xs[3])) / ((xs[0] - xs[4]) * (ys[2] - ys[3]) - (ys[0] - ys[4]) * (xs[2] - xs[3])));
  for (i_0 = 0; i_0 < 3; ++i_0) {
    $moveTo(ps[3 * i_0], xpoints[i_0], ypoints[i_0]);
    $lineTo(ps[3 * i_0], xs[i_0], ys[i_0]);
    $lineTo(ps[3 * i_0], xs[3 + (2 + i_0) % 3], ys[3 + (2 + i_0) % 3]);
    $closePath(ps[3 * i_0]);
    $moveTo(ps[3 * i_0 + 1], xs[i_0], ys[i_0]);
    $lineTo(ps[3 * i_0 + 1], xs[3 + (i_0 + 2) % 3], ys[3 + (i_0 + 2) % 3]);
    $lineTo(ps[3 * i_0 + 1], center.x, center.y);
    $closePath(ps[3 * i_0 + 1]);
    $moveTo(ps[3 * i_0 + 2], xs[i_0], ys[i_0]);
    $lineTo(ps[3 * i_0 + 2], xs[i_0 + 3], ys[i_0 + 3]);
    $lineTo(ps[3 * i_0 + 2], center.x, center.y);
    $closePath(ps[3 * i_0 + 2]);
  }
  for (i_0 = 0; i_0 < ps.length; ++i_0) {
    sticker = ps[i_0];
    $setFill(sticker, colorScheme[state[i_0]]);
    $setStroke_0(sticker, ($clinit_Color() , BLACK));
    $add_6(g.children, sticker);
  }
}

function PyraminxPuzzle_0(){
  $clinit_PyraminxPuzzle();
  Puzzle_0.call(this);
  this.pyraminxSolver = new PyraminxSolver_0;
  this.wcaMinScrambleDistance = 6;
}

function triangle(pointup){
  var angs, ch, i_0, p_0, rad, x, y;
  rad = round_int(Math.sqrt(3) * 30);
  angs = initValues(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, [1.1666666666666667, 1.8333333333333333, 0.5]);
  for (i_0 = 0; i_0 < angs.length; ++i_0) {
    pointup && (angs[i_0] += 0.3333333333333333);
    angs[i_0] *= 3.141592653589793;
  }
  x = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, angs.length, 1);
  y = initDim(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, angs.length, 1);
  for (i_0 = 0; i_0 < x.length; ++i_0) {
    x[i_0] = rad * Math.cos(angs[i_0]);
    y[i_0] = rad * Math.sin(angs[i_0]);
  }
  p_0 = new Path_0;
  $moveTo(p_0, x[0], y[0]);
  for (ch = 1; ch < x.length; ++ch) {
    $lineTo(p_0, x[ch], y[ch]);
  }
  azzert_0(!!p_0.commands);
  $add_6(p_0.commands, new Path$Command_0(4, null));
  return p_0;
}

defineSeed(450, 424, makeCastMap([Q$PyraminxPuzzle, Q$Puzzle, Q$Exportable]), PyraminxPuzzle_0);
_.generateRandomMoves_0 = function generateRandomMoves_8(r){
  var e, pState, scramble, state;
  state = $randomState_0(r);
  scramble = $solve_0(this.pyraminxSolver, state, 11, true, true, false);
  $clinit_GwtSafeUtils();
  azzertEquals(valueOf_0($split(scramble, ' ', 0).length), valueOf_0(11 + $unsolvedTips(state)));
  try {
    pState = $applyAlgorithm(new PyraminxPuzzle$PyraminxState_0(this), scramble);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$InvalidScrambleException)) {
      e = $e0;
      azzert_3(false, e);
      return null;
    }
     else 
      throw $e0;
  }
  return new PuzzleStateAndGenerator_0(pState, scramble);
}
;
_.getDefaultColorScheme_0 = function getDefaultColorScheme_2(){
  return new HashMap_1(defaultColorScheme_1);
}
;
_.getLongName_0 = function getLongName_6(){
  return 'Pyraminx';
}
;
_.getPreferredSize_0 = function getPreferredSize_3(){
  return new Dimension_0(200, round_int(3 * Math.sqrt(3) * 30 + 15));
}
;
_.getRandomMoveCount = function getRandomMoveCount_2(){
  return 15;
}
;
_.getShortName_0 = function getShortName_6(){
  return 'pyram';
}
;
_.getSolvedState_0 = function getSolvedState_3(){
  return new PyraminxPuzzle$PyraminxState_0(this);
}
;
_.pyraminxSolver = null;
var defaultColorScheme_1;
function $swap_1(f1, s1, f2, s2, f3, s3, image){
  var temp;
  temp = image[f1][s1];
  image[f1][s1] = image[f2][s2];
  image[f2][s2] = image[f3][s3];
  image[f3][s3] = temp;
}

function $toPyraminxSolverState(this$static){
  var clockwiseTurnsToMatchCorner, colorToValue, cornerPrimaryColor, corners, correctSum, edges, i_0, state, stickers, stickersToCorners, stickersToEdges, stickersToTips, tips;
  state = new PyraminxSolver$PyraminxSolverState_0;
  stickersToEdges = initValues(_3_3I_classLit, makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), Q$int_$1, [initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [this$static.image[0][5], this$static.image[1][2]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [this$static.image[0][8], this$static.image[2][5]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [this$static.image[1][8], this$static.image[2][8]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [this$static.image[0][2], this$static.image[3][8]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [this$static.image[1][5], this$static.image[3][5]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [this$static.image[2][2], this$static.image[3][2]])]);
  colorToValue = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 1, 2, 4]);
  edges = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 6, 1);
  for (i_0 = 0; i_0 < edges.length; ++i_0) {
    edges[i_0] = colorToValue[stickersToEdges[i_0][0]] + colorToValue[stickersToEdges[i_0][1]] - 1;
    stickersToEdges[i_0][0] > stickersToEdges[i_0][1] && (edges[i_0] += 8);
  }
  state.edgePerm = packEdgePerm(edges);
  state.edgeOrient = packEdgeOrient(edges);
  stickersToCorners = initValues(_3_3I_classLit, makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), Q$int_$1, [initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [this$static.image[0][1], this$static.image[2][4], this$static.image[3][1]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [this$static.image[0][7], this$static.image[1][1], this$static.image[2][7]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [this$static.image[0][4], this$static.image[3][7], this$static.image[1][4]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [this$static.image[1][7], this$static.image[3][4], this$static.image[2][1]])]);
  correctSum = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [5, 3, 4, 6]);
  corners = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 4, 1);
  for (i_0 = 0; i_0 < corners.length; ++i_0) {
    $clinit_GwtSafeUtils();
    azzertEquals(valueOf_0(stickersToCorners[i_0][0] + stickersToCorners[i_0][1] + stickersToCorners[i_0][2]), valueOf_0(correctSum[i_0]));
    stickersToCorners[i_0][0] < stickersToCorners[i_0][1] && stickersToCorners[i_0][0] < stickersToCorners[i_0][2] && (corners[i_0] = 0);
    stickersToCorners[i_0][1] < stickersToCorners[i_0][0] && stickersToCorners[i_0][1] < stickersToCorners[i_0][2] && (corners[i_0] = 1);
    stickersToCorners[i_0][2] < stickersToCorners[i_0][1] && stickersToCorners[i_0][2] < stickersToCorners[i_0][0] && (corners[i_0] = 2);
  }
  state.cornerOrient = packCornerOrient(corners);
  stickersToTips = initValues(_3_3I_classLit, makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), Q$int_$1, [initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [this$static.image[0][0], this$static.image[2][3], this$static.image[3][0]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [this$static.image[0][6], this$static.image[1][0], this$static.image[2][6]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [this$static.image[0][3], this$static.image[3][6], this$static.image[1][3]]), initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [this$static.image[1][6], this$static.image[3][3], this$static.image[2][0]])]);
  tips = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 4, 1);
  for (i_0 = 0; i_0 < tips.length; ++i_0) {
    stickers = stickersToTips[i_0];
    $clinit_GwtSafeUtils();
    azzertEquals(valueOf_0(stickers[0] + stickers[1] + stickers[2]), valueOf_0(correctSum[i_0]));
    cornerPrimaryColor = stickersToCorners[i_0][0];
    clockwiseTurnsToMatchCorner = 0;
    while (stickers[clockwiseTurnsToMatchCorner] != cornerPrimaryColor) {
      ++clockwiseTurnsToMatchCorner;
      azzert_1(clockwiseTurnsToMatchCorner < 3);
    }
    tips[i_0] = clockwiseTurnsToMatchCorner;
  }
  state.tips = packCornerOrient(tips);
  return state;
}

function $turn(side, dir, image){
  var i_0;
  for (i_0 = 0; i_0 < dir; ++i_0) {
    $turn_0(side, image);
  }
}

function $turn_0(s, image){
  switch (s) {
    case 0:
      $swap_1(0, 8, 3, 8, 2, 2, image);
      $swap_1(0, 1, 3, 1, 2, 4, image);
      $swap_1(0, 2, 3, 2, 2, 5, image);
      break;
    case 1:
      $swap_1(2, 8, 1, 2, 0, 8, image);
      $swap_1(2, 7, 1, 1, 0, 7, image);
      $swap_1(2, 5, 1, 8, 0, 5, image);
      break;
    case 2:
      $swap_1(3, 8, 0, 5, 1, 5, image);
      $swap_1(3, 7, 0, 4, 1, 4, image);
      $swap_1(3, 5, 0, 2, 1, 2, image);
      break;
    case 3:
      $swap_1(1, 8, 2, 2, 3, 5, image);
      $swap_1(1, 7, 2, 1, 3, 4, image);
      $swap_1(1, 5, 2, 8, 3, 2, image);
      break;
    default:azzert_1(false);
  }
  $turnTip_0(s, image);
}

function $turnTip(side, dir, image){
  var i_0;
  for (i_0 = 0; i_0 < dir; ++i_0) {
    $turnTip_0(side, image);
  }
}

function $turnTip_0(s, image){
  switch (s) {
    case 0:
      $swap_1(0, 0, 3, 0, 2, 3, image);
      break;
    case 1:
      $swap_1(0, 6, 2, 6, 1, 0, image);
      break;
    case 2:
      $swap_1(0, 3, 1, 3, 3, 6, image);
      break;
    case 3:
      $swap_1(1, 6, 2, 0, 3, 3, image);
      break;
    default:azzert_1(false);
  }
}

function PyraminxPuzzle$PyraminxState_0(this$0){
  var i_0, j;
  this.this$0 = this$0;
  this.this$0_0 = this$0;
  this.image = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [4, 9], 2, 1);
  for (i_0 = 0; i_0 < this.image.length; ++i_0) {
    for (j = 0; j < this.image[0].length; ++j) {
      this.image[i_0][j] = i_0;
    }
  }
}

function PyraminxPuzzle$PyraminxState_1(this$0, image){
  this.this$0 = this$0;
  this.this$0_0 = this$0;
  this.image = image;
}

defineSeed(451, 426, makeCastMap([Q$PyraminxPuzzle$PyraminxState, Q$Puzzle$PuzzleState]), PyraminxPuzzle$PyraminxState_0, PyraminxPuzzle$PyraminxState_1);
_.drawScramble = function drawScramble_2(colorScheme){
  var i_0, preferredSize, scheme, svg;
  preferredSize = new Dimension_0(($clinit_PyraminxPuzzle() , 200), round_int(3 * Math.sqrt(3) * 30 + 15));
  svg = new Svg_0(preferredSize);
  $setStroke(svg);
  scheme = initDim(_3Lnet_gnehzr_tnoodle_svglite_Color_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Color, 4, 0);
  for (i_0 = 0; i_0 < scheme.length; ++i_0) {
    scheme[i_0] = dynamicCast(colorScheme.get(charToString('FDLR'.charCodeAt(i_0)) + ''), Q$Color);
  }
  $drawMinx_0(svg, scheme, this.image);
  return svg;
}
;
_.equals$ = function equals_31(other){
  return deepEquals(this.image, dynamicCast(other, Q$PyraminxPuzzle$PyraminxState).image);
}
;
_.getSuccessorsByName = function getSuccessorsByName_2(){
  var axis, dir, face, imageCopy, successors, tip, tip$array, tip$index, tip$max, turn;
  successors = new LinkedHashMap_0;
  for (axis = 0; axis < 4; ++axis) {
    for (tip$array = initValues(_3Z_classLit, makeCastMap([Q$boolean_$1, Q$Serializable]), -1, [true, false]) , tip$index = 0 , tip$max = tip$array.length; tip$index < tip$max; ++tip$index) {
      tip = tip$array[tip$index];
      face = 'ulrb'.charCodeAt(axis);
      face = tip?String.fromCharCode(face).toLowerCase().charCodeAt(0):String.fromCharCode(face).toUpperCase().charCodeAt(0);
      for (dir = 1; dir <= 2; ++dir) {
        turn = '' + String.fromCharCode(face);
        dir == 2 && (turn += "'");
        imageCopy = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [this.image.length, this.image[0].length], 2, 1);
        deepCopy(this.image, imageCopy);
        tip?$turnTip(axis, dir, imageCopy):$turn(axis, dir, imageCopy);
        $put_0(successors, turn, new PyraminxPuzzle$PyraminxState_1(this.this$0, imageCopy));
      }
    }
  }
  return successors;
}
;
_.hashCode$ = function hashCode_32(){
  return deepHashCode(this.image);
}
;
_.solveIn_1 = function solveIn_3(n){
  return $solve_0(this.this$0.pyraminxSolver, $toPyraminxSolverState(this), n, false, false, true);
}
;
_.image = null;
_.this$0 = null;
function $export_8(this$static){
  if (!exported_8) {
    exported_8 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_PyraminxPuzzle_2_classLit, this$static);
    $export0_8(this$static);
  }
}

function $export0_8(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.PyraminxPuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.PyraminxPuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 0 && (g = new PyraminxPuzzle_0);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.PyraminxPuzzle.prototype = new Object;
  __0.generateRandomMoves = $entry(function(a0){
    return this.g.generateRandomMoves_0(gwtInstance(a0));
  }
  );
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_PyraminxPuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_0();
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_PyraminxPuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.PyraminxPuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.PyraminxPuzzle[p] = pkg[p]);
}

function PyraminxPuzzle_ExporterImpl_0(){
  $export_8(this);
}

defineSeed(452, 1, {}, PyraminxPuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_8(o){
  return o != null && instanceOf(o, Q$PyraminxPuzzle);
}
;
var exported_8 = false;
function $clinit_PyraminxSolver(){
  $clinit_PyraminxSolver = nullMethod;
  moveToString = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ['U', "U'", 'L', "L'", 'R', "R'", 'B', "B'"]);
  inverseMoveToString = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ["U'", 'U', "L'", 'L', "R'", 'R', "B'", 'B']);
  tipToString = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ['u', "u'", 'l', "l'", 'r', "r'", 'b', "b'"]);
  inverseTipToString = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ["u'", 'u', "l'", 'l', "r'", 'r', "b'", 'b']);
  fact_2 = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [1, 1, 2, 6, 24, 120, 720]);
  moveEdgePerm = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [720, 8], 2, 1);
  moveEdgeOrient = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [32, 8], 2, 1);
  moveCornerOrient = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [81, 8], 2, 1);
  prunPerm = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 720, 1);
  prunOrient = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 2592, 1);
  initMoves();
  initPrun();
}

function $randomState_0(r){
  var state;
  state = new PyraminxSolver$PyraminxSolverState_0;
  do {
    state.edgePerm = $nextInt(r, 720);
  }
   while (prunPerm[state.edgePerm] == -1);
  state.edgeOrient = $nextInt(r, 32);
  state.cornerOrient = $nextInt(r, 81);
  state.tips = $nextInt(r, 81);
  return state;
}

function $search(this$static, edgePerm, edgeOrient, cornerOrient, depth, length_0, last_move, solution, randomiseMoves){
  var move, newCornerOrient, newEdgeOrient, newEdgePerm, randomMove, randomOffset;
  if (length_0 == 0) {
    return edgePerm == 0 && edgeOrient == 0 && cornerOrient == 0;
  }
  if (prunPerm[edgePerm] > length_0 || prunOrient[cornerOrient * 32 + edgeOrient] > length_0) {
    return false;
  }
  randomOffset = $nextInt(randomiseMoves, 8);
  for (move = 0; move < 8; ++move) {
    randomMove = (move + randomOffset) % 8;
    if (~~(randomMove / 2) == ~~(last_move / 2)) {
      continue;
    }
    newEdgePerm = moveEdgePerm[edgePerm][randomMove];
    newEdgeOrient = moveEdgeOrient[edgeOrient][randomMove];
    newCornerOrient = moveCornerOrient[cornerOrient][randomMove];
    if ($search(this$static, newEdgePerm, newEdgeOrient, newCornerOrient, depth + 1, length_0 - 1, randomMove, solution, randomiseMoves)) {
      solution[depth] = randomMove;
      return true;
    }
  }
  return false;
}

function $solve_0(this$static, state, desiredLength, exactLength, inverse, includingTips){
  var arrayTips, dir, foundSolution, i_0, length_0, r, scramble, solution, tip;
  r = new Random_0;
  solution = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 20, 1);
  foundSolution = false;
  includingTips && (desiredLength -= $unsolvedTips(state));
  length_0 = exactLength?desiredLength:0;
  while (length_0 <= desiredLength) {
    if ($search(this$static, state.edgePerm, state.edgeOrient, state.cornerOrient, 0, length_0, 42, solution, r)) {
      foundSolution = true;
      break;
    }
    ++length_0;
  }
  if (!foundSolution) {
    return null;
  }
  scramble = new StringBuilder_1;
  if (inverse) {
    for (i_0 = length_0 - 1; i_0 >= 0; --i_0) {
      $append_5((scramble.impl.append_2(scramble.data, ' ') , scramble), inverseMoveToString[solution[i_0]]);
    }
  }
   else {
    for (i_0 = 0; i_0 < length_0; ++i_0) {
      $append_5((scramble.impl.append_2(scramble.data, ' ') , scramble), moveToString[solution[i_0]]);
    }
  }
  arrayTips = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 4, 1);
  unpackCornerOrient(state.tips, arrayTips);
  for (tip = 0; tip < 4; ++tip) {
    dir = arrayTips[tip];
    dir > 0 && (inverse?$append_5((scramble.impl.append_2(scramble.data, ' ') , scramble), tipToString[tip * 2 + dir - 1]):$append_5((scramble.impl.append_2(scramble.data, ' ') , scramble), inverseTipToString[tip * 2 + dir - 1]));
  }
  return $trim(scramble.impl.toString_0(scramble.data));
}

function PyraminxSolver_0(){
  $clinit_PyraminxSolver();
}

function cycleAndOrient(edges, a, b, c, times){
  var temp;
  temp = edges[c];
  edges[c] = (edges[b] + 8) % 16;
  edges[b] = (edges[a] + 8) % 16;
  edges[a] = temp;
  times > 1 && cycleAndOrient(edges, a, b, c, times - 1);
}

function initMoves(){
  var corners1, corners2, edges1, edges2, move, newOrient, newPerm, orient, perm, face, times;
  edges1 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 6, 1);
  edges2 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 6, 1);
  for (perm = 0; perm < 720; ++perm) {
    unpackEdgePerm(perm, edges1);
    for (move = 0; move < 8; ++move) {
      arraycopy(edges1, 0, edges2, 0, 6);
      moveEdges(edges2, move);
      newPerm = packEdgePerm(edges2);
      moveEdgePerm[perm][move] = newPerm;
    }
  }
  for (orient = 0; orient < 32; ++orient) {
    unpackEdgeOrient(orient, edges1);
    for (move = 0; move < 8; ++move) {
      arraycopy(edges1, 0, edges2, 0, 6);
      moveEdges(edges2, move);
      newOrient = packEdgeOrient(edges2);
      moveEdgeOrient[orient][move] = newOrient;
    }
  }
  corners1 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 4, 1);
  corners2 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 4, 1);
  for (orient = 0; orient < 81; ++orient) {
    unpackCornerOrient(orient, corners1);
    for (move = 0; move < 8; ++move) {
      arraycopy(corners1, 0, corners2, 0, 4);
      face = ~~(move / 2);
      times = move % 2 + 1;
      corners2[face] = (corners2[face] + times) % 3;
      newOrient = packCornerOrient(corners2);
      moveCornerOrient[orient][move] = newOrient;
    }
  }
}

function initPrun(){
  var done, length_0, move, newCornerOrient, newEdgeOrient, newOrient, newPerm, orient, perm;
  for (perm = 0; perm < 720; ++perm) {
    prunPerm[perm] = -1;
  }
  prunPerm[0] = 0;
  done = 1;
  for (length_0 = 0; done < 360; ++length_0) {
    for (perm = 0; perm < 720; ++perm) {
      if (prunPerm[perm] == length_0) {
        for (move = 0; move < 8; ++move) {
          newPerm = moveEdgePerm[perm][move];
          if (prunPerm[newPerm] == -1) {
            prunPerm[newPerm] = length_0 + 1;
            ++done;
          }
        }
      }
    }
  }
  for (orient = 0; orient < 2592; ++orient) {
    prunOrient[orient] = -1;
  }
  prunOrient[0] = 0;
  done = 1;
  for (length_0 = 0; done < 2592; ++length_0) {
    for (orient = 0; orient < 2592; ++orient) {
      if (prunOrient[orient] == length_0) {
        for (move = 0; move < 8; ++move) {
          newEdgeOrient = moveEdgeOrient[orient % 32][move];
          newCornerOrient = moveCornerOrient[~~(orient / 32)][move];
          newOrient = newCornerOrient * 32 + newEdgeOrient;
          if (prunOrient[newOrient] == -1) {
            prunOrient[newOrient] = length_0 + 1;
            ++done;
          }
        }
      }
    }
  }
}

function moveEdges(edges, move){
  var face, times;
  face = ~~(move / 2);
  times = move % 2 + 1;
  switch (face) {
    case 0:
      cycleAndOrient(edges, 5, 3, 1, times);
      break;
    case 1:
      cycleAndOrient(edges, 2, 1, 0, times);
      break;
    case 2:
      cycleAndOrient(edges, 0, 3, 4, times);
      break;
    case 3:
      cycleAndOrient(edges, 2, 4, 5, times);
      break;
    default:azzert_1(false);
  }
}

function packCornerOrient(corners){
  $clinit_PyraminxSolver();
  var i_0, ori;
  ori = 0;
  for (i_0 = 0; i_0 < 4; ++i_0) {
    ori = 3 * ori + corners[i_0];
  }
  return ori;
}

function packEdgeOrient(edges){
  $clinit_PyraminxSolver();
  var i_0, ori;
  ori = 0;
  for (i_0 = 0; i_0 < 5; ++i_0) {
    ori = 2 * ori + (~~edges[i_0] >> 3);
  }
  return ori;
}

function packEdgePerm(edges){
  $clinit_PyraminxSolver();
  var i_0, idx, v, val;
  idx = 0;
  val = 5517840;
  for (i_0 = 0; i_0 < 5; ++i_0) {
    v = (edges[i_0] & 7) << 2;
    idx = (6 - i_0) * idx + (~~val >> v & 7);
    val -= 1118480 << v;
  }
  return idx;
}

function unpackCornerOrient(ori, corners){
  var i_0;
  for (i_0 = 3; i_0 >= 0; --i_0) {
    corners[i_0] = ori % 3;
    ori = ~~(ori / 3);
  }
}

function unpackEdgeOrient(ori, edges){
  var i_0, sum_ori;
  sum_ori = 0;
  for (i_0 = 4; i_0 >= 0; --i_0) {
    edges[i_0] = (ori & 1) << 3;
    sum_ori ^= ori & 1;
    ori >>= 1;
  }
  edges[5] = sum_ori << 3;
}

function unpackEdgePerm(perm, edges){
  var i_0, m_0, p_0, v, val;
  val = 5517840;
  for (i_0 = 0; i_0 < 5; ++i_0) {
    p_0 = fact_2[5 - i_0];
    v = ~~(perm / p_0);
    perm -= v * p_0;
    v <<= 2;
    edges[i_0] = ~~val >> v & 7;
    m_0 = (1 << v) - 1;
    val = (val & m_0) + (~~val >> 4 & ~m_0);
  }
  edges[5] = val;
}

defineSeed(453, 1, {}, PyraminxSolver_0);
var fact_2, inverseMoveToString, inverseTipToString, moveCornerOrient, moveEdgeOrient, moveEdgePerm, moveToString, prunOrient, prunPerm, tipToString;
function $unsolvedTips(this$static){
  var numberUnsolved, tempTips;
  numberUnsolved = 0;
  tempTips = this$static.tips;
  while (tempTips != 0) {
    tempTips % 3 > 0 && ++numberUnsolved;
    tempTips = ~~(tempTips / 3);
  }
  azzert_1(numberUnsolved <= 4);
  return numberUnsolved;
}

function PyraminxSolver$PyraminxSolverState_0(){
}

defineSeed(454, 1, {}, PyraminxSolver$PyraminxSolverState_0);
_.cornerOrient = 0;
_.edgeOrient = 0;
_.edgePerm = 0;
_.tips = 0;
function $clinit_SkewbPuzzle(){
  $clinit_SkewbPuzzle = nullMethod;
  $clinit_Puzzle();
  $clinit_Logger();
  $getLoggerHelper(Lnet_gnehzr_tnoodle_puzzle_SkewbPuzzle_2_classLit.typeName);
  sq3d2 = Math.sqrt(3) / 2;
  defaultColorScheme_2 = new HashMap_0;
  defaultColorScheme_2.put('U', ($clinit_Color() , WHITE));
  defaultColorScheme_2.put('R', BLUE);
  defaultColorScheme_2.put('F', RED);
  defaultColorScheme_2.put('D', YELLOW);
  defaultColorScheme_2.put('L', GREEN);
  defaultColorScheme_2.put('B', new Color_0(16744448));
}

function SkewbPuzzle_0(){
  $clinit_SkewbPuzzle();
  Puzzle_0.call(this);
  this.skewbSolver = new SkewbSolver_0;
  this.wcaMinScrambleDistance = 7;
}

defineSeed(455, 424, makeCastMap([Q$SkewbPuzzle, Q$Puzzle, Q$Exportable]), SkewbPuzzle_0);
_.generateRandomMoves_0 = function generateRandomMoves_9(r){
  var e, pState, scramble, state;
  state = $randomState_1(r);
  scramble = $generateExactly(this.skewbSolver, state, r);
  $clinit_GwtSafeUtils();
  azzertEquals(valueOf_0($split(scramble, ' ', 0).length), valueOf_0(11));
  try {
    pState = $applyAlgorithm(new SkewbPuzzle$SkewbState_0(this), scramble);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$InvalidScrambleException)) {
      e = $e0;
      azzert_3(false, e);
      return null;
    }
     else 
      throw $e0;
  }
  return new PuzzleStateAndGenerator_0(pState, scramble);
}
;
_.getDefaultColorScheme_0 = function getDefaultColorScheme_3(){
  return new HashMap_1(defaultColorScheme_2);
}
;
_.getLongName_0 = function getLongName_7(){
  return 'Skewb';
}
;
_.getPreferredSize_0 = function getPreferredSize_4(){
  return new Dimension_0(round_int(ceil(250 * sq3d2)), round_int(Math.ceil(187)));
}
;
_.getRandomMoveCount = function getRandomMoveCount_3(){
  return 15;
}
;
_.getShortName_0 = function getShortName_7(){
  return 'skewb';
}
;
_.getSolvedState_0 = function getSolvedState_4(){
  return new SkewbPuzzle$SkewbState_0(this);
}
;
_.skewbSolver = null;
var defaultColorScheme_2, sq3d2;
function $$init_7(this$static){
  this$static.image = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [6, 5], 2, 1);
}

function $getFacePaths(){
  var i_0, p_0;
  p_0 = initDim(_3Lnet_gnehzr_tnoodle_svglite_Path_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Path, 5, 0);
  for (i_0 = 0; i_0 < 5; ++i_0) {
    p_0[i_0] = new Path_0;
    $setAttribute(p_0[i_0], 'stroke-width', '0.03333333333333333px');
  }
  $moveTo(p_0[0], -1, 0);
  $lineTo(p_0[0], 0, 1);
  $lineTo(p_0[0], 1, 0);
  $lineTo(p_0[0], 0, -1);
  $closePath(p_0[0]);
  $moveTo(p_0[1], -1, 0);
  $lineTo(p_0[1], -1, -1);
  $lineTo(p_0[1], 0, -1);
  $closePath(p_0[1]);
  $moveTo(p_0[2], 0, -1);
  $lineTo(p_0[2], 1, -1);
  $lineTo(p_0[2], 1, 0);
  $closePath(p_0[2]);
  $moveTo(p_0[3], -1, 0);
  $lineTo(p_0[3], -1, 1);
  $lineTo(p_0[3], 0, 1);
  $closePath(p_0[3]);
  $moveTo(p_0[4], 0, 1);
  $lineTo(p_0[4], 1, 1);
  $lineTo(p_0[4], 1, 0);
  $closePath(p_0[4]);
  return p_0;
}

function $swap_2(f1, s1, f2, s2, f3, s3, image){
  var temp;
  temp = image[f1][s1];
  image[f1][s1] = image[f2][s2];
  image[f2][s2] = image[f3][s3];
  image[f3][s3] = temp;
}

function $turn_1(axis, pow, image){
  var p_0;
  for (p_0 = 0; p_0 < pow; ++p_0) {
    switch (axis) {
      case 0:
        $swap_2(2, 0, 3, 0, 1, 0, image);
        $swap_2(2, 4, 3, 2, 1, 3, image);
        $swap_2(2, 2, 3, 1, 1, 4, image);
        $swap_2(2, 3, 3, 4, 1, 1, image);
        $swap_2(4, 4, 5, 3, 0, 4, image);
        break;
      case 1:
        $swap_2(0, 0, 1, 0, 5, 0, image);
        $swap_2(0, 2, 1, 2, 5, 1, image);
        $swap_2(0, 4, 1, 4, 5, 2, image);
        $swap_2(0, 1, 1, 1, 5, 3, image);
        $swap_2(4, 1, 2, 2, 3, 4, image);
        break;
      case 2:
        $swap_2(4, 0, 5, 0, 3, 0, image);
        $swap_2(4, 3, 5, 4, 3, 3, image);
        $swap_2(4, 1, 5, 3, 3, 1, image);
        $swap_2(4, 4, 5, 2, 3, 4, image);
        $swap_2(2, 3, 0, 1, 1, 4, image);
        break;
      case 3:
        $swap_2(1, 0, 3, 0, 5, 0, image);
        $swap_2(1, 4, 3, 4, 5, 3, image);
        $swap_2(1, 3, 3, 3, 5, 1, image);
        $swap_2(1, 2, 3, 2, 5, 4, image);
        $swap_2(0, 2, 2, 4, 4, 3, image);
        break;
      default:azzert_1(false);
    }
  }
}

function SkewbPuzzle$SkewbState_0(this$0){
  var i_0, j;
  this.this$0 = this$0;
  this.this$0_0 = this$0;
  $$init_7(this);
  for (i_0 = 0; i_0 < 6; ++i_0) {
    for (j = 0; j < 5; ++j) {
      this.image[i_0][j] = i_0;
    }
  }
}

function SkewbPuzzle$SkewbState_1(this$0, _image){
  var i_0, j;
  this.this$0 = this$0;
  this.this$0_0 = this$0;
  $$init_7(this);
  for (i_0 = 0; i_0 < 6; ++i_0) {
    for (j = 0; j < 5; ++j) {
      this.image[i_0][j] = _image[i_0][j];
    }
  }
}

defineSeed(456, 426, makeCastMap([Q$SkewbPuzzle$SkewbState, Q$Puzzle$PuzzleState]), SkewbPuzzle$SkewbState_0, SkewbPuzzle$SkewbState_1);
_.drawScramble = function drawScramble_3(colorScheme){
  var face, g, i_0, p_0, position, scheme;
  g = new Svg_0(new Dimension_0(round_int(ceil(250 * ($clinit_SkewbPuzzle() , sq3d2))), round_int(Math.ceil(187))));
  scheme = initDim(_3Lnet_gnehzr_tnoodle_svglite_Color_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Color, 6, 0);
  for (i_0 = 0; i_0 < scheme.length; ++i_0) {
    scheme[i_0] = dynamicCast(colorScheme.get(charToString('URFDLB'.charCodeAt(i_0)) + ''), Q$Color);
  }
  position = initValues(_3Lnet_gnehzr_tnoodle_svglite_Transform_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Transform, [new Transform_1(30 * sq3d2, -15, 30 * sq3d2, 15, 124.5 * sq3d2, 30), new Transform_1(30 * sq3d2, -15, 0, 30, 219 * sq3d2, 45), new Transform_1(30 * sq3d2, -15, 0, 30, 156 * sq3d2, 76.5), new Transform_1(0, 30, -30 * sq3d2, -15, 93 * sq3d2, 139.5), new Transform_1(30 * sq3d2, 15, 0, 30, 93 * sq3d2, 76.5), new Transform_1(30 * sq3d2, 15, 0, 30, 30 * sq3d2, 45)]);
  for (face = 0; face < 6; ++face) {
    p_0 = $getFacePaths();
    for (i_0 = 0; i_0 < 5; ++i_0) {
      $concatenate(p_0[i_0].transform, position[face]);
      $setFill(p_0[i_0], scheme[this.image[face][i_0]]);
      $setStroke_0(p_0[i_0], ($clinit_Color() , BLACK));
      $add_6(g.children, p_0[i_0]);
    }
  }
  return g;
}
;
_.equals$ = function equals_32(other){
  return deepEquals(this.image, dynamicCast(other, Q$SkewbPuzzle$SkewbState).image);
}
;
_.getSuccessorsByName = function getSuccessorsByName_3(){
  var axis, face, imageCopy, pow, successors, turn;
  successors = new LinkedHashMap_0;
  for (axis = 0; axis < 4; ++axis) {
    face = 'RULB'.charCodeAt(axis);
    for (pow = 1; pow <= 2; ++pow) {
      turn = '' + String.fromCharCode(face);
      pow == 2 && (turn += "'");
      imageCopy = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [this.image.length, this.image[0].length], 2, 1);
      deepCopy(this.image, imageCopy);
      $turn_1(axis, pow, imageCopy);
      $put_0(successors, turn, new SkewbPuzzle$SkewbState_1(this.this$0, imageCopy));
    }
  }
  return successors;
}
;
_.hashCode$ = function hashCode_33(){
  return deepHashCode(this.image);
}
;
_.this$0 = null;
function $export_9(this$static){
  if (!exported_9) {
    exported_9 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_SkewbPuzzle_2_classLit, this$static);
    $export0_9(this$static);
  }
}

function $export0_9(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.SkewbPuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.SkewbPuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 0 && (g = new SkewbPuzzle_0);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.SkewbPuzzle.prototype = new Object;
  __0.generateRandomMoves = $entry(function(a0){
    return this.g.generateRandomMoves_0(gwtInstance(a0));
  }
  );
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_SkewbPuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_0();
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_SkewbPuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.SkewbPuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.SkewbPuzzle[p] = pkg[p]);
}

function SkewbPuzzle_ExporterImpl_0(){
  $export_9(this);
}

defineSeed(457, 1, {}, SkewbPuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_9(o){
  return o != null && instanceOf(o, Q$SkewbPuzzle);
}
;
var exported_9 = false;
function $clinit_SkewbSolver(){
  $clinit_SkewbSolver = nullMethod;
  fact_3 = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [1, 1, 1, 3, 12, 60, 360]);
  permmv = initDims([_3_3C_classLit, _3C_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$char_$1, Q$Serializable])], [Q$char_$1, -1], [4320, 4], 2, 1);
  twstmv = initDims([_3_3C_classLit, _3C_classLit], [makeCastMap([Q$Serializable, Q$Object_$1]), makeCastMap([Q$char_$1, Q$Serializable])], [Q$char_$1, -1], [2187, 4], 2, 1);
  permprun = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 4320, 1);
  twstprun = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 2187, 1);
  cornerpermmv = initValues(_3_3B_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$byte_$1, [initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [6, 5, 10, 1]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [9, 7, 4, 2]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [3, 11, 8, 0]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [10, 1, 6, 5]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [0, 8, 11, 3]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [7, 9, 2, 4]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [4, 2, 9, 7]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [11, 3, 0, 8]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [1, 10, 5, 6]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [8, 0, 3, 11]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [2, 4, 7, 9]), initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [5, 6, 1, 10])]);
  ori_0 = initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [0, 1, 2, 0, 2, 1, 1, 2, 0, 2, 1, 0]);
  init_9();
}

function $generateExactly(this$static, state, randomizeMoves){
  var sol, solutionLength;
  sol = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 12, 1);
  solutionLength = $search_0(this$static, 0, state.perm, state.twst, 11, -1, sol, randomizeMoves);
  return solutionLength != -1?$getSolution(sol, solutionLength):null;
}

function $getSolution(sol, solutionLength){
  var axis, i_0, move2str, p_0, pow, sb, scrambleSequence, temp;
  sb = new StringBuffer_0;
  move2str = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ['L', 'R', 'B', 'U']);
  for (i_0 = 0; i_0 < solutionLength; ++i_0) {
    axis = ~~sol[i_0] >> 1;
    pow = sol[i_0] & 1;
    if (axis == 2) {
      for (p_0 = 0; p_0 <= pow; ++p_0) {
        temp = move2str[0];
        move2str[0] = move2str[1];
        move2str[1] = move2str[3];
        move2str[3] = temp;
      }
    }
    sb.impl.append_2(sb.data, move2str[axis] + (pow == 1?"'":''));
    sb.impl.append_2(sb.data, ' ');
  }
  scrambleSequence = $trim(sb.impl.toString_0(sb.data));
  return scrambleSequence;
}

function $randomState_1(r){
  var state;
  state = new SkewbSolver$SkewbSolverState_0;
  state.perm = $nextInt(r, 4320);
  do {
    state.twst = $nextInt(r, 2187);
  }
   while (ori_0[state.perm % 12] != (state.twst + ~~(state.twst / 3) + ~~(state.twst / 9) + ~~(state.twst / 27)) % 3);
  return state;
}

function $search_0(this$static, depth, perm, twst, maxl, lm, sol, randomizeMoves){
  var a, m_0, p_0, randomMove, randomOffset, s, searchResult;
  if (maxl == 0) {
    return perm == 0 && twst == 0?depth:-1;
  }
  if (permprun[perm] > maxl || twstprun[twst] > maxl) {
    return -1;
  }
  randomOffset = $nextInt(randomizeMoves, 4);
  for (m_0 = 0; m_0 < 4; ++m_0) {
    randomMove = (m_0 + randomOffset) % 4;
    if (randomMove != lm) {
      p_0 = perm;
      s = twst;
      for (a = 0; a < 2; ++a) {
        p_0 = permmv[p_0][randomMove];
        s = twstmv[s][randomMove];
        searchResult = $search_0(this$static, depth + 1, p_0, s, maxl - 1, randomMove, sol, randomizeMoves);
        if (searchResult != -1) {
          sol[depth] = randomMove * 2 + a;
          return searchResult;
        }
      }
    }
  }
  return -1;
}

function SkewbSolver_0(){
  $clinit_SkewbSolver();
}

function getpermmv(idx, move){
  var centerindex, centerperm, cornerindex, i_0, m_0, p_0, parity, t, v, val;
  centerindex = ~~(idx / 12);
  cornerindex = idx % 12;
  val = 5517840;
  parity = 0;
  centerperm = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 6, 1);
  for (i_0 = 0; i_0 < 5; ++i_0) {
    p_0 = fact_3[5 - i_0];
    v = ~~(centerindex / p_0);
    centerindex -= v * p_0;
    parity ^= v;
    v <<= 2;
    centerperm[i_0] = ~~val >> v & 15;
    m_0 = (1 << v) - 1;
    val = (val & m_0) + (~~val >> 4 & ~m_0);
  }
  if ((parity & 1) == 0) {
    centerperm[5] = val;
  }
   else {
    centerperm[5] = centerperm[4];
    centerperm[4] = val;
  }
  if (move == 0) {
    t = centerperm[0];
    centerperm[0] = centerperm[1];
    centerperm[1] = centerperm[3];
    centerperm[3] = t;
  }
   else if (move == 1) {
    t = centerperm[0];
    centerperm[0] = centerperm[4];
    centerperm[4] = centerperm[2];
    centerperm[2] = t;
  }
   else if (move == 2) {
    t = centerperm[1];
    centerperm[1] = centerperm[2];
    centerperm[2] = centerperm[5];
    centerperm[5] = t;
  }
   else if (move == 3) {
    t = centerperm[3];
    centerperm[3] = centerperm[5];
    centerperm[5] = centerperm[4];
    centerperm[4] = t;
  }
  val = 5517840;
  for (i_0 = 0; i_0 < 4; ++i_0) {
    v = centerperm[i_0] << 2;
    centerindex *= 6 - i_0;
    centerindex += ~~val >> v & 15;
    val = toInt(sub(fromInt(val), shl(P111110_longLit, v)));
  }
  return centerindex * 12 + cornerpermmv[cornerindex][move];
}

function gettwstmv(idx, move){
  var fixedtwst, i_0, t, twst;
  fixedtwst = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 4, 1);
  twst = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 4, 1);
  for (i_0 = 0; i_0 < 4; ++i_0) {
    fixedtwst[i_0] = idx % 3;
    idx = ~~(idx / 3);
  }
  for (i_0 = 0; i_0 < 3; ++i_0) {
    twst[i_0] = idx % 3;
    idx = ~~(idx / 3);
  }
  twst[3] = (6 - twst[0] - twst[1] - twst[2]) % 3;
  fixedtwst[move] = (fixedtwst[move] + 1) % 3;
  switch (move) {
    case 0:
      t = twst[0];
      twst[0] = twst[2] + 2;
      twst[2] = twst[1] + 2;
      twst[1] = t + 2;
      break;
    case 1:
      t = twst[0];
      twst[0] = twst[1] + 2;
      twst[1] = twst[3] + 2;
      twst[3] = t + 2;
      break;
    case 2:
      t = twst[0];
      twst[0] = twst[3] + 2;
      twst[3] = twst[2] + 2;
      twst[2] = t + 2;
      break;
    case 3:
      t = twst[1];
      twst[1] = twst[2] + 2;
      twst[2] = twst[3] + 2;
      twst[3] = t + 2;
  }
  for (i_0 = 2; i_0 >= 0; --i_0) {
    idx = idx * 3 + twst[i_0] % 3;
  }
  for (i_0 = 3; i_0 >= 0; --i_0) {
    idx = idx * 3 + fixedtwst[i_0];
  }
  return idx;
}

function init_9(){
  var c, i_0, j, l_0, m_0, p_0, q;
  for (i_0 = 0; i_0 < 4320; ++i_0) {
    permprun[i_0] = -1;
    for (j = 0; j < 4; ++j) {
      permmv[i_0][j] = getpermmv(i_0, j) & 65535;
    }
  }
  for (i_0 = 0; i_0 < 2187; ++i_0) {
    twstprun[i_0] = -1;
    for (j = 0; j < 4; ++j) {
      twstmv[i_0][j] = gettwstmv(i_0, j) & 65535;
    }
  }
  permprun[0] = 0;
  for (l_0 = 0; l_0 < 6; ++l_0) {
    for (p_0 = 0; p_0 < 4320; ++p_0) {
      if (permprun[p_0] == l_0) {
        for (m_0 = 0; m_0 < 4; ++m_0) {
          q = p_0;
          for (c = 0; c < 2; ++c) {
            q = permmv[q][m_0];
            permprun[q] == -1 && (permprun[q] = ~~(l_0 + 1 << 24) >> 24);
          }
        }
      }
    }
  }
  twstprun[0] = 0;
  for (l_0 = 0; l_0 < 6; ++l_0) {
    for (p_0 = 0; p_0 < 2187; ++p_0) {
      if (twstprun[p_0] == l_0) {
        for (m_0 = 0; m_0 < 4; ++m_0) {
          q = p_0;
          for (c = 0; c < 2; ++c) {
            q = twstmv[q][m_0];
            twstprun[q] == -1 && (twstprun[q] = ~~(l_0 + 1 << 24) >> 24);
          }
        }
      }
    }
  }
}

defineSeed(458, 1, {}, SkewbSolver_0);
var cornerpermmv, fact_3, ori_0, permmv, permprun, twstmv, twstprun;
function SkewbSolver$SkewbSolverState_0(){
}

defineSeed(459, 1, {}, SkewbSolver$SkewbSolverState_0);
_.perm = 0;
_.twst = 0;
function $clinit_SquareOnePuzzle(){
  $clinit_SquareOnePuzzle = nullMethod;
  var bottom, top_0, turn;
  $clinit_Puzzle();
  defaultColorScheme_3 = new HashMap_0;
  defaultColorScheme_3.put('B', new Color_1(255, 128, 0));
  defaultColorScheme_3.put('D', ($clinit_Color() , WHITE));
  defaultColorScheme_3.put('F', RED);
  defaultColorScheme_3.put('L', BLUE);
  defaultColorScheme_3.put('R', GREEN);
  defaultColorScheme_3.put('U', YELLOW);
  RADIUS_MULTIPLIER = Math.sqrt(2) * Math.cos(0.2617993877991494);
  costsByMove = new HashMap_0;
  for (top_0 = -5; top_0 <= 6; ++top_0) {
    for (bottom = -5; bottom <= 6; ++bottom) {
      if (top_0 == 0 && bottom == 0) {
        continue;
      }
      turn = '(' + top_0 + ',' + bottom + ')';
      costsByMove.put(turn, valueOf_0(1));
    }
  }
  costsByMove.put('/', valueOf_0(1));
}

function $drawFace(g, transform, face, x, y, colorScheme){
  var ch;
  for (ch = 0; ch < 12; ++ch) {
    ch < 11 && face[ch] == face[ch + 1] && ++ch;
    $drawPiece(g, transform, face[ch], x, y, colorScheme);
  }
}

function $drawPiece(g, transform, piece, x, y, colorScheme){
  var ch, cls, corner, degree, p_0, p_1, tempx, tempy, tempY, side1, side2, p_2, tempx_0, side;
  corner = (piece + (piece <= 7?0:1)) % 2 == 0;
  degree = 30 * (corner?2:1);
  p_0 = corner?(p_1 = new Path_0 , $moveTo(p_1, 0, 0) , $lineTo(p_1, 32, 0) , tempx = 32 * (1 + Math.cos(1.3089969389957472) / Math.sqrt(2)) , tempy = 32 * Math.sin(1.3089969389957472) / Math.sqrt(2) , $lineTo(p_1, tempx, tempy) , tempY = Math.sqrt(3) * 32 / 2 , $lineTo(p_1, 16, tempY) , azzert_0(!!p_1.commands) , $add_6(p_1.commands, new Path$Command_0(4, null)) , $translate(p_1, x, y) , side1 = new Path_0 , $moveTo(side1, 32, 0) , $lineTo(side1, 44.8, 0) , $lineTo(side1, 1.4 * tempx, 1.4 * tempy) , $lineTo(side1, tempx, tempy) , azzert_0(!!side1.commands) , $add_6(side1.commands, new Path$Command_0(4, null)) , $translate(side1, x, y) , side2 = new Path_0 , $moveTo(side2, 1.4 * tempx, 1.4 * tempy) , $lineTo(side2, tempx, tempy) , $lineTo(side2, 16, tempY) , $lineTo(side2, 22.4, 1.4 * tempY) , azzert_0(!!side2.commands) , $add_6(side2.commands, new Path$Command_0(4, null)) , $translate(side2, x, y) , initValues(_3Lnet_gnehzr_tnoodle_svglite_Path_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Path, [p_1, side1, side2])):(p_2 = new Path_0 , $moveTo(p_2, 0, 0) , $lineTo(p_2, 32, 0) , tempx_0 = Math.sqrt(3) * 32 / 2 , $lineTo(p_2, tempx_0, 16) , azzert_0(!!p_2.commands) , $add_6(p_2.commands, new Path$Command_0(4, null)) , $translate(p_2, x, y) , side = new Path_0 , $moveTo(side, 32, 0) , $lineTo(side, 44.8, 0) , $lineTo(side, 1.4 * tempx_0, 22.4) , $lineTo(side, tempx_0, 16) , azzert_0(!!side.commands) , $add_6(side.commands, new Path$Command_0(4, null)) , $translate(side, x, y) , initValues(_3Lnet_gnehzr_tnoodle_svglite_Path_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Path, [p_2, side]));
  cls = $getPieceColors(piece, colorScheme);
  for (ch = cls.length - 1; ch >= 0; --ch) {
    $setFill(p_0[ch], cls[ch]);
    $setStroke_0(p_0[ch], ($clinit_Color() , BLACK));
    !transform?$setToIdentity(p_0[ch].transform):$setTransform(p_0[ch].transform, transform);
    $add_6(g.children, p_0[ch]);
  }
  $concatenate(transform, getRotateInstance_0(degree * 0.017453292519943295, x, y));
  return degree;
}

function $getPieceColors(piece, colorScheme){
  var a, b, t, top_0, up;
  up = piece <= 7;
  top_0 = up?colorScheme[4]:colorScheme[5];
  if ((piece + (piece <= 7?0:1)) % 2 == 0) {
    up || (piece = 15 - piece);
    a = colorScheme[(~~(piece / 2) + 3) % 4];
    b = colorScheme[~~(piece / 2)];
    if (!up) {
      t = a;
      a = b;
      b = t;
    }
    return initValues(_3Lnet_gnehzr_tnoodle_svglite_Color_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Color, [top_0, a, b]);
  }
   else {
    up || (piece = 14 - piece);
    return initValues(_3Lnet_gnehzr_tnoodle_svglite_Color_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Color, [top_0, colorScheme[~~(piece / 2)]]);
  }
}

function SquareOnePuzzle_0(){
  $clinit_SquareOnePuzzle();
  Puzzle_0.call(this);
  this.wcaMinScrambleDistance = 11;
}

defineSeed(460, 424, makeCastMap([Q$SquareOnePuzzle, Q$Puzzle, Q$Exportable]), SquareOnePuzzle_0);
_.generateRandomMoves_0 = function generateRandomMoves_10(r){
  var e, s, scramble, state;
  s = new Search_2;
  scramble = $trim($solution_0(s, randomCube(r)));
  try {
    state = $applyAlgorithm(new SquareOnePuzzle$SquareOneState_0(this), scramble);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$InvalidScrambleException)) {
      e = $e0;
      azzert_3(false, e);
      return null;
    }
     else 
      throw $e0;
  }
  return new PuzzleStateAndGenerator_0(state, scramble);
}
;
_.getDefaultColorScheme_0 = function getDefaultColorScheme_4(){
  return new HashMap_1(defaultColorScheme_3);
}
;
_.getLongName_0 = function getLongName_8(){
  return 'Square-1';
}
;
_.getPreferredSize_0 = function getPreferredSize_5(){
  return new Dimension_0(round_int(2 * RADIUS_MULTIPLIER * 1.4 * 32), round_int(4 * RADIUS_MULTIPLIER * 1.4 * 32));
}
;
_.getRandomMoveCount = function getRandomMoveCount_4(){
  return 40;
}
;
_.getShortName_0 = function getShortName_8(){
  return 'sq1';
}
;
_.getSolvedState_0 = function getSolvedState_5(){
  return new SquareOnePuzzle$SquareOneState_0(this);
}
;
var RADIUS_MULTIPLIER, costsByMove, defaultColorScheme_3;
function $canSlash(this$static){
  if (this$static.pieces[0] == this$static.pieces[11]) {
    return false;
  }
  if (this$static.pieces[6] == this$static.pieces[5]) {
    return false;
  }
  if (this$static.pieces[12] == this$static.pieces[23]) {
    return false;
  }
  if (this$static.pieces[18] == this$static.pieces[17]) {
    return false;
  }
  return true;
}

function $doRotateTopAndBottom(this$static, top_0, bottom){
  var i_0, newPieces, t;
  top_0 = modulo(-top_0, 12);
  newPieces = clone(this$static.pieces);
  t = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 12, 1);
  for (i_0 = 0; i_0 < 12; ++i_0) {
    t[i_0] = newPieces[i_0];
  }
  for (i_0 = 0; i_0 < 12; ++i_0) {
    newPieces[i_0] = t[(top_0 + i_0) % 12];
  }
  bottom = modulo(-bottom, 12);
  for (i_0 = 0; i_0 < 12; ++i_0) {
    t[i_0] = newPieces[i_0 + 12];
  }
  for (i_0 = 0; i_0 < 12; ++i_0) {
    newPieces[i_0 + 12] = t[(bottom + i_0) % 12];
  }
  return newPieces;
}

function $doSlash(this$static){
  var c, i_0, newPieces;
  newPieces = clone(this$static.pieces);
  for (i_0 = 0; i_0 < 6; ++i_0) {
    c = newPieces[i_0 + 12];
    newPieces[i_0 + 12] = newPieces[i_0 + 6];
    newPieces[i_0 + 6] = c;
  }
  return newPieces;
}

function $getSuccessorsByName_0(this$static){
  var bottom, newPieces, successors, top_0, turn;
  successors = new LinkedHashMap_0;
  for (top_0 = -5; top_0 <= 6; ++top_0) {
    for (bottom = -5; bottom <= 6; ++bottom) {
      if (top_0 == 0 && bottom == 0) {
        continue;
      }
      newPieces = $doRotateTopAndBottom(this$static, top_0, bottom);
      turn = '(' + top_0 + ',' + bottom + ')';
      $put_0(successors, turn, new SquareOnePuzzle$SquareOneState_1(this$static.this$0, this$static.sliceSolved, newPieces));
    }
  }
  $canSlash(this$static) && $put_0(successors, '/', new SquareOnePuzzle$SquareOneState_1(this$static.this$0, !this$static.sliceSolved, $doSlash(this$static)));
  return successors;
}

function SquareOnePuzzle$SquareOneState_0(this$0){
  this.this$0 = this$0;
  this.this$0_0 = this$0;
  this.sliceSolved = true;
  this.pieces = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [0, 0, 1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 11, 12, 13, 13, 14, 15, 15]);
}

function SquareOnePuzzle$SquareOneState_1(this$0, sliceSolved, pieces){
  this.this$0 = this$0;
  this.this$0_0 = this$0;
  this.sliceSolved = sliceSolved;
  this.pieces = pieces;
}

defineSeed(461, 426, makeCastMap([Q$SquareOnePuzzle$SquareOneState, Q$Puzzle$PuzzleState]), SquareOnePuzzle$SquareOneState_0, SquareOnePuzzle$SquareOneState_1);
_.drawScramble = function drawScramble_4(colorSchemeMap){
  var colorScheme, corner_width, dim, edge_width, g, half_square_width, height, i_0, left_mid, right_mid, transform, width, x, y;
  g = new Svg_0(new Dimension_0(($clinit_SquareOnePuzzle() , round_int(2 * RADIUS_MULTIPLIER * 1.4 * 32)), round_int(4 * RADIUS_MULTIPLIER * 1.4 * 32)));
  $setStroke(g);
  colorScheme = initDim(_3Lnet_gnehzr_tnoodle_svglite_Color_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Color, 6, 0);
  for (i_0 = 0; i_0 < colorScheme.length; ++i_0) {
    colorScheme[i_0] = dynamicCast(colorSchemeMap.get(charToString('LBRFUD'.charCodeAt(i_0)) + ''), Q$Color);
  }
  dim = new Dimension_0(round_int(2 * RADIUS_MULTIPLIER * 1.4 * 32), round_int(4 * RADIUS_MULTIPLIER * 1.4 * 32));
  width = dim.width_0;
  height = dim.height_0;
  half_square_width = 32 * RADIUS_MULTIPLIER * 1.4 / Math.sqrt(2);
  edge_width = 89.6 * Math.sin(0.2617993877991494);
  corner_width = half_square_width - edge_width / 2;
  left_mid = new Rectangle_0(width / 2 - half_square_width, height / 2 - 6.399999999999999, corner_width, 12.799999999999997);
  $setFill(left_mid, colorScheme[3]);
  if (this.sliceSolved) {
    right_mid = new Rectangle_0(width / 2 - half_square_width, height / 2 - 6.399999999999999, 2 * corner_width + edge_width, 12.799999999999997);
    $setFill(right_mid, colorScheme[3]);
  }
   else {
    right_mid = new Rectangle_0(width / 2 - half_square_width, height / 2 - 6.399999999999999, corner_width + edge_width, 12.799999999999997);
    $setFill(right_mid, colorScheme[1]);
  }
  $add_6(g.children, right_mid);
  $add_6(g.children, left_mid);
  right_mid = new Rectangle_1(right_mid);
  $setStroke_0(right_mid, ($clinit_Color() , BLACK));
  azzert('fill' != 'style');
  right_mid.attributes.put('fill', 'none');
  left_mid = new Rectangle_1(left_mid);
  $setStroke_0(left_mid, BLACK);
  azzert('fill' != 'style');
  left_mid.attributes.put('fill', 'none');
  $add_6(g.children, right_mid);
  $add_6(g.children, left_mid);
  x = width / 2;
  y = height / 4;
  transform = getRotateInstance_0(1.8325957145940461, x, y);
  $drawFace(g, transform, this.pieces, x, y, colorScheme);
  y *= 3;
  transform = getRotateInstance_0(-1.8325957145940461, x, y);
  $drawFace(g, transform, copyOfRange(this.pieces, this.pieces.length), x, y, colorScheme);
  return g;
}
;
_.equals$ = function equals_33(other){
  var o;
  o = dynamicCast(other, Q$SquareOnePuzzle$SquareOneState);
  return equals_19(this.pieces, o.pieces) && this.sliceSolved == o.sliceSolved;
}
;
_.getMoveCost = function getMoveCost_0(move){
  return dynamicCast(($clinit_SquareOnePuzzle() , costsByMove).get(move), Q$Integer).value;
}
;
_.getScrambleSuccessors = function getScrambleSuccessors_2(){
  var iter, key, state, successors;
  successors = $getSuccessorsByName_0(this);
  iter = $iterator($keySet(successors));
  while (iter.val$outerIter.hasNext()) {
    key = dynamicCast($next_2(iter), Q$String);
    state = dynamicCast($get_5(successors, key), Q$SquareOnePuzzle$SquareOneState);
    $canSlash(state) || iter.val$outerIter.remove_0();
  }
  return successors;
}
;
_.getSuccessorsByName = function getSuccessorsByName_4(){
  return $getSuccessorsByName_0(this);
}
;
_.hashCode$ = function hashCode_34(){
  return hashCode_21(this.pieces) ^ (this.sliceSolved?1:0);
}
;
_.toString$ = function toString_39(){
  return 'sliceSolved: ' + this.sliceSolved + ' ' + toString_27(this.pieces);
}
;
_.pieces = null;
_.sliceSolved = false;
_.this$0 = null;
function $export_10(this$static){
  if (!exported_10) {
    exported_10 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_SquareOnePuzzle_2_classLit, this$static);
    $export0_10(this$static);
  }
}

function $export0_10(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.SquareOnePuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.SquareOnePuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 0 && (g = new SquareOnePuzzle_0);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.SquareOnePuzzle.prototype = new Object;
  __0.generateRandomMoves = $entry(function(a0){
    return this.g.generateRandomMoves_0(gwtInstance(a0));
  }
  );
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_SquareOnePuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_0();
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_SquareOnePuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.SquareOnePuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.SquareOnePuzzle[p] = pkg[p]);
}

function SquareOnePuzzle_ExporterImpl_0(){
  $export_10(this);
}

defineSeed(462, 1, {}, SquareOnePuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_10(o){
  return o != null && instanceOf(o, Q$SquareOnePuzzle);
}
;
var exported_10 = false;
function SquareOneUnfilteredPuzzle_0(){
  $clinit_SquareOnePuzzle();
  SquareOnePuzzle_0.call(this);
  this.wcaMinScrambleDistance = 0;
}

defineSeed(463, 460, makeCastMap([Q$SquareOnePuzzle, Q$SquareOneUnfilteredPuzzle, Q$Puzzle, Q$Exportable]), SquareOneUnfilteredPuzzle_0);
_.getLongName_0 = function getLongName_9(){
  return 'Square-1 (fast, unofficial)';
}
;
_.getShortName_0 = function getShortName_9(){
  return 'sq1fast';
}
;
function $export_11(this$static){
  if (!exported_11) {
    exported_11 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_SquareOneUnfilteredPuzzle_2_classLit, this$static);
    $export0_11(this$static);
  }
}

function $export0_11(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.SquareOneUnfilteredPuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.SquareOneUnfilteredPuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 0 && (g = new SquareOneUnfilteredPuzzle_0);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.SquareOneUnfilteredPuzzle.prototype = new Object;
  __0.generateRandomMoves = $entry(function(a0){
    return this.g.generateRandomMoves_0(gwtInstance(a0));
  }
  );
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_SquareOneUnfilteredPuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_0();
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_SquareOneUnfilteredPuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.SquareOneUnfilteredPuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.SquareOneUnfilteredPuzzle[p] = pkg[p]);
}

function SquareOneUnfilteredPuzzle_ExporterImpl_0(){
  $export_11(this);
}

defineSeed(464, 1, {}, SquareOneUnfilteredPuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_11(o){
  return o != null && instanceOf(o, Q$SquareOneUnfilteredPuzzle);
}
;
var exported_11 = false;
function ThreeByThreeCubeFewestMovesPuzzle_0(){
  $clinit_ThreeByThreeCubePuzzle();
  ThreeByThreeCubePuzzle_0.call(this);
}

defineSeed(465, 448, makeCastMap([Q$CubePuzzle, Q$ThreeByThreeCubeFewestMovesPuzzle, Q$ThreeByThreeCubePuzzle, Q$Puzzle, Q$Exportable]), ThreeByThreeCubeFewestMovesPuzzle_0);
_.generateRandomMoves_0 = function generateRandomMoves_11(r){
  var ab, e, psag, scramblePrefix, scrambleSuffix, solutionFirstAxisRestriction, solutionLastAxisRestriction;
  scramblePrefix = splitAlgorithm("R' U' F");
  scrambleSuffix = splitAlgorithm("R' U' F");
  solutionLastAxisRestriction = scramblePrefix[scramblePrefix.length - 1].substr(0, 1 - 0);
  solutionFirstAxisRestriction = scrambleSuffix[0].substr(0, 1 - 0);
  psag = $generateRandomMoves_1(this, r, solutionFirstAxisRestriction, solutionLastAxisRestriction);
  ab = new AlgorithmBuilder_0(this, 0);
  try {
    $appendAlgorithms(ab, scramblePrefix);
    $appendAlgorithm(ab, psag.generator);
    $appendAlgorithms(ab, scrambleSuffix);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$InvalidMoveException)) {
      e = $e0;
      azzert_3(false, e);
      return null;
    }
     else 
      throw $e0;
  }
  return new PuzzleStateAndGenerator_0((azzert_1(ab.states.size == ab.moves.size + 1) , dynamicCast($get_4(ab.states, ab.states.size - 1), Q$Puzzle$PuzzleState)), join(ab.moves, ' '));
}
;
_.getLongName_0 = function getLongName_10(){
  return '3x3x3 Fewest Moves';
}
;
_.getShortName_0 = function getShortName_10(){
  return '333fm';
}
;
function $export_12(this$static){
  if (!exported_12) {
    exported_12 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubeFewestMovesPuzzle_2_classLit, this$static);
    $export0_12(this$static);
  }
}

function $export0_12(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.ThreeByThreeCubeFewestMovesPuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.ThreeByThreeCubeFewestMovesPuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 0 && (g = new ThreeByThreeCubeFewestMovesPuzzle_0);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.ThreeByThreeCubeFewestMovesPuzzle.prototype = new Object;
  __0.generateRandomMoves = $entry(function(a0, a1, a2){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubeFewestMovesPuzzle_2_classLit, 1, arguments, false, false)[0];
  }
  );
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubeFewestMovesPuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_1();
  }
  );
  __0.solveIn = $entry(function(a0, a1, a2, a3){
    return this.g.solveIn_2(gwtInstance(a0), a1, a2, a3);
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubeFewestMovesPuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}, 1:{1:[[function(){
    return this.generateRandomMoves_0.apply(this, arguments);
  }
  , null, undefined, Ljava_util_Random_2_classLit]], 3:[[function(){
    return this.generateRandomMoves_1.apply(this, arguments);
  }
  , null, undefined, Ljava_util_Random_2_classLit, 'string', 'string']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.ThreeByThreeCubeFewestMovesPuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.ThreeByThreeCubeFewestMovesPuzzle[p] = pkg[p]);
}

function ThreeByThreeCubeFewestMovesPuzzle_ExporterImpl_0(){
  $export_12(this);
}

defineSeed(466, 1, {}, ThreeByThreeCubeFewestMovesPuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_12(o){
  return o != null && instanceOf(o, Q$ThreeByThreeCubeFewestMovesPuzzle);
}
;
var exported_12 = false;
function ThreeByThreeCubePuzzle$1_0(){
}

defineSeed(467, 342, {}, ThreeByThreeCubePuzzle$1_0);
_.initialValue = function initialValue_1(){
  return new Search_0;
}
;
function $export_13(this$static){
  if (!exported_13) {
    exported_13 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubePuzzle_2_classLit, this$static);
    $export0_13(this$static);
  }
}

function $export0_13(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.ThreeByThreeCubePuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.ThreeByThreeCubePuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 0 && (g = new ThreeByThreeCubePuzzle_0);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.ThreeByThreeCubePuzzle.prototype = new Object;
  __0.generateRandomMoves = $entry(function(a0, a1, a2){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubePuzzle_2_classLit, 1, arguments, false, false)[0];
  }
  );
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubePuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_1();
  }
  );
  __0.solveIn = $entry(function(a0, a1, a2, a3){
    return this.g.solveIn_2(gwtInstance(a0), a1, a2, a3);
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubePuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}, 1:{1:[[function(){
    return this.generateRandomMoves_0.apply(this, arguments);
  }
  , null, undefined, Ljava_util_Random_2_classLit]], 3:[[function(){
    return this.generateRandomMoves_1.apply(this, arguments);
  }
  , null, undefined, Ljava_util_Random_2_classLit, 'string', 'string']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.ThreeByThreeCubePuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.ThreeByThreeCubePuzzle[p] = pkg[p]);
}

function ThreeByThreeCubePuzzle_ExporterImpl_0(){
  $export_13(this);
}

defineSeed(468, 1, {}, ThreeByThreeCubePuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_13(o){
  return o != null && instanceOf(o, Q$ThreeByThreeCubePuzzle);
}
;
var exported_13 = false;
function TwoByTwoCubePuzzle_0(){
  $clinit_CubePuzzle();
  CubePuzzle_0.call(this, 2);
  this.wcaMinScrambleDistance = 4;
  this.twoSolver = new TwoByTwoSolver_0;
}

defineSeed(469, 428, makeCastMap([Q$CubePuzzle, Q$TwoByTwoCubePuzzle, Q$Puzzle, Q$Exportable]), TwoByTwoCubePuzzle_0);
_.generateRandomMoves_0 = function generateRandomMoves_12(r){
  var ab, e, scramble, state, state_0;
  state = (state_0 = new TwoByTwoSolver$TwoByTwoState_0 , state_0.permutation = $nextInt(r, 5040) , state_0.orientation = $nextInt(r, 729) , state_0);
  scramble = $solve_1(this.twoSolver, state, 11, true, true);
  $clinit_GwtSafeUtils();
  azzertEquals(valueOf_0($split(scramble, ' ', 0).length), valueOf_0(11));
  ab = new AlgorithmBuilder_0(this, 1);
  try {
    $appendAlgorithm(ab, scramble);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, Q$InvalidMoveException)) {
      e = $e0;
      azzert_3(false, new InvalidScrambleException_0(scramble, e));
    }
     else 
      throw $e0;
  }
  return new PuzzleStateAndGenerator_0((azzert_1(ab.states.size == ab.moves.size + 1) , dynamicCast($get_4(ab.states, ab.states.size - 1), Q$Puzzle$PuzzleState)), join(ab.moves, ' '));
}
;
_.solveIn_0 = function solveIn_4(ps, n){
  var cs, solution;
  cs = dynamicCast(ps, Q$CubePuzzle$CubeState);
  solution = $solve_1(this.twoSolver, $toTwoByTwoState(cs), n, false, false);
  return solution;
}
;
_.twoSolver = null;
function $export_14(this$static){
  if (!exported_14) {
    exported_14 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_puzzle_TwoByTwoCubePuzzle_2_classLit, this$static);
    $export0_14(this$static);
  }
}

function $export0_14(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.puzzle.TwoByTwoCubePuzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.puzzle.TwoByTwoCubePuzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0])?(g = a[0]):a.length == 0 && (g = new TwoByTwoCubePuzzle_0);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.puzzle.TwoByTwoCubePuzzle.prototype = new Object;
  __0.generateRandomMoves = $entry(function(a0){
    return this.g.generateRandomMoves_0(gwtInstance(a0));
  }
  );
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getDefaultColorScheme = $entry(function(){
    return this.g.getDefaultColorScheme_0();
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return runDispatch(this.g, Lnet_gnehzr_tnoodle_puzzle_TwoByTwoCubePuzzle_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.getSolvedState = $entry(function(){
    return this.g.getSolvedState_1();
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  registerDispatchMap(Lnet_gnehzr_tnoodle_puzzle_TwoByTwoCubePuzzle_2_classLit, {0:{0:[[function(){
    return this.getPreferredSize_0.apply(this, arguments);
  }
  , null, undefined]], 2:[[function(){
    return this.getPreferredSize_1.apply(this, arguments);
  }
  , null, undefined, 'number', 'number']]}}, false);
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.puzzle.TwoByTwoCubePuzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.puzzle.TwoByTwoCubePuzzle[p] = pkg[p]);
}

function TwoByTwoCubePuzzle_ExporterImpl_0(){
  $export_14(this);
}

defineSeed(470, 1, {}, TwoByTwoCubePuzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_14(o){
  return o != null && instanceOf(o, Q$TwoByTwoCubePuzzle);
}
;
var exported_14 = false;
function $clinit_TwoByTwoSolver(){
  $clinit_TwoByTwoSolver = nullMethod;
  moveToString_0 = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ['U', 'U2', "U'", 'R', 'R2', "R'", 'F', 'F2', "F'"]);
  inverseMoveToString_0 = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, ["U'", 'U2', 'U', "R'", 'R2', 'R', "F'", 'F2', 'F']);
  fact_4 = initValues(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, [1, 1, 2, 6, 24, 120, 720]);
  movePerm = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [5040, 9], 2, 1);
  moveOrient = initDims([_3_3I_classLit, _3I_classLit], [makeCastMap([Q$int_$2, Q$Serializable, Q$Object_$1]), makeCastMap([Q$int_$1, Q$Serializable])], [Q$int_$1, -1], [729, 9], 2, 1);
  prunPerm_0 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 5040, 1);
  prunOrient_0 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 729, 1);
  initMoves_0();
  initPrun_0();
}

function $computeCost(this$static, solution, index, current_cost, grip){
  if (index < 0) {
    return current_cost;
  }
  switch (solution[index]) {
    case 0:
      return $computeCost(this$static, solution, index - 1, current_cost + 7, grip);
    case 1:
      return $computeCost(this$static, solution, index - 1, current_cost + 10, grip);
    case 2:
      return grip == 0?$computeCost(this$static, solution, index - 1, current_cost + 8, 0):grip == -1?min($computeCost(this$static, solution, index - 1, current_cost + 20 + 8, 0), $computeCost(this$static, solution, index - 1, current_cost + 20, -1)):$computeCost(this$static, solution, index - 1, current_cost + 20 + 8, 0);
    case 3:
      return grip > -1?$computeCost(this$static, solution, index - 1, current_cost + 6, grip - 1):$computeCost(this$static, solution, index - 1, current_cost + 20 + 6, -1);
    case 4:
      return grip != 0?$computeCost(this$static, solution, index - 1, current_cost + 10, -grip):min($computeCost(this$static, solution, index - 1, current_cost + 20 + 10, -1), $computeCost(this$static, solution, index - 1, current_cost + 20 + 10, 1));
    case 5:
      return grip < 1?$computeCost(this$static, solution, index - 1, current_cost + 6, grip + 1):$computeCost(this$static, solution, index - 1, current_cost + 20 + 6, 1);
    case 6:
      return grip != 0?$computeCost(this$static, solution, index - 1, current_cost + 19, grip):min($computeCost(this$static, solution, index - 1, current_cost + 20 + 19, -1), $computeCost(this$static, solution, index - 1, current_cost + 20 + 19, 1));
    case 7:
      return grip == -1?$computeCost(this$static, solution, index - 1, current_cost + 30, -1):$computeCost(this$static, solution, index - 1, current_cost + 20 + 30, -1);
    case 8:
      return grip == -1?$computeCost(this$static, solution, index - 1, current_cost + 10, -1):$computeCost(this$static, solution, index - 1, current_cost + 20 + 10, -1);
    default:azzert_1(false);
  }
  return -1;
}

function $search_1(this$static, perm, orient, depth, length_0, last_move, solution, best_solution){
  var cost, move, newOrient, newPerm, solutionFound;
  if (length_0 == 0) {
    if (perm == 0 && orient == 0) {
      cost = $computeCost(this$static, solution, depth, 0, 0);
      if (cost < best_solution[depth]) {
        arraycopy(solution, 0, best_solution, 0, depth);
        best_solution[depth] = cost;
      }
      return true;
    }
    return false;
  }
  if (prunPerm_0[perm] > length_0 || prunOrient_0[orient] > length_0) {
    return false;
  }
  solutionFound = false;
  for (move = 0; move < 9; ++move) {
    if (~~(move / 3) == ~~(last_move / 3)) {
      continue;
    }
    newPerm = movePerm[perm][move];
    newOrient = moveOrient[orient][move];
    solution[depth] = move;
    solutionFound = solutionFound | $search_1(this$static, newPerm, newOrient, depth + 1, length_0 - 1, move, solution, best_solution);
  }
  return solutionFound;
}

function $solve_1(this$static, state, desiredLength, exactLength, inverse){
  var best_solution, foundSolution, l_0, length_0, scramble, solution;
  solution = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 20, 1);
  best_solution = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 21, 1);
  foundSolution = false;
  length_0 = exactLength?desiredLength:0;
  while (length_0 <= desiredLength) {
    best_solution[length_0] = 42424242;
    if ($search_1(this$static, state.permutation, state.orientation, 0, length_0, 42, solution, best_solution)) {
      foundSolution = true;
      break;
    }
    ++length_0;
  }
  if (!foundSolution) {
    return null;
  }
  if (length_0 == 0) {
    return '';
  }
  scramble = new StringBuilder_1;
  if (inverse) {
    $append_5(scramble, inverseMoveToString_0[best_solution[length_0 - 1]]);
    for (l_0 = length_0 - 2; l_0 >= 0; --l_0) {
      $append_5((scramble.impl.append_2(scramble.data, ' ') , scramble), inverseMoveToString_0[best_solution[l_0]]);
    }
  }
   else {
    $append_5(scramble, moveToString_0[best_solution[0]]);
    for (l_0 = 1; l_0 < length_0; ++l_0) {
      $append_5((scramble.impl.append_2(scramble.data, ' ') , scramble), moveToString_0[best_solution[l_0]]);
    }
  }
  return scramble.impl.toString_0(scramble.data);
}

function TwoByTwoSolver_0(){
  $clinit_TwoByTwoSolver();
}

function cycle(cubies, a, b, c, d, times){
  var temp;
  temp = cubies[d];
  cubies[d] = cubies[c];
  cubies[c] = cubies[b];
  cubies[b] = cubies[a];
  cubies[a] = temp;
  times > 1 && cycle(cubies, a, b, c, d, times - 1);
}

function cycleAndOrient_0(cubies, a, b, c, d, times){
  var temp;
  temp = cubies[d];
  cubies[d] = (cubies[c] + 8) % 24;
  cubies[c] = (cubies[b] + 16) % 24;
  cubies[b] = (cubies[a] + 8) % 24;
  cubies[a] = (temp + 16) % 24;
  times > 1 && cycleAndOrient_0(cubies, a, b, c, d, times - 1);
}

function initMoves_0(){
  var cubies1, cubies2, move, newOrient, newPerm, orient, perm;
  cubies1 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 7, 1);
  cubies2 = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, 7, 1);
  for (perm = 0; perm < 5040; ++perm) {
    unpackPerm(perm, cubies1);
    for (move = 0; move < 9; ++move) {
      arraycopy(cubies1, 0, cubies2, 0, 7);
      moveCubies(cubies2, move);
      newPerm = packPerm(cubies2);
      movePerm[perm][move] = newPerm;
    }
  }
  for (orient = 0; orient < 729; ++orient) {
    unpackOrient(orient, cubies1);
    for (move = 0; move < 9; ++move) {
      arraycopy(cubies1, 0, cubies2, 0, 7);
      moveCubies(cubies2, move);
      newOrient = packOrient(cubies2);
      moveOrient[orient][move] = newOrient;
    }
  }
}

function initPrun_0(){
  var done, length_0, move, newOrient, newPerm, orient, perm;
  for (perm = 0; perm < 5040; ++perm) {
    prunPerm_0[perm] = -1;
  }
  prunPerm_0[0] = 0;
  done = 1;
  for (length_0 = 0; done < 5040; ++length_0) {
    for (perm = 0; perm < 5040; ++perm) {
      if (prunPerm_0[perm] == length_0) {
        for (move = 0; move < 9; ++move) {
          newPerm = movePerm[perm][move];
          if (prunPerm_0[newPerm] == -1) {
            prunPerm_0[newPerm] = length_0 + 1;
            ++done;
          }
        }
      }
    }
  }
  for (orient = 0; orient < 729; ++orient) {
    prunOrient_0[orient] = -1;
  }
  prunOrient_0[0] = 0;
  done = 1;
  for (length_0 = 0; done < 729; ++length_0) {
    for (orient = 0; orient < 729; ++orient) {
      if (prunOrient_0[orient] == length_0) {
        for (move = 0; move < 9; ++move) {
          newOrient = moveOrient[orient][move];
          if (prunOrient_0[newOrient] == -1) {
            prunOrient_0[newOrient] = length_0 + 1;
            ++done;
          }
        }
      }
    }
  }
}

function moveCubies(cubies, move){
  var face, times;
  face = ~~(move / 3);
  times = move % 3 + 1;
  switch (face) {
    case 0:
      cycle(cubies, 1, 3, 2, 0, times);
      break;
    case 1:
      cycleAndOrient_0(cubies, 0, 2, 6, 4, times);
      break;
    case 2:
      cycleAndOrient_0(cubies, 1, 0, 4, 5, times);
      break;
    default:azzert_1(false);
  }
}

function packOrient(cubies){
  $clinit_TwoByTwoSolver();
  var i_0, ori;
  ori = 0;
  for (i_0 = 0; i_0 < 6; ++i_0) {
    ori = 3 * ori + (~~cubies[i_0] >> 3);
  }
  return ori;
}

function packPerm(cubies){
  $clinit_TwoByTwoSolver();
  var i_0, idx, v, val;
  idx = 0;
  val = 106181136;
  for (i_0 = 0; i_0 < 6; ++i_0) {
    v = (cubies[i_0] & 7) << 2;
    idx = (7 - i_0) * idx + (~~val >> v & 7);
    val -= 17895696 << v;
  }
  return idx;
}

function unpackOrient(ori, cubies){
  var i_0, sum_ori;
  sum_ori = 0;
  for (i_0 = 5; i_0 >= 0; --i_0) {
    cubies[i_0] = ori % 3 << 3;
    sum_ori += ori % 3;
    ori = ~~(ori / 3);
  }
  cubies[6] = (42424242 - sum_ori) % 3 << 3;
}

function unpackPerm(perm, cubies){
  var i_0, m_0, p_0, v, val;
  val = 106181136;
  for (i_0 = 0; i_0 < 6; ++i_0) {
    p_0 = fact_4[6 - i_0];
    v = ~~(perm / p_0);
    perm -= v * p_0;
    v <<= 2;
    cubies[i_0] = ~~val >> v & 7;
    m_0 = (1 << v) - 1;
    val = (val & m_0) + (~~val >> 4 & ~m_0);
  }
  cubies[6] = val;
}

defineSeed(471, 1, {}, TwoByTwoSolver_0);
var fact_4, inverseMoveToString_0, moveOrient, movePerm, moveToString_0, prunOrient_0, prunPerm_0;
function TwoByTwoSolver$TwoByTwoState_0(){
}

defineSeed(472, 1, {}, TwoByTwoSolver$TwoByTwoState_0);
_.orientation = 0;
_.permutation = 0;
function $clinit_AlgorithmBuilder(){
  $clinit_AlgorithmBuilder = nullMethod;
  l_3 = ($clinit_Logger() , $getLoggerHelper(Lnet_gnehzr_tnoodle_scrambles_AlgorithmBuilder_2_classLit.typeName));
}

function $appendAlgorithm(this$static, algorithm){
  var move, move$array, move$index, move$max;
  for (move$array = splitAlgorithm(algorithm) , move$index = 0 , move$max = move$array.length; move$index < move$max; ++move$index) {
    move = move$array[move$index];
    $appendMove(this$static, move);
  }
}

function $appendAlgorithms(this$static, algorithms){
  var algorithm, algorithm$index, algorithm$max;
  for (algorithm$index = 0 , algorithm$max = algorithms.length; algorithm$index < algorithm$max; ++algorithm$index) {
    algorithm = algorithms[algorithm$index];
    $appendAlgorithm(this$static, algorithm);
  }
}

function $appendMove(this$static, newMove){
  var i_0, indexAndMove, newCostMove, oldCostMove;
  $fine_0(l_3, 'appendMove(' + newMove + ')');
  indexAndMove = $findBestIndexForMove(this$static, newMove, this$static.mergingMode);
  if (indexAndMove.index_0 < this$static.moves.size) {
    azzert_1(this$static.mergingMode != 0);
    oldCostMove = dynamicCast($get_4(this$static.states, indexAndMove.index_0), Q$Puzzle$PuzzleState).getMoveCost(dynamicCast($get_4(this$static.moves, indexAndMove.index_0), Q$String));
    if (indexAndMove.move == null) {
      $remove_5(this$static.moves, indexAndMove.index_0);
      $remove_5(this$static.states, indexAndMove.index_0 + 1);
      newCostMove = 0;
    }
     else {
      $set_7(this$static.moves, indexAndMove.index_0, indexAndMove.move);
      newCostMove = dynamicCast($get_4(this$static.states, indexAndMove.index_0), Q$Puzzle$PuzzleState).getMoveCost(indexAndMove.move);
    }
  }
   else {
    oldCostMove = 0;
    newCostMove = dynamicCast($get_4(this$static.states, this$static.states.size - 1), Q$Puzzle$PuzzleState).getMoveCost(indexAndMove.move);
    $add_6(this$static.moves, indexAndMove.move);
    $add_6(this$static.states, null);
  }
  this$static.totalCost += newCostMove - oldCostMove;
  for (i_0 = indexAndMove.index_0 + 1; i_0 < this$static.states.size; ++i_0) {
    $set_7(this$static.states, i_0, $apply(dynamicCast($get_4(this$static.states, i_0 - 1), Q$Puzzle$PuzzleState), dynamicCast($get_4(this$static.moves, i_0 - 1), Q$String)));
  }
  this$static.unNormalizedState = $apply(this$static.unNormalizedState, newMove);
  azzert_1(this$static.states.size == this$static.moves.size + 1);
  azzert_1($equalsNormalized(this$static.unNormalizedState, (azzert_1(this$static.states.size == this$static.moves.size + 1) , dynamicCast($get_4(this$static.states, this$static.states.size - 1), Q$Puzzle$PuzzleState))));
}

function $findBestIndexForMove(this$static, move, mergingMode){
  var alternateLastMove, lastMove, lastMoveIndex, newNormalizedState, newUnNormalizedState, ps, ps$iterator, stateAfterLastMove, stateAfterLastMoveAndNewMove, stateBeforeLastMove, successors;
  if (mergingMode == 0) {
    return new AlgorithmBuilder$IndexAndMove_0(this$static.moves.size, move);
  }
  newUnNormalizedState = $apply(this$static.unNormalizedState, move);
  if ($equalsNormalized(newUnNormalizedState, this$static.unNormalizedState)) {
    if (mergingMode == 1) {
      return new AlgorithmBuilder$IndexAndMove_0(0, null);
    }
  }
  newNormalizedState = newUnNormalizedState.getNormalized();
  successors = (azzert_1(this$static.states.size == this$static.moves.size + 1) , dynamicCast($get_4(this$static.states, this$static.states.size - 1), Q$Puzzle$PuzzleState)).getCanonicalMovesByState();
  move = null;
  for (ps$iterator = $iterator($keySet(successors)); ps$iterator.val$outerIter.hasNext();) {
    ps = dynamicCast($next_2(ps$iterator), Q$Puzzle$PuzzleState);
    if (ps.getNormalized().equals$(newNormalizedState.getNormalized())) {
      move = dynamicCast(successors.get(ps), Q$String);
      break;
    }
  }
  azzert_1(move != null);
  if (mergingMode == 1) {
    for (lastMoveIndex = this$static.moves.size - 1; lastMoveIndex >= 0; --lastMoveIndex) {
      lastMove = dynamicCast($get_4(this$static.moves, lastMoveIndex), Q$String);
      stateBeforeLastMove = dynamicCast($get_4(this$static.states, lastMoveIndex), Q$Puzzle$PuzzleState);
      if (!$movesCommute(stateBeforeLastMove, lastMove, move)) {
        break;
      }
      stateAfterLastMove = dynamicCast($get_4(this$static.states, lastMoveIndex + 1), Q$Puzzle$PuzzleState);
      stateAfterLastMoveAndNewMove = $apply(stateAfterLastMove, move);
      if (stateBeforeLastMove.getNormalized().equals$(stateAfterLastMoveAndNewMove.getNormalized())) {
        return new AlgorithmBuilder$IndexAndMove_0(lastMoveIndex, null);
      }
       else {
        successors = stateBeforeLastMove.getCanonicalMovesByState();
        for (ps$iterator = $iterator($keySet(successors)); ps$iterator.val$outerIter.hasNext();) {
          ps = dynamicCast($next_2(ps$iterator), Q$Puzzle$PuzzleState);
          if (ps.getNormalized().equals$(stateAfterLastMoveAndNewMove.getNormalized())) {
            alternateLastMove = dynamicCast(successors.get(ps), Q$String);
            return new AlgorithmBuilder$IndexAndMove_0(lastMoveIndex, alternateLastMove);
          }
        }
      }
    }
  }
  return new AlgorithmBuilder$IndexAndMove_0(this$static.moves.size, move);
}

function $isRedundant(this$static, move){
  var indexAndMove;
  indexAndMove = $findBestIndexForMove(this$static, move, 1);
  return indexAndMove.index_0 < this$static.moves.size || indexAndMove.move == null;
}

function $popMove(this$static, index){
  var e, move, move$iterator, movesCopy, poppedMove;
  movesCopy = new ArrayList_2(this$static.moves);
  poppedMove = dynamicCast($remove_5(movesCopy, index), Q$String);
  $resetToState(this$static, this$static.originalState);
  for (move$iterator = new AbstractList$IteratorImpl_0(movesCopy); move$iterator.i < move$iterator.this$0_0.size_0();) {
    move = dynamicCast($next_1(move$iterator), Q$String);
    try {
      $appendMove(this$static, move);
    }
     catch ($e0) {
      $e0 = caught_0($e0);
      if (instanceOf($e0, Q$InvalidMoveException)) {
        e = $e0;
        azzert_3(false, e);
      }
       else 
        throw $e0;
    }
  }
  return poppedMove;
}

function $resetToState(this$static, originalState){
  this$static.totalCost = 0;
  this$static.originalState = originalState;
  this$static.unNormalizedState = originalState;
  $clear(this$static.moves);
  $clear(this$static.states);
  $add_6(this$static.states, this$static.unNormalizedState);
}

function AlgorithmBuilder_0(puzzle, mergingMode){
  $clinit_AlgorithmBuilder();
  AlgorithmBuilder_1.call(this, mergingMode, puzzle.getSolvedState_0());
}

function AlgorithmBuilder_1(mergingMode, originalState){
  $clinit_AlgorithmBuilder();
  this.moves = new ArrayList_0;
  this.states = new ArrayList_0;
  this.mergingMode = mergingMode;
  $resetToState(this, originalState);
}

function splitAlgorithm(algorithm){
  $clinit_AlgorithmBuilder();
  if (!$trim(algorithm).length) {
    return initDim(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1, Q$String_$1]), Q$String, 0, 0);
  }
  return $split(algorithm, '\\s+', 0);
}

defineSeed(473, 1, {}, AlgorithmBuilder_0, AlgorithmBuilder_1);
_.toString$ = function toString_40(){
  return join(this.moves, ' ');
}
;
_.mergingMode = 0;
_.originalState = null;
_.totalCost = 0;
_.unNormalizedState = null;
var l_3;
function AlgorithmBuilder$IndexAndMove_0(index, move){
  this.index_0 = index;
  this.move = move;
}

defineSeed(474, 1, {}, AlgorithmBuilder$IndexAndMove_0);
_.toString$ = function toString_41(){
  return '{ index: ' + this.index_0 + ' move: ' + this.move + ' }';
}
;
_.index_0 = 0;
_.move = null;
function InvalidMoveException_0(move){
  Exception_0.call(this, 'Invalid move: ' + move);
}

defineSeed(475, 13, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable, Q$InvalidMoveException]), InvalidMoveException_0);
function InvalidScrambleException_0(scramble, t){
  Throwable_1.call(this, 'Invalid scramble: ' + scramble, t);
}

defineSeed(476, 13, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable, Q$InvalidScrambleException]), InvalidScrambleException_0);
function $compareTo_6(this$static, other){
  return this$static.value - other.value;
}

function Puzzle$Bucket_0(value){
  this.value = value;
  this.contents = new LinkedList_0;
}

defineSeed(477, 1, makeCastMap([Q$Comparable, Q$Puzzle$Bucket]), Puzzle$Bucket_0);
_.compareTo$ = function compareTo_8(other){
  return $compareTo_6(this, dynamicCast(other, Q$Puzzle$Bucket));
}
;
_.equals$ = function equals_34(o){
  var other;
  other = dynamicCast(o, Q$Puzzle$Bucket);
  return this.value == other.value;
}
;
_.hashCode$ = function hashCode_35(){
  return this.value;
}
;
_.toString$ = function toString_42(){
  return '#: ' + this.value + ': ' + $toString_2(this.contents);
}
;
_.contents = null;
_.value = 0;
function $add_9(this$static, element, value){
  var bucket, searchBucket;
  searchBucket = new Puzzle$Bucket_0(value);
  if ($contains_1(this$static.buckets, searchBucket)) {
    bucket = dynamicCast($tailSet(this$static.buckets, searchBucket).map.firstKey(), Q$Puzzle$Bucket);
  }
   else {
    bucket = searchBucket;
    $add_8(this$static.buckets, bucket);
  }
  $addLast(bucket.contents, element);
}

function Puzzle$SortedBuckets_0(){
  this.buckets = new TreeSet_0;
}

defineSeed(478, 1, {}, Puzzle$SortedBuckets_0);
_.equals$ = function equals_35(o){
  throw new UnsupportedOperationException_0;
}
;
_.hashCode$ = function hashCode_36(){
  throw new UnsupportedOperationException_0;
}
;
_.toString$ = function toString_43(){
  return $toString_2(this.buckets);
}
;
_.buckets = null;
function $toJsonable(this$static){
  var dim, jsonColorScheme, jsonable, key, key$iterator;
  jsonable = new HashMap_0;
  dim = new HashMap_0;
  dim.put('width', valueOf_0(this$static.size.width_0));
  dim.put('height', valueOf_0(this$static.size.height_0));
  jsonable.put('size', dim);
  jsonColorScheme = new HashMap_0;
  for (key$iterator = $iterator($keySet(this$static.colorScheme)); key$iterator.val$outerIter.hasNext();) {
    key = dynamicCast($next_2(key$iterator), Q$String);
    jsonColorScheme.put(key, $substring(toPowerOfTwoString(16777216 | $getRGB(dynamicCast(this$static.colorScheme.get(key), Q$Color)) & 16777215), 1));
  }
  jsonable.put('colorScheme', jsonColorScheme);
  return jsonable;
}

function PuzzleImageInfo_0(p_0){
  this.colorScheme = p_0.getDefaultColorScheme_0();
  this.size = p_0.getPreferredSize_0();
}

defineSeed(479, 1, {}, PuzzleImageInfo_0);
_.colorScheme = null;
_.size = null;
function PuzzleStateAndGenerator_0(state, generator){
  this.state = state;
  this.generator = generator;
}

defineSeed(480, 1, {}, PuzzleStateAndGenerator_0);
_.generator = null;
_.state = null;
function $export_15(this$static){
  if (!exported_15) {
    exported_15 = true;
    $clinit_ExporterUtil();
    $addExporter(impl_8, Lnet_gnehzr_tnoodle_scrambles_Puzzle_2_classLit, this$static);
    $export0_15(this$static);
  }
}

function $export0_15(this$static){
  var pkg = declarePackage('net.gnehzr.tnoodle.scrambles.Puzzle');
  var __0, __ = this$static;
  $wnd.net.gnehzr.tnoodle.scrambles.Puzzle = $entry(function(){
    var g, j = this, a = arguments;
    a.length == 1 && __.isAssignable(a[0]) && (g = a[0]);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = $wnd.net.gnehzr.tnoodle.scrambles.Puzzle.prototype = new Object;
  __0.generateScramble = $entry(function(){
    return this.g.generateScramble_0();
  }
  );
  __0.generateScrambles = $entry(function(a0){
    return wrap(this.g.generateScrambles_0(a0));
  }
  );
  __0.generateSeededScramble = $entry(function(a0){
    return this.g.generateSeededScramble_0(a0);
  }
  );
  __0.generateSeededScrambles = $entry(function(a0, a1){
    return wrap(this.g.generateSeededScrambles_0(a0, a1));
  }
  );
  __0.getFaceNames = $entry(function(){
    return wrap(this.g.getFaceNames_0());
  }
  );
  __0.getLongName = $entry(function(){
    return this.g.getLongName_0();
  }
  );
  __0.getPreferredSize = $entry(function(a0, a1){
    return this.g.getPreferredSize_1(a0, a1);
  }
  );
  __0.getShortName = $entry(function(){
    return this.g.getShortName_0();
  }
  );
  __0.toString = $entry(function(){
    return this.g.toString$();
  }
  );
  if (pkg)
    for (p in pkg)
      $wnd.net.gnehzr.tnoodle.scrambles.Puzzle[p] === undefined && ($wnd.net.gnehzr.tnoodle.scrambles.Puzzle[p] = pkg[p]);
}

function Puzzle_ExporterImpl_0(){
  $export_15(this);
}

defineSeed(481, 1, {}, Puzzle_ExporterImpl_0);
_.isAssignable = function isAssignable_15(o){
  return o != null && instanceOf(o, Q$Puzzle);
}
;
var exported_15 = false;
function $$init_8(this$static){
  this$static.transform = new Transform_0;
}

function $addIndentation(sb, level){
  var i_0;
  for (i_0 = 0; i_0 < level; ++i_0) {
    sb.impl.append_2(sb.data, '\t');
  }
}

function $appendChild_0(this$static, child){
  $add_6(this$static.children, child);
}

function $buildString(this$static, sb, level){
  var child, child$iterator, key, key$iterator, value;
  $addIndentation(sb, level);
  $append_5((sb.impl.append_2(sb.data, '<') , sb), this$static.tag);
  for (key$iterator = $iterator($keySet(this$static.attributes)); key$iterator.val$outerIter.hasNext();) {
    key = dynamicCast($next_2(key$iterator), Q$String);
    value = dynamicCast(this$static.attributes.get(key), Q$String);
    sb.impl.append_2(sb.data, ' ');
    $append_3($append_5($append_3($append_5((sb.impl.append_2(sb.data, key) , sb), '='), 34), value), 34);
  }
  this$static.style_0.size_0() > 0 && $append_3($append_5((sb.impl.append_2(sb.data, ' style="') , sb), $toStyleStr(this$static)), 34);
  $isIdentity(this$static.transform) || $append_3($append_5((sb.impl.append_2(sb.data, ' transform="') , sb), $toSvgTransform(this$static.transform)), 34);
  sb.impl.append_2(sb.data, '>');
  this$static.content_0 != null && $append_5(sb, this$static.content_0);
  for (child$iterator = new AbstractList$IteratorImpl_0(this$static.children); child$iterator.i < child$iterator.this$0_0.size_0();) {
    child = dynamicCast($next_1(child$iterator), Q$Element);
    sb.impl.append_2(sb.data, '\n');
    child.buildString(sb, level + 1);
  }
  sb.impl.append_2(sb.data, '\n');
  $addIndentation(sb, level);
  $append_5($append_5((sb.impl.append_2(sb.data, '<\/') , sb), this$static.tag), '>');
}

function $copyChildren(this$static){
  var child, child$iterator, childrenCopy;
  childrenCopy = new ArrayList_0;
  for (child$iterator = new AbstractList$IteratorImpl_0(this$static.children); child$iterator.i < child$iterator.this$0_0.size_0();) {
    child = dynamicCast($next_1(child$iterator), Q$Element);
    $add_6(childrenCopy, new Element_2(child));
  }
  return childrenCopy;
}

function $setAttribute(this$static, key, value){
  azzert(key != 'style');
  this$static.attributes.put(key, value);
}

function $setFill(this$static, c){
  $setAttribute(this$static, 'fill', !c?'none':'#' + $substring(toPowerOfTwoString(16777216 | $getRGB(c) & 16777215), 1));
}

function $setStroke(this$static){
  this$static.style_0.put('stroke-width', '2px');
  this$static.style_0.put('stroke-miterlimit', '10');
  this$static.style_0.put('stroke-linejoin', 'round');
}

function $setStroke_0(this$static, c){
  $setAttribute(this$static, 'stroke', !c?'none':'#' + $substring(toPowerOfTwoString(16777216 | $getRGB(c) & 16777215), 1));
}

function $toString_5(this$static){
  var sb;
  sb = new StringBuilder_0;
  this$static.buildString(sb, 0);
  return sb.impl.toString_0(sb.data);
}

function $toStyleStr(this$static){
  var key, key$iterator, sb, value;
  sb = new StringBuilder_0;
  for (key$iterator = $iterator($keySet(this$static.style_0)); key$iterator.val$outerIter.hasNext();) {
    key = dynamicCast($next_2(key$iterator), Q$String);
    value = dynamicCast(this$static.style_0.get(key), Q$String);
    $append_5($append_5($append_5($append_5((sb.impl.append_2(sb.data, ' ') , sb), key), ':'), value), ';');
  }
  if (sb.impl.length_0(sb.data) == 0) {
    return '';
  }
  return $substring(sb.impl.toString_0(sb.data), 1);
}

function Element_1(tag){
  $$init_8(this);
  this.tag = tag;
  this.children = new ArrayList_0;
  this.attributes = new HashMap_0;
  this.style_0 = new HashMap_0;
  this.content_0 = null;
}

function Element_2(e){
  $$init_8(this);
  this.tag = e.tag;
  this.attributes = new HashMap_1(e.attributes);
  this.style_0 = new HashMap_1(e.style_0);
  this.children = $copyChildren(e);
  this.content_0 = this.content_0;
}

defineSeed(484, 1, makeCastMap([Q$Element]), Element_2);
_.buildString = function buildString(sb, level){
  $buildString(this, sb, level);
}
;
_.toString$ = function toString_44(){
  return $toString_5(this);
}
;
_.attributes = null;
_.children = null;
_.content_0 = null;
_.style_0 = null;
_.tag = null;
defineSeed(483, 484, makeCastMap([Q$Element]));
function Circle_0(cx, cy, r){
  Element_1.call(this, 'ellipse');
  azzert('cx' != 'style');
  this.attributes.put('cx', '' + cx);
  azzert('cy' != 'style');
  this.attributes.put('cy', '' + cy);
  azzert('rx' != 'style');
  this.attributes.put('rx', '' + r);
  azzert('ry' != 'style');
  this.attributes.put('ry', '' + r);
}

function Circle_1(c){
  Element_2.call(this, c);
}

defineSeed(482, 483, makeCastMap([Q$Element]), Circle_0, Circle_1);
function $clinit_Color(){
  $clinit_Color = nullMethod;
  RED = new Color_1(255, 0, 0);
  GREEN = new Color_1(0, 255, 0);
  BLUE = new Color_1(0, 0, 255);
  WHITE = new Color_1(255, 255, 255);
  BLACK = new Color_1(0, 0, 0);
  GRAY = new Color_1(128, 128, 128);
  YELLOW = new Color_1(255, 255, 0);
}

function $getRGB(this$static){
  return this$static.a_0 << 24 | this$static.r << 16 | this$static.g_0 << 8 | this$static.b;
}

function Color_0(rgba){
  $clinit_Color();
  this.r = ~~rgba >>> 16 & 255;
  this.g_0 = ~~rgba >>> 8 & 255;
  this.b = rgba & 255;
  this.a_0 = ~~rgba >>> 24 & 255;
}

function Color_1(r, g, b){
  $clinit_Color();
  this.r = r;
  this.g_0 = g;
  this.b = b;
  this.a_0 = 255;
}

function Color_2(htmlHex){
  $clinit_Color();
  Color_0.call(this, hexToRGB(htmlHex));
}

function hexToRGB(htmlHex){
  var c0, c1, c2;
  htmlHex.indexOf('#') == 0 && (htmlHex = $substring(htmlHex, 1));
  switch (htmlHex.length) {
    case 3:
      c0 = htmlHex.charCodeAt(0);
      c1 = htmlHex.charCodeAt(1);
      c2 = htmlHex.charCodeAt(2);
      htmlHex = '' + String.fromCharCode(c0) + String.fromCharCode(c0) + String.fromCharCode(c1) + String.fromCharCode(c1) + String.fromCharCode(c2) + String.fromCharCode(c2);
    case 6:
      return __parseAndValidateInt(htmlHex, 16);
    default:throw new InvalidHexColorException_0(htmlHex);
  }
}

defineSeed(485, 1, makeCastMap([Q$Color]), Color_0, Color_1, Color_2);
_.toString$ = function toString_45(){
  return '<color #' + $substring(toPowerOfTwoString(16777216 | (this.a_0 << 24 | this.r << 16 | this.g_0 << 8 | this.b) & 16777215), 1) + '>';
}
;
_.a_0 = 0;
_.b = 0;
_.g_0 = 0;
_.r = 0;
var BLACK, BLUE, GRAY, GREEN, RED, WHITE, YELLOW;
function Dimension_0(width, height){
  this.width_0 = width;
  this.height_0 = height;
}

defineSeed(486, 1, {}, Dimension_0);
_.toString$ = function toString_46(){
  return '<' + Lnet_gnehzr_tnoodle_svglite_Dimension_2_classLit.typeName + ' width=' + this.width_0 + ' height=' + this.height_0 + '>';
}
;
_.height_0 = 0;
_.width_0 = 0;
function Group_0(){
  Element_1.call(this, 'g');
}

defineSeed(487, 484, makeCastMap([Q$Element]), Group_0);
function InvalidHexColorException_0(invalidHex){
  Exception_0.call(this, invalidHex);
}

defineSeed(488, 13, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable, Q$InvalidHexColorException]), InvalidHexColorException_0);
function $closePath(this$static){
  azzert_0(!!this$static.commands);
  $add_6(this$static.commands, new Path$Command_0(4, null));
}

function $getD(this$static){
  var c, c$iterator, sb;
  sb = new StringBuilder_0;
  for (c$iterator = new AbstractList$IteratorImpl_0(this$static.commands); c$iterator.i < c$iterator.this$0_0.size_0();) {
    c = dynamicCast($next_1(c$iterator), Q$Path$Command);
    $append_5(sb, ' ' + $toString_6(c));
  }
  if (sb.impl.length_0(sb.data) == 0) {
    return '';
  }
  return $substring(sb.impl.toString_0(sb.data), 1);
}

function $lineTo(this$static, x, y){
  var coords;
  azzert_0(!!this$static.commands);
  coords = initValues(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, [x, y]);
  $add_6(this$static.commands, new Path$Command_0(1, coords));
}

function $moveTo(this$static, x, y){
  var coords;
  !this$static.commands && (this$static.commands = new ArrayList_0);
  coords = initValues(_3D_classLit, makeCastMap([Q$double_$1, Q$Serializable]), -1, [x, y]);
  $add_6(this$static.commands, new Path$Command_0(0, coords));
}

function $translate(this$static, x, y){
  var c, c$iterator;
  for (c$iterator = new AbstractList$IteratorImpl_0(this$static.commands); c$iterator.i < c$iterator.this$0_0.size_0();) {
    c = dynamicCast($next_1(c$iterator), Q$Path$Command);
    switch (c.type_0) {
      case 0:
      case 1:
        c.coords[0] += x;
        c.coords[1] += y;
        break;
      case 4:
        break;
      default:azzert(false);
    }
  }
}

function Path_0(){
  Element_1.call(this, 'path');
}

function Path_1(p_0){
  Element_2.call(this, p_0);
  !!p_0.commands && (this.commands = new ArrayList_2(p_0.commands));
}

defineSeed(489, 484, makeCastMap([Q$Element, Q$Path]), Path_0, Path_1);
_.buildString = function buildString_0(sb, level){
  $setAttribute(this, 'd', $getD(this));
  $buildString(this, sb, level);
}
;
_.commands = null;
function $toString_6(this$static){
  var i_0, sb;
  sb = new StringBuilder_0;
  $append_3(sb, $charAt('MLTCZ', this$static.type_0));
  for (i_0 = 0; this$static.coords != null && i_0 < this$static.coords.length; ++i_0) {
    sb.impl.append_2(sb.data, ' ');
    $append_4(sb, this$static.coords[i_0]);
  }
  return sb.impl.toString_0(sb.data);
}

function Path$Command_0(type, coords){
  this.type_0 = type;
  this.coords = coords;
}

defineSeed(490, 1, makeCastMap([Q$Path$Command]), Path$Command_0);
_.toString$ = function toString_47(){
  return $toString_6(this);
}
;
_.coords = null;
_.type_0 = 0;
function $currentSegment(this$static, coords){
  var command, i_0;
  command = dynamicCast($get_4(this$static.commands, this$static.index_0), Q$Path$Command);
  azzert(coords.length >= command.coords.length);
  for (i_0 = 0; i_0 < command.coords.length; ++i_0) {
    coords[i_0] = command.coords[i_0];
  }
  return command.type_0;
}

function PathIterator_0(p_0){
  this.index_0 = 0;
  this.commands = p_0.commands;
}

defineSeed(491, 1, {}, PathIterator_0);
_.commands = null;
_.index_0 = 0;
function Point2D$Double_0(x, y){
  this.x = x;
  this.y = y;
}

defineSeed(492, 1, makeCastMap([Q$Point2D$Double]), Point2D$Double_0);
_.x = 0;
_.y = 0;
function Rectangle_0(x, y, width, height){
  Element_1.call(this, 'rect');
  azzert('x' != 'style');
  this.attributes.put('x', '' + x);
  azzert('y' != 'style');
  this.attributes.put('y', '' + y);
  azzert('width' != 'style');
  this.attributes.put('width', '' + width);
  azzert('height' != 'style');
  this.attributes.put('height', '' + height);
}

function Rectangle_1(r){
  Element_2.call(this, r);
}

defineSeed(493, 484, makeCastMap([Q$Element]), Rectangle_0, Rectangle_1);
function Svg_0(size){
  Element_1.call(this, 'svg');
  $setAttribute(this, 'width', '' + size.width_0 + 'px');
  $setAttribute(this, 'height', '' + size.height_0 + 'px');
  $setAttribute(this, 'viewBox', '0 0 ' + size.width_0 + ' ' + size.height_0);
  azzert('version' != 'style');
  this.attributes.put('version', '1.1');
  azzert('xmlns' != 'style');
  this.attributes.put('xmlns', 'http://www.w3.org/2000/svg');
}

defineSeed(494, 484, makeCastMap([Q$Element]), Svg_0);
function Text_1(text, x, y){
  Element_1.call(this, 'text');
  this.content_0 = text;
  azzert('x' != 'style');
  this.attributes.put('x', '' + x);
  azzert('y' != 'style');
  this.attributes.put('y', '' + y);
}

defineSeed(495, 484, makeCastMap([Q$Element]), Text_1);
function $concatenate(this$static, that){
  var a, b, c, d, e, f;
  a = that.a_0 * this$static.a_0 + that.c * this$static.b;
  c = that.a_0 * this$static.c + that.c * this$static.d;
  e = that.a_0 * this$static.e + that.c * this$static.f + that.e;
  b = that.b * this$static.a_0 + that.d * this$static.b;
  d = that.b * this$static.c + that.d * this$static.d;
  f = that.b * this$static.e + that.d * this$static.f + that.f;
  this$static.a_0 = a;
  this$static.b = b;
  this$static.c = c;
  this$static.d = d;
  this$static.e = e;
  this$static.f = f;
}

function $isIdentity(this$static){
  return isNear(this$static.a_0, 1) && isNear(this$static.d, 1) && isNear(this$static.c, 0) && isNear(this$static.e, 0) && isNear(this$static.b, 0) && isNear(this$static.f, 0);
}

function $setToIdentity(this$static){
  this$static.a_0 = this$static.d = 1;
  this$static.c = this$static.e = this$static.b = this$static.f = 0;
}

function $setTransform(this$static, t){
  this$static.a_0 = t.a_0;
  this$static.b = t.b;
  this$static.c = t.c;
  this$static.d = t.d;
  this$static.e = t.e;
  this$static.f = t.f;
}

function $toSvgTransform(this$static){
  return 'matrix(' + this$static.a_0 + ',' + this$static.b + ',' + this$static.c + ',' + this$static.d + ',' + this$static.e + ',' + this$static.f + ')';
}

function Transform_0(){
  this.a_0 = this.d = 1;
  this.c = this.e = this.b = this.f = 0;
}

function Transform_1(a, b, c, d, e, f){
  this.a_0 = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.e = e;
  this.f = f;
}

function Transform_2(t){
  $setTransform(this, t);
}

function getRotateInstance(radians){
  var cos, sin;
  sin = Math.sin(radians);
  cos = Math.cos(radians);
  return new Transform_1(cos, sin, -sin, cos, 0, 0);
}

function getRotateInstance_0(radians, anchorx, anchory){
  var trans;
  trans = new Transform_0;
  $concatenate(trans, new Transform_1(1, 0, 0, 1, -anchorx, -anchory));
  $concatenate(trans, getRotateInstance(radians));
  $concatenate(trans, new Transform_1(1, 0, 0, 1, anchorx, anchory));
  return trans;
}

function isNear(a, b){
  return -1.0E-6 <= a - b && a - b <= 1.0E-6;
}

defineSeed(496, 1, makeCastMap([Q$Transform]), Transform_0, Transform_1, Transform_2);
_.a_0 = 0;
_.b = 0;
_.c = 0;
_.d = 0;
_.e = 0;
_.f = 0;
function azzert(expr){
  if (!expr) {
    throw new AssertionError_0;
  }
}

function azzert_0(expr){
  if (!expr) {
    throw new AssertionError_1('First command must be moveTo');
  }
}

function getenv(key){
  var val = null;
  if ($wnd.TNOODLE_ENV) {
    val = $wnd.TNOODLE_ENV[key];
    val === undefined && (val = null);
  }
  return val;
}

function $clinit_GwtSafeUtils(){
  $clinit_GwtSafeUtils = nullMethod;
  var orangeHeraldicTincture, timPurple;
  WCA_COLORS = new HashMap_0;
  timPurple = new Color_1(98, 50, 122);
  orangeHeraldicTincture = new Color_1(255, 128, 0);
  WCA_COLORS.put('y', ($clinit_Color() , YELLOW));
  WCA_COLORS.put('yellow', YELLOW);
  WCA_COLORS.put('b', BLUE);
  WCA_COLORS.put('blue', BLUE);
  WCA_COLORS.put('r', RED);
  WCA_COLORS.put('red', RED);
  WCA_COLORS.put('w', WHITE);
  WCA_COLORS.put('white', WHITE);
  WCA_COLORS.put('g', GREEN);
  WCA_COLORS.put('green', GREEN);
  WCA_COLORS.put('o', orangeHeraldicTincture);
  WCA_COLORS.put('orange', orangeHeraldicTincture);
  WCA_COLORS.put('p', timPurple);
  WCA_COLORS.put('purple', timPurple);
  WCA_COLORS.put('0', GRAY);
  WCA_COLORS.put('grey', GRAY);
  WCA_COLORS.put('gray', GRAY);
}

function azzert_1(expr){
  $clinit_GwtSafeUtils();
  if (!expr) {
    throw new AssertionError_0;
  }
}

function azzert_2(expr, message){
  $clinit_GwtSafeUtils();
  if (!expr) {
    throw new AssertionError_1(message);
  }
}

function azzert_3(expr, t){
  $clinit_GwtSafeUtils();
  if (!expr) {
    throw new AssertionError_1(t);
  }
}

function azzertEquals(a, b){
  $clinit_GwtSafeUtils();
  var equal;
  !a?(equal = !b):(equal = !!b && b.value == a.value);
  azzert_2(equal, a + ' should be equal to ' + b);
}

function choose(r, keySet){
  $clinit_GwtSafeUtils();
  var chosen, count, element, element$iterator;
  chosen = null;
  count = 0;
  for (element$iterator = $iterator(keySet); element$iterator.val$outerIter.hasNext();) {
    element = $next_2(element$iterator);
    $nextInt(r, ++count) == 0 && (chosen = element);
  }
  azzert_1(count > 0);
  return chosen;
}

function clone(src){
  $clinit_GwtSafeUtils();
  var dest;
  dest = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, src.length, 1);
  arraycopy(src, 0, dest, 0, src.length);
  return dest;
}

function copyOfRange(src, to){
  $clinit_GwtSafeUtils();
  var dest;
  dest = initDim(_3I_classLit, makeCastMap([Q$int_$1, Q$Serializable]), -1, to - 12, 1);
  arraycopy(src, 12, dest, 0, dest.length);
  return dest;
}

function deepCopy(src, dest){
  $clinit_GwtSafeUtils();
  var i_0;
  for (i_0 = 0; i_0 < src.length; ++i_0) {
    arraycopy(src[i_0], 0, dest[i_0], 0, src[i_0].length);
  }
}

function deepCopy_0(src, dest){
  $clinit_GwtSafeUtils();
  var i_0;
  for (i_0 = 0; i_0 < src.length; ++i_0) {
    deepCopy(src[i_0], dest[i_0]);
  }
}

function join(arr, separator){
  var maybeJsoInvocation;
  $clinit_GwtSafeUtils();
  var i_0, sb;
  separator == null && (separator = ',');
  sb = new StringBuilder_0;
  for (i_0 = 0; i_0 < arr.size; ++i_0) {
    i_0 > 0 && (sb.impl.append_2(sb.data, separator) , sb);
    $append_5(sb, (checkIndex(i_0, arr.size) , maybeJsoInvocation = arr.array[i_0] , isJavaObject(maybeJsoInvocation)?maybeJsoInvocation.toString$():maybeJsoInvocation.toString?maybeJsoInvocation.toString():'[JavaScriptObject]'));
  }
  return sb.impl.toString_0(sb.data);
}

function modulo(x, m_0){
  $clinit_GwtSafeUtils();
  var y;
  azzert_2(m_0 > 0, 'm must be > 0');
  y = x % m_0;
  y < 0 && (y += m_0);
  return y;
}

function reverseHashMap(map){
  $clinit_GwtSafeUtils();
  var a, a$iterator, b, reverseMap;
  reverseMap = new HashMap_0;
  for (a$iterator = $iterator($keySet(map)); a$iterator.val$outerIter.hasNext();) {
    a = $next_2(a$iterator);
    b = map.get(a);
    reverseMap.put(b, a);
  }
  return reverseMap;
}

var WCA_COLORS;
function $clinit_TimedLogRecordEnd(){
  $clinit_TimedLogRecordEnd = nullMethod;
  nf = ($clinit_NumberFormat() , new NumberFormat_1(['USD', 'US$', 2, 'US$', '$']));
}

function TimedLogRecordEnd_0(level, msg, extraMsg, startMillis, endMillis){
  var str;
  $clinit_TimedLogRecordEnd();
  LogRecord_0.call(this, level, (str = 'FINISHED ' + msg + ' (took ' + $format(nf, toDouble(div_0(sub(endMillis, startMillis), P3e8_longLit))) + ' seconds' , extraMsg != null && (str += ', ' + extraMsg) , str += ')' , str));
}

defineSeed(500, 418, makeCastMap([Q$Serializable]), TimedLogRecordEnd_0);
var nf;
function $finishedAt(this$static, endMillis, extraMsg){
  return new TimedLogRecordEnd_0(this$static.level, this$static.msg, extraMsg, this$static.startMillis, endMillis);
}

function $finishedNow(this$static, extraMsg){
  return $finishedAt(this$static, ($clinit_System() , fromDouble(currentTimeMillis0())), extraMsg);
}

function TimedLogRecordStart_0(level, msg){
  TimedLogRecordStart_1.call(this, level, msg, ($clinit_System() , fromDouble(currentTimeMillis0())));
}

function TimedLogRecordStart_1(level, msg, startMillis){
  LogRecord_0.call(this, level, 'STARTED ' + msg);
  this.startMillis = startMillis;
  this.msg = msg;
}

defineSeed(501, 418, makeCastMap([Q$Serializable]), TimedLogRecordStart_0);
_.msg = null;
_.startMillis = P0_longLit;
defineSeed(503, 1, {});
function $addExporter(this$static, c, o){
  this$static.exporterMap.put(c, o);
}

function $computeVarArguments(len, args){
  var ret = [];
  for (i = 0; i < len - 1; i++)
    ret.push(args[i]);
  var alen = args.length;
  var p_0 = len - 1;
  if (alen >= len && Object.prototype.toString.apply(args[p_0]) === '[object Array]') {
    ret.push(args[p_0]);
  }
   else {
    var a = [];
    for (i = p_0; i < alen; i++)
      a.push(args[i]);
    ret.push(a);
  }
  return ret;
}

function $declarePackage(qualifiedExportName){
  var i_0, l_0, o, prefix, superPackages;
  superPackages = $split(qualifiedExportName, '\\.', 0);
  prefix = $wnd;
  i_0 = 0;
  for (l_0 = superPackages.length - 1; i_0 < l_0; ++i_0) {
    if (!$equals_0(superPackages[i_0], 'client')) {
      prefix[superPackages[i_0]] || (prefix[superPackages[i_0]] = {});
      prefix = prefix != null?prefix[superPackages[i_0]]:null;
    }
  }
  o = prefix != null?prefix[superPackages[i_0]]:null;
  return o;
}

function $getMaxArity(jsoMap, meth){
  var o = jsoMap[meth];
  var r = 0;
  for (k in o)
    r = Math.max(r, k);
  return r;
}

function $registerDispatchMap(this$static, clazz, dispMap, isStatic){
  var jso, map;
  map = isStatic?this$static.staticDispatchMap:this$static.dispatchMap;
  jso = dynamicCastJso(map.get(clazz));
  !jso?(jso = dispMap):mergeJso(jso, dispMap);
  map.put(clazz, jso);
}

function $runDispatch(this$static, instance, clazz, meth, arguments_0, isStatic, isVarArgs){
  var args, dmap, i_0, l_0, ret;
  dmap = isStatic?this$static.staticDispatchMap:this$static.dispatchMap;
  if (isVarArgs) {
    for (l_0 = $getMaxArity(dynamicCastJso(dmap.get(clazz)), meth) , i_0 = l_0; i_0 >= 1; --i_0) {
      args = $computeVarArguments(i_0, arguments_0);
      ret = $runDispatch_0(instance, dmap, clazz, meth, args);
      if (!ret) {
        args = $unshift(instance, args);
        ret = $runDispatch_0(instance, dmap, clazz, meth, args);
      }
      if (ret) {
        return ret;
      }
    }
  }
   else {
    ret = $runDispatch_0(instance, dmap, clazz, meth, arguments_0);
    if (!ret) {
      arguments_0 = $unshift(instance, arguments_0);
      ret = $runDispatch_0(instance, dmap, clazz, meth, arguments_0);
    }
    if (ret) {
      return ret;
    }
  }
  throw new RuntimeException_1("Can't find exported method for given arguments: " + meth + ':' + arguments_0.length + '\n');
}

function $runDispatch_0(instance, dmap, clazz, meth, arguments_0){
  var aFunc, i_0, jFunc, l_0, r, sig, sigs, wFunc, x;
  sigs = dynamicCastJso(dmap.get(clazz))[meth][arguments_0.length];
  jFunc = null;
  wFunc = null;
  aFunc = null;
  for (i_0 = 0 , l_0 = !sigs?0:sigs.length; i_0 < l_0; ++i_0) {
    sig = sigs[i_0];
    if ($matches(sig, arguments_0)) {
      jFunc = sig[0];
      wFunc = sig[1];
      aFunc = sig[2];
      break;
    }
  }
  if (!jFunc) {
    return null;
  }
   else {
    arguments_0 = aFunc?aFunc(instance, arguments_0):arguments_0;
    r = (x = jFunc.apply(instance, arguments_0) , [wFunc?wFunc(x):x]);
    return r;
  }
}

function $toArrObject(j, ret){
  var i_0, l_0, o, s;
  s = j;
  l_0 = s.length;
  for (i_0 = 0; i_0 < l_0; ++i_0) {
    o = s[i_0];
    instanceOfJso(o) && getGwtInstance(dynamicCastJso(o)) != null && (o = getGwtInstance(dynamicCastJso(o)));
    setCheck(ret, i_0, o);
  }
  return ret;
}

function $unshift(o, arr){
  var ret = [o];
  for (i = 0; i < arr.length; i++)
    ret.push(arr[i]);
  return ret;
}

function ExporterBaseActual_0(){
  this.exporterMap = new HashMap_0;
  this.dispatchMap = new HashMap_0;
  this.staticDispatchMap = new HashMap_0;
}

function getGwtInstance(o){
  return o && o.g?o.g:null;
}

function isAssignableToClass(o, clazz){
  var sup;
  if (Ljava_lang_Object_2_classLit == clazz) {
    return true;
  }
  if (Lorg_timepedia_exporter_client_Exportable_2_classLit == clazz && instanceOf(o, Q$Exportable)) {
    return true;
  }
  if (o != null) {
    for (sup = getClass__devirtual$(o); !!sup && sup != Ljava_lang_Object_2_classLit; sup = sup.superclass) {
      if (sup == clazz) {
        return true;
      }
    }
  }
  return false;
}

function mergeJso(o1, o2){
  for (p in o2) {
    o1[p] = o2[p];
  }
}

defineSeed(502, 503, {}, ExporterBaseActual_0);
function $matches(this$static, arguments_0){
  var argJsType, gwt, i_0, isBoolean, isClass, isNumber, isPrimitive, jsType, l_0, o;
  for (i_0 = 0 , l_0 = arguments_0.length; i_0 < l_0; ++i_0) {
    jsType = this$static[i_0 + 3];
    argJsType = typeof_$(arguments_0, i_0);
    if ($equals_0(argJsType, jsType)) {
      continue;
    }
    if ($equals_0('string', jsType) && $equals_0('null', argJsType)) {
      continue;
    }
    isNumber = $equals_0('number', argJsType);
    isBoolean = $equals_0('boolean', argJsType);
    if (Ljava_lang_Object_2_classLit === jsType) {
      isNumber && (arguments_0[i_0] = new Double_0(arguments_0[i_0]) , undefined);
      isBoolean && (arguments_0[i_0] = ($clinit_Boolean() , arguments_0[i_0]?TRUE_0:FALSE_0) , undefined);
      continue;
    }
    isPrimitive = isNumber || isBoolean;
    isClass = !isPrimitive && jsType != null && getClass__devirtual$(jsType) == Ljava_lang_Class_2_classLit;
    if (isClass) {
      o = arguments_0[i_0];
      if (o == null || isAssignableToClass(o, dynamicCast(jsType, Q$Class))) {
        continue;
      }
      if (instanceOfJso(o)) {
        gwt = getGwtInstance(dynamicCastJso(o));
        if (gwt != null) {
          if (isAssignableToClass(gwt, dynamicCast(jsType, Q$Class))) {
            arguments_0[i_0] = gwt;
            continue;
          }
        }
      }
    }
    if ($equals_0('object', jsType) && !isNumber && !isBoolean) {
      continue;
    }
    return false;
  }
  return true;
}

function typeof_$(args, i_0){
  var o = args[i_0];
  var t = o == null?'null':typeof o;
  if (t == 'object') {
    return Object.prototype.toString.call(o) == '[object Array]' || typeof o.length == 'number'?'array':t;
  }
  return t;
}

function $clinit_ExporterUtil(){
  $clinit_ExporterUtil = nullMethod;
  impl_8 = new ExporterBaseActual_0;
}

function declarePackage(qualifiedExportName){
  $clinit_ExporterUtil();
  return $declarePackage(qualifiedExportName);
}

function gwtInstance(o){
  var g;
  $clinit_ExporterUtil();
  return o != null && instanceOfJso(o) && (g = getGwtInstance(dynamicCastJso(o))) != null?g:o;
}

function registerDispatchMap(clazz, dispMap, isStatic){
  $clinit_ExporterUtil();
  $registerDispatchMap(impl_8, clazz, dispMap, isStatic);
}

function runDispatch(instance, clazz, meth, arguments_0, isStatic, isVarArgs){
  $clinit_ExporterUtil();
  return $runDispatch(impl_8, instance, clazz, meth, arguments_0, isStatic, isVarArgs);
}

function setWrapper(instance, wrapper){
  $clinit_ExporterUtil();
  instance['__gwtex_wrap'] = wrapper;
}

function wrap(type){
  $clinit_ExporterUtil();
  return type;
}

var impl_8;
var $entry = entry_0;
function gwtOnLoad(errFn, modName, modBase, softPermutationId){
  $moduleName = modName;
  $moduleBase = modBase;
  permutationId = softPermutationId;
  if (errFn)
    try {
      $entry(init)();
    }
     catch (e) {
      errFn(modName);
    }
   else {
    $entry(init)();
  }
}

var Ljava_lang_Object_2_classLit = createForClass('java.lang.', 'Object', 1, null), Lcom_google_gwt_core_client_JavaScriptObject_2_classLit = createForClass('com.google.gwt.core.client.', 'JavaScriptObject$', 15, Ljava_lang_Object_2_classLit), I_classLit = createForPrimitive('int', ' I'), _3I_classLit = createForArray('', '[I', 514, I_classLit), _3Ljava_lang_Object_2_classLit = createForArray('[Ljava.lang.', 'Object;', 512, Ljava_lang_Object_2_classLit), Z_classLit = createForPrimitive('boolean', ' Z'), _3Z_classLit = createForArray('', '[Z', 515, Z_classLit), Ljava_lang_Throwable_2_classLit = createForClass('java.lang.', 'Throwable', 14, Ljava_lang_Object_2_classLit), Ljava_lang_Exception_2_classLit = createForClass('java.lang.', 'Exception', 13, Ljava_lang_Throwable_2_classLit), Ljava_lang_RuntimeException_2_classLit = createForClass('java.lang.', 'RuntimeException', 12, Ljava_lang_Exception_2_classLit), Ljava_lang_StackTraceElement_2_classLit = createForClass('java.lang.', 'StackTraceElement', 337, Ljava_lang_Object_2_classLit), _3Ljava_lang_StackTraceElement_2_classLit = createForArray('[Ljava.lang.', 'StackTraceElement;', 516, Ljava_lang_StackTraceElement_2_classLit), Lcom_google_gwt_lang_LongLibBase$LongEmul_2_classLit = createForClass('com.google.gwt.lang.', 'LongLibBase$LongEmul', 149, Ljava_lang_Object_2_classLit), _3Lcom_google_gwt_lang_LongLibBase$LongEmul_2_classLit = createForArray('[Lcom.google.gwt.lang.', 'LongLibBase$LongEmul;', 517, Lcom_google_gwt_lang_LongLibBase$LongEmul_2_classLit), Lcom_google_gwt_lang_SeedUtil_2_classLit = createForClass('com.google.gwt.lang.', 'SeedUtil', 150, Ljava_lang_Object_2_classLit), Lcom_google_gwt_logging_client_LogConfiguration_2_classLit = createForClass('com.google.gwt.logging.client.', 'LogConfiguration', null, Ljava_lang_Object_2_classLit), Lcom_google_gwt_logging_client_LogConfiguration$LogConfigurationImplRegular_2_classLit = createForClass('com.google.gwt.logging.client.', 'LogConfiguration$LogConfigurationImplRegular', 163, Ljava_lang_Object_2_classLit), Lcom_google_gwt_logging_client_LogConfiguration$1_2_classLit = createForClass('com.google.gwt.logging.client.', 'LogConfiguration$1', 162, Ljava_lang_Object_2_classLit), Ljava_lang_Enum_2_classLit = createForClass('java.lang.', 'Enum', 59, Ljava_lang_Object_2_classLit), Ljava_lang_Error_2_classLit = createForClass('java.lang.', 'Error', 320, Ljava_lang_Throwable_2_classLit), Ljava_lang_AssertionError_2_classLit = createForClass('java.lang.', 'AssertionError', 319, Ljava_lang_Error_2_classLit), Ljava_lang_Boolean_2_classLit = createForClass('java.lang.', 'Boolean', 321, Ljava_lang_Object_2_classLit), B_classLit = createForPrimitive('byte', ' B'), Ljava_lang_Number_2_classLit = createForClass('java.lang.', 'Number', 326, Ljava_lang_Object_2_classLit), C_classLit = createForPrimitive('char', ' C'), _3C_classLit = createForArray('', '[C', 518, C_classLit), Ljava_lang_Class_2_classLit = createForClass('java.lang.', 'Class', 323, Ljava_lang_Object_2_classLit), D_classLit = createForPrimitive('double', ' D'), _3D_classLit = createForArray('', '[D', 519, D_classLit), Ljava_lang_Double_2_classLit = createForClass('java.lang.', 'Double', 325, Ljava_lang_Number_2_classLit), Ljava_lang_Integer_2_classLit = createForClass('java.lang.', 'Integer', 330, Ljava_lang_Number_2_classLit), _3Ljava_lang_Integer_2_classLit = createForArray('[Ljava.lang.', 'Integer;', 520, Ljava_lang_Integer_2_classLit), Ljava_lang_String_2_classLit = createForClass('java.lang.', 'String', 2, Ljava_lang_Object_2_classLit), _3Ljava_lang_String_2_classLit = createForArray('[Ljava.lang.', 'String;', 513, Ljava_lang_String_2_classLit), _3B_classLit = createForArray('', '[B', 521, B_classLit), Ljava_lang_ClassCastException_2_classLit = createForClass('java.lang.', 'ClassCastException', 324, Ljava_lang_RuntimeException_2_classLit), Ljava_lang_StringBuilder_2_classLit = createForClass('java.lang.', 'StringBuilder', 340, Ljava_lang_Object_2_classLit), Ljava_lang_ArrayStoreException_2_classLit = createForClass('java.lang.', 'ArrayStoreException', 318, Ljava_lang_RuntimeException_2_classLit), Lcom_google_gwt_core_client_JavaScriptException_2_classLit = createForClass('com.google.gwt.core.client.', 'JavaScriptException', 11, Ljava_lang_RuntimeException_2_classLit), Lcom_google_gwt_useragent_client_UserAgentAsserter_1UserAgentPropertyImplIe6_2_classLit = createForClass('com.google.gwt.useragent.client.', 'UserAgentAsserter_UserAgentPropertyImplIe6', 285, Ljava_lang_Object_2_classLit), Lcom_google_gwt_useragent_client_UserAgentAsserter_1UserAgentPropertyImplIe8_2_classLit = createForClass('com.google.gwt.useragent.client.', 'UserAgentAsserter_UserAgentPropertyImplIe8', 286, Ljava_lang_Object_2_classLit), Lcom_google_gwt_useragent_client_UserAgentAsserter_1UserAgentPropertyImplGecko1_18_2_classLit = createForClass('com.google.gwt.useragent.client.', 'UserAgentAsserter_UserAgentPropertyImplGecko1_8', 284, Ljava_lang_Object_2_classLit), Lcom_google_gwt_useragent_client_UserAgentAsserter_1UserAgentPropertyImplIe9_2_classLit = createForClass('com.google.gwt.useragent.client.', 'UserAgentAsserter_UserAgentPropertyImplIe9', 287, Ljava_lang_Object_2_classLit), Lcom_google_gwt_useragent_client_UserAgentAsserter_1UserAgentPropertyImplOpera_2_classLit = createForClass('com.google.gwt.useragent.client.', 'UserAgentAsserter_UserAgentPropertyImplOpera', 288, Ljava_lang_Object_2_classLit), Lcom_google_gwt_useragent_client_UserAgentAsserter_1UserAgentPropertyImplSafari_2_classLit = createForClass('com.google.gwt.useragent.client.', 'UserAgentAsserter_UserAgentPropertyImplSafari', 289, Ljava_lang_Object_2_classLit), Ljava_util_logging_Logger_2_classLit = createForClass('java.util.logging.', 'Logger', 182, Ljava_lang_Object_2_classLit), Ljava_io_OutputStream_2_classLit = createForClass('java.io.', 'OutputStream', 315, Ljava_lang_Object_2_classLit), Ljava_io_FilterOutputStream_2_classLit = createForClass('java.io.', 'FilterOutputStream', 314, Ljava_io_OutputStream_2_classLit), Ljava_io_PrintStream_2_classLit = createForClass('java.io.', 'PrintStream', 316, Ljava_io_FilterOutputStream_2_classLit), Lnet_gnehzr_tnoodle_js_ConsolePrintStream_2_classLit = createForClass('net.gnehzr.tnoodle.js.', 'ConsolePrintStream', 419, Ljava_io_PrintStream_2_classLit), Ljava_lang_ArithmeticException_2_classLit = createForClass('java.lang.', 'ArithmeticException', 317, Ljava_lang_RuntimeException_2_classLit), Lcom_google_gwt_core_client_impl_StringBufferImpl_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StringBufferImpl', 32, Ljava_lang_Object_2_classLit), Lcom_google_gwt_logging_impl_LoggerImplRegular_2_classLit = createForClass('com.google.gwt.logging.impl.', 'LoggerImplRegular', 180, Ljava_lang_Object_2_classLit), Ljava_util_logging_Handler_2_classLit = createForClass('java.util.logging.', 'Handler', 154, Ljava_lang_Object_2_classLit), _3Ljava_util_logging_Handler_2_classLit = createForArray('[Ljava.util.logging.', 'Handler;', 522, Ljava_util_logging_Handler_2_classLit), Ljava_util_AbstractMap_2_classLit = createForClass('java.util.', 'AbstractMap', 348, Ljava_lang_Object_2_classLit), Ljava_util_AbstractHashMap_2_classLit = createForClass('java.util.', 'AbstractHashMap', 347, Ljava_util_AbstractMap_2_classLit), Ljava_util_HashMap_2_classLit = createForClass('java.util.', 'HashMap', 380, Ljava_util_AbstractHashMap_2_classLit), Ljava_util_AbstractCollection_2_classLit = createForClass('java.util.', 'AbstractCollection', 346, Ljava_lang_Object_2_classLit), Ljava_util_AbstractSet_2_classLit = createForClass('java.util.', 'AbstractSet', 350, Ljava_util_AbstractCollection_2_classLit), Ljava_util_AbstractHashMap$EntrySet_2_classLit = createForClass('java.util.', 'AbstractHashMap$EntrySet', 349, Ljava_util_AbstractSet_2_classLit), Ljava_util_AbstractHashMap$EntrySetIterator_2_classLit = createForClass('java.util.', 'AbstractHashMap$EntrySetIterator', 351, Ljava_lang_Object_2_classLit), Ljava_util_AbstractMapEntry_2_classLit = createForClass('java.util.', 'AbstractMapEntry', 353, Ljava_lang_Object_2_classLit), Ljava_util_AbstractHashMap$MapEntryNull_2_classLit = createForClass('java.util.', 'AbstractHashMap$MapEntryNull', 352, Ljava_util_AbstractMapEntry_2_classLit), Ljava_util_AbstractHashMap$MapEntryString_2_classLit = createForClass('java.util.', 'AbstractHashMap$MapEntryString', 354, Ljava_util_AbstractMapEntry_2_classLit), Ljava_util_AbstractMap$1_2_classLit = createForClass('java.util.', 'AbstractMap$1', 358, Ljava_util_AbstractSet_2_classLit), Ljava_util_AbstractMap$1$1_2_classLit = createForClass('java.util.', 'AbstractMap$1$1', 359, Ljava_lang_Object_2_classLit), Lorg_timepedia_exporter_client_ExporterBaseImpl_2_classLit = createForClass('org.timepedia.exporter.client.', 'ExporterBaseImpl', 503, Ljava_lang_Object_2_classLit), Lorg_timepedia_exporter_client_ExporterBaseActual_2_classLit = createForClass('org.timepedia.exporter.client.', 'ExporterBaseActual', 502, Lorg_timepedia_exporter_client_ExporterBaseImpl_2_classLit), Lorg_timepedia_exporter_client_Exportable_2_classLit = createForInterface('org.timepedia.exporter.client.', 'Exportable'), Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StackTraceCreator$Collector', 27, Ljava_lang_Object_2_classLit), Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StackTraceCreator$CollectorMoz', 29, Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2_classLit), Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StackTraceCreator$CollectorChrome', 28, Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_2_classLit), Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorChromeNoSourceMap_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StackTraceCreator$CollectorChromeNoSourceMap', 30, Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_2_classLit), Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorOpera_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StackTraceCreator$CollectorOpera', 31, Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_2_classLit), Lcom_google_gwt_core_client_impl_StringBufferImplArrayBase_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StringBufferImplArrayBase', 35, Lcom_google_gwt_core_client_impl_StringBufferImpl_2_classLit), Lcom_google_gwt_core_client_impl_StringBufferImplArray_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StringBufferImplArray', 34, Lcom_google_gwt_core_client_impl_StringBufferImplArrayBase_2_classLit), Lcom_google_gwt_core_client_impl_StringBufferImplAppend_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StringBufferImplAppend', 33, Lcom_google_gwt_core_client_impl_StringBufferImpl_2_classLit), Lcom_google_gwt_core_client_Duration_2_classLit = createForClass('com.google.gwt.core.client.', 'Duration', 9, Ljava_lang_Object_2_classLit), Lcom_google_gwt_core_client_Scheduler_2_classLit = createForClass('com.google.gwt.core.client.', 'Scheduler', 20, Ljava_lang_Object_2_classLit), Lcom_google_gwt_core_client_impl_SchedulerImpl_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'SchedulerImpl', 22, Lcom_google_gwt_core_client_Scheduler_2_classLit), Lcom_google_gwt_core_client_impl_SchedulerImpl$Flusher_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'SchedulerImpl$Flusher', 23, Ljava_lang_Object_2_classLit), Lcom_google_gwt_core_client_impl_SchedulerImpl$Rescuer_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'SchedulerImpl$Rescuer', 24, Ljava_lang_Object_2_classLit), Ljava_util_AbstractList_2_classLit = createForClass('java.util.', 'AbstractList', 355, Ljava_util_AbstractCollection_2_classLit), Ljava_util_ArrayList_2_classLit = createForClass('java.util.', 'ArrayList', 362, Ljava_util_AbstractList_2_classLit), Ljava_util_AbstractList$IteratorImpl_2_classLit = createForClass('java.util.', 'AbstractList$IteratorImpl', 356, Ljava_lang_Object_2_classLit), Ljava_util_AbstractList$ListIteratorImpl_2_classLit = createForClass('java.util.', 'AbstractList$ListIteratorImpl', 357, Ljava_util_AbstractList$IteratorImpl_2_classLit), Ljava_util_logging_Level_2_classLit = createForClass('java.util.logging.', 'Level', 406, Ljava_lang_Object_2_classLit), Ljava_util_logging_Level$LevelAll_2_classLit = createForClass('java.util.logging.', 'Level$LevelAll', 407, Ljava_util_logging_Level_2_classLit), Ljava_util_logging_Level$LevelConfig_2_classLit = createForClass('java.util.logging.', 'Level$LevelConfig', 408, Ljava_util_logging_Level_2_classLit), Ljava_util_logging_Level$LevelFine_2_classLit = createForClass('java.util.logging.', 'Level$LevelFine', 409, Ljava_util_logging_Level_2_classLit), Ljava_util_logging_Level$LevelFiner_2_classLit = createForClass('java.util.logging.', 'Level$LevelFiner', 410, Ljava_util_logging_Level_2_classLit), Ljava_util_logging_Level$LevelFinest_2_classLit = createForClass('java.util.logging.', 'Level$LevelFinest', 411, Ljava_util_logging_Level_2_classLit), Ljava_util_logging_Level$LevelInfo_2_classLit = createForClass('java.util.logging.', 'Level$LevelInfo', 412, Ljava_util_logging_Level_2_classLit), Ljava_util_logging_Level$LevelOff_2_classLit = createForClass('java.util.logging.', 'Level$LevelOff', 413, Ljava_util_logging_Level_2_classLit), Ljava_util_logging_Level$LevelSevere_2_classLit = createForClass('java.util.logging.', 'Level$LevelSevere', 414, Ljava_util_logging_Level_2_classLit), Ljava_util_logging_Level$LevelWarning_2_classLit = createForClass('java.util.logging.', 'Level$LevelWarning', 415, Ljava_util_logging_Level_2_classLit), Ljava_lang_NullPointerException_2_classLit = createForClass('java.lang.', 'NullPointerException', 334, Ljava_lang_RuntimeException_2_classLit), Ljava_lang_IllegalArgumentException_2_classLit = createForClass('java.lang.', 'IllegalArgumentException', 327, Ljava_lang_RuntimeException_2_classLit), Ljava_util_logging_LogManager_2_classLit = createForClass('java.util.logging.', 'LogManager', 416, Ljava_lang_Object_2_classLit), Ljava_util_logging_LogManager$RootLogger_2_classLit = createForClass('java.util.logging.', 'LogManager$RootLogger', 417, Ljava_util_logging_Logger_2_classLit), Lcom_google_gwt_logging_impl_LoggerWithExposedConstructor_2_classLit = createForClass('com.google.gwt.logging.impl.', 'LoggerWithExposedConstructor', 181, Ljava_util_logging_Logger_2_classLit), Ljava_util_logging_LogRecord_2_classLit = createForClass('java.util.logging.', 'LogRecord', 418, Ljava_lang_Object_2_classLit), Lcom_google_web_bindery_event_shared_Event_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'Event', 94, Ljava_lang_Object_2_classLit), Lcom_google_gwt_event_shared_GwtEvent_2_classLit = createForClass('com.google.gwt.event.shared.', 'GwtEvent', 93, Lcom_google_web_bindery_event_shared_Event_2_classLit), Lcom_google_gwt_user_client_Window$ClosingEvent_2_classLit = createForClass('com.google.gwt.user.client.', 'Window$ClosingEvent', 209, Lcom_google_gwt_event_shared_GwtEvent_2_classLit), Lcom_google_gwt_event_shared_HandlerManager_2_classLit = createForClass('com.google.gwt.event.shared.', 'HandlerManager', 113, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_Window$WindowHandlers_2_classLit = createForClass('com.google.gwt.user.client.', 'Window$WindowHandlers', 211, Lcom_google_gwt_event_shared_HandlerManager_2_classLit), Lcom_google_web_bindery_event_shared_Event$Type_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'Event$Type', 97, Ljava_lang_Object_2_classLit), Lcom_google_gwt_event_shared_GwtEvent$Type_2_classLit = createForClass('com.google.gwt.event.shared.', 'GwtEvent$Type', 96, Lcom_google_web_bindery_event_shared_Event$Type_2_classLit), Lcom_google_web_bindery_event_shared_EventBus_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'EventBus', 116, Ljava_lang_Object_2_classLit), Lcom_google_web_bindery_event_shared_SimpleEventBus_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'SimpleEventBus', 115, Lcom_google_web_bindery_event_shared_EventBus_2_classLit), Lcom_google_gwt_event_shared_HandlerManager$Bus_2_classLit = createForClass('com.google.gwt.event.shared.', 'HandlerManager$Bus', 114, Lcom_google_web_bindery_event_shared_SimpleEventBus_2_classLit), Lcom_google_web_bindery_event_shared_SimpleEventBus$1_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'SimpleEventBus$1', 290, Ljava_lang_Object_2_classLit), Lcom_google_web_bindery_event_shared_SimpleEventBus$2_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'SimpleEventBus$2', 291, Ljava_lang_Object_2_classLit), Lcom_google_web_bindery_event_shared_SimpleEventBus$3_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'SimpleEventBus$3', 292, Ljava_lang_Object_2_classLit), Lcom_google_gwt_logging_client_ConsoleLogHandler_2_classLit = createForClass('com.google.gwt.logging.client.', 'ConsoleLogHandler', 153, Ljava_util_logging_Handler_2_classLit), Lcom_google_gwt_logging_client_DevelopmentModeLogHandler_2_classLit = createForClass('com.google.gwt.logging.client.', 'DevelopmentModeLogHandler', 155, Ljava_util_logging_Handler_2_classLit), Lcom_google_gwt_logging_client_FirebugLogHandler_2_classLit = createForClass('com.google.gwt.logging.client.', 'FirebugLogHandler', 156, Ljava_util_logging_Handler_2_classLit), Lcom_google_gwt_logging_client_SystemLogHandler_2_classLit = createForClass('com.google.gwt.logging.client.', 'SystemLogHandler', 177, Ljava_util_logging_Handler_2_classLit), Lcom_google_gwt_logging_client_NullLogHandler_2_classLit = createForClass('com.google.gwt.logging.client.', 'NullLogHandler', 176, Ljava_util_logging_Handler_2_classLit), Lcom_google_gwt_user_client_ui_UIObject_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'UIObject', 169, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_Widget_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'Widget', 168, Lcom_google_gwt_user_client_ui_UIObject_2_classLit), Lcom_google_gwt_user_client_ui_Panel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'Panel', 167, Lcom_google_gwt_user_client_ui_Widget_2_classLit), Lcom_google_gwt_user_client_ui_SimplePanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'SimplePanel', 166, Lcom_google_gwt_user_client_ui_Panel_2_classLit), Lcom_google_gwt_user_client_ui_PopupPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'PopupPanel', 165, Lcom_google_gwt_user_client_ui_SimplePanel_2_classLit), Lcom_google_gwt_logging_client_LoggingPopup_2_classLit = createForClass('com.google.gwt.logging.client.', 'LoggingPopup', 164, Lcom_google_gwt_user_client_ui_PopupPanel_2_classLit), Lcom_google_gwt_logging_client_LoggingPopup$MouseDragHandler_2_classLit = createForClass('com.google.gwt.logging.client.', 'LoggingPopup$MouseDragHandler', 171, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_ScrollPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'ScrollPanel', 173, Lcom_google_gwt_user_client_ui_SimplePanel_2_classLit), Lcom_google_gwt_logging_client_LoggingPopup$ScrollPanelWithMinSize_2_classLit = createForClass('com.google.gwt.logging.client.', 'LoggingPopup$ScrollPanelWithMinSize', 172, Lcom_google_gwt_user_client_ui_ScrollPanel_2_classLit), Lcom_google_gwt_logging_client_LoggingPopup$WindowMoveHandler_2_classLit = createForClass('com.google.gwt.logging.client.', 'LoggingPopup$WindowMoveHandler', 174, Lcom_google_gwt_logging_client_LoggingPopup$MouseDragHandler_2_classLit), Lcom_google_gwt_logging_client_LoggingPopup$WindowResizeHandler_2_classLit = createForClass('com.google.gwt.logging.client.', 'LoggingPopup$WindowResizeHandler', 175, Lcom_google_gwt_logging_client_LoggingPopup$MouseDragHandler_2_classLit), Lcom_google_gwt_logging_client_LoggingPopup$1_2_classLit = createForClass('com.google.gwt.logging.client.', 'LoggingPopup$1', 170, Ljava_lang_Object_2_classLit), Lcom_google_gwt_animation_client_Animation_2_classLit = createForClass('com.google.gwt.animation.client.', 'Animation', 3, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_PopupPanel$ResizeAnimation_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'PopupPanel$ResizeAnimation', 266, Lcom_google_gwt_animation_client_Animation_2_classLit), Lcom_google_gwt_user_client_ui_PopupPanel$1_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'PopupPanel$1', 263, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_PopupPanel$3_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'PopupPanel$3', 264, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_PopupPanel$4_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'PopupPanel$4', 265, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_SimplePanel$1_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'SimplePanel$1', 274, Ljava_lang_Object_2_classLit), Lcom_google_gwt_animation_client_AnimationScheduler_2_classLit = createForClass('com.google.gwt.animation.client.', 'AnimationScheduler', 4, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_Timer$1_2_classLit = createForClass('com.google.gwt.user.client.', 'Timer$1', 207, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_Event$NativePreviewEvent_2_classLit = createForClass('com.google.gwt.user.client.', 'Event$NativePreviewEvent', 204, Lcom_google_gwt_event_shared_GwtEvent_2_classLit), Lcom_google_gwt_logging_client_HasWidgetsLogHandler_2_classLit = createForClass('com.google.gwt.logging.client.', 'HasWidgetsLogHandler', 157, Ljava_util_logging_Handler_2_classLit), Ljava_lang_StringBuffer_2_classLit = createForClass('java.lang.', 'StringBuffer', 339, Ljava_lang_Object_2_classLit), Ljava_util_Date_2_classLit = createForClass('java.util.', 'Date', 378, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_scrambles_Puzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.scrambles.', 'Puzzle_ExporterImpl', 481, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_scrambles_Puzzle_2_classLit = createForClass('net.gnehzr.tnoodle.scrambles.', 'Puzzle', 424, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_CubePuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'CubePuzzle_ExporterImpl', 433, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_CubePuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'CubePuzzle', 428, Lnet_gnehzr_tnoodle_scrambles_Puzzle_2_classLit), Lnet_gnehzr_tnoodle_js_TNoodleJsUtils_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.js.', 'TNoodleJsUtils_ExporterImpl', 422, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_js_TNoodleJsUtils_2_classLit = createForClass('net.gnehzr.tnoodle.js.', 'TNoodleJsUtils', null, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_ClockPuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'ClockPuzzle_ExporterImpl', 427, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_ClockPuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'ClockPuzzle', 423, Lnet_gnehzr_tnoodle_scrambles_Puzzle_2_classLit), Lnet_gnehzr_tnoodle_puzzle_FourByFourCubePuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'FourByFourCubePuzzle_ExporterImpl', 436, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_FourByFourCubePuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'FourByFourCubePuzzle', 434, Lnet_gnehzr_tnoodle_puzzle_CubePuzzle_2_classLit), Lnet_gnehzr_tnoodle_puzzle_FourByFourRandomTurnsCubePuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'FourByFourRandomTurnsCubePuzzle_ExporterImpl', 438, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_FourByFourRandomTurnsCubePuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'FourByFourRandomTurnsCubePuzzle', 437, Lnet_gnehzr_tnoodle_puzzle_CubePuzzle_2_classLit), Lnet_gnehzr_tnoodle_puzzle_MegaminxPuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'MegaminxPuzzle_ExporterImpl', 442, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_MegaminxPuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'MegaminxPuzzle', 439, Lnet_gnehzr_tnoodle_scrambles_Puzzle_2_classLit), Lnet_gnehzr_tnoodle_puzzle_NoInspectionFiveByFiveCubePuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'NoInspectionFiveByFiveCubePuzzle_ExporterImpl', 444, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$CubeMove_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'CubePuzzle$CubeMove', 429, Ljava_lang_Object_2_classLit), _3Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$CubeMove_2_classLit = createForArray('[Lnet.gnehzr.tnoodle.puzzle.', 'CubePuzzle$CubeMove;', 523, Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$CubeMove_2_classLit), Lnet_gnehzr_tnoodle_puzzle_NoInspectionFiveByFiveCubePuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'NoInspectionFiveByFiveCubePuzzle', 443, Lnet_gnehzr_tnoodle_puzzle_CubePuzzle_2_classLit), Lnet_gnehzr_tnoodle_puzzle_NoInspectionFourByFourCubePuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'NoInspectionFourByFourCubePuzzle_ExporterImpl', 446, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_NoInspectionFourByFourCubePuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'NoInspectionFourByFourCubePuzzle', 445, Lnet_gnehzr_tnoodle_puzzle_FourByFourCubePuzzle_2_classLit), Lnet_gnehzr_tnoodle_puzzle_NoInspectionThreeByThreeCubePuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'NoInspectionThreeByThreeCubePuzzle_ExporterImpl', 449, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubePuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'ThreeByThreeCubePuzzle', 448, Lnet_gnehzr_tnoodle_puzzle_CubePuzzle_2_classLit), Lnet_gnehzr_tnoodle_puzzle_NoInspectionThreeByThreeCubePuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'NoInspectionThreeByThreeCubePuzzle', 447, Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubePuzzle_2_classLit), Ljava_util_Random_2_classLit = createForClass('java.util.', 'Random', 345, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_PyraminxPuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'PyraminxPuzzle_ExporterImpl', 452, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_PyraminxPuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'PyraminxPuzzle', 450, Lnet_gnehzr_tnoodle_scrambles_Puzzle_2_classLit), Lnet_gnehzr_tnoodle_puzzle_SkewbPuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'SkewbPuzzle_ExporterImpl', 457, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_SkewbPuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'SkewbPuzzle', 455, Lnet_gnehzr_tnoodle_scrambles_Puzzle_2_classLit), Lnet_gnehzr_tnoodle_puzzle_SquareOnePuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'SquareOnePuzzle_ExporterImpl', 462, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_SquareOnePuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'SquareOnePuzzle', 460, Lnet_gnehzr_tnoodle_scrambles_Puzzle_2_classLit), Lnet_gnehzr_tnoodle_puzzle_SquareOneUnfilteredPuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'SquareOneUnfilteredPuzzle_ExporterImpl', 464, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_SquareOneUnfilteredPuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'SquareOneUnfilteredPuzzle', 463, Lnet_gnehzr_tnoodle_puzzle_SquareOnePuzzle_2_classLit), Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubeFewestMovesPuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'ThreeByThreeCubeFewestMovesPuzzle_ExporterImpl', 466, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubeFewestMovesPuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'ThreeByThreeCubeFewestMovesPuzzle', 465, Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubePuzzle_2_classLit), Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubePuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'ThreeByThreeCubePuzzle_ExporterImpl', 468, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_TwoByTwoCubePuzzle_1ExporterImpl_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'TwoByTwoCubePuzzle_ExporterImpl', 470, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_TwoByTwoCubePuzzle_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'TwoByTwoCubePuzzle', 469, Lnet_gnehzr_tnoodle_puzzle_CubePuzzle_2_classLit), Ljava_util_logging_Formatter_2_classLit = createForClass('java.util.logging.', 'Formatter', 160, Ljava_lang_Object_2_classLit), Lcom_google_gwt_logging_impl_FormatterImpl_2_classLit = createForClass('com.google.gwt.logging.impl.', 'FormatterImpl', 159, Ljava_util_logging_Formatter_2_classLit), Lcom_google_gwt_logging_client_TextLogFormatter_2_classLit = createForClass('com.google.gwt.logging.client.', 'TextLogFormatter', 178, Lcom_google_gwt_logging_impl_FormatterImpl_2_classLit), Lcom_google_gwt_user_client_ui_ComplexPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'ComplexPanel', 243, Lcom_google_gwt_user_client_ui_Panel_2_classLit), Lcom_google_gwt_user_client_ui_CellPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'CellPanel', 250, Lcom_google_gwt_user_client_ui_ComplexPanel_2_classLit), Lcom_google_gwt_user_client_ui_VerticalPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'VerticalPanel', 275, Lcom_google_gwt_user_client_ui_CellPanel_2_classLit), Lcom_google_web_bindery_event_shared_UmbrellaException_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'UmbrellaException', 119, Ljava_lang_RuntimeException_2_classLit), Lcom_google_gwt_event_shared_UmbrellaException_2_classLit = createForClass('com.google.gwt.event.shared.', 'UmbrellaException', 118, Lcom_google_web_bindery_event_shared_UmbrellaException_2_classLit), Lcom_google_gwt_user_client_ui_AttachDetachException_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'AttachDetachException', 244, Lcom_google_gwt_event_shared_UmbrellaException_2_classLit), Lcom_google_gwt_user_client_ui_AttachDetachException$1_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'AttachDetachException$1', 245, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_AttachDetachException$2_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'AttachDetachException$2', 246, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$AutoHorizontalAlignmentConstant_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'HasHorizontalAlignment$AutoHorizontalAlignmentConstant', 255, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'HasHorizontalAlignment$HorizontalAlignmentConstant', 256, Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$AutoHorizontalAlignmentConstant_2_classLit), Lcom_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'HasVerticalAlignment$VerticalAlignmentConstant', 257, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_LabelBase_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'LabelBase', 254, Lcom_google_gwt_user_client_ui_Widget_2_classLit), Lcom_google_gwt_user_client_ui_Label_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'Label', 253, Lcom_google_gwt_user_client_ui_LabelBase_2_classLit), Lcom_google_gwt_user_client_ui_HTML_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'HTML', 252, Lcom_google_gwt_user_client_ui_Label_2_classLit), Lcom_google_gwt_i18n_client_HasDirection$Direction_2_classLit = createForEnum('com.google.gwt.i18n.client.', 'HasDirection$Direction', 125, Ljava_lang_Enum_2_classLit, values_5), _3Lcom_google_gwt_i18n_client_HasDirection$Direction_2_classLit = createForArray('[Lcom.google.gwt.i18n.client.', 'HasDirection$Direction;', 524, Lcom_google_gwt_i18n_client_HasDirection$Direction_2_classLit), Lcom_google_gwt_user_client_ui_HorizontalPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'HorizontalPanel', 258, Lcom_google_gwt_user_client_ui_CellPanel_2_classLit), Lcom_google_gwt_user_client_ui_FocusWidget_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'FocusWidget', 249, Lcom_google_gwt_user_client_ui_Widget_2_classLit), Lcom_google_gwt_user_client_ui_ButtonBase_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'ButtonBase', 248, Lcom_google_gwt_user_client_ui_FocusWidget_2_classLit), Lcom_google_gwt_user_client_ui_Button_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'Button', 247, Lcom_google_gwt_user_client_ui_ButtonBase_2_classLit), Lcom_google_gwt_dom_client_Style$Unit_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Unit', 79, Ljava_lang_Enum_2_classLit, values_4), _3Lcom_google_gwt_dom_client_Style$Unit_2_classLit = createForArray('[Lcom.google.gwt.dom.client.', 'Style$Unit;', 525, Lcom_google_gwt_dom_client_Style$Unit_2_classLit), Lcom_google_gwt_dom_client_Style$Display_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Display', 58, Ljava_lang_Enum_2_classLit, values_0), _3Lcom_google_gwt_dom_client_Style$Display_2_classLit = createForArray('[Lcom.google.gwt.dom.client.', 'Style$Display;', 526, Lcom_google_gwt_dom_client_Style$Display_2_classLit), Lcom_google_gwt_dom_client_Style$Overflow_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Overflow', 64, Ljava_lang_Enum_2_classLit, values_1), _3Lcom_google_gwt_dom_client_Style$Overflow_2_classLit = createForArray('[Lcom.google.gwt.dom.client.', 'Style$Overflow;', 527, Lcom_google_gwt_dom_client_Style$Overflow_2_classLit), Lcom_google_gwt_dom_client_Style$Position_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Position', 69, Ljava_lang_Enum_2_classLit, values_2), _3Lcom_google_gwt_dom_client_Style$Position_2_classLit = createForArray('[Lcom.google.gwt.dom.client.', 'Style$Position;', 528, Lcom_google_gwt_dom_client_Style$Position_2_classLit), Lcom_google_gwt_dom_client_Style$TextAlign_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$TextAlign', 74, Ljava_lang_Enum_2_classLit, values_3), _3Lcom_google_gwt_dom_client_Style$TextAlign_2_classLit = createForArray('[Lcom.google.gwt.dom.client.', 'Style$TextAlign;', 529, Lcom_google_gwt_dom_client_Style$TextAlign_2_classLit), Lcom_google_gwt_dom_client_Style$Unit$1_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Unit$1', 80, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null), Lcom_google_gwt_dom_client_Style$Unit$2_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Unit$2', 81, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null), Lcom_google_gwt_dom_client_Style$Unit$3_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Unit$3', 82, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null), Lcom_google_gwt_dom_client_Style$Unit$4_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Unit$4', 83, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null), Lcom_google_gwt_dom_client_Style$Unit$5_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Unit$5', 84, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null), Lcom_google_gwt_dom_client_Style$Unit$6_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Unit$6', 85, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null), Lcom_google_gwt_dom_client_Style$Unit$7_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Unit$7', 86, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null), Lcom_google_gwt_dom_client_Style$Unit$8_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Unit$8', 87, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null), Lcom_google_gwt_dom_client_Style$Unit$9_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Unit$9', 88, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null), Lcom_google_gwt_dom_client_Style$Display$1_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Display$1', 60, Lcom_google_gwt_dom_client_Style$Display_2_classLit, null), Lcom_google_gwt_dom_client_Style$Display$2_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Display$2', 61, Lcom_google_gwt_dom_client_Style$Display_2_classLit, null), Lcom_google_gwt_dom_client_Style$Display$3_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Display$3', 62, Lcom_google_gwt_dom_client_Style$Display_2_classLit, null), Lcom_google_gwt_dom_client_Style$Display$4_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Display$4', 63, Lcom_google_gwt_dom_client_Style$Display_2_classLit, null), Lcom_google_gwt_dom_client_Style$Overflow$1_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Overflow$1', 65, Lcom_google_gwt_dom_client_Style$Overflow_2_classLit, null), Lcom_google_gwt_dom_client_Style$Overflow$2_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Overflow$2', 66, Lcom_google_gwt_dom_client_Style$Overflow_2_classLit, null), Lcom_google_gwt_dom_client_Style$Overflow$3_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Overflow$3', 67, Lcom_google_gwt_dom_client_Style$Overflow_2_classLit, null), Lcom_google_gwt_dom_client_Style$Overflow$4_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Overflow$4', 68, Lcom_google_gwt_dom_client_Style$Overflow_2_classLit, null), Lcom_google_gwt_dom_client_Style$Position$1_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Position$1', 70, Lcom_google_gwt_dom_client_Style$Position_2_classLit, null), Lcom_google_gwt_dom_client_Style$Position$2_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Position$2', 71, Lcom_google_gwt_dom_client_Style$Position_2_classLit, null), Lcom_google_gwt_dom_client_Style$Position$3_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Position$3', 72, Lcom_google_gwt_dom_client_Style$Position_2_classLit, null), Lcom_google_gwt_dom_client_Style$Position$4_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Position$4', 73, Lcom_google_gwt_dom_client_Style$Position_2_classLit, null), Lcom_google_gwt_dom_client_Style$TextAlign$1_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$TextAlign$1', 75, Lcom_google_gwt_dom_client_Style$TextAlign_2_classLit, null), Lcom_google_gwt_dom_client_Style$TextAlign$2_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$TextAlign$2', 76, Lcom_google_gwt_dom_client_Style$TextAlign_2_classLit, null), Lcom_google_gwt_dom_client_Style$TextAlign$3_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$TextAlign$3', 77, Lcom_google_gwt_dom_client_Style$TextAlign_2_classLit, null), Lcom_google_gwt_dom_client_Style$TextAlign$4_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$TextAlign$4', 78, Lcom_google_gwt_dom_client_Style$TextAlign_2_classLit, null), Lcom_google_gwt_logging_client_HtmlLogFormatter_2_classLit = createForClass('com.google.gwt.logging.client.', 'HtmlLogFormatter', 158, Lcom_google_gwt_logging_impl_FormatterImpl_2_classLit), Ljava_util_MapEntryImpl_2_classLit = createForClass('java.util.', 'MapEntryImpl', 384, Ljava_util_AbstractMapEntry_2_classLit), Lcom_google_gwt_event_dom_client_DomEvent_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'DomEvent', 92, Lcom_google_gwt_event_shared_GwtEvent_2_classLit), Lcom_google_gwt_event_dom_client_HumanInputEvent_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'HumanInputEvent', 91, Lcom_google_gwt_event_dom_client_DomEvent_2_classLit), Lcom_google_gwt_event_dom_client_MouseEvent_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'MouseEvent', 90, Lcom_google_gwt_event_dom_client_HumanInputEvent_2_classLit), Lcom_google_gwt_event_dom_client_ClickEvent_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'ClickEvent', 89, Lcom_google_gwt_event_dom_client_MouseEvent_2_classLit), Lcom_google_gwt_event_dom_client_DomEvent$Type_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'DomEvent$Type', 95, Lcom_google_gwt_event_shared_GwtEvent$Type_2_classLit), Lcom_google_gwt_i18n_client_LocaleInfo_2_classLit = createForClass('com.google.gwt.i18n.client.', 'LocaleInfo', 126, Ljava_lang_Object_2_classLit), Ljava_lang_UnsupportedOperationException_2_classLit = createForClass('java.lang.', 'UnsupportedOperationException', 343, Ljava_lang_RuntimeException_2_classLit), Ljava_lang_IllegalStateException_2_classLit = createForClass('java.lang.', 'IllegalStateException', 328, Ljava_lang_RuntimeException_2_classLit), Lcom_google_gwt_user_client_ui_impl_PopupImpl_2_classLit = createForClass('com.google.gwt.user.client.ui.impl.', 'PopupImpl', 279, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_impl_PopupImplIE6_2_classLit = createForClass('com.google.gwt.user.client.ui.impl.', 'PopupImplIE6', 280, Lcom_google_gwt_user_client_ui_impl_PopupImpl_2_classLit), Lcom_google_gwt_user_client_ui_impl_PopupImplMozilla_2_classLit = createForClass('com.google.gwt.user.client.ui.impl.', 'PopupImplMozilla', 281, Lcom_google_gwt_user_client_ui_impl_PopupImpl_2_classLit), Lcom_google_gwt_user_client_ui_impl_PopupImplMozilla$1_2_classLit = createForClass('com.google.gwt.user.client.ui.impl.', 'PopupImplMozilla$1', 282, Ljava_lang_Object_2_classLit), Ljava_util_NoSuchElementException_2_classLit = createForClass('java.util.', 'NoSuchElementException', 390, Ljava_lang_RuntimeException_2_classLit), Lnet_gnehzr_tnoodle_scrambles_Puzzle$PuzzleState_2_classLit = createForClass('net.gnehzr.tnoodle.scrambles.', 'Puzzle$PuzzleState', 426, Ljava_lang_Object_2_classLit), _3Lnet_gnehzr_tnoodle_scrambles_Puzzle$PuzzleState_2_classLit = createForArray('[Lnet.gnehzr.tnoodle.scrambles.', 'Puzzle$PuzzleState;', 530, Lnet_gnehzr_tnoodle_scrambles_Puzzle$PuzzleState_2_classLit), Lnet_gnehzr_tnoodle_scrambles_Puzzle$Bucket_2_classLit = createForClass('net.gnehzr.tnoodle.scrambles.', 'Puzzle$Bucket', 477, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_scrambles_Puzzle$SortedBuckets_2_classLit = createForClass('net.gnehzr.tnoodle.scrambles.', 'Puzzle$SortedBuckets', 478, Ljava_lang_Object_2_classLit), _3_3Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$CubeMove_2_classLit = createForArray('[[Lnet.gnehzr.tnoodle.puzzle.', 'CubePuzzle$CubeMove;', 531, _3Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$CubeMove_2_classLit), _3_3I_classLit = createForArray('', '[[I', 532, _3I_classLit), _3_3_3I_classLit = createForArray('', '[[[I', 533, _3_3I_classLit), Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$Face_2_classLit = createForEnum('net.gnehzr.tnoodle.puzzle.', 'CubePuzzle$Face', 431, Ljava_lang_Enum_2_classLit, values_7), _3Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$Face_2_classLit = createForArray('[Lnet.gnehzr.tnoodle.puzzle.', 'CubePuzzle$Face;', 534, Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$Face_2_classLit), Lnet_gnehzr_tnoodle_puzzle_CubePuzzle$CubeState_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'CubePuzzle$CubeState', 430, Lnet_gnehzr_tnoodle_scrambles_Puzzle$PuzzleState_2_classLit), Lnet_gnehzr_tnoodle_puzzle_ClockPuzzle$ClockState_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'ClockPuzzle$ClockState', 425, Lnet_gnehzr_tnoodle_scrambles_Puzzle$PuzzleState_2_classLit), Ljava_lang_ThreadLocal_2_classLit = createForClass('java.lang.', 'ThreadLocal', 342, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_FourByFourCubePuzzle$1_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'FourByFourCubePuzzle$1', 435, Ljava_lang_ThreadLocal_2_classLit), Lnet_gnehzr_tnoodle_puzzle_MegaminxPuzzle$Face_2_classLit = createForEnum('net.gnehzr.tnoodle.puzzle.', 'MegaminxPuzzle$Face', 440, Ljava_lang_Enum_2_classLit, values_8), _3Lnet_gnehzr_tnoodle_puzzle_MegaminxPuzzle$Face_2_classLit = createForArray('[Lnet.gnehzr.tnoodle.puzzle.', 'MegaminxPuzzle$Face;', 535, Lnet_gnehzr_tnoodle_puzzle_MegaminxPuzzle$Face_2_classLit), Lnet_gnehzr_tnoodle_puzzle_MegaminxPuzzle$MegaminxState_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'MegaminxPuzzle$MegaminxState', 441, Lnet_gnehzr_tnoodle_scrambles_Puzzle$PuzzleState_2_classLit), Lnet_gnehzr_tnoodle_svglite_Element_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'Element', 484, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_svglite_Path_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'Path', 489, Lnet_gnehzr_tnoodle_svglite_Element_2_classLit), _3Lnet_gnehzr_tnoodle_svglite_Path_2_classLit = createForArray('[Lnet.gnehzr.tnoodle.svglite.', 'Path;', 536, Lnet_gnehzr_tnoodle_svglite_Path_2_classLit), Lnet_gnehzr_tnoodle_svglite_Point2D$Double_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'Point2D$Double', 492, Ljava_lang_Object_2_classLit), _3Lnet_gnehzr_tnoodle_svglite_Point2D$Double_2_classLit = createForArray('[Lnet.gnehzr.tnoodle.svglite.', 'Point2D$Double;', 537, Lnet_gnehzr_tnoodle_svglite_Point2D$Double_2_classLit), Lnet_gnehzr_tnoodle_puzzle_ThreeByThreeCubePuzzle$1_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'ThreeByThreeCubePuzzle$1', 467, Ljava_lang_ThreadLocal_2_classLit), Lnet_gnehzr_tnoodle_puzzle_PyraminxPuzzle$PyraminxState_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'PyraminxPuzzle$PyraminxState', 451, Lnet_gnehzr_tnoodle_scrambles_Puzzle$PuzzleState_2_classLit), Lnet_gnehzr_tnoodle_svglite_Color_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'Color', 485, Ljava_lang_Object_2_classLit), _3Lnet_gnehzr_tnoodle_svglite_Color_2_classLit = createForArray('[Lnet.gnehzr.tnoodle.svglite.', 'Color;', 538, Lnet_gnehzr_tnoodle_svglite_Color_2_classLit), Lnet_gnehzr_tnoodle_svglite_Transform_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'Transform', 496, Ljava_lang_Object_2_classLit), _3Lnet_gnehzr_tnoodle_svglite_Transform_2_classLit = createForArray('[Lnet.gnehzr.tnoodle.svglite.', 'Transform;', 539, Lnet_gnehzr_tnoodle_svglite_Transform_2_classLit), Lnet_gnehzr_tnoodle_puzzle_SkewbPuzzle$SkewbState_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'SkewbPuzzle$SkewbState', 456, Lnet_gnehzr_tnoodle_scrambles_Puzzle$PuzzleState_2_classLit), Lnet_gnehzr_tnoodle_puzzle_SquareOnePuzzle$SquareOneState_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'SquareOnePuzzle$SquareOneState', 461, Lnet_gnehzr_tnoodle_scrambles_Puzzle$PuzzleState_2_classLit), Lcom_google_gwt_user_client_impl_WindowImpl_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'WindowImpl', 227, Ljava_lang_Object_2_classLit), Ljava_util_Collections$EmptyList_2_classLit = createForClass('java.util.', 'Collections$EmptyList', 365, Ljava_util_AbstractList_2_classLit), Ljava_util_Collections$UnmodifiableCollection_2_classLit = createForClass('java.util.', 'Collections$UnmodifiableCollection', 366, Ljava_lang_Object_2_classLit), Ljava_util_Collections$UnmodifiableList_2_classLit = createForClass('java.util.', 'Collections$UnmodifiableList', 368, Ljava_util_Collections$UnmodifiableCollection_2_classLit), Ljava_util_Collections$UnmodifiableMap_2_classLit = createForClass('java.util.', 'Collections$UnmodifiableMap', 370, Ljava_lang_Object_2_classLit), Ljava_util_Collections$UnmodifiableSet_2_classLit = createForClass('java.util.', 'Collections$UnmodifiableSet', 372, Ljava_util_Collections$UnmodifiableCollection_2_classLit), Ljava_util_Collections$UnmodifiableMap$UnmodifiableEntrySet_2_classLit = createForClass('java.util.', 'Collections$UnmodifiableMap$UnmodifiableEntrySet', 371, Ljava_util_Collections$UnmodifiableSet_2_classLit), Ljava_util_Collections$UnmodifiableMap$UnmodifiableEntrySet$UnmodifiableEntry_2_classLit = createForClass('java.util.', 'Collections$UnmodifiableMap$UnmodifiableEntrySet$UnmodifiableEntry', 374, Ljava_lang_Object_2_classLit), Ljava_util_Collections$UnmodifiableRandomAccessList_2_classLit = createForClass('java.util.', 'Collections$UnmodifiableRandomAccessList', 375, Ljava_util_Collections$UnmodifiableList_2_classLit), Ljava_util_Collections$UnmodifiableCollectionIterator_2_classLit = createForClass('java.util.', 'Collections$UnmodifiableCollectionIterator', 367, Ljava_lang_Object_2_classLit), Ljava_util_Collections$UnmodifiableListIterator_2_classLit = createForClass('java.util.', 'Collections$UnmodifiableListIterator', 369, Ljava_util_Collections$UnmodifiableCollectionIterator_2_classLit), Ljava_util_Collections$UnmodifiableMap$UnmodifiableEntrySet$1_2_classLit = createForClass('java.util.', 'Collections$UnmodifiableMap$UnmodifiableEntrySet$1', 373, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_impl_DOMImpl_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'DOMImpl', 212, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_impl_DOMImplTrident_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'DOMImplTrident', 214, Lcom_google_gwt_user_client_impl_DOMImpl_2_classLit), Lcom_google_gwt_user_client_impl_DOMImplIE8_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'DOMImplIE8', 215, Lcom_google_gwt_user_client_impl_DOMImplTrident_2_classLit), Lcom_google_gwt_user_client_impl_DOMImplStandard_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'DOMImplStandard', 218, Lcom_google_gwt_user_client_impl_DOMImpl_2_classLit), Lcom_google_gwt_user_client_impl_DOMImplMozilla_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'DOMImplMozilla', 219, Lcom_google_gwt_user_client_impl_DOMImplStandard_2_classLit), Lcom_google_gwt_user_client_impl_DOMImplStandardBase_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'DOMImplStandardBase', 217, Lcom_google_gwt_user_client_impl_DOMImplStandard_2_classLit), Lcom_google_gwt_user_client_impl_DOMImplIE9_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'DOMImplIE9', 216, Lcom_google_gwt_user_client_impl_DOMImplStandardBase_2_classLit), Lcom_google_gwt_user_client_impl_DOMImplIE6_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'DOMImplIE6', 213, Lcom_google_gwt_user_client_impl_DOMImplTrident_2_classLit), Lcom_google_gwt_user_client_impl_DOMImplOpera_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'DOMImplOpera', 220, Lcom_google_gwt_user_client_impl_DOMImplStandard_2_classLit), Lcom_google_gwt_user_client_impl_DOMImplWebkit_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'DOMImplWebkit', 221, Lcom_google_gwt_user_client_impl_DOMImplStandardBase_2_classLit), Lcom_google_gwt_user_client_ui_WidgetCollection_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'WidgetCollection', 276, Ljava_lang_Object_2_classLit), _3Lcom_google_gwt_user_client_ui_Widget_2_classLit = createForArray('[Lcom.google.gwt.user.client.ui.', 'Widget;', 540, Lcom_google_gwt_user_client_ui_Widget_2_classLit), Lcom_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'WidgetCollection$WidgetIterator', 277, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_DirectionalTextHelper_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'DirectionalTextHelper', 251, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_AbsolutePanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'AbsolutePanel', 242, Lcom_google_gwt_user_client_ui_ComplexPanel_2_classLit), Lcom_google_gwt_user_client_ui_RootPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'RootPanel', 268, Lcom_google_gwt_user_client_ui_AbsolutePanel_2_classLit), Lcom_google_gwt_user_client_ui_RootPanel$DefaultRootPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'RootPanel$DefaultRootPanel', 271, Lcom_google_gwt_user_client_ui_RootPanel_2_classLit), Lcom_google_gwt_user_client_ui_RootPanel$1_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'RootPanel$1', 269, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_RootPanel$2_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'RootPanel$2', 270, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_svglite_Dimension_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'Dimension', 486, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_scrambles_InvalidScrambleException_2_classLit = createForClass('net.gnehzr.tnoodle.scrambles.', 'InvalidScrambleException', 476, Ljava_lang_Exception_2_classLit), Lnet_gnehzr_tnoodle_scrambles_PuzzleStateAndGenerator_2_classLit = createForClass('net.gnehzr.tnoodle.scrambles.', 'PuzzleStateAndGenerator', 480, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_impl_WindowImplIE_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'WindowImplIE', 228, Lcom_google_gwt_user_client_impl_WindowImpl_2_classLit), Lcom_google_gwt_user_client_impl_WindowImplIE$1_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'WindowImplIE$1', 229, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_impl_WindowImplIE$2_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'WindowImplIE$2', 230, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_impl_WindowImplMozilla_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'WindowImplMozilla', 241, Lcom_google_gwt_user_client_impl_WindowImpl_2_classLit), Ljava_lang_IndexOutOfBoundsException_2_classLit = createForClass('java.lang.', 'IndexOutOfBoundsException', 329, Ljava_lang_RuntimeException_2_classLit), Ljava_util_HashSet_2_classLit = createForClass('java.util.', 'HashSet', 381, Ljava_util_AbstractSet_2_classLit), Lcom_google_gwt_dom_client_DOMImpl_2_classLit = createForClass('com.google.gwt.dom.client.', 'DOMImpl', 40, Ljava_lang_Object_2_classLit), Lcom_google_gwt_event_dom_client_MouseDownEvent_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'MouseDownEvent', 98, Lcom_google_gwt_event_dom_client_MouseEvent_2_classLit), Lcom_google_gwt_event_dom_client_MouseUpEvent_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'MouseUpEvent', 100, Lcom_google_gwt_event_dom_client_MouseEvent_2_classLit), Lcom_google_gwt_event_dom_client_MouseMoveEvent_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'MouseMoveEvent', 99, Lcom_google_gwt_event_dom_client_MouseEvent_2_classLit), Lcom_google_gwt_user_client_ui_ScrollImpl_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'ScrollImpl', 272, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_ScrollImpl$ScrollImplTrident_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'ScrollImpl$ScrollImplTrident', 273, Lcom_google_gwt_user_client_ui_ScrollImpl_2_classLit), Lcom_google_gwt_event_dom_client_PrivateMap_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'PrivateMap', 101, Ljava_lang_Object_2_classLit), Lcom_google_gwt_event_shared_LegacyHandlerWrapper_2_classLit = createForClass('com.google.gwt.event.shared.', 'LegacyHandlerWrapper', 117, Ljava_lang_Object_2_classLit), Lcom_google_gwt_event_logical_shared_ResizeEvent_2_classLit = createForClass('com.google.gwt.event.logical.shared.', 'ResizeEvent', 111, Lcom_google_gwt_event_shared_GwtEvent_2_classLit), Ljava_security_SecureRandom_2_classLit = createForClass('java.security.', 'SecureRandom', 344, Ljava_util_Random_2_classLit), Lcom_google_gwt_user_client_ui_Image_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'Image', 259, Lcom_google_gwt_user_client_ui_Widget_2_classLit), Lcom_google_gwt_user_client_ui_Image$State_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'Image$State', 260, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_ui_Image$UnclippedState_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'Image$UnclippedState', 262, Lcom_google_gwt_user_client_ui_Image$State_2_classLit), Lcom_google_gwt_user_client_ui_Image$State$1_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'Image$State$1', 261, Ljava_lang_Object_2_classLit), Lcom_google_gwt_json_client_JSONValue_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONValue', 131, Ljava_lang_Object_2_classLit), Lcom_google_gwt_json_client_JSONObject_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONObject', 136, Lcom_google_gwt_json_client_JSONValue_2_classLit), Lnet_gnehzr_tnoodle_scrambles_PuzzleImageInfo_2_classLit = createForClass('net.gnehzr.tnoodle.scrambles.', 'PuzzleImageInfo', 479, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_svglite_Svg_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'Svg', 494, Lnet_gnehzr_tnoodle_svglite_Element_2_classLit), Lnet_gnehzr_tnoodle_scrambles_AlgorithmBuilder_2_classLit = createForClass('net.gnehzr.tnoodle.scrambles.', 'AlgorithmBuilder', 473, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_scrambles_AlgorithmBuilder$IndexAndMove_2_classLit = createForClass('net.gnehzr.tnoodle.scrambles.', 'AlgorithmBuilder$IndexAndMove', 474, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_scrambles_InvalidMoveException_2_classLit = createForClass('net.gnehzr.tnoodle.scrambles.', 'InvalidMoveException', 475, Ljava_lang_Exception_2_classLit), Lcs_threephase_Edge3_2_classLit = createForClass('cs.threephase.', 'Edge3', 307, Ljava_lang_Object_2_classLit), _3Lcs_threephase_Edge3_2_classLit = createForArray('[Lcs.threephase.', 'Edge3;', 541, Lcs_threephase_Edge3_2_classLit), Lcs_threephase_FullCube_2_classLit = createForClass('cs.threephase.', 'FullCube', 309, Ljava_lang_Object_2_classLit), _3Lcs_threephase_FullCube_2_classLit = createForArray('[Lcs.threephase.', 'FullCube;', 542, Lcs_threephase_FullCube_2_classLit), Lcs_threephase_Search_2_classLit = createForClass('cs.threephase.', 'Search', 312, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_svglite_Path$Command_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'Path$Command', 490, Ljava_lang_Object_2_classLit), Lcs_min2phase_Search_2_classLit = createForClass('cs.min2phase.', 'Search', 295, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_PyraminxSolver_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'PyraminxSolver', 453, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_PyraminxSolver$PyraminxSolverState_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'PyraminxSolver$PyraminxSolverState', 454, Ljava_lang_Object_2_classLit), _3_3C_classLit = createForArray('', '[[C', 543, _3C_classLit), _3_3B_classLit = createForArray('', '[[B', 544, _3B_classLit), Lnet_gnehzr_tnoodle_puzzle_SkewbSolver_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'SkewbSolver', 458, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_SkewbSolver$SkewbSolverState_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'SkewbSolver$SkewbSolverState', 459, Ljava_lang_Object_2_classLit), Lcs_sq12phase_Search_2_classLit = createForClass('cs.sq12phase.', 'Search', 299, Ljava_lang_Object_2_classLit), Lcs_sq12phase_FullCube_2_classLit = createForClass('cs.sq12phase.', 'FullCube', 298, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_TwoByTwoSolver_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'TwoByTwoSolver', 471, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_puzzle_TwoByTwoSolver$TwoByTwoState_2_classLit = createForClass('net.gnehzr.tnoodle.puzzle.', 'TwoByTwoSolver$TwoByTwoState', 472, Ljava_lang_Object_2_classLit), Lcom_google_gwt_dom_client_DOMImplTrident_2_classLit = createForClass('com.google.gwt.dom.client.', 'DOMImplTrident', 42, Lcom_google_gwt_dom_client_DOMImpl_2_classLit), Lcom_google_gwt_dom_client_DOMImplIE8_2_classLit = createForClass('com.google.gwt.dom.client.', 'DOMImplIE8', 43, Lcom_google_gwt_dom_client_DOMImplTrident_2_classLit), Lcom_google_gwt_dom_client_DOMImplStandard_2_classLit = createForClass('com.google.gwt.dom.client.', 'DOMImplStandard', 46, Lcom_google_gwt_dom_client_DOMImpl_2_classLit), Lcom_google_gwt_dom_client_DOMImplMozilla_2_classLit = createForClass('com.google.gwt.dom.client.', 'DOMImplMozilla', 47, Lcom_google_gwt_dom_client_DOMImplStandard_2_classLit), Lcom_google_gwt_dom_client_DOMImplStandardBase_2_classLit = createForClass('com.google.gwt.dom.client.', 'DOMImplStandardBase', 45, Lcom_google_gwt_dom_client_DOMImplStandard_2_classLit), Lcom_google_gwt_dom_client_DOMImplIE9_2_classLit = createForClass('com.google.gwt.dom.client.', 'DOMImplIE9', 44, Lcom_google_gwt_dom_client_DOMImplStandardBase_2_classLit), Lcom_google_gwt_dom_client_DOMImplOpera_2_classLit = createForClass('com.google.gwt.dom.client.', 'DOMImplOpera', 48, Lcom_google_gwt_dom_client_DOMImplStandard_2_classLit), Lcom_google_gwt_dom_client_DOMImplWebkit_2_classLit = createForClass('com.google.gwt.dom.client.', 'DOMImplWebkit', 50, Lcom_google_gwt_dom_client_DOMImplStandardBase_2_classLit), Lcom_google_gwt_dom_client_DOMImplIE6_2_classLit = createForClass('com.google.gwt.dom.client.', 'DOMImplIE6', 41, Lcom_google_gwt_dom_client_DOMImplTrident_2_classLit), Lcom_google_gwt_touch_client_TouchScroller_2_classLit = createForClass('com.google.gwt.touch.client.', 'TouchScroller', 189, Ljava_lang_Object_2_classLit), Lcom_google_gwt_touch_client_TouchScroller$TemporalPoint_2_classLit = createForClass('com.google.gwt.touch.client.', 'TouchScroller$TemporalPoint', 199, Ljava_lang_Object_2_classLit), Lcom_google_gwt_touch_client_TouchScroller$MomentumCommand_2_classLit = createForClass('com.google.gwt.touch.client.', 'TouchScroller$MomentumCommand', 196, Ljava_lang_Object_2_classLit), Lcom_google_gwt_touch_client_TouchScroller$MomentumTouchRemovalCommand_2_classLit = createForClass('com.google.gwt.touch.client.', 'TouchScroller$MomentumTouchRemovalCommand', 198, Ljava_lang_Object_2_classLit), Lcom_google_gwt_touch_client_TouchScroller$MomentumCommand$1_2_classLit = createForClass('com.google.gwt.touch.client.', 'TouchScroller$MomentumCommand$1', 197, Ljava_lang_Object_2_classLit), Lcom_google_gwt_touch_client_TouchScroller$1_2_classLit = createForClass('com.google.gwt.touch.client.', 'TouchScroller$1', 190, Ljava_lang_Object_2_classLit), Lcom_google_gwt_touch_client_TouchScroller$2_2_classLit = createForClass('com.google.gwt.touch.client.', 'TouchScroller$2', 191, Ljava_lang_Object_2_classLit), Lcom_google_gwt_touch_client_TouchScroller$3_2_classLit = createForClass('com.google.gwt.touch.client.', 'TouchScroller$3', 192, Ljava_lang_Object_2_classLit), Lcom_google_gwt_touch_client_TouchScroller$4_2_classLit = createForClass('com.google.gwt.touch.client.', 'TouchScroller$4', 193, Ljava_lang_Object_2_classLit), Lcom_google_gwt_touch_client_TouchScroller$5_2_classLit = createForClass('com.google.gwt.touch.client.', 'TouchScroller$5', 194, Ljava_lang_Object_2_classLit), Lcom_google_gwt_touch_client_TouchScroller$6_2_classLit = createForClass('com.google.gwt.touch.client.', 'TouchScroller$6', 195, Ljava_lang_Object_2_classLit), Lcom_google_gwt_event_logical_shared_AttachEvent_2_classLit = createForClass('com.google.gwt.event.logical.shared.', 'AttachEvent', 109, Lcom_google_gwt_event_shared_GwtEvent_2_classLit), Lcom_google_gwt_user_client_impl_HistoryImpl_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'HistoryImpl', 222, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_impl_HistoryImplTimer_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'HistoryImplTimer', 225, Lcom_google_gwt_user_client_impl_HistoryImpl_2_classLit), Lcom_google_gwt_user_client_impl_HistoryImplSafari_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'HistoryImplSafari', 226, Lcom_google_gwt_user_client_impl_HistoryImplTimer_2_classLit), Lcom_google_gwt_user_client_impl_HistoryImplMozilla_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'HistoryImplMozilla', 224, Lcom_google_gwt_user_client_impl_HistoryImplTimer_2_classLit), Lcom_google_gwt_user_client_impl_HistoryImplIE6_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'HistoryImplIE6', 223, Lcom_google_gwt_user_client_impl_HistoryImpl_2_classLit), Lcom_google_gwt_json_client_JSONArray_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONArray', 130, Lcom_google_gwt_json_client_JSONValue_2_classLit), Lcom_google_gwt_json_client_JSONString_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONString', 138, Lcom_google_gwt_json_client_JSONValue_2_classLit), Lcom_google_gwt_json_client_JSONNumber_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONNumber', 135, Lcom_google_gwt_json_client_JSONValue_2_classLit), Lnet_gnehzr_tnoodle_svglite_InvalidHexColorException_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'InvalidHexColorException', 488, Ljava_lang_Exception_2_classLit), Lnet_gnehzr_tnoodle_svglite_Group_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'Group', 487, Lnet_gnehzr_tnoodle_svglite_Element_2_classLit), Lcs_threephase_FullCube$ValueComparator_2_classLit = createForClass('cs.threephase.', 'FullCube$ValueComparator', 310, Ljava_lang_Object_2_classLit), _3_3Z_classLit = createForArray('', '[[Z', 545, _3Z_classLit), Lcs_min2phase_CubieCube_2_classLit = createForClass('cs.min2phase.', 'CubieCube', 294, Ljava_lang_Object_2_classLit), _3Lcs_min2phase_CubieCube_2_classLit = createForArray('[Lcs.min2phase.', 'CubieCube;', 546, Lcs_min2phase_CubieCube_2_classLit), Lcs_sq12phase_Shape_2_classLit = createForClass('cs.sq12phase.', 'Shape', 300, Ljava_lang_Object_2_classLit), Ljava_lang_NumberFormatException_2_classLit = createForClass('java.lang.', 'NumberFormatException', 336, Ljava_lang_IllegalArgumentException_2_classLit), Lcom_google_gwt_event_dom_client_TouchEvent_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'TouchEvent', 104, Lcom_google_gwt_event_dom_client_HumanInputEvent_2_classLit), Lcom_google_gwt_event_dom_client_TouchStartEvent_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'TouchStartEvent', 108, Lcom_google_gwt_event_dom_client_TouchEvent_2_classLit), Lcom_google_gwt_event_dom_client_TouchEvent$TouchSupportDetector_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'TouchEvent$TouchSupportDetector', 106, Ljava_lang_Object_2_classLit), Lcom_google_gwt_event_dom_client_TouchMoveEvent_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'TouchMoveEvent', 107, Lcom_google_gwt_event_dom_client_TouchEvent_2_classLit), Lcom_google_gwt_event_dom_client_TouchEndEvent_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'TouchEndEvent', 105, Lcom_google_gwt_event_dom_client_TouchEvent_2_classLit), Lcom_google_gwt_event_dom_client_TouchCancelEvent_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'TouchCancelEvent', 103, Lcom_google_gwt_event_dom_client_TouchEvent_2_classLit), Lcom_google_gwt_event_logical_shared_ValueChangeEvent_2_classLit = createForClass('com.google.gwt.event.logical.shared.', 'ValueChangeEvent', 112, Lcom_google_gwt_event_shared_GwtEvent_2_classLit), Ljava_util_Comparators$1_2_classLit = createForClass('java.util.', 'Comparators$1', 377, Ljava_lang_Object_2_classLit), Lcom_google_gwt_safehtml_shared_SafeUriString_2_classLit = createForClass('com.google.gwt.safehtml.shared.', 'SafeUriString', 184, Ljava_lang_Object_2_classLit), Ljava_util_LinkedHashMap_2_classLit = createForClass('java.util.', 'LinkedHashMap', 382, Ljava_util_HashMap_2_classLit), Ljava_util_LinkedHashMap$ChainEntry_2_classLit = createForClass('java.util.', 'LinkedHashMap$ChainEntry', 383, Ljava_util_MapEntryImpl_2_classLit), Ljava_util_LinkedHashMap$EntrySet_2_classLit = createForClass('java.util.', 'LinkedHashMap$EntrySet', 385, Ljava_util_AbstractSet_2_classLit), Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2_classLit = createForClass('java.util.', 'LinkedHashMap$EntrySet$EntryIterator', 386, Ljava_lang_Object_2_classLit), Lcs_threephase_EdgeCube_2_classLit = createForClass('cs.threephase.', 'EdgeCube', 308, Ljava_lang_Object_2_classLit), Lcs_threephase_CenterCube_2_classLit = createForClass('cs.threephase.', 'CenterCube', 305, Ljava_lang_Object_2_classLit), Lcs_threephase_CornerCube_2_classLit = createForClass('cs.threephase.', 'CornerCube', 306, Ljava_lang_Object_2_classLit), _3Lcs_threephase_CornerCube_2_classLit = createForArray('[Lcs.threephase.', 'CornerCube;', 547, Lcs_threephase_CornerCube_2_classLit), Lcs_threephase_Center1_2_classLit = createForClass('cs.threephase.', 'Center1', 302, Ljava_lang_Object_2_classLit), Ljava_util_AbstractQueue_2_classLit = createForClass('java.util.', 'AbstractQueue', 360, Ljava_util_AbstractCollection_2_classLit), Ljava_util_PriorityQueue_2_classLit = createForClass('java.util.', 'PriorityQueue', 391, Ljava_util_AbstractQueue_2_classLit), Lcs_threephase_Center2_2_classLit = createForClass('cs.threephase.', 'Center2', 303, Ljava_lang_Object_2_classLit), Lcs_threephase_Center3_2_classLit = createForClass('cs.threephase.', 'Center3', 304, Ljava_lang_Object_2_classLit), Lcs_sq12phase_Square_2_classLit = createForClass('cs.sq12phase.', 'Square', 301, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_svglite_Rectangle_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'Rectangle', 493, Lnet_gnehzr_tnoodle_svglite_Element_2_classLit), Lcom_google_gwt_event_logical_shared_CloseEvent_2_classLit = createForClass('com.google.gwt.event.logical.shared.', 'CloseEvent', 110, Lcom_google_gwt_event_shared_GwtEvent_2_classLit), Lnet_gnehzr_tnoodle_utils_TimedLogRecordStart_2_classLit = createForClass('net.gnehzr.tnoodle.utils.', 'TimedLogRecordStart', 501, Ljava_util_logging_LogRecord_2_classLit), Lnet_gnehzr_tnoodle_utils_TimedLogRecordEnd_2_classLit = createForClass('net.gnehzr.tnoodle.utils.', 'TimedLogRecordEnd', 500, Ljava_util_logging_LogRecord_2_classLit), Lnet_gnehzr_tnoodle_svglite_Ellipse_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'Ellipse', 483, Lnet_gnehzr_tnoodle_svglite_Element_2_classLit), Lnet_gnehzr_tnoodle_svglite_Circle_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'Circle', 482, Lnet_gnehzr_tnoodle_svglite_Ellipse_2_classLit), Lcom_google_gwt_animation_client_AnimationSchedulerImpl_2_classLit = createForClass('com.google.gwt.animation.client.', 'AnimationSchedulerImpl', 5, Lcom_google_gwt_animation_client_AnimationScheduler_2_classLit), Lcom_google_gwt_touch_client_DefaultMomentum_2_classLit = createForClass('com.google.gwt.touch.client.', 'DefaultMomentum', 186, Ljava_lang_Object_2_classLit), Lcom_google_gwt_touch_client_Momentum$State_2_classLit = createForClass('com.google.gwt.touch.client.', 'Momentum$State', 187, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_impl_WindowImplIE_1Resources_1default_1InlineClientBundleGenerator_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'WindowImplIE_Resources_default_InlineClientBundleGenerator', 231, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_impl_WindowImplIE_1Resources_1default_1InlineClientBundleGenerator$1_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'WindowImplIE_Resources_default_InlineClientBundleGenerator$1', 232, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_impl_WindowImplIE_1Resources_1default_1InlineClientBundleGenerator$2_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'WindowImplIE_Resources_default_InlineClientBundleGenerator$2', 233, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_impl_WindowImplIE_1Resources_1default_1StaticClientBundleGenerator_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'WindowImplIE_Resources_default_StaticClientBundleGenerator', 236, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_impl_WindowImplIE_1Resources_1default_1StaticClientBundleGenerator$1_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'WindowImplIE_Resources_default_StaticClientBundleGenerator$1', 237, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_impl_WindowImplIE_1Resources_1default_1StaticClientBundleGenerator$2_2_classLit = createForClass('com.google.gwt.user.client.impl.', 'WindowImplIE_Resources_default_StaticClientBundleGenerator$2', 238, Ljava_lang_Object_2_classLit), Ljava_util_TreeSet_2_classLit = createForClass('java.util.', 'TreeSet', 404, Ljava_util_AbstractSet_2_classLit), Lcom_google_gwt_json_client_JSONException_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONException', 133, Ljava_lang_RuntimeException_2_classLit), Lnet_gnehzr_tnoodle_svglite_PathIterator_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'PathIterator', 491, Ljava_lang_Object_2_classLit), Lnet_gnehzr_tnoodle_svglite_Text_2_classLit = createForClass('net.gnehzr.tnoodle.svglite.', 'Text', 495, Lnet_gnehzr_tnoodle_svglite_Element_2_classLit), Lcom_google_gwt_animation_client_AnimationSchedulerImplTimer_2_classLit = createForClass('com.google.gwt.animation.client.', 'AnimationSchedulerImplTimer', 7, Lcom_google_gwt_animation_client_AnimationSchedulerImpl_2_classLit), Lcom_google_gwt_animation_client_AnimationSchedulerImplMozilla_2_classLit = createForClass('com.google.gwt.animation.client.', 'AnimationSchedulerImplMozilla', 6, Lcom_google_gwt_animation_client_AnimationSchedulerImpl_2_classLit), Lcom_google_gwt_animation_client_AnimationSchedulerImplWebkit_2_classLit = createForClass('com.google.gwt.animation.client.', 'AnimationSchedulerImplWebkit', 8, Lcom_google_gwt_animation_client_AnimationSchedulerImpl_2_classLit), Ljava_util_TreeMap_2_classLit = createForClass('java.util.', 'TreeMap', 392, Ljava_util_AbstractMap_2_classLit), Ljava_util_TreeMap$EntryIterator_2_classLit = createForClass('java.util.', 'TreeMap$EntryIterator', 394, Ljava_lang_Object_2_classLit), Ljava_util_TreeMap$EntrySet_2_classLit = createForClass('java.util.', 'TreeMap$EntrySet', 395, Ljava_util_AbstractSet_2_classLit), Ljava_util_TreeMap$Node_2_classLit = createForClass('java.util.', 'TreeMap$Node', 396, Ljava_lang_Object_2_classLit), _3Ljava_util_TreeMap$Node_2_classLit = createForArray('[Ljava.util.', 'TreeMap$Node;', 548, Ljava_util_TreeMap$Node_2_classLit), Ljava_util_TreeMap$State_2_classLit = createForClass('java.util.', 'TreeMap$State', 397, Ljava_lang_Object_2_classLit), Ljava_util_TreeMap$SubMap_2_classLit = createForClass('java.util.', 'TreeMap$SubMap', 398, Ljava_util_AbstractMap_2_classLit), Ljava_util_TreeMap$SubMapType_2_classLit = createForEnum('java.util.', 'TreeMap$SubMapType', 400, Ljava_lang_Enum_2_classLit, values_6), _3Ljava_util_TreeMap$SubMapType_2_classLit = createForArray('[Ljava.util.', 'TreeMap$SubMapType;', 549, Ljava_util_TreeMap$SubMapType_2_classLit), Ljava_util_TreeMap$SubMap$1_2_classLit = createForClass('java.util.', 'TreeMap$SubMap$1', 399, Ljava_util_AbstractSet_2_classLit), Ljava_util_TreeMap$SubMapType$1_2_classLit = createForEnum('java.util.', 'TreeMap$SubMapType$1', 401, Ljava_util_TreeMap$SubMapType_2_classLit, null), Ljava_util_TreeMap$SubMapType$2_2_classLit = createForEnum('java.util.', 'TreeMap$SubMapType$2', 402, Ljava_util_TreeMap$SubMapType_2_classLit, null), Ljava_util_TreeMap$SubMapType$3_2_classLit = createForEnum('java.util.', 'TreeMap$SubMapType$3', 403, Ljava_util_TreeMap$SubMapType_2_classLit, null), Ljava_util_TreeMap$1_2_classLit = createForClass('java.util.', 'TreeMap$1', 393, Ljava_lang_Object_2_classLit), Ljava_util_AbstractSequentialList_2_classLit = createForClass('java.util.', 'AbstractSequentialList', 361, Ljava_util_AbstractList_2_classLit), Ljava_util_LinkedList_2_classLit = createForClass('java.util.', 'LinkedList', 387, Ljava_util_AbstractSequentialList_2_classLit), Ljava_util_LinkedList$ListIteratorImpl_2_classLit = createForClass('java.util.', 'LinkedList$ListIteratorImpl', 388, Ljava_lang_Object_2_classLit), Ljava_util_LinkedList$Node_2_classLit = createForClass('java.util.', 'LinkedList$Node', 389, Ljava_lang_Object_2_classLit), Lcom_google_gwt_json_client_JSONBoolean_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONBoolean', 132, Lcom_google_gwt_json_client_JSONValue_2_classLit), Lcom_google_gwt_json_client_JSONNull_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONNull', 134, Lcom_google_gwt_json_client_JSONValue_2_classLit), Lcom_google_gwt_i18n_client_NumberFormat_2_classLit = createForClass('com.google.gwt.i18n.client.', 'NumberFormat', 127, Ljava_lang_Object_2_classLit), Lcom_google_gwt_i18n_client_constants_NumberConstantsImpl_1_2_classLit = createForClass('com.google.gwt.i18n.client.constants.', 'NumberConstantsImpl_', 128, Ljava_lang_Object_2_classLit), Lcom_google_gwt_touch_client_Point_2_classLit = createForClass('com.google.gwt.touch.client.', 'Point', 188, Ljava_lang_Object_2_classLit);
if (tnoodlejs) tnoodlejs.onScriptLoad(gwtOnLoad);})();