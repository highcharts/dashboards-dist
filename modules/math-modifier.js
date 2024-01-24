!/**
 * Highcharts Dashboards Math 1.3.0 (2024-01-24)
 *
 * (c) 2009-2024 Highsoft AS
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("dashboards/modules/math-modifier",["dashboards"],function(t){return e(t),e.Dashboards=t,e}):e("undefined"!=typeof Dashboards?Dashboards:void 0)}(function(e){"use strict";var t=e?e._modules:{};function r(e,t,r,n){e.hasOwnProperty(t)||(e[t]=n.apply(null,r),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("DashboardsModuleLoaded",{detail:{path:t,module:e[t]}})))}r(t,"Data/Formula/FormulaParser.js",[],function(){let e=/^(?:FALSE|TRUE)/,t=/^[+-]?\d+(?:\.\d+)?(?:e[+-]\d+)?/,r=/^[+-]?\d+(?:,\d+)?(?:e[+-]\d+)?/,n=/^([A-Z][A-Z\d\.]*)\(/,o=/^(?:[+\-*\/^<=>]|<=|=>)/,s=/^(\$?[A-Z]+)(\$?\d+)\:(\$?[A-Z]+)(\$?\d+)/,u=/^R(\d*|\[\d+\])C(\d*|\[\d+\])\:R(\d*|\[\d+\])C(\d*|\[\d+\])/,a=/^(\$?[A-Z]+)(\$?\d+)(?![\:C])/,i=/^R(\d*|\[\d+\])C(\d*|\[\d+\])(?!\:)/;function l(e){let t=0;for(let r=0,n=e.length,o,s=1;r<n;++r){if("("===(o=e[r])){t||(s=r+1),++t;continue}if(")"===o&&!--t)return e.substring(s,r)}if(t>0){let e=Error("Incomplete parantheses.");throw e.name="FormulaParseError",e}return""}function c(e){let t=-1;for(let r=0,n=e.length,o,s=!1;r<n;++r){if("\\"===(o=e[r])){s=!s;continue}if(s){s=!1;continue}if('"'===o){if(!(t<0))return e.substring(t+1,r);t=r}}let r=Error("Incomplete string.");throw r.name="FormulaParseError",r}function f(e,t){let r;if(r=e.match(u)){let e=""===r[2]||"["===r[2][0],t=""===r[1]||"["===r[1][0],n=""===r[4]||"["===r[4][0],o=""===r[3]||"["===r[3][0],s={type:"range",beginColumn:e?parseInt(r[2].substring(1,-1)||"0",10):parseInt(r[2],10)-1,beginRow:t?parseInt(r[1].substring(1,-1)||"0",10):parseInt(r[1],10)-1,endColumn:n?parseInt(r[4].substring(1,-1)||"0",10):parseInt(r[4],10)-1,endRow:o?parseInt(r[3].substring(1,-1)||"0",10):parseInt(r[3],10)-1};return e&&(s.beginColumnRelative=!0),t&&(s.beginRowRelative=!0),n&&(s.endColumnRelative=!0),o&&(s.endRowRelative=!0),s}if(r=e.match(s)){let e="$"!==r[1][0],t="$"!==r[2][0],n="$"!==r[3][0],o="$"!==r[4][0],s={type:"range",beginColumn:g(e?r[1]:r[1].substring(1))-1,beginRow:parseInt(t?r[2]:r[2].substring(1),10)-1,endColumn:g(n?r[3]:r[3].substring(1))-1,endRow:parseInt(o?r[4]:r[4].substring(1),10)-1};return e&&(s.beginColumnRelative=!0),t&&(s.beginRowRelative=!0),n&&(s.endColumnRelative=!0),o&&(s.endRowRelative=!0),s}let n=m(e,t);return 1===n.length&&"string"!=typeof n[0]?n[0]:n}function m(s,u){let F=u?r:t,p=[],h,b=("="===s[0]?s.substring(1):s).trim();for(;b;){if(h=b.match(i)){let e=""===h[2]||"["===h[2][0],t=""===h[1]||"["===h[1][0],r={type:"reference",column:e?parseInt(h[2].substring(1,-1)||"0",10):parseInt(h[2],10)-1,row:t?parseInt(h[1].substring(1,-1)||"0",10):parseInt(h[1],10)-1};e&&(r.columnRelative=!0),t&&(r.rowRelative=!0),p.push(r),b=b.substring(h[0].length).trim();continue}if(h=b.match(a)){let e="$"!==h[1][0],t="$"!==h[2][0],r={type:"reference",column:g(e?h[1]:h[1].substring(1))-1,row:parseInt(t?h[2]:h[2].substring(1),10)-1};e&&(r.columnRelative=!0),t&&(r.rowRelative=!0),p.push(r),b=b.substring(h[0].length).trim();continue}if(h=b.match(o)){p.push(h[0]),b=b.substring(h[0].length).trim();continue}if(h=b.match(e)){p.push("TRUE"===h[0]),b=b.substring(h[0].length).trim();continue}if(h=b.match(F)){p.push(parseFloat(h[0])),b=b.substring(h[0].length).trim();continue}if('"'===b[0]){let e=c(b);p.push(e.substring(1,-1)),b=b.substring(e.length+2).trim();continue}if(h=b.match(n)){let e=l(b=b.substring(h[1].length).trim());p.push({type:"function",name:h[1],args:function(e,t){let r=[],n=t?";":",",o=0,s="";for(let u=0,a=e.length,i;u<a;++u)if((i=e[u])===n&&!o&&s)r.push(f(s,t)),s="";else if('"'!==i||o||s)" "!==i&&(s+=i,"("===i?++o:")"===i&&--o);else{let t=c(e.substring(u));r.push(t),u+=t.length+1}return!o&&s&&r.push(f(s,t)),r}(e,u)}),b=b.substring(e.length+2).trim();continue}if("("===b[0]){let e=l(b);if(e){p.push(m(e,u)),b=b.substring(e.length+2).trim();continue}}let t=s.length-b.length,r=Error("Unexpected character `"+s.substring(t,t+1)+"` at position "+(t+1)+". (`..."+s.substring(t-5,t+6)+"...`)");throw r.name="FormulaParseError",r}return p}function g(e){let t=0;for(let r=0,n=e.length,o,s=e.length-1;r<n;++r)(o=e.charCodeAt(r))>=65&&o<=90&&(t+=(o-64)*Math.pow(26,s)),--s;return t}return{parseFormula:m}}),r(t,"Data/Formula/FormulaTypes.js",[],function(){let e=["+","-","*","/","^","=","<","<=",">",">="];return{isFormula:function(e){return e instanceof Array},isFunction:function(e){return"object"==typeof e&&!(e instanceof Array)&&"function"===e.type},isOperator:function(t){return"string"==typeof t&&e.indexOf(t)>=0},isRange:function(e){return"object"==typeof e&&!(e instanceof Array)&&"range"===e.type},isReference:function(e){return"object"==typeof e&&!(e instanceof Array)&&"reference"===e.type},isValue:function(e){return"boolean"==typeof e||"number"==typeof e||"string"==typeof e}}}),r(t,"Data/Formula/FormulaProcessor.js",[t["Data/Formula/FormulaTypes.js"]],function(e){let{isFormula:t,isFunction:r,isOperator:n,isRange:o,isReference:s,isValue:u}=e,a=/ */,i=Number.MAX_VALUE/1.000000000001,l=Number.MAX_VALUE/1.000000000002,c=Number.MAX_VALUE,f={"^":3,"*":2,"/":2,"+":1,"-":1,"=":0,"<":0,"<=":0,">":0,">=":0},m={},g=/^[A-Z][A-Z\.]*$/;function F(e){switch(typeof e){case"boolean":return e?c:i;case"string":return l;case"number":return e;default:return NaN}}function p(e){return"string"==typeof e?e.toLowerCase().replace(a,"\x00"):e}function h(e){switch(typeof e){case"boolean":return e?1:0;case"string":return parseFloat(e.replace(",","."));case"number":return e;default:return NaN}}function b(e,t,r){let n;switch(e){case"=":return p(t)===p(r);case"<":if(typeof t==typeof r)return p(t)<p(r);return F(t)<F(r);case"<=":if(typeof t==typeof r)return p(t)<=p(r);return F(t)<=F(r);case">":if(typeof t==typeof r)return p(t)>p(r);return F(t)>F(r);case">=":if(typeof t==typeof r)return p(t)>=p(r);return F(t)>=F(r)}switch(t=h(t),r=h(r),e){case"+":n=t+r;break;case"-":n=t-r;break;case"*":n=t*r;break;case"/":n=t/r;break;case"^":n=Math.pow(t,r);break;default:return NaN}return n%1?Math.round(1e9*n)/1e9:n}function d(e,n){return u(e)?e:o(e)?n&&N(e,n)||[]:r(e)?D(e,n):j(t(e)?e:[e],n)}function N(e,t){let r=t.getColumnNames().slice(e.beginColumn,e.endColumn+1),n=[];for(let o=0,s=r.length,a;o<s;++o){let s=t.getColumn(r[o],!0)||[];for(let i=e.beginRow,l=e.endRow+1;i<l;++i)"string"==typeof(a=s[i])&&"="===a[0]&&t!==t.modified&&(a=t.modified.getCell(r[o],i)),n.push(u(a)?a:NaN)}return n}function y(e,t){let r=t.getColumnNames()[e.column];if(r){let n=t.getCell(r,e.row);if("string"==typeof n&&"="===n[0]&&t!==t.modified){let n=t.modified.getCell(r,e.row);return u(n)?n:NaN}return u(n)?n:NaN}return NaN}function j(e,o){let a;for(let i=0,l=e.length,c,m,g,F;i<l;++i){if(n(c=e[i])){m=c;continue}if(u(c)?F=c:t(c)?F=j(e,o):r(c)?F=u(g=D(c,o))?g:NaN:s(c)&&(F=o&&y(c,o)),void 0!==F){if(void 0===a)a=m?b(m,0,F):F;else{if(!m)return NaN;let t=e[i+1];n(t)&&f[t]>f[m]&&(F=b(t,F,j(e.slice(i+2))),i=l),a=b(m,a,F)}m=void 0,F=void 0}}return u(a)?a:NaN}function D(e,t,r){let n=m[e.name];if(n)try{return n(e.args,t)}catch{return NaN}let o=Error(`Function "${e.name}" not found.`);throw o.name="FormulaProcessError",o}return{asNumber:h,getArgumentValue:d,getArgumentsValues:function(e,t){let r=[];for(let n=0,o=e.length;n<o;++n)r.push(d(e[n],t));return r},getRangeValues:N,getReferenceValue:y,processFormula:j,processorFunctions:m,registerProcessorFunction:function(e,t){return g.test(e)&&!m[e]&&!!(m[e]=t)},translateReferences:function e(t,n=0,u=0){for(let a=0,i=t.length,l;a<i;++a)(l=t[a])instanceof Array?e(l,n,u):r(l)?e(l.args,n,u):o(l)?(l.beginColumnRelative&&(l.beginColumn+=n),l.beginRowRelative&&(l.beginRow+=u),l.endColumnRelative&&(l.endColumn+=n),l.endRowRelative&&(l.endRow+=u)):s(l)&&(l.columnRelative&&(l.column+=n),l.rowRelative&&(l.row+=u));return t}}}),r(t,"Data/Formula/Functions/ABS.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){let{getArgumentValue:t}=e;function r(e,r){let n=t(e[0],r);switch(typeof n){case"number":return Math.abs(n);case"object":{let e=[];for(let t=0,r=n.length,o;t<r;++t){if("number"!=typeof(o=n[t]))return NaN;e.push(Math.abs(o))}return e}default:return NaN}}return e.registerProcessorFunction("ABS",r),r}),r(t,"Data/Formula/Functions/AND.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){let{getArgumentValue:t}=e;function r(e,n){for(let o=0,s=e.length,u;o<s;++o)if(!(u=t(e[o],n))||"object"==typeof u&&!r(u,n))return!1;return!0}return e.registerProcessorFunction("AND",r),r}),r(t,"Data/Formula/Functions/AVERAGE.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){let{getArgumentsValues:t}=e;function r(e,r){let n=t(e,r),o=0,s=0;for(let e=0,t=n.length,r;e<t;++e)switch(typeof(r=n[e])){case"number":isNaN(r)||(++o,s+=r);break;case"object":for(let e=0,t=r.length,n;e<t;++e)"number"!=typeof(n=r[e])||isNaN(n)||(++o,s+=n)}return o?s/o:0}return e.registerProcessorFunction("AVERAGE",r),r}),r(t,"Data/Formula/Functions/AVERAGEA.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){let{getArgumentValue:t}=e;function r(e,r){let n=0,o=0;for(let s=0,u=e.length,a;s<u;++s)switch(typeof(a=t(e[s],r))){case"boolean":++n,o+=a?1:0;continue;case"number":isNaN(a)||(++n,o+=a);continue;case"string":++n;continue;default:for(let e=0,t=a.length,r;e<t;++e)switch(typeof(r=a[e])){case"boolean":++n,o+=r?1:0;continue;case"number":isNaN(r)||(++n,o+=r);continue;case"string":++n;continue}continue}return n?o/n:0}return e.registerProcessorFunction("AVERAGEA",r),r}),r(t,"Data/Formula/Functions/COUNT.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){function t(r,n){let o=e.getArgumentsValues(r,n),s=0;for(let e=0,r=o.length,u;e<r;++e)switch(typeof(u=o[e])){case"number":!isNaN(u)&&++s;break;case"object":s+=t(u,n)}return s}return e.registerProcessorFunction("COUNT",t),t}),r(t,"Data/Formula/Functions/COUNTA.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){function t(r,n){let o=e.getArgumentsValues(r,n),s=0;for(let e=0,r=o.length,u;e<r;++e){switch(typeof(u=o[e])){case"number":if(isNaN(u))continue;break;case"object":s+=t(u,n);continue;case"string":if(!u)continue}++s}return s}return e.registerProcessorFunction("COUNTA",t),t}),r(t,"Data/Formula/Functions/IF.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){let{getArgumentValue:t}=e;function r(e,r){return t(e[0],r)?t(e[1],r):t(e[2],r)}return e.registerProcessorFunction("IF",r),r}),r(t,"Data/Formula/Functions/ISNA.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){let{getArgumentValue:t}=e;function r(e,r){let n=t(e[0],r);return"number"!=typeof n||isNaN(n)}return e.registerProcessorFunction("ISNA",r),r}),r(t,"Data/Formula/Functions/MAX.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){let{getArgumentsValues:t}=e;function r(e,n){let o=t(e,n),s=Number.NEGATIVE_INFINITY;for(let e=0,t=o.length,n;e<t;++e)switch(typeof(n=o[e])){case"number":n>s&&(s=n);break;case"object":(n=r(n))>s&&(s=n)}return isFinite(s)?s:0}return e.registerProcessorFunction("MAX",r),r}),r(t,"Data/Formula/Functions/MEDIAN.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){function t(t,r){let n=[],o=e.getArgumentsValues(t,r);for(let e=0,t=o.length,r;e<t;++e)switch(typeof(r=o[e])){case"number":isNaN(r)||n.push(r);break;case"object":for(let e=0,t=r.length,o;e<t;++e)"number"!=typeof(o=r[e])||isNaN(o)||n.push(o)}let s=n.length;if(!s)return NaN;let u=Math.floor(s/2);return s%2?n[u]:(n[u-1]+n[u])/2}return e.registerProcessorFunction("MEDIAN",t),t}),r(t,"Data/Formula/Functions/MIN.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){let{getArgumentsValues:t}=e;function r(e,n){let o=t(e,n),s=Number.POSITIVE_INFINITY;for(let e=0,t=o.length,n;e<t;++e)switch(typeof(n=o[e])){case"number":n<s&&(s=n);break;case"object":(n=r(n))<s&&(s=n)}return isFinite(s)?s:0}return e.registerProcessorFunction("MIN",r),r}),r(t,"Data/Formula/Functions/MOD.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){let{getArgumentValue:t}=e;function r(e,r){let n=t(e[0],r),o=t(e[1],r);return("object"==typeof n&&(n=n[0]),"object"==typeof o&&(o=o[0]),"number"!=typeof n||"number"!=typeof o||0===o)?NaN:n%o}return e.registerProcessorFunction("MOD",r),r}),r(t,"Data/Formula/Functions/MODE.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){function t(t,r){let n={},o=e.getArgumentsValues(t,r);for(let e=0,t=o.length,r;e<t;++e)switch(typeof(r=o[e])){case"number":isNaN(r)||(n[r]=(n[r]||0)+1);break;case"object":for(let e=0,t=r.length,o;e<t;++e)"number"!=typeof(o=r[e])||isNaN(o)||(n[o]=(n[o]||0)+1)}return n}function r(e,r){let n=t(e,r),o=Object.keys(n);if(!o.length)return NaN;let s=[parseFloat(o[0])],u=n[o[0]];for(let e=1,t=o.length,r,a;e<t;++e)u<(a=n[r=o[e]])?(s=[parseFloat(r)],u=a):u===a&&s.push(parseFloat(r));return u>1?s:NaN}function n(e,r){let n=t(e,r),o=Object.keys(n);if(!o.length)return NaN;let s=parseFloat(o[0]),u=n[o[0]];for(let e=1,t=o.length,r,a,i;e<t;++e)u<(i=n[r=o[e]])?(s=parseFloat(r),u=i):u===i&&s>(a=parseFloat(r))&&(s=a,u=i);return u>1?s:NaN}return e.registerProcessorFunction("MODE",n),e.registerProcessorFunction("MODE.MULT",r),e.registerProcessorFunction("MODE.SNGL",n),{MULT:r,SNGL:n}}),r(t,"Data/Formula/Functions/NOT.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){let{getArgumentValue:t}=e;function r(e,r){let n=t(e[0],r);switch("object"==typeof n&&(n=n[0]),typeof n){case"boolean":case"number":return!n}return NaN}return e.registerProcessorFunction("NOT",r),r}),r(t,"Data/Formula/Functions/OR.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){let{getArgumentValue:t}=e;function r(e,n){for(let o=0,s=e.length,u;o<s;++o)if("object"==typeof(u=t(e[o],n))){if(r(u,n))return!0}else if(u)return!0;return!1}return e.registerProcessorFunction("OR",r),r}),r(t,"Data/Formula/Functions/PRODUCT.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){let{getArgumentsValues:t}=e;function r(e,n){let o=t(e,n),s=1,u=!1;for(let e=0,t=o.length,a;e<t;++e)switch(typeof(a=o[e])){case"number":isNaN(a)||(u=!0,s*=a);break;case"object":u=!0,s*=r(a,n)}return u?s:0}return e.registerProcessorFunction("PRODUCT",r),r}),r(t,"Data/Formula/Functions/SUM.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){function t(r,n){let o=e.getArgumentsValues(r,n),s=0;for(let e=0,r=o.length,u;e<r;++e)switch(typeof(u=o[e])){case"number":isNaN(u)||(s+=u);break;case"object":s+=t(u,n)}return s}return e.registerProcessorFunction("SUM",t),t}),r(t,"Data/Formula/Functions/XOR.js",[t["Data/Formula/FormulaProcessor.js"]],function(e){let{getArgumentValue:t}=e;function r(e,r){for(let n=0,o=e.length,s,u;n<o;++n)switch(typeof(u=t(e[n],r))){case"boolean":case"number":if(void 0===s)s=!!u;else if(!!u!==s)return!0;break;case"object":for(let e=0,t=u.length,r;e<t;++e)switch(typeof(r=u[e])){case"boolean":case"number":if(void 0===s)s=!!r;else if(!!r!==s)return!0}}return!1}return e.registerProcessorFunction("XOR",r),r}),r(t,"Data/Formula/Formula.js",[t["Data/Formula/FormulaParser.js"],t["Data/Formula/FormulaProcessor.js"],t["Data/Formula/FormulaTypes.js"]],function(e,t,r){return{...e,...t,...r}}),r(t,"Data/Modifiers/MathModifier.js",[t["Data/Modifiers/DataModifier.js"],t["Data/Formula/FormulaParser.js"],t["Data/Formula/FormulaProcessor.js"]],function(e,t,r){class n extends e{constructor(e){super(),this.options={...n.defaultOptions,...e}}modifyTable(e,r){this.emit({type:"modify",detail:r,table:e});let n=this.options.alternativeSeparators,o=this.options.formulaColumns||e.getColumnNames(),s=e.modified;for(let t=0,r=o.length,n;t<r;++t)n=o[t],o.indexOf(n)>=0&&s.setColumn(n,this.processColumn(e,n));let u=this.options.columnFormulas||[];for(let r=0,o=u.length,a,i;r<o;++r)a=u[r],i=t.parseFormula(a.formula,n),s.setColumn(a.column,this.processColumnFormula(i,e,a.rowStart,a.rowEnd));return this.emit({type:"afterModify",detail:r,table:e}),e}processColumn(e,n,o=0){let s=this.options.alternativeSeparators,u=(e.getColumn(n,!0)||[]).slice(o>0?o:0);for(let n=0,o=u.length,a=[],i;n<o;++n)if("string"==typeof(i=u[n])&&"="===i[0])try{a=""===i?a:t.parseFormula(i.substring(1),s),u[n]=r.processFormula(a,e)}catch{u[n]=NaN}return u}processColumnFormula(e,t,n=0,o=t.getRowCount()){n=n>=0?n:0,o=o>=0?o:t.getRowCount()+o;let s=[],u=t.modified;for(let t=0,a=o-n;t<a;++t)try{s[t]=r.processFormula(e,u)}catch{s[t]=NaN}finally{e=r.translateReferences(e,0,1)}return s}}return n.defaultOptions={type:"Math",alternativeSeparators:!1},e.registerType("Math",n),n}),r(t,"masters/modules/math-modifier.src.js",[t["Dashboards/Globals.js"],t["Data/Formula/Formula.js"]],function(e,t){return e.Formula=t,e})});