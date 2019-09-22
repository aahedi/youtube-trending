function cleanString(str) {
    return str.replace(/[^\w\s]|_/g, '')
        .replace(/\s+/g, ' ')
        .toLowerCase();
}

function extractSubstr(str, regexp) {
    return cleanString(str).match(regexp) || [];
}

function getWordsByNonWhiteSpace(str) {
    return extractSubstr(str, /\S+/g);
}

function getWordsByWordBoundaries(str) {
    return extractSubstr(str, /\b[a-z\d]+\b/g);
}

function wordMap(str) {
    return getWordsByWordBoundaries(str).reduce(function(map, word) {
        map[word] = (map[word] || 0) + 1;
        return map;
    }, {});
}

function mapToTuples(map) {
    return Object.keys(map).map(function(key) {
        return [ key, map[key] ];
    });
}

function mapToSortedTuples(map, sortFn, sortOrder) {
    return mapToTuples(map).sort(function(a, b) {
        return sortFn.call(undefined, a, b, sortOrder);
    });
}

function countWords(str) {
    return getWordsByWordBoundaries(str).length;
}

function wordFrequency(str) {
    return mapToSortedTuples(wordMap(str), function(a, b, order) {
        if (b[1] > a[1]) {
            return order[1] * -1;
        } else if (a[1] > b[1]) {
            return order[1] * 1;
        } else {
            return order[0] * (a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : 0));
        }
    }, [1, -1]);
}

function printTuples(tuples) {
    return tuples.map(function(tuple) {
        return padStr(tuple[0], ' ', 12, 1) + ' -> ' + tuple[1];
    }).join('\n');
}

function padStr(str, ch, width, dir) { 
    return (width <= str.length ? str : padStr(dir < 0 ? ch + str : str + ch, ch, width, dir)).substr(0, width);
}

function toTable(data, headers) {
    return $('<table>').append($('<thead>').append($('<tr>').append(headers.map(function(header) {
        return $('<th>').html(header);
    })))).append($('<tbody>').append(data.map(function(row) {
        return $('<tr>').append(row.map(function(cell) {
            return $('<td>').html('<a href="javascript:window.find(&#39;'+cell+'&#39;);">'+cell+'</a>');
        }));
    })));
}

function addRowsBefore(table, data) {
    table.find('tbody').prepend(data.map(function(row) {
        return $('<tr>').append(row.map(function(cell) {
            return $('<td>').html(cell);
        }));
    }));
    return table;
}

var removeUselessWords = function(txt,region) {
	
	  var kata = "a,ada,adakala,adakan,adalah,adanya,adapun,agak,agaknya,agar,akan,akankah,akhir,akhiri,akhirnya,aku,akulah,alangkah,alhasil,amat,amatlah,ampe,anda,andalah,anggar,antar,antara,antaranya,apa,apaan,apabila,apakah,apalagi,apatah,aposteriori,artinya,asal,asalkan,atas,atau,ataukah,ataupun,awal,awalnya,b,bacut,bagai,bagaikan,bagaimana,bagaimanakah,bagaimanapun,bagi,bagian,bahak,baheula,bahkan,bahwa,bahwasanya,baik,bakal,bakalan,balik,banget,banyak,bapak,barangkali,bareng,baru,barusan,bawah,beberapa,begini,beginian,beginikah,beginilah,begitu,begitukah,begitulah,begitupun,bekerja,belaka,belakang,belakangan,beleng,belum,belumlah,benar,benarkah,benarlah,berada,berakhir,berakhirlah,berakhirnya,berapa,berapakah,berapalah,berapapun,berarti,berawal,berbagai,berdatangan,beri,berikan,berikut,berikutnya,berjumlah,berkali-kali,berkata,berkehendak,berkeinginan,berkenaan,berlainan,berlalu,berlangsung,berlebihan,bermacam,bermacam-macam,bermaksud,bermula,bersama,bersama-sama,bersiap,bersiap-siap,bertanya,bertanya-tanya,berturut,berturut-turut,bertutur,berujar,berupa,besar,betul,betulkah,biar,biasa,biasanya,bigair,bila,bilakah,bilamana,bilhak,bisa,bisakah,boleh,bolehkah,bolehlah,buat,bukan,bukankah,bukanlah,bukannya,bulan,bung,c,cara,carah,caranya,cukup,cukupkah,cukuplah,cuma,cuman,cuming,d,dabak,dadak,dahulu,dalam,dan,dapat,dari,daripada,datang,dekat,demi,demikian,demikianlah,dengan,depan,di,dia,diakhiri,diakhirinya,dialah,diantara,diantaranya,diberi,diberikan,diberikannya,dibuat,dibuatnya,didapat,didatangkan,digunakan,diibaratkan,diibaratkannya,diingat,diingatkan,diinginkan,dijawab,dijelaskan,dijelaskannya,dikarenakan,dikatakan,dikatakannya,dikerjakan,diketahui,diketahuinya,dikira,dilakukan,dilalui,dilihat,dimaksud,dimaksudkan,dimaksudkannya,dimaksudnya,diminta,dimintai,dimisalkan,dimulai,dimulailah,dimulainya,dimungkinkan,dini,dipastikan,diperbuat,diperbuatnya,dipergunakan,diperkirakan,diperlihatkan,diperlukan,diperlukannya,dipersoalkan,dipertanyakan,dipunyai,diri,dirinya,disampaikan,disebut,disebutkan,disebutkannya,disini,disinilah,ditambahkan,ditandaskan,ditanya,ditanyai,ditanyakan,ditegaskan,ditujukan,ditunjuk,ditunjuki,ditunjukkan,ditunjukkannya,ditunjuknya,dituturkan,dituturkannya,diucapkan,diucapkannya,diungkapkan,dong,dua,dulu,duru,duyun,e,embung,empat,enggak,enggaknya,enggan,entah,entahlah,f,g,gerangan,gergeran,guna,gunakan,h,hal,hampir,hanya,hanyalah,hari,harus,haruslah,harusnya,hendak,hendaklah,hendaknya,hingga,i,ia,ialah,ibarat,ibaratkan,ibaratnya,ibid,ibidem,ibu,idem,ikut,in absensia,ingat,ingat-ingat,ingin,inginkah,inginkan,ini,inikah,inilah,interim,intramembran,itu,itukah,itulah,j,jadi,jadilah,jadinya,jangan,jangankan,janganlah,jauh,jawab,jawaban,jawabnya,jelas,jelaskan,jelaslah,jelasnya,jemang,jerongkang,jika,jikalau,jua,juga,jumlah,jumlahnya,justru,k,kadang,kadung,kagak,kala,kalau,kalaulah,kalaupun,kalian,kami,kamilah,kamu,kamulah,kan,kapan,kapankah,kapanpun,karena,karenanya,kasus,kata,katakan,katakanlah,katanya,ke,keadaan,kebetulan,kecil,kedua,keduanya,keinginan,kejer,kelamaan,kelihatan,kelihatannya,kelima,keluar,kembali,kemput,kemudian,kemungkinan,kemungkinannya,kenapa,kepada,kepadanya,kepetang,kepingin,kesampaian,keseluruhan,keseluruhannya,kesusu,keterlaluan,ketika,khususnya,kini,kinilah,kira,kira-kira,kiranya,kita,kitalah,klandestin,kok,konon,kurang,kutaha,l,labuda,lagi,lagian,lah,lain,lainnya,lalu,lama,lamanya,langgang,langsung,lanjut,lanjutnya,lansia,lantas,lebih,lekas,lewat,lima,luar,m,macam,maka,makanya,makin,malah,malahan,mampu,mampukah,mana,manakala,manalagi,masa,masalah,masalahnya,masih,masihkah,masing,masing-masing,mau,maupun,mawon,mejana,melainkan,melakukan,melalui,melihat,melihatnya,melulu,memang,memastikan,memberi,memberikan,membuat,memerlukan,memihak,meminta,memintakan,memisalkan,memperbuat,mempergunakan,memperkirakan,memperlihatkan,mempersiapkan,mempersoalkan,mempertanyakan,mempunyai,memulai,memungkinkan,menaiki,menambahkan,menandaskan,menanti,menanti-nanti,menantikan,menanya,menanyai,menanyakan,mendapat,mendapatkan,mendatang,mendatangi,mendatangkan,menegaskan,mengakhiri,mengapa,mengatakan,mengatakannya,mengenai,mengerjakan,mengetahui,menggunakan,menghendaki,mengibaratkan,mengibaratkannya,mengingat,mengingatkan,menginginkan,mengira,mengkali,mengucapkan,mengucapkannya,mengungkapkan,menjadi,menjawab,menjelaskan,mentak,mentang,menuju,menunjuk,menunjuki,menunjukkan,menunjuknya,menurut,menuturkan,menyampaikan,menyangkut,menyatakan,menyebutkan,menyeluruh,menyiapkan,merasa,mereka,merekalah,merupakan,meski,meskipun,mesti,metah,meyakini,meyakinkan,minta,mirip,misal,misalkan,misalnya,moga,mula,mulai,mulailah,mulanya,mumpung,mungkin,mungkinkah,n,nah,naik,nak,nalar,namun,nan,nang,nanti,nantinya,nawaitu,neko neko,nian,niscaya,nun,nyalar,nyaris,nyatanya,o,oleh,olehnya,p,pada,padahal,padanya,pak,paling,panjang,pantas,para,pasti,pastilah,pecicilan,penting,pentingnya,per,percuma,perlu,perlukah,perlunya,pernah,persoalan,pertama,pertama-tama,pertanyaan,pertanyakan,pesai,pihak,pihaknya,puguh,pukul,pula,pun,punya,q,r,rasa,rasanya,rata,remak,rupanya,s,saat,saatnya,saben,saja,sajalah,saling,sama,sama-sama,sambil,sambil lalu,sampai,sampai-sampai,sampaikan,samsam,sana,sangat,sangatlah,satu,saya,sayalah,se,sebab,sebabnya,sebagai,sebagaimana,sebagainya,sebagian,sebaik,sebaik-baiknya,sebaiknya,sebaliknya,sebanyak,sebegini,sebegitu,sebelum,sebelumnya,sebenarnya,seberapa,sebesar,sebetulnya,sebisanya,sebuah,sebut,sebutlah,sebutnya,secara,secukupnya,sedang,sedangkan,sedemikian,sederum,sedikit,sedikitnya,seenaknya,segala,segalanya,segera,segianya,seharusnya,sehingga,seingat,sejak,sejauh,sejenak,sejumlah,sekadar,sekadarnya,sekala,sekali,sekali-kali,sekalian,sekaligus,sekalipun,sekarang,sekecil,seketika,sekiranya,sekitar,sekitarnya,sekurang-kurangnya,sekurangnya,sela,selagi,selain,selaku,selalu,selama,selama-lamanya,selamanya,selanjutnya,seluruh,seluruhnya,semacam,semaja,semakin,semampu,semampunya,semasa,semasih,semata,semata-mata,semaunya,sementara,semisal,semisalnya,sempat,semua,semuanya,semula,senantiasa,sendiri,sendirian,sendirinya,sengked,seolah,seolah-olah,seorang,sepanjang,sepantasnya,sepantasnyalah,seperlunya,seperti,sepertinya,sepihak,serba,serbi,sering,seringnya,serta,serupa,sesaat,sesama,sesampai,sesegera,sesekali,seseorang,sesuatu,sesuatunya,sesudah,sesudahnya,setelah,setempat,setengah,seterusnya,setiap,setiba,setibanya,setidak-tidaknya,setidaknya,setinggi,seusai,sewaktu,siap,siapa,siapakah,siapapun,sini,sinilah,soal,soalnya,suah,suatu,sudah,sudahkah,sudahlah,sungguhpun,suntuk,supaya,t,taajul,tadi,tadinya,tahu,tahun,tak,tambah,tambahnya,tampak,tampaknya,tandas,tandasnya,tangeh,tanpa,tanya,tanyakan,tanyanya,tapi,tatkala,tegas,tegasnya,tekis,telah,telentang,tembek,tempat,tengah,tentang,tentu,tentulah,tentunya,tepat,terakhir,terasa,terbanyak,terdahulu,terdapat,terdiri,terhadap,terhadapnya,teringat,teringat-ingat,terjadi,terjadilah,terjadinya,terkira,terlalu,terlebih,terlihat,termasuk,ternyata,tersampaikan,tersebut,tersebutlah,tertentu,tertuju,terus,terutama,tetap,tetapi,tiap,tiba,tiba-tiba,tidak,tidakkah,tidaklah,tiga,tinggi,tingkrang,toh,tok,tra,trusa,tubi,tuji,tukung,tunai,tunggang langgang,tunjuk,turut,tutur,tuturnya,u,ucap,ucapnya,ude,ujar,ujarnya,umum,umumnya,ungkap,ungkapnya,untuk,usah,usai,v,w,waduh,wah,wahai,waima,waktu,waktunya,walakin,walau,walaupun,wong,x,y,yaitu,yakin,yakni,yang,z,'ll,'ve,I,a,a's,able,about,above,abroad,abst,accordance,according,accordingly,across,act,actually,added,adj,affected,affecting,affects,after,afterwards,again,against,ago,ah,ahead,ain't,all,allow,allows,almost,alone,along,alongside,already,also,although,always,am,amid,amidst,among,amongst,an,and,announce,another,any,anybody,anyhow,anymore,anyone,anything,anyway,anyways,anywhere,apart,apparently,appear,appreciate,appropriate,approximately,are,aren,aren't,arent,arise,around,as,aside,ask,asking,associated,at,auth,available,away,awfully,b,back,backward,backwards,be,became,because,become,becomes,becoming,been,before,beforehand,begin,beginning,beginnings,begins,behind,being,believe,below,beside,besides,best,better,between,beyond,biol,both,brief,briefly,but,by,c,c'mon,c's,ca,came,can,can't,cannot,cant,caption,cause,causes,certain,certainly,changes,clearly,co,co.,com,come,comes,concerning,consequently,consider,considering,contain,containing,contains,corresponding,could,couldn't,couldnt,course,currently,d,dare,daren't,date,definitely,described,despite,did,didn't,different,directly,do,does,doesn't,doing,don't,done,down,downwards,due,during,e,each,ed,edu,effect,eg,eight,eighty,either,else,elsewhere,end,ending,enough,entirely,ep,especially,et,et-al,etc,even,ever,evermore,every,everybody,everyone,everything,everywhere,ex,exactly,example,except,f,fairly,far,farther,few,fewer,ff,fifth,first,five,fix,followed,following,follows,for,forever,former,formerly,forth,forward,found,four,from,ft,further,furthermore,g,gave,get,gets,getting,give,given,gives,giving,go,goes,going,gone,got,gotten,greetings,h,had,hadn't,half,happens,hardly,has,hasn't,have,haven't,having,he,he'd,he'll,he's,hed,hello,help,hence,her,here,here's,hereafter,hereby,herein,heres,hereupon,hers,herself,hes,hi,hid,him,himself,his,hither,home,hopefully,how,how's,howbeit,however,hundred,i,i'd,i'll,i'm,i've,id,ie,if,ignored,im,immediate,immediately,importance,important,in,inasmuch,inc,inc.,indeed,index,indicate,indicated,indicates,information,inner,inside,insofar,instead,into,invention,inward,is,isn't,it,it'd,it'll,it's,itd,its,itself,j,just,k,keep,keeps,kept,kg,km,know,known,knows,l,largely,last,lately,later,latter,latterly,least,less,lest,let,let's,lets,like,liked,likely,likewise,line,little,look,looking,looks,low,lower,ltd,m,made,mainly,make,makes,many,may,maybe,mayn't,me,mean,means,meantime,meanwhile,merely,mg,might,mightn't,million,mine,minus,miss,ml,more,moreover,most,mostly,mr,mrs,much,mug,must,mustn't,my,myself,n,na,name,namely,nay,nd,near,nearly,necessarily,necessary,need,needn't,needs,neither,never,neverf,neverless,nevertheless,new,next,nine,ninety,no,no-one,nobody,non,none,nonetheless,noone,nor,normally,nos,not,noted,nothing,notwithstanding,novel,now,nowhere,o,obtain,obtained,obviously,of,off,official,often,oh,ok,okay,old,omitted,on,once,one,one's,ones,only,onto,opposite,or,ord,other,others,otherwise,ought,oughtn't,our,ours,ourselves,out,outside,over,overall,owing,own,p,page,pages,part,particular,particularly,past,per,perhaps,placed,please,plus,poorly,possible,possibly,potentially,pp,predominantly,present,presumably,previously,primarily,probably,promptly,proud,provided,provides,put,q,que,quickly,quite,qv,r,ran,rather,rd,re,readily,really,reasonably,recent,recently,ref,refs,regarding,regardless,regards,related,relatively,research,respectively,resulted,resulting,results,right,round,run,s,said,same,saw,say,saying,says,sec,second,secondly,section,see,seeing,seem,seemed,seeming,seems,seen,self,selves,sensible,sent,serious,seriously,seven,several,shall,shan't,she,she'd,she'll,she's,shed,shes,should,shouldn't,show,showed,shown,showns,shows,significant,significantly,similar,similarly,since,six,slightly,so,some,somebody,someday,somehow,someone,somethan,something,sometime,sometimes,somewhat,somewhere,soon,sorry,specifically,specified,specify,specifying,still,stop,strongly,sub,substantially,successfully,such,sufficiently,suggest,sup,sure,t,t's,take,taken,taking,tell,tends,th,than,thank,thanks,thanx,that,that'll,that's,that've,thats,the,their,theirs,them,themselves,then,thence,there,there'd,there'll,there're,there's,there've,thereafter,thereby,thered,therefore,therein,thereof,therere,theres,thereto,thereupon,these,they,they'd,they'll,they're,they've,theyd,theyre,thing,things,think,third,thirty,this,thorough,thoroughly,those,thou,though,thoughh,thousand,three,throug,through,throughout,thru,thus,til,till,tip,to,together,too,took,toward,towards,tried,tries,truly,try,trying,ts,twice,two,u,un,under,underneath,undoing,unfortunately,unless,unlike,unlikely,until,unto,up,upon,ups,upwards,us,use,used,useful,usefully,usefulness,uses,using,usually,v,value,various,versus,very,via,viz,vol,vols,vs,w,want,wants,was,wasn't,wasnt,way,we,we'd,we'll,we're,we've,wed,welcome,well,went,were,weren't,werent,what,what'll,what's,what've,whatever,whats,when,when's,whence,whenever,where,where's,whereafter,whereas,whereby,wherein,wheres,whereupon,wherever,whether,which,whichever,while,whilst,whim,whither,who,who'd,who'll,who's,whod,whoever,whole,whom,whomever,whos,whose,why,why's,widely,will,willing,wish,with,within,without,won't,wonder,wont,words,world,would,wouldn't,wouldnt,www,x,y,yes,yet,you,you'd,you'll,you're,you've,youd,your,youre,yours,yourself,yourselves,z,zero";
	  
	  var uselessWordsArray = kata.split(',');
	  var expStr = uselessWordsArray.join("|");
	  return txt.replace(new RegExp('\\b(' + expStr + ')\\b', 'gi'), ' ').replace(/\s{2,}/g, ' ');
	  //for(var i=0; i < uselessWordsArray.length; i++){
	  //return txt.replace(" "+uselessWordsArray[i]+" ", "");
	  //}
  }


   $(document).ready(function(){
   grab_yt('ID');$.fancybox.defaults.hash = true;
	   
				$("a").fancybox({
					afterLoad : function() {
						$('iframe').contents().find('video').click();
						console.log("after load …");
					}
				});
   }); 
   
   function grab_yt(region){
	if (region == null || region == "") {alert('Select country, please!');return false;}
	   else{
   $('#trending').html('');
   $('#data_web').html('');
   //$('#wordFreq').html('');
   //$('.js-rsspond').html('');
   
   var maxVideos = 50;
  $.get(
	  "https://www.googleapis.com/youtube/v3/playlistItems",{
    //"https://www.googleapis.com/youtube/v3/videos",{
		  //channelid:'UCkGCfOsXthbuCm3et2GiPLg',
		  //playlistId:'PLSAz_JSo_9sUGQ7eybFEGp0q5W_gIAPUR',
		  playlistId:'PLrEm7wWejuUy8Luj6AIaLm9iMgBtuaGq2',
      part: 'snippet,contentDetails',
      chart: 'mostPopular',
      kind: 'youtube#videoListResponse',
      maxResults: maxVideos,
      regionCode: region,
      key: 'AIzaSyAbuNDds299AO1XN1Iwj-T10HhHyvJzfzs'},
      function(data){
        var output;
        $.each(data.items, function(i, item){
          //console.log(item);
          videTitle = item.snippet.title;
                description = item.snippet.description;
                thumb = item.snippet.thumbnails.high.url;
                channelTitle = item.snippet.channelTitle;
                videoDate = item.snippet.publishedAt;
                Catagoryid = item.snippet.categoryId;
                cID = item.snippet.channelId;
				//vidId = item.id;
				vidId = item.snippet.resourceId.videoId;
		
    var temp = videTitle.split(" ");
    var sapuluh = 'zipped,push,edge,scramble,buzz,flutter,glitch3d,harmony,swipe,tossed,vortex,scatter,heat,arcade,bokeh,breakout,frosted,sweep,slide,segment,slip,corners';
    var mabelas = 'shift,beat,broadcast,brushes,colorize,crosstown,duotone,fireworks,levels,panels,paparazzi,shapes,shuffle,sliced,transmission,funhouse,atomic,fresh,lotus,pixels,smoke,spun';
    var duapuluh = 'autumn,shimmer,adore,kinetic,snowfall,spotted,blossom,campagne,countdown,elements,piles,mod,puzzle,sweetness';
    var harga = '';

        if (jQuery.inArray(temp[1], sapuluh.split(','))!='-1') {
            harga = '10rb';
        } 
        else if (jQuery.inArray(temp[1], mabelas.split(','))!='-1') {
            harga = '15rb';
        }
        else if (jQuery.inArray(temp[1], duapuluh.split(','))!='-1') {
            harga = '20rb';
        }
		
          output = '<li class="maindiv"><div><span class="harga">'+harga+'</span>' +
                        '<a data-fancybox data-type="iframe" data-src="https://youtube.com/embed/' + vidId + '?autoplay=1&rel=0&amp;controls=0&amp;showinfo=1;cc_load_policy=1&hl=en&cc_lang_pref=id" href="javascript:;"><img src="' + thumb + '" class="img-responsive thumbnail" ></a>' +
                        '<a href="https://api.whatsapp.com/send?phone=62895800708788&text=Halo%20Admin..%20saya%20mau%20order%20video%20%0ATema:%20*'+videTitle+'*%0AHarga:%20*'+harga+'*%0A%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%0A%0A*Metode%20Pembayaran%20:*%0A-Transfer%20Pulsa%0A08992021330%20(Tri)%0Aatau%0A-Transfer%20ke%20BCA%200540991634%20an.%20Hedi%20Herdiana%0A%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%0A%0A*Nama%20Pemesan%20:*%0A" target="_blank"><img class="beli" src="beli-wa.png"/></a></div>' +
                        '<div>' +
                            '<h3 class="Vtitle"><a data-fancybox data-type="iframe" data-src="https://youtube.com/embed/' + vidId + '?autoplay=1&rel=0&amp;controls=0&amp;showinfo=1;cc_load_policy=1&hl=en&cc_lang_pref=id" href="javascript:;">' + videTitle + '</a></h3>'+
                        //'<h4 class="cTitle"><a href="https://www.youtube.com/channel/'+cID+'" target="_blank">'+channelTitle+'</a></h4>'
		  '</div></div></li>' ;
                    //'<div class="clearfix"></div>';
		
          $('#trending').append(output);
		  
				$('#data_web').append(videTitle+' ');
	
        var str = $('#data_web').text();
        str = str.replace(/\d/g,''); /*hapus angka*/
        str = removeUselessWords(str,region); /*hapus kata umum*/
        var wordFreq = wordFrequency(str);
        var wordCount = countWords(str);
        var uniqueWords = wordFreq.length;
        var summaryData = [
            //[ 'TOTAL', wordCount ],
            //[ 'UNIQUE', uniqueWords ]
        ];
        var table = toTable(wordFreq, ['Word', 'Frequency']);
        addRowsBefore(table, summaryData);
        //$('#wordFreq').html(table);
        })

      }
    );
 }
}

$(window).on('popstate', function (event) {
	if (event.state!==null) {
		$.fancybox.getInstance('close');
	}
});

window.onbeforeunload = function() {
  return "Order? hubungi: 08992021330";
}
