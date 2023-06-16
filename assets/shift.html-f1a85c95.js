import{_ as n,o as s,c as a,b as p}from"./app-c680e870.js";const t="/assets/shift-bcdc56fa.png",e={},o=p('<h2 id="基础交叉变化表shell" tabindex="-1"><a class="header-anchor" href="#基础交叉变化表shell" aria-hidden="true">#</a> 基础交叉变化表shell</h2><p><img src="'+t+`" alt="Shift Table Shell"></p><h2 id="代码实现1-fan-yu" tabindex="-1"><a class="header-anchor" href="#代码实现1-fan-yu" aria-hidden="true">#</a> 代码实现1 - fan.yu</h2><div class="language-sas line-numbers-mode" data-ext="sas"><pre class="language-sas"><code>
<span class="token comment">***Remove work lib;</span>
<span class="token step keyword">proc datasets</span> <span class="token proc-args"><span class="token arg keyword">lib</span><span class="token operator">=</span><span class="token arg-value">work</span> <span class="token arg keyword">memtype</span><span class="token operator">=</span><span class="token arg-value">all</span> <span class="token arg keyword">kill</span> <span class="token arg keyword">nolist</span><span class="token punctuation">;</span></span> <span class="token step keyword">quit</span><span class="token punctuation">;</span>
option nomprint nomlogic nosymbolgen<span class="token punctuation">;</span>
<span class="token comment">***clean log and output;</span>
dm <span class="token string">&#39;log&#39;</span> clear<span class="token punctuation">;</span>
dm <span class="token string">&#39;output&#39;</span> clear<span class="token punctuation">;</span>
<span class="token keyword">ods</span> noresults<span class="token punctuation">;</span>
 
<span class="token macro-keyword keyword">%let</span> pgmname<span class="token operator">=</span>T14_3_2_6<span class="token punctuation">;</span>
 
<span class="token comment">***create log file***;</span>
<span class="token step keyword">proc printto</span> <span class="token proc-args"><span class="token arg keyword">log</span><span class="token operator">=</span><span class="token string">&quot;&amp;root.\\Production\\Tables\\log\\&amp;pgmname._FY.log&quot;</span> <span class="token arg keyword">new</span><span class="token punctuation">;</span></span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
 
option fmtsearch<span class="token operator">=</span><span class="token punctuation">(</span>work rawdata<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">***ADSL;</span>
<span class="token keyword">ods</span> results on<span class="token punctuation">;</span>
<span class="token step keyword">PROC SQL</span><span class="token punctuation">;</span><span class="token proc-sql">
<span class="token sql language-sql">	SELECT COUNT(*) INTO : TRT1 -: TRT5 FROM ADAM.ADSL WHERE SAFFL=&#39;Y&#39; GROUP BY TRT01AN;</span>
</span><span class="token step keyword">QUIT</span><span class="token punctuation">;</span>

<span class="token step keyword">proc format</span><span class="token punctuation">;</span>
value <span class="token punctuation">$</span>sig
<span class="token string">&quot;Normal&quot;</span><span class="token operator">=</span><span class="token string">&quot;1&quot;</span>
<span class="token string">&quot;Abnormal, NCS&quot;</span><span class="token operator">=</span><span class="token string">&quot;2&quot;</span>
<span class="token string">&quot;Abnormal, CS&quot;</span><span class="token operator">=</span><span class="token string">&quot;3&quot;</span>
<span class="token string">&quot;Missing &quot;</span><span class="token operator">=</span><span class="token string">&quot;4&quot;</span>
<span class="token punctuation">;</span>
value sig_
<span class="token number">1</span><span class="token operator">=</span><span class="token string">&quot;Normal&quot;</span>
<span class="token number">2</span><span class="token operator">=</span><span class="token string">&quot;Abnormal, NCS&quot;</span>
<span class="token number">3</span><span class="token operator">=</span><span class="token string">&quot;Abnormal, CS&quot;</span>
<span class="token number">4</span><span class="token operator">=</span><span class="token string">&quot;Missing &quot;</span>
<span class="token number">5</span><span class="token operator">=</span><span class="token string">&quot;Total&quot;</span>
<span class="token punctuation">;</span>
PICTURE <span class="token function keyword">PAVAL</span><span class="token punctuation">(</span>MIN<span class="token operator">=</span><span class="token number">6</span> MAX<span class="token operator">=</span><span class="token number">10</span> DEFAULT<span class="token operator">=</span><span class="token number">5</span> ROUND<span class="token punctuation">)</span>
<span class="token number">0</span> <span class="token operator">=</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">(</span>NOEDIT<span class="token punctuation">)</span>
<span class="token number">0</span><span class="token operator">-</span> <span class="token operator">&lt;</span><span class="token number">0.1</span> <span class="token operator">=</span><span class="token string">&quot;&lt;0.1&quot;</span><span class="token punctuation">(</span>NOEDIT<span class="token punctuation">)</span> 
<span class="token number">0.1</span> <span class="token operator">-</span> <span class="token number">99.9</span><span class="token operator">=</span><span class="token string">&quot;09.9&quot;</span><span class="token punctuation">(</span>PREFIX<span class="token operator">=</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
<span class="token number">99.9</span> <span class="token operator">&lt;</span><span class="token operator">-</span><span class="token operator">&lt;</span> <span class="token number">100</span> <span class="token operator">=</span><span class="token string">&#39;&gt;99.9&#39;</span><span class="token punctuation">(</span>NOEDIT<span class="token punctuation">)</span>
<span class="token number">100</span><span class="token operator">=</span><span class="token string">&#39;100&#39;</span><span class="token punctuation">(</span>NOEDIT<span class="token punctuation">)</span>
OTHER <span class="token operator">=</span> <span class="token string">&quot;-&quot;</span>
<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token comment">***advs;</span>
<span class="token step keyword">data</span> <span class="token keyword">temp</span><span class="token punctuation">;</span>
	<span class="token keyword">set</span> adam<span class="token punctuation">.</span>advs<span class="token punctuation">;</span>
	<span class="token keyword">where</span> saffl<span class="token operator">=</span><span class="token string">&#39;Y&#39;</span> <span class="token keyword">and</span> vsstat<span class="token operator">=</span><span class="token string">&quot;&quot;</span> <span class="token keyword">and</span> PARCAT1N<span class="token operator">=</span><span class="token number">2</span> <span class="token keyword">and</span> anl01fl<span class="token operator">=</span><span class="token string">&#39;Y&#39;</span><span class="token punctuation">;</span>
	AVSCLSG<span class="token operator">=</span><span class="token function keyword">put</span><span class="token punctuation">(</span>AVSCLSGN<span class="token punctuation">,</span>sig_<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	bclsig<span class="token operator">=</span><span class="token function keyword">put</span><span class="token punctuation">(</span>BCLSIGN<span class="token punctuation">,</span>sig_<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc sql</span><span class="token punctuation">;</span><span class="token proc-sql">
<span class="token sql language-sql">	create table adsl as select trt01a as trta,trt01an as trtan,subjid from adam.adsl where saffl=&#39;Y&#39;;</span>***all subjid<span class="token punctuation">;</span>
<span class="token sql language-sql">	create table param as select distinct paramn,param from temp ;</span>***all param<span class="token punctuation">;</span>
<span class="token sql language-sql">	create table avisit as select distinct avisit,avisitn from temp where kindex(avisit,&quot;Unscheduled&quot; )=0 and ablfl=&#39;&#39;;</span>***all visit<span class="token punctuation">;</span>
<span class="token sql language-sql">	create table blclsig as select subjid,paramn,bclsig as bclsig1 from temp where ablfl=&#39;Y&#39;;</span>****baseline results for every subjid<span class="token punctuation">;</span>
<span class="token sql language-sql">	create table all1 as select a.*,b.*,c.* from adsl as a,param as b,avisit as c;</span>***every subjid every paramn every avisit<span class="token punctuation">;</span>
<span class="token sql language-sql">	create table all2 as select a.*,b.bclsig1 from all1 as a left join blclsig as b on a.subjid=b.subjid and a.paramn=b.paramn;</span>
</span><span class="token step keyword">quit</span><span class="token punctuation">;</span>
<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">temp</span> <span class="token arg keyword">out</span><span class="token operator">=</span><span class="token arg-value">temp</span><span class="token number">1</span> <span class="token arg keyword">nodupkey</span><span class="token punctuation">;</span></span><span class="token keyword">by</span> trtan trta subjid paramn param avisitn avisit bclsig<span class="token punctuation">;</span>run<span class="token punctuation">;</span>
<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">all</span><span class="token number">2</span><span class="token punctuation">;</span></span><span class="token keyword">by</span> trtan trta subjid paramn param avisitn avisit<span class="token punctuation">;</span>run<span class="token punctuation">;</span>

<span class="token step keyword">data</span> all3<span class="token punctuation">;</span>
	<span class="token keyword">merge</span> <span class="token function keyword">all2</span><span class="token punctuation">(</span><span class="token operator-keyword operator">in</span><span class="token operator">=</span>ina<span class="token punctuation">)</span> <span class="token function keyword">temp1</span><span class="token punctuation">(</span><span class="token operator-keyword operator">in</span><span class="token operator">=</span>inb<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">by</span> trtan trta subjid paramn param avisitn avisit<span class="token punctuation">;</span>
	<span class="token keyword">if</span> ina<span class="token punctuation">;</span><span class="token comment">**every subjid should exist in these paramn ,aivist;</span>
	<span class="token keyword">if</span> AVSCLSG<span class="token operator">=</span><span class="token string">&quot;&quot;</span> <span class="token keyword">then</span> AVSCLSG<span class="token operator">=</span><span class="token string">&quot;Missing&quot;</span><span class="token punctuation">;</span><span class="token comment">***if AVSCLSG is null ,set missing;</span>
	<span class="token keyword">if</span> bclsig1<span class="token operator">=</span><span class="token string">&quot;&quot;</span> <span class="token keyword">then</span> bclsig1<span class="token operator">=</span><span class="token string">&quot;Missing&quot;</span><span class="token punctuation">;</span><span class="token comment">***if bclsig1 is null ,set missing;</span>
	<span class="token step keyword">proc sort</span><span class="token punctuation">;</span>by trtan trta  paramn param avisitn avisit<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
<span class="token step keyword">PROC  TABULATE</span> <span class="token proc-args"><span class="token arg keyword">DATA</span><span class="token operator">=</span><span class="token arg-value">all</span><span class="token number">3</span> <span class="token arg keyword">FORMAT</span><span class="token operator">=</span><span class="token number">12.4</span> <span class="token arg keyword">OUT</span><span class="token operator">=</span><span class="token arg-value">OUT</span><span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="token keyword">by</span> trtan trta paramn param avisitn avisit<span class="token punctuation">;</span>
<span class="token keyword">CLASS</span> AVSCLSG bclsig1 <span class="token operator">/</span>PRELOADFMT<span class="token punctuation">;</span>
<span class="token keyword">TABLE</span> <span class="token punctuation">(</span>AVSCLSG ALL<span class="token operator">=</span><span class="token string">&quot;TOTAL&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span>bclsig1 ALL<span class="token operator">=</span><span class="token string">&quot;TOTAL&quot;</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token punctuation">(</span>N PCTN<span class="token operator">*</span>F<span class="token operator">=</span>PCTFMT9<span class="token punctuation">.</span> all<span class="token punctuation">)</span><span class="token operator">/</span>RTS<span class="token operator">=</span><span class="token number">25</span> PRINTMISS MISSTEXT<span class="token operator">=</span><span class="token string">&#39;0&#39;</span><span class="token punctuation">;</span>
FORMAT AVSCLSG <span class="token punctuation">$</span>sig<span class="token punctuation">.</span> bclsig1 <span class="token punctuation">$</span>sig<span class="token punctuation">.</span> <span class="token punctuation">;</span>
<span class="token step keyword">RUN</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> out2<span class="token punctuation">;</span>
	<span class="token keyword">set</span> out1<span class="token punctuation">;</span>
	<span class="token keyword">if</span> AVSCLSG<span class="token operator">=</span><span class="token string">&#39;&#39;</span> <span class="token keyword">then</span> AVSCLSG<span class="token operator">=</span><span class="token string">&#39;5&#39;</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> bclsig1<span class="token operator">=</span><span class="token string">&quot;&quot;</span> <span class="token keyword">then</span> bclsig1<span class="token operator">=</span><span class="token string">&#39;5&#39;</span><span class="token punctuation">;</span>
	seq<span class="token operator">=</span><span class="token function keyword">input</span><span class="token punctuation">(</span><span class="token function keyword">vvalue</span><span class="token punctuation">(</span>AVSCLSG<span class="token punctuation">)</span><span class="token punctuation">,</span>best<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	seq1<span class="token operator">=</span><span class="token function keyword">input</span><span class="token punctuation">(</span><span class="token function keyword">vvalue</span><span class="token punctuation">(</span>bclsig1<span class="token punctuation">)</span><span class="token punctuation">,</span>best<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">length</span> col <span class="token punctuation">$</span><span class="token number">200</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> n<span class="token operator">^=</span><span class="token punctuation">.</span> <span class="token keyword">then</span> col<span class="token operator">=</span><span class="token function keyword">cats</span><span class="token punctuation">(</span><span class="token function keyword">put</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span>best<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">&quot;(&quot;</span><span class="token punctuation">,</span><span class="token function keyword">put</span><span class="token punctuation">(</span>PCTN_00<span class="token punctuation">,</span>PAVAL<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">&quot;)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">else</span> col<span class="token operator">=</span><span class="token string">&#39;0&#39;</span><span class="token punctuation">;</span>
	<span class="token step keyword">proc sort</span><span class="token punctuation">;</span>by trtan trta paramn param avisitn avisit seq AVSCLSG seq1<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc transpose</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">out</span><span class="token number">2</span> <span class="token arg keyword">out</span><span class="token operator">=</span><span class="token arg-value">out</span><span class="token number">3</span> <span class="token arg keyword">prefix</span><span class="token operator">=</span><span class="token arg-value">col</span><span class="token punctuation">;</span></span>
<span class="token keyword">by</span> trtan trta paramn param avisitn avisit seq AVSCLSG<span class="token punctuation">;</span>
<span class="token keyword">var</span> col<span class="token punctuation">;</span>
id seq1<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
<span class="token step keyword">data</span> out4<span class="token punctuation">;</span>
	<span class="token keyword">set</span> out3<span class="token punctuation">;</span>
	<span class="token keyword">by</span> trtan trta paramn param avisitn avisit seq AVSCLSG<span class="token punctuation">;</span>
	<span class="token keyword">length</span> an_label an_label1 an_label2 an_label3 stat_lab  <span class="token punctuation">$</span><span class="token number">200</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
	an_label<span class="token operator">=</span><span class="token function keyword">cats</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span><span class="token punctuation">;</span>
	an_label1<span class="token operator">=</span><span class="token function keyword">cats</span><span class="token punctuation">(</span><span class="token string">&quot;Cohort：&quot;</span><span class="token punctuation">,</span>trta<span class="token punctuation">)</span><span class="token punctuation">;</span>
	stat_lab<span class="token operator">=</span><span class="token string">&quot;n ( % )&quot;</span><span class="token punctuation">;</span>
	an_label2<span class="token operator">=</span><span class="token function keyword">cats</span><span class="token punctuation">(</span><span class="token string">&quot;&amp;_LineIndent1.&quot;</span><span class="token punctuation">,</span>avisit<span class="token punctuation">)</span><span class="token punctuation">;</span>
	an_label3<span class="token operator">=</span><span class="token function keyword">cats</span><span class="token punctuation">(</span><span class="token function keyword">strip</span><span class="token punctuation">(</span><span class="token function keyword">put</span><span class="token punctuation">(</span>seq<span class="token punctuation">,</span>sig_<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token step keyword">proc sort</span><span class="token punctuation">;</span>by trtan paramn avisitn seq<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
<span class="token comment">**sort data;</span>
<span class="token step keyword">DATA</span> OUT5<span class="token punctuation">;</span>
	<span class="token keyword">SET</span> OUT4<span class="token punctuation">;</span>
	<span class="token keyword">BY</span> trtan paramn avisitn seq<span class="token punctuation">;</span>
	<span class="token keyword">RETAIN</span> SORT3 sort4<span class="token punctuation">;</span>
	<span class="token keyword">if</span> first<span class="token punctuation">.</span>avisitn <span class="token keyword">then</span> sort3<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
	sort4<span class="token operator">=</span>SEQ<span class="token punctuation">;</span>
	<span class="token step keyword">PROC SORT</span><span class="token punctuation">;</span>BY SORT3 sort4<span class="token punctuation">;</span>
<span class="token step keyword">RUN</span><span class="token punctuation">;</span>
<span class="token step keyword">DATA</span> FINAL<span class="token punctuation">;</span>
	<span class="token keyword">SET</span> OUT5 <span class="token keyword">END</span><span class="token operator">=</span>LAST<span class="token punctuation">;</span>
	pg<span class="token operator">=</span><span class="token function keyword">int</span><span class="token punctuation">(</span><span class="token punctuation">(</span>_n_<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> last <span class="token keyword">then</span> <span class="token keyword">call</span> <span class="token function keyword">symput</span><span class="token punctuation">(</span><span class="token string">&quot;tpage&quot;</span><span class="token punctuation">,</span><span class="token function keyword">put</span><span class="token punctuation">(</span>pg<span class="token punctuation">,</span>best<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>


<span class="token comment">**output final dataset;</span>
<span class="token function keyword">%dds_out</span><span class="token punctuation">(</span>data<span class="token operator">=</span>final<span class="token punctuation">,</span>out<span class="token operator">=</span>tlf<span class="token punctuation">.</span><span class="token macro-variable">&amp;pgmname</span><span class="token punctuation">.</span>_FY<span class="token punctuation">,</span>varlist<span class="token operator">=</span>an_label1 an_label an_label2 an_label3 col1 col2 col3 col4 col5<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token step keyword">proc printto</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
 
<span class="token comment">***check the log;</span>
<span class="token function keyword">%m_chklog</span><span class="token punctuation">(</span>pgm_type<span class="token operator">=</span>Tables<span class="token punctuation">,</span>pgm_name<span class="token operator">=</span><span class="token macro-variable">&amp;pgmname</span><span class="token punctuation">.</span>_FY<span class="token punctuation">,</span>serv<span class="token operator">=</span>Production<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码实现2-qianqian-xu" tabindex="-1"><a class="header-anchor" href="#代码实现2-qianqian-xu" aria-hidden="true">#</a> 代码实现2 - qianqian.xu</h2><div class="language-sas line-numbers-mode" data-ext="sas"><pre class="language-sas"><code><span class="token comment">***Remove work lib;</span>
<span class="token step keyword">proc datasets</span> <span class="token proc-args"><span class="token arg keyword">lib</span><span class="token operator">=</span><span class="token arg-value">work</span> <span class="token arg keyword">memtype</span><span class="token operator">=</span><span class="token arg-value">all</span> <span class="token arg keyword">kill</span>  <span class="token arg keyword">nolist</span><span class="token punctuation">;</span></span> <span class="token step keyword">quit</span><span class="token punctuation">;</span>
option nomprint nomlogic nosymbolgen<span class="token punctuation">;</span>
<span class="token comment">***clean log and output;</span>
dm <span class="token string">&#39;log&#39;</span> clear<span class="token punctuation">;</span>
dm <span class="token string">&#39;output&#39;</span> clear<span class="token punctuation">;</span>
<span class="token keyword">ods</span> noresults<span class="token punctuation">;</span>
 
<span class="token macro-keyword keyword">%let</span> pgmname<span class="token operator">=</span>T14_3_2_6_QQX<span class="token punctuation">;</span>
 
<span class="token comment">***create log file***;</span>
<span class="token step keyword">proc printto</span> <span class="token proc-args"><span class="token arg keyword">log</span><span class="token operator">=</span><span class="token string">&quot;&amp;root.\\Production\\Tables\\log\\&amp;pgmname..log&quot;</span> <span class="token arg keyword">new</span><span class="token punctuation">;</span></span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
 


option fmtsearch<span class="token operator">=</span><span class="token punctuation">(</span>work rawdata <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">%</span><span class="token operator">*</span>to generate all trt<span class="token punctuation">;</span>
<span class="token step keyword">proc freq</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">adam.adsl</span> <span class="token arg keyword">noprint</span><span class="token punctuation">;</span></span>
	tables trt01an<span class="token operator">*</span>trt01a<span class="token operator">/</span>out<span class="token operator">=</span>n<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
<span class="token step keyword">proc format</span><span class="token punctuation">;</span>
value <span class="token keyword">group</span>
	<span class="token number">1</span><span class="token operator">=</span><span class="token string">&#39;1.0mg/kg&#39;</span>
	<span class="token number">2</span><span class="token operator">=</span><span class="token string">&#39;2.5mg/kg&#39;</span>
	<span class="token number">3</span><span class="token operator">=</span><span class="token string">&#39;5.0mg/kg&#39;</span>
	<span class="token number">4</span><span class="token operator">=</span><span class="token string">&#39;10.0mg/kg&#39;</span>
	<span class="token number">5</span><span class="token operator">=</span><span class="token string">&#39;Placebo&#39;</span>
	<span class="token number">99</span><span class="token operator">=</span><span class="token string">&quot;Total&quot;</span>
<span class="token punctuation">;</span>
value vsCLSIGN
	<span class="token number">1</span><span class="token operator">=</span><span class="token string">&quot;Normal&quot;</span>
	<span class="token number">2</span><span class="token operator">=</span><span class="token string">&quot;Abnormal, NCS&quot;</span>
	<span class="token number">3</span><span class="token operator">=</span><span class="token string">&quot;Abnormal, CS&quot;</span>
	<span class="token number">4</span><span class="token operator">=</span><span class="token string">&quot;Missing&quot;</span>
	<span class="token number">5</span><span class="token operator">=</span><span class="token string">&#39;Total&#39;</span>
<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

 
<span class="token comment">**** pop:SAF ;</span>

<span class="token step keyword">data</span> adsl<span class="token punctuation">;</span> <span class="token keyword">length</span> usubjid <span class="token punctuation">$</span><span class="token number">200</span><span class="token punctuation">;</span>
	<span class="token keyword">set</span> adam<span class="token punctuation">.</span><span class="token function keyword">adsl</span><span class="token punctuation">(</span>where<span class="token operator">=</span><span class="token punctuation">(</span>SAFFL<span class="token operator">=</span><span class="token string">&quot;Y&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	trtn<span class="token operator">=</span>trt01an<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
 

<span class="token comment">**** get N;</span>

<span class="token step keyword">data</span> adsl1<span class="token punctuation">;</span> <span class="token keyword">set</span> adsl<span class="token punctuation">;</span>
<span class="token comment">/*  output; trtn=99; output;*/</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc freq</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">adsl</span><span class="token number">1</span> <span class="token arg keyword">noprint</span><span class="token punctuation">;</span></span><span class="token keyword">table</span> trtn<span class="token operator">/</span>out<span class="token operator">=</span>tot<span class="token punctuation">;</span>run<span class="token punctuation">;</span>

<span class="token step keyword">data</span> totdum<span class="token punctuation">;</span> <span class="token keyword">do</span> trtn<span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">to</span> <span class="token number">5</span><span class="token punctuation">;</span>output<span class="token punctuation">;</span>end<span class="token punctuation">;</span>run<span class="token punctuation">;</span>

<span class="token step keyword">data</span> totfreq<span class="token punctuation">;</span> <span class="token keyword">merge</span> totdum tot<span class="token punctuation">;</span> <span class="token keyword">by</span> trtn<span class="token punctuation">;</span>
	<span class="token keyword">if</span> count<span class="token operator">=</span><span class="token punctuation">.</span> <span class="token keyword">then</span> tot<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
		<span class="token keyword">else</span> tot<span class="token operator">=</span>count<span class="token punctuation">;</span>
    <span class="token keyword">call</span> <span class="token function keyword">symputx</span><span class="token punctuation">(</span><span class="token string">&quot;TRT&quot;</span><span class="token operator">||</span><span class="token function keyword">strip</span><span class="token punctuation">(</span><span class="token function keyword">vvalue</span><span class="token punctuation">(</span>trtn<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>tot<span class="token punctuation">)</span><span class="token punctuation">;</span> 
	<span class="token keyword">keep</span> trtn tot<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc freq</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">adam.</span><span class="token function keyword">advs</span><span class="token punctuation">(</span><span class="token arg keyword">where</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token arg keyword">SAFFL</span><span class="token operator">=</span><span class="token string">&quot;Y&quot;</span> <span class="token arg keyword">and</span> <span class="token arg keyword">vsSTAT</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token arg keyword">noprint</span><span class="token punctuation">;</span></span>
	tables param<span class="token operator">*</span>paramn<span class="token operator">/</span>out<span class="token operator">=</span>paramn<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> advs<span class="token punctuation">;</span> <span class="token keyword">length</span> usubjid parcat1 <span class="token punctuation">$</span><span class="token number">200</span><span class="token punctuation">;</span> <span class="token keyword">set</span> adam<span class="token punctuation">.</span><span class="token function keyword">advs</span><span class="token punctuation">(</span>where<span class="token operator">=</span><span class="token punctuation">(</span>SAFFL<span class="token operator">=</span><span class="token string">&quot;Y&quot;</span> <span class="token keyword">and</span> vsSTAT<span class="token operator">=</span><span class="token string">&quot;&quot;</span> <span class="token keyword">and</span> anl01fl<span class="token operator">=</span><span class="token string">&#39;Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> ABLFL<span class="token operator">=</span><span class="token string">&#39;Y&#39;</span> <span class="token keyword">then do</span><span class="token punctuation">;</span>AVISITN<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>AVISIT<span class="token operator">=</span><span class="token string">&quot;Baseline&quot;</span><span class="token punctuation">;</span>end<span class="token punctuation">;</span>
	<span class="token keyword">if</span> AVSCLSGN <span class="token operator">^</span><span class="token operator-keyword operator">in</span> <span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc freq</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">advs</span> <span class="token arg keyword">noprint</span><span class="token punctuation">;</span></span>
	tables PARCAT1<span class="token operator">*</span>param<span class="token operator">*</span>paramn<span class="token operator">/</span>out<span class="token operator">=</span>paramn<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> ana<span class="token punctuation">;</span> <span class="token keyword">length</span> uparam dumparam <span class="token punctuation">$</span><span class="token number">200</span><span class="token punctuation">;</span> <span class="token keyword">set</span> <span class="token function keyword">advs</span><span class="token punctuation">(</span><span class="token operator-keyword operator">in</span><span class="token operator">=</span>a<span class="token punctuation">)</span> <span class="token punctuation">;</span>
	<span class="token keyword">if</span> a <span class="token keyword">then do</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token function keyword">index</span><span class="token punctuation">(</span><span class="token function keyword">upcase</span><span class="token punctuation">(</span>avisit<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">&quot;UNS&quot;</span><span class="token punctuation">)</span> <span class="token keyword">or</span> <span class="token function keyword">index</span><span class="token punctuation">(</span>avisit<span class="token punctuation">,</span><span class="token string">&quot;Screening&quot;</span><span class="token punctuation">)</span> <span class="token keyword">then</span> <span class="token keyword">delete</span><span class="token punctuation">;</span>
	<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token comment">/*	if avalu ne &#39;&#39; then uparam=strip(aparam)||&quot;(&quot;||strip(vsSTRESU)||&quot;)&quot;; else */</span>
	uparam<span class="token operator">=</span><span class="token function keyword">strip</span><span class="token punctuation">(</span>aparam<span class="token punctuation">)</span><span class="token punctuation">;</span>
	dumparam<span class="token operator">=</span><span class="token function keyword">strip</span><span class="token punctuation">(</span><span class="token function keyword">vvalue</span><span class="token punctuation">(</span>parcat1n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&quot;\`&quot;</span><span class="token operator">||</span><span class="token function keyword">strip</span><span class="token punctuation">(</span>parcat1<span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&quot;\`&quot;</span><span class="token operator">||</span><span class="token function keyword">strip</span><span class="token punctuation">(</span><span class="token function keyword">vvalue</span><span class="token punctuation">(</span>paramn<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&quot;\`&quot;</span><span class="token operator">||</span><span class="token function keyword">strip</span><span class="token punctuation">(</span>uparam<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>


<span class="token step keyword">data</span> avisitn<span class="token punctuation">;</span> <span class="token keyword">length</span> test <span class="token punctuation">$</span><span class="token number">200</span><span class="token punctuation">;</span> <span class="token keyword">set</span> ana<span class="token punctuation">;</span>
	test<span class="token operator">=</span><span class="token function keyword">strip</span><span class="token punctuation">(</span><span class="token function keyword">put</span><span class="token punctuation">(</span>avisitn<span class="token punctuation">,</span>best<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&quot;=&#39;&quot;</span><span class="token operator">||</span><span class="token function keyword">strip</span><span class="token punctuation">(</span>avisit<span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">;</span>
	<span class="token keyword">keep</span> avisitn avisit test<span class="token punctuation">;</span>
<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">nodupkey</span><span class="token punctuation">;</span></span><span class="token keyword">by</span> avisitn avisit<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>


<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">adsl</span><span class="token punctuation">;</span></span><span class="token keyword">by</span> usubjid<span class="token punctuation">;</span>run<span class="token punctuation">;</span>
<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">ana</span><span class="token punctuation">;</span></span><span class="token keyword">by</span> usubjid<span class="token punctuation">;</span>run<span class="token punctuation">;</span>
<span class="token step keyword">data</span> ana1<span class="token punctuation">;</span> <span class="token keyword">merge</span> <span class="token function keyword">adsl</span><span class="token punctuation">(</span><span class="token operator-keyword operator">in</span><span class="token operator">=</span>a <span class="token keyword">keep</span><span class="token operator">=</span>usubjid trtn<span class="token punctuation">)</span> <span class="token function keyword">ana</span><span class="token punctuation">(</span><span class="token operator-keyword operator">in</span><span class="token operator">=</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">by</span> usubjid<span class="token punctuation">;</span>
	<span class="token keyword">if</span> a <span class="token keyword">and</span> b<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> ana1<span class="token punctuation">;</span> <span class="token keyword">set</span> ana1<span class="token punctuation">;</span>
<span class="token comment">/*  output; trtn=99; output;*/</span>
<span class="token step keyword">proc sort</span><span class="token punctuation">;</span>by usubjid trtn parcat1n parcat1 paramn uparam avisitn avisit<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>


<span class="token comment">*** base ****;</span>
<span class="token comment">*** base ****;</span>

<span class="token step keyword">data</span> base<span class="token punctuation">;</span> <span class="token keyword">set</span> <span class="token function keyword">ana1</span><span class="token punctuation">(</span>where<span class="token operator">=</span><span class="token punctuation">(</span>ABLFL<span class="token operator">=</span><span class="token string">&#39;Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">****base;</span>
	BCLSIGN<span class="token operator">=</span>vsCLSIGN<span class="token punctuation">;</span>
	BCLSIG<span class="token operator">=</span>vsCLSIG<span class="token punctuation">;</span>
<span class="token comment">/*	if BCLSIGN^=4;***missing base will not be counted;*/</span>
	<span class="token keyword">keep</span> usubjid trtn parcat1n parcat1 paramn uparam BCLSIGN BCLSIG<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token comment">*** base ****;</span>
<span class="token comment">*** base ****;</span>

<span class="token comment">*** dummy st ****;</span>
<span class="token comment">*** dummy st ****;</span>

<span class="token step keyword">proc sql</span> <span class="token proc-args"><span class="token arg keyword">noprint</span><span class="token punctuation">;</span></span><span class="token proc-sql">
<span class="token sql language-sql">	select distinct &#39;&quot;&#39;||strip(usubjid)||&#39;\`&#39;||strip(put(trtn,2.))||&#39;&quot;&#39; into :cusubjid separated by &quot;,&quot; from ana1;</span>
<span class="token sql language-sql">	select distinct &#39;&quot;&#39;||strip(dumparam)||&#39;\`&#39;||strip(avisit)||&#39;\`&#39;||strip(put(avisitn,best.))||&#39;&quot;&#39;
		into :cdumparam separated by &quot;,&quot; from ana1;</span>
</span><span class="token step keyword">quit</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> temp_dummy<span class="token punctuation">;</span> <span class="token keyword">length</span> subjid dumparam_ <span class="token punctuation">$</span><span class="token number">200</span><span class="token punctuation">;</span>
	<span class="token keyword">do</span> subjid<span class="token operator">=</span><span class="token macro-variable">&amp;cusubjid</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
		<span class="token keyword">do</span> dumparam_<span class="token operator">=</span><span class="token macro-variable">&amp;cdumparam</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
			<span class="token keyword">output</span><span class="token punctuation">;</span>end<span class="token punctuation">;</span>end<span class="token punctuation">;</span>
<span class="token step keyword">proc sort</span><span class="token punctuation">;</span>by subjid dumparam_<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> temp_dummy2<span class="token punctuation">;</span> <span class="token keyword">length</span> usubjid parcat1 uparam avisit <span class="token punctuation">$</span><span class="token number">200</span><span class="token punctuation">;</span> <span class="token keyword">set</span> temp_dummy <span class="token punctuation">;</span>
	trtn<span class="token operator">=</span><span class="token function keyword">input</span><span class="token punctuation">(</span><span class="token function keyword">scan</span><span class="token punctuation">(</span>subjid<span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">&#39;\`&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	usubjid<span class="token operator">=</span><span class="token function keyword">scan</span><span class="token punctuation">(</span>subjid<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">&#39;\`&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	parcat1n<span class="token operator">=</span><span class="token function keyword">input</span><span class="token punctuation">(</span><span class="token function keyword">scan</span><span class="token punctuation">(</span>dumparam_<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">&#39;\`&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	parcat1<span class="token operator">=</span><span class="token function keyword">scan</span><span class="token punctuation">(</span>dumparam_<span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">&#39;\`&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	paramn<span class="token operator">=</span><span class="token function keyword">input</span><span class="token punctuation">(</span><span class="token function keyword">scan</span><span class="token punctuation">(</span>dumparam_<span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">&#39;\`&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>best<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	uparam<span class="token operator">=</span><span class="token function keyword">scan</span><span class="token punctuation">(</span>dumparam_<span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token string">&#39;\`&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	avisit<span class="token operator">=</span><span class="token function keyword">scan</span><span class="token punctuation">(</span>dumparam_<span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token string">&#39;\`&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	avisitn<span class="token operator">=</span><span class="token function keyword">input</span><span class="token punctuation">(</span><span class="token function keyword">strip</span><span class="token punctuation">(</span><span class="token function keyword">scan</span><span class="token punctuation">(</span>dumparam_<span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token string">&#39;\`&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>best<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">keep</span> usubjid trtn parcat1n parcat1 paramn uparam avisitn avisit<span class="token punctuation">;</span>
<span class="token step keyword">proc sort</span><span class="token punctuation">;</span>by usubjid trtn parcat1n parcat1 paramn uparam avisitn avisit<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> temp_dummy3<span class="token punctuation">;</span> <span class="token keyword">merge</span> <span class="token function keyword">base</span><span class="token punctuation">(</span><span class="token operator-keyword operator">in</span><span class="token operator">=</span>a<span class="token punctuation">)</span> <span class="token function keyword">temp_dummy2</span><span class="token punctuation">(</span><span class="token operator-keyword operator">in</span><span class="token operator">=</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">by</span> usubjid trtn parcat1n parcat1 paramn uparam<span class="token punctuation">;</span>
<span class="token comment">/*  if a;***missing base will not be counted;*/</span>
  <span class="token keyword">if</span> b<span class="token punctuation">;</span>
  <span class="token keyword">if</span> b <span class="token keyword">and</span> <span class="token operator">^</span>a <span class="token keyword">then</span> BCLSIGN<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token comment">*** dummy end ****;</span>
<span class="token comment">*** dummy end ****;</span>


<span class="token step keyword">data</span> ana2<span class="token punctuation">;</span> <span class="token keyword">merge</span> <span class="token function keyword">temp_dummy3</span><span class="token punctuation">(</span><span class="token operator-keyword operator">in</span><span class="token operator">=</span>a<span class="token punctuation">)</span> <span class="token function keyword">ana1</span><span class="token punctuation">(</span><span class="token operator-keyword operator">in</span><span class="token operator">=</span>b <span class="token keyword">drop</span><span class="token operator">=</span>BCLSIGN BCLSIG<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">by</span> usubjid trtn parcat1n parcat1 paramn uparam avisitn avisit<span class="token punctuation">;</span>
	<span class="token keyword">if</span> a<span class="token punctuation">;</span>
	<span class="token keyword">if</span> a <span class="token keyword">and</span> <span class="token operator">^</span>b <span class="token keyword">then</span> vsCLSIGN<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token punctuation">%</span><span class="token operator">*</span>overall<span class="token punctuation">;</span>
<span class="token step keyword">data</span> ana2<span class="token punctuation">;</span> <span class="token keyword">set</span> ana2<span class="token punctuation">;</span> 
	<span class="token keyword">output</span><span class="token punctuation">;</span> vsCLSIGN<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">;</span> <span class="token keyword">output</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
<span class="token step keyword">data</span> ana2<span class="token punctuation">;</span> <span class="token keyword">set</span> ana2<span class="token punctuation">;</span> 
	<span class="token keyword">output</span><span class="token punctuation">;</span> BCLSIGN<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">;</span> <span class="token keyword">output</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>


<span class="token comment">** shell;</span>
<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">ana</span><span class="token number">2</span> <span class="token arg keyword">out</span><span class="token operator">=</span><span class="token arg-value">freq</span>_<span class="token arg keyword">dummy</span> <span class="token arg keyword">nodupkey</span><span class="token punctuation">;</span></span> <span class="token keyword">by</span> trtn parcat1n parcat1 paramn uparam avisitn avisit<span class="token punctuation">;</span> <span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> freq_dummy<span class="token punctuation">;</span> <span class="token keyword">set</span> freq_dummy<span class="token punctuation">;</span>
	 <span class="token keyword">do</span> vsCLSIGN<span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">to</span> <span class="token number">5</span><span class="token punctuation">;</span>
     <span class="token keyword">output</span><span class="token punctuation">;</span>
	 <span class="token keyword">end</span><span class="token punctuation">;</span>
 <span class="token keyword">keep</span> trtn parcat1n parcat1 paramn uparam avisitn avisit vsCLSIGN <span class="token punctuation">;</span>
<span class="token step keyword">proc sort</span><span class="token punctuation">;</span>by trtn parcat1n parcat1 paramn uparam avisitn avisit vsCLSIGN <span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
<span class="token comment">** shell;</span>

<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">ana</span><span class="token number">2</span><span class="token punctuation">;</span></span><span class="token keyword">by</span> trtn parcat1n parcat1 avisitn avisit paramn uparam <span class="token punctuation">;</span>

<span class="token step keyword">proc freq</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token function keyword">ana2</span><span class="token punctuation">(</span><span class="token arg keyword">where</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token arg keyword">avisitn</span>&gt;<span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token arg keyword">noprint</span><span class="token punctuation">;</span></span>
	<span class="token keyword">by</span> trtn parcat1n parcat1 avisitn avisit paramn uparam <span class="token punctuation">;</span>
	<span class="token keyword">table</span> vsCLSIGN<span class="token operator">*</span>BCLSIGN<span class="token operator">/</span>out<span class="token operator">=</span>freq<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> freq1<span class="token punctuation">;</span> <span class="token keyword">merge</span> totfreq freq<span class="token punctuation">;</span> <span class="token keyword">by</span> trtn<span class="token punctuation">;</span>
	<span class="token keyword">length</span> cp <span class="token punctuation">$</span><span class="token number">20</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> count<span class="token operator">=</span><span class="token number">0</span> <span class="token keyword">then</span> cp<span class="token operator">=</span><span class="token string">&#39;0&#39;</span><span class="token punctuation">;</span>
  	<span class="token keyword">else</span> <span class="token keyword">if</span> count<span class="token operator">=</span>tot <span class="token keyword">then</span> cp<span class="token operator">=</span><span class="token function keyword">strip</span><span class="token punctuation">(</span><span class="token function keyword">put</span><span class="token punctuation">(</span>count<span class="token punctuation">,</span>best<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&#39; (100)&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> cp<span class="token operator">=</span><span class="token function keyword">strip</span><span class="token punctuation">(</span><span class="token function keyword">put</span><span class="token punctuation">(</span>count<span class="token punctuation">,</span>best<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&#39; (&#39;</span><span class="token operator">||</span><span class="token function keyword">put</span><span class="token punctuation">(</span>count<span class="token operator">/</span>tot<span class="token operator">*</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">5.1</span><span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&#39;)&#39;</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc transpose</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">freq</span><span class="token number">1</span> <span class="token arg keyword">out</span><span class="token operator">=</span><span class="token arg-value">freq</span><span class="token number">2</span> <span class="token arg keyword">prefix</span><span class="token operator">=</span><span class="token arg-value">base</span><span class="token punctuation">;</span></span>
	<span class="token keyword">by</span> trtn parcat1n parcat1 avisitn avisit paramn uparam vsCLSIGN<span class="token punctuation">;</span>
	<span class="token keyword">var</span> cp<span class="token punctuation">;</span>
	id BCLSIGN<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>


<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">freq</span>_<span class="token arg keyword">dummy</span><span class="token punctuation">;</span></span><span class="token keyword">by</span> trtn parcat1n parcat1 avisitn avisit paramn uparam vsCLSIGN<span class="token punctuation">;</span>run<span class="token punctuation">;</span>
 
<span class="token step keyword">data</span> freq3<span class="token punctuation">;</span> <span class="token keyword">merge</span> <span class="token function keyword">freq_dummy</span><span class="token punctuation">(</span><span class="token operator-keyword operator">in</span><span class="token operator">=</span>a <span class="token keyword">where</span><span class="token operator">=</span><span class="token punctuation">(</span>avisitn<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function keyword">freq2</span><span class="token punctuation">(</span><span class="token operator-keyword operator">in</span><span class="token operator">=</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">by</span> trtn parcat1n parcat1 avisitn avisit paramn uparam vsCLSIGN<span class="token punctuation">;</span>
	<span class="token keyword">array</span> RES base1 base2 base3 base4 base5<span class="token punctuation">;</span>
	<span class="token keyword">do over</span> RES<span class="token punctuation">;</span>
		<span class="token keyword">if</span> RES<span class="token operator">=</span><span class="token string">&#39;&#39;</span> <span class="token keyword">then</span> RES<span class="token operator">=</span><span class="token function keyword">strip</span><span class="token punctuation">(</span><span class="token function keyword">put</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>


<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">freq</span><span class="token number">3</span> <span class="token punctuation">;</span></span><span class="token keyword">by</span> trtn parcat1n parcat1 avisitn avisit paramn uparam <span class="token punctuation">;</span>run<span class="token punctuation">;</span>

<span class="token step keyword">data</span> freq4<span class="token punctuation">;</span> <span class="token keyword">merge</span> totfreq freq3<span class="token punctuation">;</span> <span class="token keyword">by</span> trtn<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> final<span class="token punctuation">;</span> <span class="token keyword">length</span> groupc col1 <span class="token punctuation">$</span><span class="token number">200</span><span class="token punctuation">;</span> <span class="token keyword">set</span> freq4<span class="token punctuation">;</span>
  <span class="token keyword">by</span> trtn parcat1n parcat1 avisitn avisit paramn uparam vsCLSIGN<span class="token punctuation">;</span>

<span class="token comment">/*  groupc=strip(put(trtn,group.))||&#39;(N=&#39;||strip(put(tot,best.))||&#39;)&#39;;*/</span>
  groupc<span class="token operator">=</span><span class="token string">&#39;Cohort：&#39;</span><span class="token operator">||</span><span class="token function keyword">strip</span><span class="token punctuation">(</span><span class="token function keyword">put</span><span class="token punctuation">(</span>trtn<span class="token punctuation">,</span>group<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  col1<span class="token operator">=</span><span class="token function keyword">strip</span><span class="token punctuation">(</span><span class="token function keyword">put</span><span class="token punctuation">(</span>vsCLSIGN<span class="token punctuation">,</span>vsCLSIGN<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  avisit_<span class="token operator">=</span><span class="token string">&quot;&amp;_LineIndent1.&quot;</span><span class="token operator">||</span><span class="token function keyword">strip</span><span class="token punctuation">(</span>avisit<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">final</span><span class="token punctuation">;</span></span><span class="token keyword">by</span> trtn parcat1n parcat1 paramn uparam avisitn avisit trtn vsCLSIGN<span class="token punctuation">;</span>run<span class="token punctuation">;</span>


<span class="token function keyword">%dds_out</span><span class="token punctuation">(</span>data<span class="token operator">=</span>final<span class="token punctuation">,</span> <span class="token keyword">out</span><span class="token operator">=</span>tlf<span class="token punctuation">.</span><span class="token macro-variable">&amp;pgmname</span><span class="token punctuation">,</span> varlist<span class="token operator">=</span>groupc uparam avisit_ col1 base1 base2 base3 base4 base5<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token step keyword">proc printto</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
 
<span class="token comment">***check the log;</span>
<span class="token function keyword">%m_chklog</span><span class="token punctuation">(</span>pgm_type<span class="token operator">=</span>Tables<span class="token punctuation">,</span>pgm_name<span class="token operator">=</span><span class="token macro-variable">&amp;pgmname</span><span class="token punctuation">,</span>serv<span class="token operator">=</span>Production<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">ods</span> results on<span class="token punctuation">;</span> <span class="token step keyword">proc compare</span> base<span class="token operator">=</span>tlf<span class="token punctuation">.</span>T14_3_2_6_FY comp<span class="token operator">=</span>tlf<span class="token punctuation">.</span>T14_3_2_6_QQX warning listall crit<span class="token operator">=</span><span class="token number">0.000000001</span><span class="token punctuation">;</span> <span class="token step keyword">run</span><span class="token punctuation">;</span>
<span class="token keyword">ods</span> results on<span class="token punctuation">;</span> <span class="token step keyword">proc compare</span> base<span class="token operator">=</span>tlf<span class="token punctuation">.</span>T14_3_2_6_YLC comp<span class="token operator">=</span>tlf<span class="token punctuation">.</span>T14_3_2_6_QQX warning listall crit<span class="token operator">=</span><span class="token number">0.000000001</span><span class="token punctuation">;</span> <span class="token step keyword">run</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码实现3-yulu-chen" tabindex="-1"><a class="header-anchor" href="#代码实现3-yulu-chen" aria-hidden="true">#</a> 代码实现3 - yulu.chen</h2><div class="language-sas line-numbers-mode" data-ext="sas"><pre class="language-sas"><code>
<span class="token comment">***Remove work lib;</span>
<span class="token step keyword">proc datasets</span> <span class="token proc-args"><span class="token arg keyword">lib</span><span class="token operator">=</span><span class="token arg-value">work</span> <span class="token arg keyword">memtype</span><span class="token operator">=</span><span class="token arg-value">all</span> <span class="token arg keyword">kill</span> <span class="token arg keyword">nolist</span><span class="token punctuation">;</span></span> <span class="token step keyword">quit</span><span class="token punctuation">;</span>
option nomprint nomlogic nosymbolgen<span class="token punctuation">;</span>
<span class="token comment">***clean log and output;</span>
dm <span class="token string">&#39;log&#39;</span> clear<span class="token punctuation">;</span>
dm <span class="token string">&#39;output&#39;</span> clear<span class="token punctuation">;</span>
<span class="token keyword">ods</span> noresults<span class="token punctuation">;</span>
 
<span class="token macro-keyword keyword">%let</span> pgmname<span class="token operator">=</span>T14_3_2_6<span class="token punctuation">;</span>
 
<span class="token comment">***create log file***;</span>
<span class="token step keyword">proc printto</span> <span class="token proc-args"><span class="token arg keyword">log</span><span class="token operator">=</span><span class="token string">&quot;&amp;root.\\Production\\Tables\\log\\&amp;pgmname._YLC.log&quot;</span> <span class="token arg keyword">new</span><span class="token punctuation">;</span></span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
 
option fmtsearch<span class="token operator">=</span><span class="token punctuation">(</span>work rawdata<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token step keyword">proc format</span><span class="token punctuation">;</span>
	invalue valcn
		<span class="token string">&quot;Normal&quot;</span><span class="token operator">=</span><span class="token number">1</span>
		<span class="token string">&quot;Abnormal, NCS&quot;</span><span class="token operator">=</span><span class="token number">2</span>
		<span class="token string">&quot;Abnormal, CS&quot;</span><span class="token operator">=</span><span class="token number">3</span>
		<span class="token string">&quot;Missing&quot;</span><span class="token operator">=</span><span class="token number">4</span>
		<span class="token string">&quot;Total&quot;</span><span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">;</span>
	value valc
		<span class="token number">1</span><span class="token operator">=</span><span class="token string">&quot;Normal&quot;</span>
		<span class="token number">2</span><span class="token operator">=</span><span class="token string">&quot;Abnormal, NCS&quot;</span>
		<span class="token number">3</span><span class="token operator">=</span><span class="token string">&quot;Abnormal, CS&quot;</span>
		<span class="token number">4</span><span class="token operator">=</span><span class="token string">&quot;Missing&quot;</span>
		<span class="token number">5</span><span class="token operator">=</span><span class="token string">&quot;Total&quot;</span><span class="token punctuation">;</span>
	value arm
        <span class="token number">1</span><span class="token operator">=</span><span class="token string">&quot;1.0mg/kg&quot;</span>
        <span class="token number">2</span><span class="token operator">=</span><span class="token string">&quot;2.5mg/kg&quot;</span>
        <span class="token number">3</span><span class="token operator">=</span><span class="token string">&quot;5.0mg/kg&quot;</span>
        <span class="token number">4</span><span class="token operator">=</span><span class="token string">&quot;10.0mg/kg&quot;</span>
        <span class="token number">5</span><span class="token operator">=</span><span class="token string">&quot;Placebo&quot;</span>
        <span class="token number">98</span><span class="token operator">=</span><span class="token string">&quot;Treatment Group Overall&quot;</span>
		<span class="token number">99</span><span class="token operator">=</span><span class="token string">&quot;Overall&quot;</span>
        <span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token comment">**read adam.adsl;</span>
<span class="token step keyword">data</span> adsl_0<span class="token punctuation">;</span>
	<span class="token keyword">set</span> adam<span class="token punctuation">.</span>adsl<span class="token punctuation">;</span>
	<span class="token keyword">if</span> trt01an <span class="token operator-keyword operator">ne</span> <span class="token punctuation">.</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> adsl_1<span class="token punctuation">;</span>
	<span class="token keyword">set</span> adsl_0<span class="token punctuation">;</span> <span class="token keyword">if</span> trt01an<span class="token operator">&lt;=</span><span class="token number">4</span><span class="token punctuation">;</span>
	trt01an<span class="token operator">=</span><span class="token number">98</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> adsl_2<span class="token punctuation">;</span>
	<span class="token keyword">set</span> adsl_0<span class="token punctuation">;</span>
	trt01an<span class="token operator">=</span><span class="token number">99</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
	
<span class="token step keyword">data</span> adsl<span class="token punctuation">;</span>
	<span class="token keyword">set</span> adsl_0 adsl_1 adsl_2<span class="token punctuation">;</span>
	<span class="token keyword">if</span> saffl<span class="token operator">=</span><span class="token string">&quot;Y&quot;</span><span class="token punctuation">;</span>
	rename trt01an<span class="token operator">=</span>trtan<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token comment">**set denom;</span>
<span class="token keyword">options</span><span class="token options-args"> <span class="token arg keyword">missing</span><span class="token operator">=</span><span class="token number">0</span></span><span class="token punctuation">;</span>
<span class="token step keyword">proc tabulate</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">adsl</span> <span class="token arg keyword">out</span><span class="token operator">=</span><span class="token arg-value">denom</span><span class="token number">1</span><span class="token punctuation">;</span></span>
	format trtan arm<span class="token punctuation">.</span> <span class="token punctuation">;</span>
	<span class="token keyword">class</span> trtan<span class="token operator">/</span>preloadfmt<span class="token punctuation">;</span>
	<span class="token keyword">table</span> n<span class="token punctuation">,</span>trtan<span class="token operator">/</span> printmiss<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token comment">**get arm freq macro variable;</span>
<span class="token step keyword">data</span> <span class="token keyword">_null_</span><span class="token punctuation">;</span>
	<span class="token keyword">set</span> denom1<span class="token punctuation">;</span>
	<span class="token keyword">call</span> <span class="token function keyword">symput</span><span class="token punctuation">(</span><span class="token function keyword">cats</span><span class="token punctuation">(</span><span class="token string">&quot;arm&quot;</span><span class="token punctuation">,</span><span class="token function keyword">strip</span><span class="token punctuation">(</span><span class="token function keyword">put</span><span class="token punctuation">(</span>trtan<span class="token punctuation">,</span>best<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function keyword">cats</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
<span class="token keyword">options</span><span class="token options-args"> <span class="token arg keyword">missing</span><span class="token operator">=</span><span class="token string">&#39;&#39;</span></span><span class="token punctuation">;</span>

<span class="token comment">**read adam.advs;</span>
<span class="token step keyword">data</span> advs<span class="token punctuation">;</span>
	<span class="token keyword">length</span> aclsig bclsig <span class="token punctuation">$</span><span class="token number">200</span><span class="token punctuation">;</span>
	<span class="token keyword">set</span> adam<span class="token punctuation">.</span><span class="token function keyword">advs</span><span class="token punctuation">(</span>where<span class="token operator">=</span><span class="token punctuation">(</span><span class="token operator">^</span><span class="token function keyword">missing</span><span class="token punctuation">(</span>trtan<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator-keyword operator">in</span><span class="token operator">=</span>ina<span class="token punctuation">)</span>
	adam<span class="token punctuation">.</span><span class="token function keyword">advs</span><span class="token punctuation">(</span><span class="token operator-keyword operator">in</span><span class="token operator">=</span>inb<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> inb <span class="token keyword">then</span> trtan<span class="token operator">=</span><span class="token number">99</span><span class="token punctuation">;</span>
    aparam<span class="token operator">=</span><span class="token string">&#39;Vital Signs&#39;</span><span class="token punctuation">;</span> aparamn<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> ady<span class="token operator">=</span>vsdy<span class="token punctuation">;</span> visitnum<span class="token operator">=</span>avisitn<span class="token punctuation">;</span> visit<span class="token operator">=</span>avisit<span class="token punctuation">;</span> parcat<span class="token operator">=</span><span class="token string">&#39;VS&#39;</span><span class="token punctuation">;</span> parcatn<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">*update var name;</span>
    aclsig<span class="token operator">=</span>avsclsg<span class="token punctuation">;</span> 
	<span class="token keyword">if</span> saffl<span class="token operator">=</span><span class="token string">&quot;Y&quot;</span> <span class="token keyword">and</span> <span class="token operator">^</span><span class="token function keyword">find</span><span class="token punctuation">(</span>visit<span class="token punctuation">,</span><span class="token string">&quot;Unscheduled&quot;</span><span class="token punctuation">)</span> <span class="token keyword">and</span> anl01fl<span class="token operator">=</span><span class="token string">&#39;Y&#39;</span> <span class="token keyword">and</span> paramcd <span class="token operator-keyword operator">not</span> <span class="token operator-keyword operator">in</span> <span class="token punctuation">(</span><span class="token string">&#39;HEIGHT&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;WEIGHT&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;BMI&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span> 
<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">advs</span> <span class="token arg keyword">nodupkey</span><span class="token punctuation">;</span></span> <span class="token keyword">by</span> trtan subjid visitnum avisit<span class="token punctuation">;</span> <span class="token step keyword">run</span><span class="token punctuation">;</span>
<span class="token step keyword">data</span> base<span class="token punctuation">;</span>
	<span class="token keyword">set</span> advs<span class="token punctuation">;</span>
	<span class="token keyword">if</span> ablfl<span class="token operator">=</span><span class="token string">&quot;Y&quot;</span> <span class="token punctuation">;</span>
	<span class="token keyword">keep</span> usubjid trtan aparam aparamn bclsig<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> VS1<span class="token punctuation">;</span>
	<span class="token keyword">set</span> advs<span class="token punctuation">;</span>
	<span class="token keyword">if</span> ablfl<span class="token operator">=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
	<span class="token keyword">keep</span> usubjid trtan parcat parcatn aparam aparamn aclsig visit visitnum<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">vs</span><span class="token number">1</span> <span class="token arg keyword">out</span> <span class="token operator">=</span> <span class="token function keyword">aparam_che_</span><span class="token punctuation">(</span><span class="token arg keyword">keep</span> <span class="token operator">=</span> <span class="token arg-value">aparamn</span> <span class="token arg keyword">aparam</span> <span class="token arg keyword">visitnum</span> <span class="token arg keyword">visit</span><span class="token punctuation">)</span> <span class="token arg keyword">nodupkey</span><span class="token punctuation">;</span></span>
	<span class="token keyword">by</span> aparamn visitnum<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> aparam_che<span class="token punctuation">;</span>
	<span class="token keyword">set</span> aparam_che_<span class="token punctuation">;</span>
		<span class="token keyword">do</span> trtan<span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">to</span> <span class="token number">5</span><span class="token punctuation">,</span><span class="token number">98</span><span class="token punctuation">,</span><span class="token number">99</span><span class="token punctuation">;</span>
			<span class="token keyword">output</span><span class="token punctuation">;</span>
		<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token comment">/*proc sql noprint;*/</span>
<span class="token comment">/*	select distinct aparamn into:listaparam separated by &#39;, &#39;*/</span>
<span class="token comment">/*		from aparam_che;*/</span>
<span class="token comment">/*quit;*/</span>
<span class="token operator">/</span><span class="token operator">*</span><span class="token punctuation">%</span>put <span class="token macro-variable">&amp;listaparam</span><span class="token punctuation">.</span><span class="token punctuation">;</span><span class="token operator">*</span><span class="token operator">/</span>

<span class="token comment">/*dummy aparam &amp; visit &amp; cat*/</span>
<span class="token step keyword">proc sql</span><span class="token punctuation">;</span><span class="token proc-sql">
<span class="token sql language-sql">	create table dm as 
	select a.*,b.aparam,b.aparamn,b.visitnum,b.visit
	from adsl a left join aparam_che b
	on a.trtan=b.trtan;</span>
</span><span class="token step keyword">quit</span><span class="token punctuation">;</span>

<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span> <span class="token operator">=</span> <span class="token arg-value">dm</span><span class="token punctuation">;</span></span>
	<span class="token keyword">by</span> trtan aparamn aparam visitnum visit usubjid<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span> <span class="token operator">=</span> <span class="token arg-value">vs</span><span class="token number">1</span><span class="token punctuation">;</span></span>
	<span class="token keyword">by</span> trtan aparamn aparam visitnum visit usubjid<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> vs2_<span class="token punctuation">;</span>
	<span class="token keyword">merge</span> <span class="token function keyword">dm</span><span class="token punctuation">(</span><span class="token operator-keyword operator">in</span> <span class="token operator">=</span> a<span class="token punctuation">)</span> vs1<span class="token punctuation">;</span>
	<span class="token keyword">by</span> trtan aparamn aparam visitnum visit usubjid<span class="token punctuation">;</span>
	<span class="token keyword">if</span> a<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc sql</span><span class="token punctuation">;</span><span class="token proc-sql">
<span class="token sql language-sql">	create table vs2 as 
	select a.*, b.bclsig
	from vs2_ a left join base b
	on a.trtan=b.trtan and a.usubjid=b.usubjid and a.aparamn=b.aparamn
	order by usubjid,trtan,aparamn,visitnum;</span>
</span><span class="token step keyword">quit</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> vs3<span class="token punctuation">;</span> 
	<span class="token keyword">length</span> basec avalc <span class="token punctuation">$</span><span class="token number">200</span><span class="token punctuation">;</span>
	<span class="token keyword">set</span> vs2<span class="token punctuation">;</span>
	<span class="token keyword">by</span> usubjid trtan aparamn visitnum<span class="token punctuation">;</span>
	bclsig<span class="token operator">=</span><span class="token function keyword">ifc</span><span class="token punctuation">(</span><span class="token function keyword">missing</span><span class="token punctuation">(</span>bclsig<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">&quot;Missing&quot;</span><span class="token punctuation">,</span>bclsig<span class="token punctuation">)</span><span class="token punctuation">;</span>
	aclsig<span class="token operator">=</span><span class="token function keyword">ifc</span><span class="token punctuation">(</span><span class="token function keyword">missing</span><span class="token punctuation">(</span>aclsig<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">&quot;Missing&quot;</span><span class="token punctuation">,</span>aclsig<span class="token punctuation">)</span><span class="token punctuation">;</span>
	basec <span class="token operator">=</span> bclsig<span class="token punctuation">;</span>
	avalc <span class="token operator">=</span> aclsig<span class="token punctuation">;</span>
	<span class="token keyword">output</span><span class="token punctuation">;</span>
	avalc<span class="token operator">=</span>aclsig<span class="token punctuation">;</span>
	basec<span class="token operator">=</span><span class="token string">&quot;Total&quot;</span><span class="token punctuation">;</span>
	<span class="token keyword">output</span><span class="token punctuation">;</span>
	basec<span class="token operator">=</span>bclsig<span class="token punctuation">;</span>
	avalc<span class="token operator">=</span><span class="token string">&quot;Total&quot;</span><span class="token punctuation">;</span>
	<span class="token keyword">output</span><span class="token punctuation">;</span>
	basec<span class="token operator">=</span><span class="token string">&quot;Total&quot;</span><span class="token punctuation">;</span>
	avalc<span class="token operator">=</span><span class="token string">&quot;Total&quot;</span><span class="token punctuation">;</span>
	<span class="token keyword">output</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> vs4<span class="token punctuation">;</span>
	<span class="token keyword">set</span> vs3<span class="token punctuation">;</span>
	avarcn <span class="token operator">=</span> <span class="token function keyword">input</span><span class="token punctuation">(</span>avalc<span class="token punctuation">,</span>valcn<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	avarbn <span class="token operator">=</span> <span class="token function keyword">input</span><span class="token punctuation">(</span>basec<span class="token punctuation">,</span>valcn<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc freq</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">vs</span><span class="token number">4</span> <span class="token arg keyword">noprint</span><span class="token punctuation">;</span></span>
	<span class="token keyword">table</span> trtan<span class="token operator">*</span>visitnum<span class="token operator">*</span>visit<span class="token operator">*</span>aparamn<span class="token operator">*</span>aparam<span class="token operator">*</span>avarbn<span class="token operator">*</span>avarcn<span class="token operator">/</span>out<span class="token operator">=</span>out1<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> out1_<span class="token punctuation">;</span>
	<span class="token keyword">set</span> aparam_che<span class="token punctuation">;</span>
	<span class="token keyword">do</span> avarbn <span class="token operator">=</span> <span class="token number">1</span> <span class="token keyword">to</span> <span class="token number">5</span><span class="token punctuation">;</span>
		<span class="token keyword">do</span> avarcn <span class="token operator">=</span> <span class="token number">1</span> <span class="token keyword">to</span> <span class="token number">5</span><span class="token punctuation">;</span>
			<span class="token keyword">output</span><span class="token punctuation">;</span>
		<span class="token keyword">end</span><span class="token punctuation">;</span>
	<span class="token keyword">end</span><span class="token punctuation">;</span>
	<span class="token keyword">keep</span> trtan visitnum visit aparamn aparam avarbn avarcn<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span> <span class="token operator">=</span> <span class="token arg-value">out</span>1_<span class="token punctuation">;</span></span>
	<span class="token keyword">by</span> trtan visitnum visit aparamn aparam avarbn avarcn<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> out2<span class="token punctuation">;</span>
	<span class="token keyword">merge</span> <span class="token function keyword">out1_</span><span class="token punctuation">(</span><span class="token operator-keyword operator">in</span> <span class="token operator">=</span> a<span class="token punctuation">)</span> out1<span class="token punctuation">;</span>
	<span class="token keyword">by</span> trtan visitnum visit aparamn aparam avarbn avarcn<span class="token punctuation">;</span>
	<span class="token keyword">if</span> a<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc sql</span><span class="token punctuation">;</span><span class="token proc-sql">
<span class="token sql language-sql">	create table out3 as 
		select 
			a.*,
			case 
				when a.count&lt;=0 then &quot;0&quot;
				when b.n&gt;0 then catx(&quot; (&quot;,a.count,put(100*a.count/b.n,8.1)||&quot;)&quot;)
			end as res,
			&#39;n (%)&#39; as _stat
		from out2 a 
			left join denom1 b
			on a.trtan=b.trtan
		order by trtan,aparamn,aparam,visitnum,visit,avarcn,_stat;</span>
</span><span class="token step keyword">quit</span><span class="token punctuation">;</span>

<span class="token step keyword">proc transpose</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">out</span><span class="token number">3</span> <span class="token arg keyword">out</span><span class="token operator">=</span><span class="token function keyword">out4</span><span class="token punctuation">(</span><span class="token arg keyword">drop</span><span class="token operator">=</span>_<span class="token arg keyword">name</span>_<span class="token punctuation">)</span> <span class="token arg keyword">prefix</span><span class="token operator">=</span><span class="token arg-value">col</span><span class="token punctuation">;</span></span>
	<span class="token keyword">by</span> trtan aparamn aparam visitnum visit avarcn _stat<span class="token punctuation">;</span>
	<span class="token keyword">var</span> res<span class="token punctuation">;</span>
	id avarbn<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> out5<span class="token punctuation">;</span>
	<span class="token keyword">set</span> out4<span class="token punctuation">;</span>
	<span class="token keyword">by</span> trtan aparamn aparam visitnum visit avarcn _stat<span class="token punctuation">;</span>
	<span class="token keyword">length</span> trta _label avalc phase <span class="token punctuation">$</span><span class="token number">200</span><span class="token punctuation">;</span>
	trta<span class="token operator">=</span><span class="token function keyword">put</span><span class="token punctuation">(</span>trtan<span class="token punctuation">,</span>arm<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	avalc<span class="token operator">=</span><span class="token function keyword">put</span><span class="token punctuation">(</span>avarcn<span class="token punctuation">,</span>valc<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	phase<span class="token operator">=</span><span class="token string">&quot;Phase 1&quot;</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> avarcn<span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">then do</span><span class="token punctuation">;</span> _label<span class="token operator">=</span>visit<span class="token punctuation">;</span>_catn<span class="token operator">=</span>avarcn<span class="token punctuation">;</span>output<span class="token punctuation">;</span>end<span class="token punctuation">;</span>
	<span class="token keyword">else</span> <span class="token keyword">do</span><span class="token punctuation">;</span>_label<span class="token operator">=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>_catn<span class="token operator">=</span>avarcn<span class="token punctuation">;</span>output<span class="token punctuation">;</span>end<span class="token punctuation">;</span>
<span class="token comment">/*	if first.aparam then do; _label=aparam;_catn=0; avalc=&quot;&quot;;call missing(of col:,_stat);output;end; *for duplicated param condition;*/</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">out</span><span class="token number">5</span><span class="token punctuation">;</span></span>
	<span class="token keyword">by</span> phase trtan aparamn visitnum _catn avarcn _stat<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span> 

<span class="token step keyword">data</span> out6<span class="token punctuation">;</span>
	<span class="token keyword">set</span> out5<span class="token punctuation">;</span>
	<span class="token keyword">by</span> phase trtan aparamn visitnum _catn avarcn _stat<span class="token punctuation">;</span>
	<span class="token keyword">length</span> visit1 <span class="token punctuation">$</span><span class="token number">200</span><span class="token punctuation">;</span>
	visit1<span class="token operator">=</span><span class="token function keyword">lag</span><span class="token punctuation">(</span>visit<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">retain</span> part<span class="token punctuation">;</span>
	<span class="token keyword">if</span> first<span class="token punctuation">.</span>phase <span class="token keyword">and</span> first<span class="token punctuation">.</span>visitnum <span class="token keyword">then</span> part<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token keyword">else</span> <span class="token keyword">if</span> visit<span class="token operator">=</span>visit1 <span class="token keyword">then</span> part<span class="token operator">=</span>part<span class="token punctuation">;</span>
	<span class="token keyword">else</span> part<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">/*	pg=ceil(part/3);*/</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc sort</span> <span class="token proc-args"><span class="token arg keyword">data</span><span class="token operator">=</span><span class="token arg-value">out</span><span class="token number">6</span> <span class="token arg keyword">out</span><span class="token operator">=</span><span class="token function keyword">pg</span><span class="token punctuation">(</span><span class="token arg keyword">keep</span><span class="token operator">=</span><span class="token arg-value">phase</span> <span class="token arg keyword">trtan</span> <span class="token arg keyword">part</span><span class="token punctuation">)</span> <span class="token arg keyword">nodupkey</span><span class="token punctuation">;</span></span>
	<span class="token keyword">by</span> trtan part<span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> pg1<span class="token punctuation">;</span>
	<span class="token keyword">set</span> pg<span class="token punctuation">;</span>
	<span class="token keyword">by</span> trtan part<span class="token punctuation">;</span>
	num<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> num<span class="token operator">&gt;</span><span class="token number">4</span> <span class="token keyword">or</span> first<span class="token punctuation">.</span>trtan <span class="token keyword">then do</span><span class="token punctuation">;</span>
		pg<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
		num<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>

<span class="token step keyword">proc sql</span><span class="token punctuation">;</span><span class="token proc-sql">
<span class="token sql language-sql">	create table final0 as 
	select a.*,b.pg
	from out6 a left join pg1 b
	on a.trtan=b.trtan and a.part=b.part
	order by pg, phase, trtan, aparamn, visitnum, _catn, avarcn, _stat;</span>
</span><span class="token step keyword">quit</span><span class="token punctuation">;</span>

<span class="token step keyword">data</span> final<span class="token punctuation">;</span>
	<span class="token keyword">set</span> final0 <span class="token keyword">end</span><span class="token operator">=</span>last<span class="token punctuation">;</span>
	<span class="token keyword">if</span> last <span class="token keyword">then</span> <span class="token keyword">call</span> <span class="token function keyword">symput</span><span class="token punctuation">(</span><span class="token string">&quot;tpage&quot;</span><span class="token punctuation">,</span><span class="token function keyword">put</span><span class="token punctuation">(</span>pg<span class="token punctuation">,</span>best<span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">length</span> trta_ <span class="token punctuation">$</span><span class="token number">200</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> trtan<span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">then</span> trta_<span class="token operator">=</span><span class="token function keyword">cats</span><span class="token punctuation">(</span>trta<span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&quot; (N=&quot;</span><span class="token operator">||</span><span class="token string">&quot;&amp;arm1.&quot;</span><span class="token operator">||</span><span class="token string">&quot;)&quot;</span><span class="token punctuation">;</span>
	<span class="token keyword">else</span> <span class="token keyword">if</span> trtan<span class="token operator">=</span><span class="token number">2</span> <span class="token keyword">then</span> trta_<span class="token operator">=</span><span class="token function keyword">cats</span><span class="token punctuation">(</span>trta<span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&quot; (N=&quot;</span><span class="token operator">||</span><span class="token string">&quot;&amp;arm2.&quot;</span><span class="token operator">||</span><span class="token string">&quot;)&quot;</span><span class="token punctuation">;</span>
	<span class="token keyword">else</span> <span class="token keyword">if</span> trtan<span class="token operator">=</span><span class="token number">3</span> <span class="token keyword">then</span> trta_<span class="token operator">=</span><span class="token function keyword">cats</span><span class="token punctuation">(</span>trta<span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&quot; (N=&quot;</span><span class="token operator">||</span><span class="token string">&quot;&amp;arm3.&quot;</span><span class="token operator">||</span><span class="token string">&quot;)&quot;</span><span class="token punctuation">;</span>
	<span class="token keyword">else</span> <span class="token keyword">if</span> trtan<span class="token operator">=</span><span class="token number">4</span> <span class="token keyword">then</span> trta_<span class="token operator">=</span><span class="token function keyword">cats</span><span class="token punctuation">(</span>trta<span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&quot; (N=&quot;</span><span class="token operator">||</span><span class="token string">&quot;&amp;arm4.&quot;</span><span class="token operator">||</span><span class="token string">&quot;)&quot;</span><span class="token punctuation">;</span>
	<span class="token keyword">else</span> <span class="token keyword">if</span> trtan<span class="token operator">=</span><span class="token number">5</span> <span class="token keyword">then</span> trta_<span class="token operator">=</span><span class="token function keyword">cats</span><span class="token punctuation">(</span>trta<span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&quot; (N=&quot;</span><span class="token operator">||</span><span class="token string">&quot;&amp;arm5.&quot;</span><span class="token operator">||</span><span class="token string">&quot;)&quot;</span><span class="token punctuation">;</span>
	<span class="token keyword">else</span> <span class="token keyword">if</span> trtan<span class="token operator">=</span><span class="token number">98</span> <span class="token keyword">then</span> trta_<span class="token operator">=</span><span class="token function keyword">cats</span><span class="token punctuation">(</span>trta<span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&quot; (N=&quot;</span><span class="token operator">||</span><span class="token string">&quot;&amp;arm98.&quot;</span><span class="token operator">||</span><span class="token string">&quot;)&quot;</span><span class="token punctuation">;</span>
	<span class="token keyword">else</span> <span class="token keyword">if</span> trtan<span class="token operator">=</span><span class="token number">99</span> <span class="token keyword">then</span> trta_<span class="token operator">=</span><span class="token function keyword">cats</span><span class="token punctuation">(</span>trta<span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">&quot; (N=&quot;</span><span class="token operator">||</span><span class="token string">&quot;&amp;arm99.&quot;</span><span class="token operator">||</span><span class="token string">&quot;)&quot;</span><span class="token punctuation">;</span>
    <span class="token comment">*filter;</span>
    <span class="token keyword">if</span> trtan <span class="token operator-keyword operator">not</span> <span class="token operator-keyword operator">in</span> <span class="token punctuation">(</span><span class="token number">98</span><span class="token punctuation">,</span><span class="token number">99</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>


<span class="token comment">**output final dataset;</span>
<span class="token function keyword">%dds_out</span><span class="token punctuation">(</span>data<span class="token operator">=</span>final<span class="token punctuation">,</span>out<span class="token operator">=</span>tlf<span class="token punctuation">.</span><span class="token macro-variable">&amp;pgmname</span><span class="token punctuation">.</span>_YLC<span class="token punctuation">,</span>varlist<span class="token operator">=</span>trta _label avalc _stat col1 col2 col3 col4 col5<span class="token punctuation">)</span><span class="token punctuation">;</span>

 
<span class="token step keyword">proc printto</span><span class="token punctuation">;</span>
<span class="token step keyword">run</span><span class="token punctuation">;</span>
 
<span class="token comment">***check the log;</span>
<span class="token function keyword">%m_chklog</span><span class="token punctuation">(</span>pgm_type<span class="token operator">=</span>Tables<span class="token punctuation">,</span>pgm_name<span class="token operator">=</span><span class="token macro-variable">&amp;pgmname</span><span class="token punctuation">.</span>_YLC<span class="token punctuation">,</span>serv<span class="token operator">=</span>Production<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),c=[o];function l(i,u){return s(),a("div",null,c)}const k=n(e,[["render",l],["__file","shift.html.vue"]]);export{k as default};
