/* esm.sh - esbuild bundle(yamljs@0.3.0) deno production */
var ze=Object.create;var V=Object.defineProperty;var ve=Object.getOwnPropertyDescriptor;var Ve=Object.getOwnPropertyNames;var We=Object.getPrototypeOf,Ke=Object.prototype.hasOwnProperty;var Ze=i=>V(i,"__esModule",{value:!0});var ae=(i=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(i,{get:(e,t)=>(typeof require!="undefined"?require:e)[t]}):i)(function(i){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+i+'" is not supported')});var g=(i,e)=>()=>(e||i((e={exports:{}}).exports,e),e.exports);var Je=(i,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Ve(e))!Ke.call(i,n)&&(t||n!=="default")&&V(i,n,{get:()=>e[n],enumerable:!(r=ve(e,n))||r.enumerable});return i},pe=(i,e)=>Je(Ze(V(i!=null?ze(We(i)):{},"default",!e&&i&&i.__esModule?{get:()=>i.default,enumerable:!0}:{value:i,enumerable:!0})),i);var y=g((pt,Ee)=>{var ce;ce=function(){i.prototype.regex=null,i.prototype.rawRegex=null,i.prototype.cleanedRegex=null,i.prototype.mapping=null;function i(e,t){var r,n,s,u,f,h,l,o,a;for(t==null&&(t=""),s="",f=e.length,h=null,n=0,u=0;u<f;){if(r=e.charAt(u),r==="\\")s+=e.slice(u,+(u+1)+1||9e9),u++;else if(r==="(")if(u<f-2)if(o=e.slice(u,+(u+2)+1||9e9),o==="(?:")u+=2,s+=o;else if(o==="(?<")for(n++,u+=2,l="";u+1<f;){if(a=e.charAt(u+1),a===">"){s+="(",u++,l.length>0&&(h==null&&(h={}),h[l]=n);break}else l+=a;u++}else s+=r,n++;else s+=r;else s+=r;u++}this.rawRegex=e,this.cleanedRegex=s,this.regex=new RegExp(this.cleanedRegex,"g"+t.replace("g","")),this.mapping=h}return i.prototype.exec=function(e){var t,r,n,s;if(this.regex.lastIndex=0,r=this.regex.exec(e),r==null)return null;if(this.mapping!=null){s=this.mapping;for(n in s)t=s[n],r[n]=r[t]}return r},i.prototype.test=function(e){return this.regex.lastIndex=0,this.regex.test(e)},i.prototype.replace=function(e,t){return this.regex.lastIndex=0,e.replace(this.regex,t)},i.prototype.replaceAll=function(e,t,r){var n;for(r==null&&(r=0),this.regex.lastIndex=0,n=0;this.regex.test(e)&&(r===0||n<r);)this.regex.lastIndex=0,e=e.replace(this.regex,t),n++;return[e,n]},i}();Ee.exports=ce});var M=g((ct,Le)=>{var Te,Ae,et={}.hasOwnProperty;Te=y();Ae=function(){function i(){}return i.REGEX_LEFT_TRIM_BY_CHAR={},i.REGEX_RIGHT_TRIM_BY_CHAR={},i.REGEX_SPACES=/\s+/g,i.REGEX_DIGITS=/^\d+$/,i.REGEX_OCTAL=/[^0-7]/gi,i.REGEX_HEXADECIMAL=/[^a-f0-9]/gi,i.PATTERN_DATE=new Te("^(?<year>[0-9][0-9][0-9][0-9])-(?<month>[0-9][0-9]?)-(?<day>[0-9][0-9]?)(?:(?:[Tt]|[ 	]+)(?<hour>[0-9][0-9]?):(?<minute>[0-9][0-9]):(?<second>[0-9][0-9])(?:.(?<fraction>[0-9]*))?(?:[ 	]*(?<tz>Z|(?<tz_sign>[-+])(?<tz_hour>[0-9][0-9]?)(?::(?<tz_minute>[0-9][0-9]))?))?)?$","i"),i.LOCAL_TIMEZONE_OFFSET=new Date().getTimezoneOffset()*60*1e3,i.trim=function(e,t){var r,n;return t==null&&(t="\\s"),r=this.REGEX_LEFT_TRIM_BY_CHAR[t],r==null&&(this.REGEX_LEFT_TRIM_BY_CHAR[t]=r=new RegExp("^"+t+t+"*")),r.lastIndex=0,n=this.REGEX_RIGHT_TRIM_BY_CHAR[t],n==null&&(this.REGEX_RIGHT_TRIM_BY_CHAR[t]=n=new RegExp(t+""+t+"*$")),n.lastIndex=0,e.replace(r,"").replace(n,"")},i.ltrim=function(e,t){var r;return t==null&&(t="\\s"),r=this.REGEX_LEFT_TRIM_BY_CHAR[t],r==null&&(this.REGEX_LEFT_TRIM_BY_CHAR[t]=r=new RegExp("^"+t+t+"*")),r.lastIndex=0,e.replace(r,"")},i.rtrim=function(e,t){var r;return t==null&&(t="\\s"),r=this.REGEX_RIGHT_TRIM_BY_CHAR[t],r==null&&(this.REGEX_RIGHT_TRIM_BY_CHAR[t]=r=new RegExp(t+""+t+"*$")),r.lastIndex=0,e.replace(r,"")},i.isEmpty=function(e){return!e||e===""||e==="0"||e instanceof Array&&e.length===0||this.isEmptyObject(e)},i.isEmptyObject=function(e){var t;return e instanceof Object&&function(){var r;r=[];for(t in e)!et.call(e,t)||r.push(t);return r}().length===0},i.subStrCount=function(e,t,r,n){var s,u,f,h,l,o;for(s=0,e=""+e,t=""+t,r!=null&&(e=e.slice(r)),n!=null&&(e=e.slice(0,n)),h=e.length,o=t.length,u=f=0,l=h;0<=l?f<l:f>l;u=0<=l?++f:--f)t===e.slice(u,o)&&(s++,u+=o-1);return s},i.isDigits=function(e){return this.REGEX_DIGITS.lastIndex=0,this.REGEX_DIGITS.test(e)},i.octDec=function(e){return this.REGEX_OCTAL.lastIndex=0,parseInt((e+"").replace(this.REGEX_OCTAL,""),8)},i.hexDec=function(e){return this.REGEX_HEXADECIMAL.lastIndex=0,e=this.trim(e),(e+"").slice(0,2)==="0x"&&(e=(e+"").slice(2)),parseInt((e+"").replace(this.REGEX_HEXADECIMAL,""),16)},i.utf8chr=function(e){var t;return t=String.fromCharCode,128>(e%=2097152)?t(e):2048>e?t(192|e>>6)+t(128|e&63):65536>e?t(224|e>>12)+t(128|e>>6&63)+t(128|e&63):t(240|e>>18)+t(128|e>>12&63)+t(128|e>>6&63)+t(128|e&63)},i.parseBoolean=function(e,t){var r;return t==null&&(t=!0),typeof e=="string"?(r=e.toLowerCase(),!(!t&&r==="no"||r==="0"||r==="false"||r==="")):!!e},i.isNumeric=function(e){return this.REGEX_SPACES.lastIndex=0,typeof e=="number"||typeof e=="string"&&!isNaN(e)&&e.replace(this.REGEX_SPACES,"")!==""},i.stringToDate=function(e){var t,r,n,s,u,f,h,l,o,a,p,c;if(!e?.length||(u=this.PATTERN_DATE.exec(e),!u))return null;if(c=parseInt(u.year,10),h=parseInt(u.month,10)-1,r=parseInt(u.day,10),u.hour==null)return t=new Date(Date.UTC(c,h,r)),t;if(s=parseInt(u.hour,10),f=parseInt(u.minute,10),l=parseInt(u.second,10),u.fraction!=null){for(n=u.fraction.slice(0,3);n.length<3;)n+="0";n=parseInt(n,10)}else n=0;return u.tz!=null&&(o=parseInt(u.tz_hour,10),u.tz_minute!=null?a=parseInt(u.tz_minute,10):a=0,p=(o*60+a)*6e4,u.tz_sign==="-"&&(p*=-1)),t=new Date(Date.UTC(c,h,r,s,f,l,n)),p&&t.setTime(t.getTime()-p),t},i.strRepeat=function(e,t){var r,n;for(n="",r=0;r<t;)n+=e,r++;return n},i.getStringFromFile=function(e,t){var r,n,s,u,f,h,l,o;if(t==null&&(t=null),o=null,typeof document<"u"&&window!==null){if(window.XMLHttpRequest)o=new XMLHttpRequest;else if(window.ActiveXObject)for(h=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"],s=0,u=h.length;s<u;s++){f=h[s];try{o=new ActiveXObject(f)}catch{}}}return o!=null?t!=null?(o.onreadystatechange=function(){if(o.readyState===4)return o.status===200||o.status===0?t(o.responseText):t(null)},o.open("GET",e,!0),o.send(null)):(o.open("GET",e,!1),o.send(null),o.status===200||o.status===0?o.responseText:null):(l=ae,n=l("fs"),t!=null?n.readFile(e,function(a,p){return t(a?null:String(p))}):(r=n.readFileSync(e),r!=null?String(r):null))},i}();Le.exports=Ae});var me=g((Et,Re)=>{var _e,Ne,I;I=M();_e=y();Ne=function(){function i(){}return i.PATTERN_ESCAPED_CHARACTER=new _e('\\\\([0abt	nvfre "\\/\\\\N_LP]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})'),i.unescapeSingleQuotedString=function(e){return e.replace(/\'\'/g,"'")},i.unescapeDoubleQuotedString=function(e){return this._unescapeCallback==null&&(this._unescapeCallback=function(t){return function(r){return t.unescapeCharacter(r)}}(this)),this.PATTERN_ESCAPED_CHARACTER.replace(e,this._unescapeCallback)},i.unescapeCharacter=function(e){var t;switch(t=String.fromCharCode,e.charAt(1)){case"0":return t(0);case"a":return t(7);case"b":return t(8);case"t":return"	";case"	":return"	";case"n":return`
`;case"v":return t(11);case"f":return t(12);case"r":return t(13);case"e":return t(27);case" ":return" ";case'"':return'"';case"/":return"/";case"\\":return"\\";case"N":return t(133);case"_":return t(160);case"L":return t(8232);case"P":return t(8233);case"x":return I.utf8chr(I.hexDec(e.substr(2,2)));case"u":return I.utf8chr(I.hexDec(e.substr(2,4)));case"U":return I.utf8chr(I.hexDec(e.substr(2,8)));default:return""}},i}();Re.exports=Ne});var Ce=g((Tt,xe)=>{var ge,Y;Y=y();ge=function(){var i;function e(){}return e.LIST_ESCAPEES=["\\","\\\\",'\\"','"',"\0","","","","","","","\x07","\b","	",`
`,"\v","\f","\r","","","","","","","","","","","","","","\x1B","","","","",(i=String.fromCharCode)(133),i(160),i(8232),i(8233)],e.LIST_ESCAPED=["\\\\",'\\"','\\"','\\"',"\\0","\\x01","\\x02","\\x03","\\x04","\\x05","\\x06","\\a","\\b","\\t","\\n","\\v","\\f","\\r","\\x0e","\\x0f","\\x10","\\x11","\\x12","\\x13","\\x14","\\x15","\\x16","\\x17","\\x18","\\x19","\\x1a","\\e","\\x1c","\\x1d","\\x1e","\\x1f","\\N","\\_","\\L","\\P"],e.MAPPING_ESCAPEES_TO_ESCAPED=function(){var t,r,n,s;for(n={},t=r=0,s=e.LIST_ESCAPEES.length;0<=s?r<s:r>s;t=0<=s?++r:--r)n[e.LIST_ESCAPEES[t]]=e.LIST_ESCAPED[t];return n}(),e.PATTERN_CHARACTERS_TO_ESCAPE=new Y("[\\x00-\\x1f]|\xC2\x85|\xC2\xA0|\xE2\x80\xA8|\xE2\x80\xA9"),e.PATTERN_MAPPING_ESCAPEES=new Y(e.LIST_ESCAPEES.join("|").split("\\").join("\\\\")),e.PATTERN_SINGLE_QUOTING=new Y("[\\s'\":{}[\\],&*#?]|^[-?|<>=!%@`]"),e.requiresDoubleQuoting=function(t){return this.PATTERN_CHARACTERS_TO_ESCAPE.test(t)},e.escapeWithDoubleQuotes=function(t){var r;return r=this.PATTERN_MAPPING_ESCAPEES.replace(t,function(n){return function(s){return n.MAPPING_ESCAPEES_TO_ESCAPED[s]}}(this)),'"'+r+'"'},e.requiresSingleQuoting=function(t){return this.PATTERN_SINGLE_QUOTING.test(t)},e.escapeWithSingleQuotes=function(t){return"'"+t.replace(/'/g,"''")+"'"},e}();xe.exports=ge});var W=g((At,Se)=>{var de,tt=function(i,e){for(var t in e)rt.call(e,t)&&(i[t]=e[t]);function r(){this.constructor=i}return r.prototype=e.prototype,i.prototype=new r,i.__super__=e.prototype,i},rt={}.hasOwnProperty;de=function(i){tt(e,i);function e(t,r,n){this.message=t,this.parsedLine=r,this.snippet=n}return e.prototype.toString=function(){return this.parsedLine!=null&&this.snippet!=null?"<ParseException> "+this.message+" (line "+this.parsedLine+": '"+this.snippet+"')":"<ParseException> "+this.message},e}(Error);Se.exports=de});var K=g((Lt,Pe)=>{var we,nt=function(i,e){for(var t in e)it.call(e,t)&&(i[t]=e[t]);function r(){this.constructor=i}return r.prototype=e.prototype,i.prototype=new r,i.__super__=e.prototype,i},it={}.hasOwnProperty;we=function(i){nt(e,i);function e(t,r,n){this.message=t,this.parsedLine=r,this.snippet=n}return e.prototype.toString=function(){return this.parsedLine!=null&&this.snippet!=null?"<ParseMore> "+this.message+" (line "+this.parsedLine+": '"+this.snippet+"')":"<ParseMore> "+this.message},e}(Error);Pe.exports=we});var Me=g((_t,ye)=>{var Ie,st=function(i,e){for(var t in e)ut.call(e,t)&&(i[t]=e[t]);function r(){this.constructor=i}return r.prototype=e.prototype,i.prototype=new r,i.__super__=e.prototype,i},ut={}.hasOwnProperty;Ie=function(i){st(e,i);function e(t,r,n){this.message=t,this.parsedLine=r,this.snippet=n}return e.prototype.toString=function(){return this.parsedLine!=null&&this.snippet!=null?"<DumpException> "+this.message+" (line "+this.parsedLine+": '"+this.snippet+"')":"<DumpException> "+this.message},e}(Error);ye.exports=Ie});var J=g((Nt,be)=>{var lt,O,Oe,b,k,G,Z,T,De=[].indexOf||function(i){for(var e=0,t=this.length;e<t;e++)if(e in this&&this[e]===i)return e;return-1};G=y();Z=me();O=Ce();T=M();b=W();k=K();lt=Me();Oe=function(){function i(){}return i.REGEX_QUOTED_STRING=`(?:"(?:[^"\\\\]*(?:\\\\.[^"\\\\]*)*)"|'(?:[^']*(?:''[^']*)*)')`,i.PATTERN_TRAILING_COMMENTS=new G("^\\s*#.*$"),i.PATTERN_QUOTED_SCALAR=new G("^"+i.REGEX_QUOTED_STRING),i.PATTERN_THOUSAND_NUMERIC_SCALAR=new G("^(-|\\+)?[0-9,]+(\\.[0-9]+)?$"),i.PATTERN_SCALAR_BY_DELIMITERS={},i.settings={},i.configure=function(e,t){e==null&&(e=null),t==null&&(t=null),this.settings.exceptionOnInvalidType=e,this.settings.objectDecoder=t},i.parse=function(e,t,r){var n,s;if(t==null&&(t=!1),r==null&&(r=null),this.settings.exceptionOnInvalidType=t,this.settings.objectDecoder=r,e==null||(e=T.trim(e),e.length===0))return"";switch(n={exceptionOnInvalidType:t,objectDecoder:r,i:0},e.charAt(0)){case"[":s=this.parseSequence(e,n),++n.i;break;case"{":s=this.parseMapping(e,n),++n.i;break;default:s=this.parseScalar(e,null,['"',"'"],n)}if(this.PATTERN_TRAILING_COMMENTS.replace(e.slice(n.i),"")!=="")throw new b('Unexpected characters near "'+e.slice(n.i)+'".');return s},i.dump=function(e,t,r){var n,s,u;return t==null&&(t=!1),r==null&&(r=null),e==null?"null":(u=typeof e,u==="object"?e instanceof Date?e.toISOString():r!=null&&(s=r(e),typeof s=="string"||s!=null)?s:this.dumpObject(e):u==="boolean"?e?"true":"false":T.isDigits(e)?u==="string"?"'"+e+"'":String(parseInt(e)):T.isNumeric(e)?u==="string"?"'"+e+"'":String(parseFloat(e)):u==="number"?e===1/0?".Inf":e===-1/0?"-.Inf":isNaN(e)?".NaN":e:O.requiresDoubleQuoting(e)?O.escapeWithDoubleQuotes(e):O.requiresSingleQuoting(e)?O.escapeWithSingleQuotes(e):e===""?'""':T.PATTERN_DATE.test(e)||(n=e.toLowerCase())==="null"||n==="~"||n==="true"||n==="false"?"'"+e+"'":e)},i.dumpObject=function(e,t,r){var n,s,u,f,h;if(r==null&&(r=null),e instanceof Array){for(f=[],n=0,u=e.length;n<u;n++)h=e[n],f.push(this.dump(h));return"["+f.join(", ")+"]"}else{f=[];for(s in e)h=e[s],f.push(this.dump(s)+": "+this.dump(h));return"{"+f.join(", ")+"}"}},i.parseScalar=function(e,t,r,n,s){var u,f,h,l,o,a,p,c,_;if(t==null&&(t=null),r==null&&(r=['"',"'"]),n==null&&(n=null),s==null&&(s=!0),n==null&&(n={exceptionOnInvalidType:this.settings.exceptionOnInvalidType,objectDecoder:this.settings.objectDecoder,i:0}),u=n.i,a=e.charAt(u),De.call(r,a)>=0){if(l=this.parseQuotedScalar(e,n),u=n.i,t!=null&&(_=T.ltrim(e.slice(u)," "),p=_.charAt(0),!(De.call(t,p)>=0)))throw new b("Unexpected characters ("+e.slice(u)+").")}else{if(!t)l=e.slice(u),u+=l.length,c=l.indexOf(" #"),c!==-1&&(l=T.rtrim(l.slice(0,c)));else if(f=t.join("|"),o=this.PATTERN_SCALAR_BY_DELIMITERS[f],o==null&&(o=new G("^(.+?)("+f+")"),this.PATTERN_SCALAR_BY_DELIMITERS[f]=o),h=o.exec(e.slice(u)))l=h[1],u+=l.length;else throw new b("Malformed inline YAML string ("+e+").");s&&(l=this.evaluateScalar(l,n))}return n.i=u,l},i.parseQuotedScalar=function(e,t){var r,n,s;if(r=t.i,!(n=this.PATTERN_QUOTED_SCALAR.exec(e.slice(r))))throw new k("Malformed inline YAML string ("+e.slice(r)+").");return s=n[0].substr(1,n[0].length-2),e.charAt(r)==='"'?s=Z.unescapeDoubleQuotedString(s):s=Z.unescapeSingleQuotedString(s),r+=n[0].length,t.i=r,s},i.parseSequence=function(e,t){var r,n,s,u,f,h,l;for(f=[],u=e.length,n=t.i,n+=1;n<u;){switch(t.i=n,e.charAt(n)){case"[":f.push(this.parseSequence(e,t)),n=t.i;break;case"{":f.push(this.parseMapping(e,t)),n=t.i;break;case"]":return f;case",":case" ":case`
`:break;default:if(s=(h=e.charAt(n))==='"'||h==="'",l=this.parseScalar(e,[",","]"],['"',"'"],t),n=t.i,!s&&typeof l=="string"&&(l.indexOf(": ")!==-1||l.indexOf(`:
`)!==-1))try{l=this.parseMapping("{"+l+"}")}catch(o){r=o}f.push(l),--n}++n}throw new k("Malformed inline YAML string "+e)},i.parseMapping=function(e,t){var r,n,s,u,f,h,l;for(f={},u=e.length,n=t.i,n+=1,h=!1;n<u;){switch(t.i=n,e.charAt(n)){case" ":case",":case`
`:++n,t.i=n,h=!0;break;case"}":return f}if(h){h=!1;continue}for(s=this.parseScalar(e,[":"," ",`
`],['"',"'"],t,!1),n=t.i,r=!1;n<u;){switch(t.i=n,e.charAt(n)){case"[":l=this.parseSequence(e,t),n=t.i,f[s]===void 0&&(f[s]=l),r=!0;break;case"{":l=this.parseMapping(e,t),n=t.i,f[s]===void 0&&(f[s]=l),r=!0;break;case":":case" ":case`
`:break;default:l=this.parseScalar(e,[",","}"],['"',"'"],t),n=t.i,f[s]===void 0&&(f[s]=l),r=!0,--n}if(++n,r)break}}throw new k("Malformed inline YAML string "+e)},i.evaluateScalar=function(e,t){var r,n,s,u,f,h,l,o,a,p,c;switch(e=T.trim(e),a=e.toLowerCase(),a){case"null":case"":case"~":return null;case"true":return!0;case"false":return!1;case".inf":return 1/0;case".nan":return 0/0;case"-.inf":return 1/0;default:switch(u=a.charAt(0),u){case"!":switch(f=e.indexOf(" "),f===-1?h=a:h=a.slice(0,f),h){case"!":return f!==-1?parseInt(this.parseScalar(e.slice(2))):null;case"!str":return T.ltrim(e.slice(4));case"!!str":return T.ltrim(e.slice(5));case"!!int":return parseInt(this.parseScalar(e.slice(5)));case"!!bool":return T.parseBoolean(this.parseScalar(e.slice(6)),!1);case"!!float":return parseFloat(this.parseScalar(e.slice(7)));case"!!timestamp":return T.stringToDate(T.ltrim(e.slice(11)));default:if(t==null&&(t={exceptionOnInvalidType:this.settings.exceptionOnInvalidType,objectDecoder:this.settings.objectDecoder,i:0}),l=t.objectDecoder,s=t.exceptionOnInvalidType,l)return c=T.rtrim(e),f=c.indexOf(" "),f===-1?l(c,null):(p=T.ltrim(c.slice(f+1)),p.length>0||(p=null),l(c.slice(0,f),p));if(s)throw new b("Custom object support when parsing a YAML file has been disabled.");return null}break;case"0":return e.slice(0,2)==="0x"?T.hexDec(e):T.isDigits(e)?T.octDec(e):T.isNumeric(e)?parseFloat(e):e;case"+":return T.isDigits(e)?(o=e,r=parseInt(o),o===String(r)?r:o):T.isNumeric(e)?parseFloat(e):this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(e)?parseFloat(e.replace(",","")):e;case"-":return T.isDigits(e.slice(1))?e.charAt(1)==="0"?-T.octDec(e.slice(1)):(o=e.slice(1),r=parseInt(o),o===String(r)?-r:-o):T.isNumeric(e)?parseFloat(e):this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(e)?parseFloat(e.replace(",","")):e;default:return(n=T.stringToDate(e))?n:T.isNumeric(e)?parseFloat(e):this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(e)?parseFloat(e.replace(",","")):e}}},i}();be.exports=Oe});var Xe=g((Rt,Fe)=>{var x,m,Ge,Ue,N,L;x=J();N=y();L=M();m=W();Ge=K();Ue=function(){i.prototype.PATTERN_FOLDED_SCALAR_ALL=new N("^(?:(?<type>![^\\|>]*)\\s+)?(?<separator>\\||>)(?<modifiers>\\+|\\-|\\d+|\\+\\d+|\\-\\d+|\\d+\\+|\\d+\\-)?(?<comments> +#.*)?$"),i.prototype.PATTERN_FOLDED_SCALAR_END=new N("(?<separator>\\||>)(?<modifiers>\\+|\\-|\\d+|\\+\\d+|\\-\\d+|\\d+\\+|\\d+\\-)?(?<comments> +#.*)?$"),i.prototype.PATTERN_SEQUENCE_ITEM=new N("^\\-((?<leadspaces>\\s+)(?<value>.+?))?\\s*$"),i.prototype.PATTERN_ANCHOR_VALUE=new N("^&(?<ref>[^ ]+) *(?<value>.*)"),i.prototype.PATTERN_COMPACT_NOTATION=new N("^(?<key>"+x.REGEX_QUOTED_STRING+`|[^ '"\\{\\[].*?) *\\:(\\s+(?<value>.+?))?\\s*$`),i.prototype.PATTERN_MAPPING_ITEM=new N("^(?<key>"+x.REGEX_QUOTED_STRING+`|[^ '"\\[\\{].*?) *\\:(\\s+(?<value>.+?))?\\s*$`),i.prototype.PATTERN_DECIMAL=new N("\\d+"),i.prototype.PATTERN_INDENT_SPACES=new N("^ +"),i.prototype.PATTERN_TRAILING_LINES=new N(`(
*)$`),i.prototype.PATTERN_YAML_HEADER=new N(`^\\%YAML[: ][\\d\\.]+.*
`,"m"),i.prototype.PATTERN_LEADING_COMMENTS=new N(`^(\\#.*?
)+`,"m"),i.prototype.PATTERN_DOCUMENT_MARKER_START=new N(`^\\-\\-\\-.*?
`,"m"),i.prototype.PATTERN_DOCUMENT_MARKER_END=new N("^\\.\\.\\.\\s*$","m"),i.prototype.PATTERN_FOLDED_SCALAR_BY_INDENTATION={},i.prototype.CONTEXT_NONE=0,i.prototype.CONTEXT_SEQUENCE=1,i.prototype.CONTEXT_MAPPING=2;function i(e){this.offset=e??0,this.lines=[],this.currentLineNb=-1,this.currentLine="",this.refs={}}return i.prototype.parse=function(e,t,r){var n,s,u,f,h,l,o,a,p,c,_,C,Q,A,F,$,ne,ie,se,ue,j,z,S,v,X,le,w,d,R,fe,oe,he,H,P,B,E;for(t==null&&(t=!1),r==null&&(r=null),this.currentLineNb=-1,this.currentLine="",this.lines=this.cleanup(e).split(`
`),l=null,h=this.CONTEXT_NONE,s=!1;this.moveToNextLine();)if(!this.isCurrentLineEmpty()){if(this.currentLine[0]==="	")throw new m("A YAML file cannot contain tabs as indentation.",this.getRealCurrentLineNb()+1,this.currentLine);if(_=v=!1,E=this.PATTERN_SEQUENCE_ITEM.exec(this.currentLine)){if(this.CONTEXT_MAPPING===h)throw new m("You cannot define a sequence item when in a mapping");h=this.CONTEXT_SEQUENCE,l==null&&(l=[]),E.value!=null&&(S=this.PATTERN_ANCHOR_VALUE.exec(E.value))&&(_=S.ref,E.value=S.value),E.value==null||L.trim(E.value," ")===""||L.ltrim(E.value," ").indexOf("#")===0?this.currentLineNb<this.lines.length-1&&!this.isNextLineUnIndentedCollection()?(f=this.getRealCurrentLineNb()+1,R=new i(f),R.refs=this.refs,l.push(R.parse(this.getNextEmbedBlock(null,!0),t,r))):l.push(null):((fe=E.leadspaces)!=null?fe.length:void 0)&&(S=this.PATTERN_COMPACT_NOTATION.exec(E.value))?(f=this.getRealCurrentLineNb(),R=new i(f),R.refs=this.refs,u=E.value,c=this.getCurrentLineIndentation(),this.isNextLineIndented(!1)&&(u+=`
`+this.getNextEmbedBlock(c+E.leadspaces.length+1,!0)),l.push(R.parse(u,t,r))):l.push(this.parseValue(E.value,t,r))}else if((E=this.PATTERN_MAPPING_ITEM.exec(this.currentLine))&&E.key.indexOf(" #")===-1){if(this.CONTEXT_SEQUENCE===h)throw new m("You cannot define a mapping item when in a sequence");h=this.CONTEXT_MAPPING,l==null&&(l={}),x.configure(t,r);try{A=x.parseScalar(E.key)}catch(D){throw o=D,o.parsedLine=this.getRealCurrentLineNb()+1,o.snippet=this.currentLine,o}if(A==="<<")if(v=!0,s=!0,((oe=E.value)!=null?oe.indexOf("*"):void 0)===0){if(H=E.value.slice(1),this.refs[H]==null)throw new m('Reference "'+H+'" does not exist.',this.getRealCurrentLineNb()+1,this.currentLine);if(P=this.refs[H],typeof P!="object")throw new m("YAML merge keys used with a scalar value instead of an object.",this.getRealCurrentLineNb()+1,this.currentLine);if(P instanceof Array)for(p=C=0,ne=P.length;C<ne;p=++C)e=P[p],l[le=String(p)]==null&&(l[le]=e);else for(A in P)e=P[A],l[A]==null&&(l[A]=e)}else{if(E.value!=null&&E.value!==""?e=E.value:e=this.getNextEmbedBlock(),f=this.getRealCurrentLineNb()+1,R=new i(f),R.refs=this.refs,w=R.parse(e,t),typeof w!="object")throw new m("YAML merge keys used with a scalar value instead of an object.",this.getRealCurrentLineNb()+1,this.currentLine);if(w instanceof Array)for(F=0,ie=w.length;F<ie;F++){if(d=w[F],typeof d!="object")throw new m("Merge items must be objects.",this.getRealCurrentLineNb()+1,d);if(d instanceof Array)for(p=z=0,se=d.length;z<se;p=++z)e=d[p],Q=String(p),l.hasOwnProperty(Q)||(l[Q]=e);else for(A in d)e=d[A],l.hasOwnProperty(A)||(l[A]=e)}else for(A in w)e=w[A],l.hasOwnProperty(A)||(l[A]=e)}else E.value!=null&&(S=this.PATTERN_ANCHOR_VALUE.exec(E.value))&&(_=S.ref,E.value=S.value);v||(E.value==null||L.trim(E.value," ")===""||L.ltrim(E.value," ").indexOf("#")===0?!this.isNextLineIndented()&&!this.isNextLineUnIndentedCollection()?(s||l[A]===void 0)&&(l[A]=null):(f=this.getRealCurrentLineNb()+1,R=new i(f),R.refs=this.refs,B=R.parse(this.getNextEmbedBlock(),t,r),(s||l[A]===void 0)&&(l[A]=B)):(B=this.parseValue(E.value,t,r),(s||l[A]===void 0)&&(l[A]=B)))}else{if(j=this.lines.length,j===1||j===2&&L.isEmpty(this.lines[1])){try{e=x.parse(this.lines[0],t,r)}catch(D){throw o=D,o.parsedLine=this.getRealCurrentLineNb()+1,o.snippet=this.currentLine,o}if(typeof e=="object"){if(e instanceof Array)a=e[0];else for(A in e){a=e[A];break}if(typeof a=="string"&&a.indexOf("*")===0){for(l=[],X=0,ue=e.length;X<ue;X++)n=e[X],l.push(this.refs[n.slice(1)]);e=l}}return e}else if((he=L.ltrim(e).charAt(0))==="["||he==="{")try{return x.parse(e,t,r)}catch(D){throw o=D,o.parsedLine=this.getRealCurrentLineNb()+1,o.snippet=this.currentLine,o}throw new m("Unable to parse.",this.getRealCurrentLineNb()+1,this.currentLine)}if(_)if(l instanceof Array)this.refs[_]=l[l.length-1];else{$=null;for(A in l)$=A;this.refs[_]=l[$]}}return L.isEmpty(l)?null:l},i.prototype.getRealCurrentLineNb=function(){return this.currentLineNb+this.offset},i.prototype.getCurrentLineIndentation=function(){return this.currentLine.length-L.ltrim(this.currentLine," ").length},i.prototype.getNextEmbedBlock=function(e,t){var r,n,s,u,f,h,l;if(e==null&&(e=null),t==null&&(t=!1),this.moveToNextLine(),e==null){if(u=this.getCurrentLineIndentation(),l=this.isStringUnIndentedCollectionItem(this.currentLine),!this.isCurrentLineEmpty()&&u===0&&!l)throw new m("Indentation problem.",this.getRealCurrentLineNb()+1,this.currentLine)}else u=e;for(r=[this.currentLine.slice(u)],t||(s=this.isStringUnIndentedCollectionItem(this.currentLine)),h=this.PATTERN_FOLDED_SCALAR_END,f=!h.test(this.currentLine);this.moveToNextLine();)if(n=this.getCurrentLineIndentation(),n===u&&(f=!h.test(this.currentLine)),!(f&&this.isCurrentLineComment())){if(this.isCurrentLineBlank()){r.push(this.currentLine.slice(u));continue}if(s&&!this.isStringUnIndentedCollectionItem(this.currentLine)&&n===u){this.moveToPreviousLine();break}if(n>=u)r.push(this.currentLine.slice(u));else if(L.ltrim(this.currentLine).charAt(0)!=="#")if(n===0){this.moveToPreviousLine();break}else throw new m("Indentation problem.",this.getRealCurrentLineNb()+1,this.currentLine)}return r.join(`
`)},i.prototype.moveToNextLine=function(){return this.currentLineNb>=this.lines.length-1?!1:(this.currentLine=this.lines[++this.currentLineNb],!0)},i.prototype.moveToPreviousLine=function(){this.currentLine=this.lines[--this.currentLineNb]},i.prototype.parseValue=function(e,t,r){var n,s,u,f,h,l,o,a;if(e.indexOf("*")===0){if(h=e.indexOf("#"),h!==-1?e=e.substr(1,h-2):e=e.slice(1),this.refs[e]===void 0)throw new m('Reference "'+e+'" does not exist.',this.currentLine);return this.refs[e]}if(u=this.PATTERN_FOLDED_SCALAR_ALL.exec(e))return f=(l=u.modifiers)!=null?l:"",s=Math.abs(parseInt(f)),isNaN(s)&&(s=0),a=this.parseFoldedScalar(u.separator,this.PATTERN_DECIMAL.replace(f,""),s),u.type!=null?(x.configure(t,r),x.parseScalar(u.type+" "+a)):a;if((o=e.charAt(0))==="["||o==="{"||o==='"'||o==="'")for(;;)try{return x.parse(e,t,r)}catch(p){if(n=p,n instanceof Ge&&this.moveToNextLine())e+=`
`+L.trim(this.currentLine," ");else throw n.parsedLine=this.getRealCurrentLineNb()+1,n.snippet=this.currentLine,n}else return this.isNextLineIndented()&&(e+=`
`+this.getNextEmbedBlock()),x.parse(e,t,r)},i.prototype.parseFoldedScalar=function(e,t,r){var n,s,u,f,h,l,o,a,p,c;if(t==null&&(t=""),r==null&&(r=0),o=this.moveToNextLine(),!o)return"";for(n=this.isCurrentLineBlank(),c="";o&&n;)(o=this.moveToNextLine())&&(c+=`
`,n=this.isCurrentLineBlank());if(r===0&&(h=this.PATTERN_INDENT_SPACES.exec(this.currentLine))&&(r=h[0].length),r>0)for(a=this.PATTERN_FOLDED_SCALAR_BY_INDENTATION[r],a==null&&(a=new N("^ {"+r+"}(.*)$"),i.prototype.PATTERN_FOLDED_SCALAR_BY_INDENTATION[r]=a);o&&(n||(h=a.exec(this.currentLine)));)n?c+=this.currentLine.slice(r):c+=h[1],(o=this.moveToNextLine())&&(c+=`
`,n=this.isCurrentLineBlank());else o&&(c+=`
`);if(o&&this.moveToPreviousLine(),e===">"){for(l="",p=c.split(`
`),s=0,u=p.length;s<u;s++)f=p[s],f.length===0||f.charAt(0)===" "?l=L.rtrim(l," ")+f+`
`:l+=f+" ";c=l}return t!=="+"&&(c=L.rtrim(c)),t===""?c=this.PATTERN_TRAILING_LINES.replace(c,`
`):t==="-"&&(c=this.PATTERN_TRAILING_LINES.replace(c,"")),c},i.prototype.isNextLineIndented=function(e){var t,r,n;if(e==null&&(e=!0),r=this.getCurrentLineIndentation(),t=!this.moveToNextLine(),e)for(;!t&&this.isCurrentLineEmpty();)t=!this.moveToNextLine();else for(;!t&&this.isCurrentLineBlank();)t=!this.moveToNextLine();return t?!1:(n=!1,this.getCurrentLineIndentation()>r&&(n=!0),this.moveToPreviousLine(),n)},i.prototype.isCurrentLineEmpty=function(){var e;return e=L.trim(this.currentLine," "),e.length===0||e.charAt(0)==="#"},i.prototype.isCurrentLineBlank=function(){return L.trim(this.currentLine," ")===""},i.prototype.isCurrentLineComment=function(){var e;return e=L.ltrim(this.currentLine," "),e.charAt(0)==="#"},i.prototype.cleanup=function(e){var t,r,n,s,u,f,h,l,o,a,p,c,_,C;for(e.indexOf("\r")!==-1&&(e=e.split(`\r
`).join(`
`).split("\r").join(`
`)),t=0,a=this.PATTERN_YAML_HEADER.replaceAll(e,""),e=a[0],t=a[1],this.offset+=t,p=this.PATTERN_LEADING_COMMENTS.replaceAll(e,"",1),C=p[0],t=p[1],t===1&&(this.offset+=L.subStrCount(e,`
`)-L.subStrCount(C,`
`),e=C),c=this.PATTERN_DOCUMENT_MARKER_START.replaceAll(e,"",1),C=c[0],t=c[1],t===1&&(this.offset+=L.subStrCount(e,`
`)-L.subStrCount(C,`
`),e=C,e=this.PATTERN_DOCUMENT_MARKER_END.replace(e,"")),o=e.split(`
`),_=-1,s=0,f=o.length;s<f;s++)l=o[s],L.trim(l," ").length!==0&&(n=l.length-L.ltrim(l).length,(_===-1||n<_)&&(_=n));if(_>0){for(r=u=0,h=o.length;u<h;r=++u)l=o[r],o[r]=l.slice(_);e=o.join(`
`)}return e},i.prototype.isNextLineUnIndentedCollection=function(e){var t,r;for(e==null&&(e=null),e==null&&(e=this.getCurrentLineIndentation()),t=this.moveToNextLine();t&&this.isCurrentLineEmpty();)t=this.moveToNextLine();return t===!1?!1:(r=!1,this.getCurrentLineIndentation()===e&&this.isStringUnIndentedCollectionItem(this.currentLine)&&(r=!0),this.moveToPreviousLine(),r)},i.prototype.isStringUnIndentedCollectionItem=function(){return this.currentLine==="-"||this.currentLine.slice(0,2)==="- "},i}();Fe.exports=Ue});var Ye=g((mt,Be)=>{var He,ee,U;U=M();ee=J();He=function(){function i(){}return i.indentation=4,i.prototype.dump=function(e,t,r,n,s){var u,f,h,l,o,a,p;if(t==null&&(t=0),r==null&&(r=0),n==null&&(n=!1),s==null&&(s=null),l="",o=r?U.strRepeat(" ",r):"",t<=0||typeof e!="object"||e instanceof Date||U.isEmpty(e))l+=o+ee.dump(e,n,s);else if(e instanceof Array)for(u=0,h=e.length;u<h;u++)a=e[u],p=t-1<=0||typeof a!="object"||U.isEmpty(a),l+=o+"-"+(p?" ":`
`)+this.dump(a,t-1,p?0:r+this.indentation,n,s)+(p?`
`:"");else for(f in e)a=e[f],p=t-1<=0||typeof a!="object"||U.isEmpty(a),l+=o+ee.dump(f,n,s)+":"+(p?" ":`
`)+this.dump(a,t-1,p?0:r+this.indentation,n,s)+(p?`
`:"");return l},i}();Be.exports=He});var re=g((Qe,$e)=>{var ke,qe,te,q;qe=Xe();ke=Ye();te=M();q=function(){function i(){}return i.parse=function(e,t,r){return t==null&&(t=!1),r==null&&(r=null),new qe().parse(e,t,r)},i.parseFile=function(e,t,r,n){var s;return t==null&&(t=null),r==null&&(r=!1),n==null&&(n=null),t!=null?te.getStringFromFile(e,function(u){return function(f){var h;h=null,f!=null&&(h=u.parse(f,r,n)),t(h)}}(this)):(s=te.getStringFromFile(e),s!=null?this.parse(s,r,n):null)},i.dump=function(e,t,r,n,s){var u;return t==null&&(t=2),r==null&&(r=4),n==null&&(n=!1),s==null&&(s=null),u=new ke,u.indentation=r,u.dump(e,t,0,n,s)},i.stringify=function(e,t,r,n,s){return this.dump(e,t,r,n,s)},i.load=function(e,t,r,n){return this.parseFile(e,t,r,n)},i}();typeof document<"u"&&window!==null&&(window.YAML=q);(typeof window>"u"||window===null)&&(Qe.YAML=q);$e.exports=q});var je=pe(re()),ft=pe(re()),{default:ot,...ht}=ft,gt=je.default??ot??ht;export{gt as default};
