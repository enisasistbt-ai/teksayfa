// Blog yazıları — TR ve EN. Her yazı için slug her iki dilde aynı tutuluyor
// ki /blog/[slug] ve /en/blog/[slug] arasında hreflang eşlemesi basit kalsın.

export const posts = {
  tr: [
    {
      slug: "instagram-bio-tek-link-sorunu",
      cover: "/blog/instagram-bio.jpg",
      title: "Instagram bio'daki tek link sorununu nasıl çözersin",
      description:
        "Instagram profilinde sadece bir link hakkın var ama paylaşmak istediğin çok şey var. Bunu pratikte nasıl çözdüğümüzü anlatıyoruz.",
      date: "2026-02-03",
      readTime: "4 dk",
      content: [
        { p: "Instagram'ın kuralı basit: profilinde tek bir link gösterebilirsin. Ama gerçek hayatta öyle değil — bir mağazan var, belki bir de web siten, WhatsApp'tan sipariş alıyorsun, bir de kampanya sayfan olsun istiyorsun. Hepsini tek linke sıkıştırmaya çalışınca ya bio'yu her gün değiştiriyorsun ya da en önemli bağlantıyı feda ediyorsun." },
        { p: "Bu sorunu ilk fark ettiğimizde biz de aynı şeyi yaşıyorduk: bir Trendyol mağazamız, bir de kendi sitemiz vardı, ikisini de aynı anda öne çıkaramıyorduk. Çözüm aslında basit — bio'ya bir link koy, o link seni istediğin kadar bağlantının olduğu bir sayfaya götürsün." },
        { h2: "Peki bu sayfada ne olmalı" },
        { p: "Burada asıl mesele sayfanın kalabalık görünmemesi. Ziyaretçi üç saniyede kim olduğunu, ne sattığını ve nereye tıklaması gerektiğini anlamalı. Bunun için sıralama önemli: en çok tıklanmasını istediğin bağlantı en üstte olsun, ikincil olanlar altta kalsın." },
        { p: "MineBio'da bunu panelden sürükle-bırak gibi düzenleyebiliyorsun; hangi linkin ne kadar tıklandığını da görüyorsun, yani deneme yanılma ile en iyi sıralamayı zamanla bulabiliyorsun." },
        { h2: "Bio'yu bir kere ayarla, unut" },
        { p: "En büyük fark şu: bio linkini bir kez ayarlıyorsun, kampanya değiştikçe ya da yeni bir sosyal medya hesabı açtıkça sadece sayfandaki linkleri güncelliyorsun — Instagram bio'suna dokunmana gerek kalmıyor." },
      ],
    },
    {
      slug: "trendyol-hepsiburada-instagram-tek-sayfa",
      title: "Trendyol, Hepsiburada ve Instagram mağazanı tek yerde toplamak",
      description:
        "Birden fazla pazaryerinde satış yapıyorsan, müşterinin hepsine tek yerden ulaşmasını sağlamak işini kolaylaştırır.",
      date: "2026-02-10",
      readTime: "5 dk",
      content: [
        { p: "Birden fazla pazaryerinde satış yapan bir esnafsan bu senaryo tanıdık gelecek: bir müşteri Instagram'dan ürününü beğeniyor, ama sen o ürünü Trendyol'da satıyorsun, bazı ürünler de sadece Hepsiburada'da. Müşteriye doğru linki söylemek, her seferinde ayrı ayrı paylaşmak zaman kaybı." },
        { p: "Bunun yerine tüm pazaryeri hesaplarını, web siteni ve sosyal medyanı tek bir sayfada toplayıp, o sayfanın linkini her yerde kullanmak çok daha pratik. Kartvizitine, Instagram bio'na, WhatsApp durumuna aynı linki koyabiliyorsun." },
        { h2: "Hangi platform öne çıkmalı" },
        { p: "Burada bir tercih yapman gerekiyor: en çok satış yaptığın platform en üstte olmalı. Biz MineBio'da pazaryeri linklerini ayrı bir bölümde grupluyoruz, böylece kullanıcı 'burada Trendyol var, burada Hepsiburada var' diye ayırt edebiliyor, karışıklık olmuyor." },
        { p: "Bir de şu var: bazı müşteriler markanı pazaryerinden değil doğrudan tanıyor olabilir, o yüzden kendi web sitenin veya sosyal medyanın da görünür olması, sadece pazaryeri linklerine boğulmaması önemli." },
        { h2: "Sayaç tutmak fark yaratıyor" },
        { p: "Hangi pazaryeri linkine kaç tıklama geldiğini görebilmek aslında ciddi bir veri: bir platformdan gelen ilgi diğerinden çok daha fazlaysa, bütçeni ve zamanını ona göre ayırabilirsin. Biz bunu panelden anlık takip ediyoruz, çoğu satıcı ilk başta bu veriyi görünce şaşırıyor — tahmin ettikleri platform genelde beklediklerinden farklı çıkıyor." },
      ],
    },
    {
      slug: "whatsapp-musteri-takip",
      title: "WhatsApp'tan gelen müşterileri kaybetmemek",
      description:
        "WhatsApp üzerinden onlarca müşteriyle konuşuyorsan, kimin ne sipariş ettiğini hatırlamak gittikçe zorlaşıyor. Basit bir çözüm var.",
      date: "2026-02-17",
      readTime: "4 dk",
      content: [
        { p: "Küçük bir işletme yürütüyorsan WhatsApp muhtemelen en çok kullandığın satış kanalı. Ama bir noktadan sonra sohbet listesi öyle kalabalıklaşıyor ki, üç gün önce sipariş veren müşteriyi bulmak bile vakit alıyor. Kim ne istemişti, kim ödeme yapmıştı, kim hâlâ cevap bekliyordu — hepsi kafada tutulmaya çalışılıyor." },
        { p: "Bunu çözmenin en pratik yolu, WhatsApp'ta konuştuğun kişiyi anında, adı-telefonu-notuyla bir yere kaydetmek — sohbeti kaydırıp bulmaya çalışmak yerine. Kimin ne aşamada olduğunu bir not düşerek hatırlıyorsun, aramaya vakit kaybetmiyorsun." },
        { h2: "Neden ayrı bir CRM programı değil de bu" },
        { p: "Küçük işletmelerin çoğu büyük bir CRM programına ihtiyaç duymuyor, sadece kim kimdi'yi hatırlamak yeterli oluyor. MineBio'daki kişiler bölümü tam olarak bunun için var: bir müşteriyle konuşurken adını, telefonunu, istersen bir notunu (\"fuarda tanıştık\", \"kırmızı çanta istedi\" gibi) tek ekrandan kaydediyorsun — otomatik telefon rehberine (vCard) düşüyor, dilediğinde tek tıkla WhatsApp'tan sayfanı gönderebiliyorsun." },
        { p: "Karmaşık bir sistem kurmaya çalışmak yerine, zaten kullandığın WhatsApp'ın üzerine basit bir hafıza katmanı eklemek gibi düşünebilirsin." },
        { h2: "Away mode ne işe yarıyor" },
        { p: "Bir de tatildeyken ya da yoğun olduğunda ziyaretçilere bunu belirtmek işe yarıyor — sayfanda 'şu an müsait değilim, şu tarihte dönüyorum' gibi bir not gösterebiliyorsun, böylece müşteri boşuna mesaj atıp cevap beklemiyor." },
      ],
    },
    {
      slug: "kartvizit-qr-kod-ise-yarar-mi",
      title: "Kartvizite QR kod koymak gerçekten işe yarıyor mu",
      description:
        "QR kodlu kartvizitler moda oldu ama çoğu kullanılmıyor. Fark, kodun nereye götürdüğünde.",
      date: "2026-02-24",
      readTime: "3 dk",
      content: [
        { p: "QR kodlu kartvizitler son birkaç yıldır yaygınlaştı, ama çoğu insanın deneyimi hayal kırıklığı: kodu okutuyorsun, karşına ya boş bir sayfa ya da hiç güncellenmemiş bir web sitesi çıkıyor. Sorun QR kodda değil, kodun götürdüğü yerde." },
        { p: "Bir kartvizit alışverişinde insanların sabrı çok kısa. Kodu okutup üç saniye içinde 'bu kişi kim, ne yapıyor, nasıl ulaşırım' sorularının cevabını bulamıyorsa, o kartvizit çekmeceye kalkıyor." },
        { h2: "Neyi doğru yapmak gerekiyor" },
        { p: "QR kodun götürdüğü sayfa hızlı açılmalı, mobilde düzgün görünmeli ve en üstte kim olduğun net yazmalı. Bizim MineBio'da yaptığımız gibi, kodun ortasına kendi fotoğrafını koymak da işe yarıyor — karşındaki kişi kodu okutmadan önce bile kimin kartviziti olduğunu tahmin edebiliyor." },
        { p: "Bir başka detay: sayfanın rehbere kaydet özelliği olması. Yani kişi kodu okuttuğunda sadece bir sayfa açılmıyor, isterse seni tek dokunuşla telefonuna gerçek bir kişi olarak kaydedebiliyor. Bu, klasik kartvizitin asla yapamadığı bir şey." },
      ],
    },
    {
      slug: "serbest-calisanlar-icin-tanitim-sayfasi",
      title: "Serbest çalışanlar ve danışmanlar için sade bir tanıtım sayfası nasıl olmalı",
      description:
        "Portföyünü, CV'ni ve randevu linkini tek yerde toplamak, kendi işini yürüten herkes için işe yarıyor.",
      date: "2026-03-03",
      readTime: "4 dk",
      content: [
        { p: "Serbest çalışıyorsan ya da danışmanlık yapıyorsan, seni tanımak isteyen biri genelde şu üç şeyi arıyor: ne yaptığını, daha önce ne iş çıkardığını, ve nasıl iletişime geçebileceğini. Bunları LinkedIn'de, ayrı bir portföy sitesinde, bir de e-postanda dağınık tutmak yerine tek sayfada toplamak işini kolaylaştırıyor." },
        { p: "Burada abartıya kaçmamak önemli. Uzun bir CV yerine, üç dört net bağlantı yeterli: LinkedIn profilin, varsa portföyün, randevu alma linkin. Sayfanın sade kalması, ziyaretçinin kafasının karışmaması demek." },
        { h2: "Randevu linkinin önemi" },
        { p: "Danışmanlık işinde en çok zaman kaybettiren şey, uygun saati bulana kadar gidip gelen mesajlar. Sayfanda doğrudan bir randevu alma linki olması, bu gidiş gelişi ortadan kaldırıyor — ilgilenen kişi senin müsait olduğun saatlerden birini seçip anında ayarlıyor." },
        { p: "Bunun yanında bir iletişim formu da işe yarıyor: her zaman WhatsApp numaranı paylaşmak istemeyebilirsin, form üzerinden gelen mesajları panelinden okuyup istediğin zaman yanıtlayabilirsin." },
      ],
    },
    {
      slug: "sayfani-kim-ziyaret-etti",
      title: "Sayfanı kimin ziyaret ettiğini bilmek neden önemli",
      description:
        "Kaç kişinin baktığını ve hangi linke tıkladığını bilmek, işini nereye odaklaman gerektiğini gösteriyor.",
      date: "2026-03-10",
      readTime: "3 dk",
      content: [
        { p: "Bir bağlantı sayfası kurduktan sonra çoğu kişi onu bir kere ayarlayıp unutuyor. Oysa asıl değerli olan kısım, sayfa yayına girdikten sonra ne olduğunu görebilmek: kaç kişi baktı, hangi linke tıkladı, hangi gün daha çok ilgi gördü." },
        { p: "Bu veriler olmadan, hangi bağlantının işe yaradığını sadece tahmin edebiliyorsun. Oysa gerçek rakamları görünce çoğu zaman şaşırıyorsun — beklediğin link değil, aklına bile gelmeyen bir bağlantı en çok tıklananlardan çıkabiliyor." },
        { h2: "Bunu nasıl kullanmalı" },
        { p: "En çok tıklanan linki sayfanın daha üstüne taşımak, mantıklı bir ilk adım. Ama bundan daha önemlisi, hangi kanaldan (Instagram bio'n mu, kartvizit mi, WhatsApp durumun mu) sayfana daha çok ziyaretçi geldiğini fark etmek — çünkü bu, hangi kanala daha çok zaman ayırman gerektiğini gösteriyor." },
        { p: "MineBio'da bu rakamları panelinden anlık görebiliyorsun; karmaşık bir analitik aracı kurmana gerek kalmadan, kaç görüntülenme ve tıklama olduğunu net şekilde takip edebiliyorsun." },
      ],
    },
    {
      slug: "ajanslar-icin-tek-sayfa",
      title: "Ajansların müşteri sunumlarında tek link kullanması neden işe yarıyor",
      description:
        "Bir ajans birden fazla hizmet, birden fazla referans, birden fazla iletişim kanalı yönetiyor. Bunları tek sayfada toplamak toplantılarda zaman kazandırıyor.",
      date: "2026-03-17",
      readTime: "4 dk",
      content: [
        { p: "Bir ajans çalıştırıyorsan, muhtemelen sunumlarında hep aynı şeyi tekrarlıyorsun: portföyümüz burada, referanslarımız burada, iletişim için buradan ulaşın. Her yeni müşteri görüşmesinde bunları ayrı ayrı bulup paylaşmak, özellikle birden fazla kişi aynı anda sunum hazırlıyorsa, karmaşaya dönüşüyor." },
        { p: "Tüm bunları tek bir sayfada toplayıp, bu linki e-posta imzasına, teklif dosyasının en altına, LinkedIn profiline koymak işi basitleştiriyor. Potansiyel müşteri o linke tıkladığında hem kim olduğunuzu hem daha önce ne yaptığınızı hem de nasıl ulaşacağını tek yerde görüyor." },
        { h2: "Ekip içinde tutarlılık sağlamak" },
        { p: "Ajanslarda genelde birden fazla kişi müşteriyle iletişime geçiyor — hesap yöneticisi, kreatif ekip, satış tarafı. Herkesin aynı, güncel linki paylaşması, farklı kişilerin farklı (ve bazen eski) bilgiler vermesinin önüne geçiyor." },
        { p: "Bir bilgi güncellendiğinde (yeni bir referans eklendiğinde, bir hizmet kaldırıldığında) tek yerden düzenleyip herkesin aynı güncel sayfayı paylaşmasını sağlamak, ayrı ayrı dosyalar göndermekten çok daha az hataya açık." },
      ],
    },
    {
      slug: "hizmet-sektoru-randevu-sayfasi",
      cover: "/blog/hizmet-sektoru.jpg",
      title: "Kuaför, güzellik salonu ve benzeri işletmeler için randevu odaklı bir sayfa",
      description:
        "Müşterinin asıl istediği şey genelde tek bir şey: randevu almak. Sayfanın buna göre kurulması fark yaratıyor.",
      date: "2026-03-24",
      readTime: "3 dk",
      content: [
        { p: "Kuaför, güzellik salonu, masaj salonu gibi randevuyla çalışan bir işletmen varsa, sayfana gelen ziyaretçinin aklında genelde tek bir soru var: nasıl randevu alırım. Instagram'da fotoğraflarını beğenmiş olabilir, ama asıl istediği adım bu." },
        { p: "Bu yüzden böyle bir işletme için sayfanın en üstünde randevu alma linkinin veya WhatsApp'tan yazma seçeneğinin olması, aşağıda uzun bir hizmet listesi olmasından daha önemli. Ziyaretçi kafasında soru işaretiyle gezmemeli." },
        { h2: "Konum ve çalışma saatleri" },
        { p: "Fiziksel bir mekânın varsa, konum bilgisinin ve çalışma saatlerinin de sayfada net görünmesi işe yarıyor — özellikle yeni bir müşteri ilk kez geliyorsa. Away mode özelliği de burada devreye giriyor: tatildeysen ya da o gün kapalıysan, bunu sayfanda belirtmek gereksiz mesajların önüne geçiyor." },
        { p: "Rehbere kaydet özelliği de bu tür işletmeler için özellikle işe yarıyor — bir müşteri bir kere geldiyse, telefonuna kaydedip bir dahaki sefere direkt aramasını sağlıyorsun." },
      ],
    },
    {
      slug: "emlak-danismanlari-icin-sayfa",
      cover: "/blog/emlak.jpg",
      title: "Emlak danışmanları için ilan, referans ve iletişimi tek yerde toplamak",
      description:
        "Bir emlak danışmanının kartvizitinde olması gereken şeyler çoğu zaman bir karta sığmıyor. Çözüm, kartın arkasına bir link koymak.",
      date: "2026-03-31",
      readTime: "4 dk",
      content: [
        { p: "Emlak danışmanlığında güven çok önemli bir faktör — insanlar hayatlarının en büyük kararlarından birini verirken kiminle çalıştığını bilmek istiyor. Kartvizit üzerinde sadece isim ve telefon numarası yeterli gelmiyor artık." },
        { p: "İlan listeni, daha önce sattığın veya kiraladığın gayrimenkullerden örnekleri, müşteri yorumlarını ve doğrudan WhatsApp'tan ulaşma seçeneğini tek sayfada toplamak, bir açık ev ziyaretinde ya da ilk görüşmede güven inşa etmeyi kolaylaştırıyor." },
        { h2: "QR kodun burada özellikle işe yaradığı yer" },
        { p: "Bir açık ev ziyaretinde ya da tabelada QR kod kullanmak, klasik kartvizit dağıtmaktan daha etkili olabiliyor — ziyaretçi kodu okutup anında güncel ilan listesine ve iletişim bilgilerine ulaşıyor, kartviziti kaybetme veya çekmecede unutma riski olmuyor." },
        { p: "Sayfanın çok dilli olması da bir avantaj — özellikle yabancı yatırımcılarla çalışıyorsan, aynı sayfanın Türkçe ve İngilizce halini aynı linkte sunabiliyorsun." },
      ],
    },
    {
      slug: "restoran-kafe-tek-sayfa",
      cover: "/blog/restoran-kafe.jpg",
      title: "Restoran ve kafeler için menü, konum ve rezervasyonu tek linkte toplamak",
      description:
        "Bir restoranın Instagram'ından gelen ziyaretçi genelde üç şeyi arıyor: menü, konum, rezervasyon. Hepsini tek yere koymak işi kolaylaştırıyor.",
      date: "2026-04-07",
      readTime: "3 dk",
      content: [
        { p: "Bir restoran ya da kafe işletiyorsan, Instagram hesabın muhtemelen en aktif tanıtım kanalın. Ama oradan gelen biri genelde üç şeyden birini arıyor: güncel menü, konum bilgisi, ya da rezervasyon yapma yolu. Bunları ayrı ayrı yorumlarda ya da hikayelerde aratmak yerine tek bir sayfada toplamak mantıklı." },
        { p: "Menünün PDF olarak bir yere yüklenip linkinin paylaşılması, konum linkinin harita uygulamasına direkt açılması, WhatsApp'tan rezervasyon alınması — bunların hepsi tek sayfada, tek dokunuşla erişilebilir olmalı." },
        { h2: "Kampanya döneminde işe yarayan kısmı" },
        { p: "Yeni bir kampanya başlattığında (özel gün menüsü, indirimli saat vb.) Instagram bio'nu değiştirmek yerine sadece sayfandaki linkleri güncellemen yeterli oluyor — bio linkin hep aynı kalıyor, içeriği sen değiştiriyorsun." },
        { p: "Hangi linkin daha çok tıklandığını görmek burada da işe yarıyor: menüye mi, rezervasyona mı, konuma mı daha çok ilgi var — bu da neyi öne çıkarman gerektiğini gösteriyor." },
      ],
    },
  ],
  en: [
    {
      slug: "instagram-bio-tek-link-sorunu",
      cover: "/blog/instagram-bio.jpg",
      title: "Why your Instagram bio only lets you post one link — and what to do about it",
      description:
        "You've got one link slot on Instagram and a dozen things you want people to see. Here's how we ended up solving it.",
      date: "2026-02-03",
      readTime: "4 min",
      content: [
        { p: "Instagram's rule is simple: one link in your bio. Real business isn't that simple — you've got a shop, maybe a website too, you take orders over WhatsApp, and there's a campaign page you want people to see this month. Try to squeeze all of that into one link and you either rewrite your bio every week or drop the link that actually matters." },
        { p: "We ran into this ourselves before building anything — one shop on a marketplace, one on our own site, and no way to point people at both at once. The fix turns out to be simple: put one link in your bio, and let that link open a page with as many links as you actually need." },
        { h2: "So what goes on that page" },
        { p: "The real challenge is keeping that page from turning into clutter. A visitor should know who you are, what you sell, and where to click within a few seconds. Order matters here — put whatever you most want clicked at the top, everything else below it." },
        { p: "In MineBio you can reorder links from your dashboard, and you can see click counts per link, so over time you're not guessing at the right order — you're adjusting based on what people actually click." },
        { h2: "Set it once, then forget it" },
        { p: "The real payoff is that you set your bio link once. Every time a campaign changes or you open a new social account, you update the page — your Instagram bio itself never needs to change again." },
      ],
    },
    {
      slug: "trendyol-hepsiburada-instagram-tek-sayfa",
      title: "Bringing your marketplace shops and Instagram store together in one place",
      description:
        "If you sell across more than one marketplace, giving customers one place to find all of it saves everyone time.",
      date: "2026-02-10",
      readTime: "5 min",
      content: [
        { p: "If you sell on more than one marketplace, this will sound familiar: someone likes a product on Instagram, but you actually sell it through a marketplace listing, and some other items only exist on a different platform entirely. Repeating the right link to every single customer, one DM at a time, wastes a lot of your day." },
        { p: "It's a lot simpler to put every storefront, your own website, and your social accounts on one page, then use that single link everywhere — your business card, your Instagram bio, your WhatsApp status." },
        { h2: "Which platform should lead" },
        { p: "You do have to make a call here: whichever platform brings you the most sales should sit at the top. In MineBio we group marketplace links into their own section, so a visitor can immediately tell what's a marketplace listing and what isn't — nothing gets confusing." },
        { p: "It's also worth remembering some customers know your brand directly, not through a marketplace — so your own site or social accounts shouldn't get buried under a wall of marketplace links either." },
        { h2: "Tracking clicks changes how you think about it" },
        { p: "Seeing how many clicks each marketplace link actually gets is genuinely useful data — if one platform is pulling noticeably more interest than another, you can put your time and ad budget where it's actually working. We track this live on the dashboard, and most sellers are surprised the first time they look — the platform they assumed was winning usually isn't." },
      ],
    },
    {
      slug: "whatsapp-musteri-takip",
      title: "Not losing track of customers who message you on WhatsApp",
      description:
        "Once you're chatting with dozens of customers on WhatsApp, remembering who ordered what gets hard fast. There's a simple fix.",
      date: "2026-02-17",
      readTime: "4 min",
      content: [
        { p: "If you're running a small business, WhatsApp is probably your busiest sales channel. But past a certain point your chat list turns into a blur — finding the customer who ordered three days ago takes longer than it should. Who asked for what, who already paid, who's still waiting on a reply: it all ends up living in your head." },
        { p: "The simplest fix is jotting the person down the moment you're chatting with them — name, number, a quick note — instead of scrolling back through the conversation later to piece it together." },
        { h2: "Why not a full CRM" },
        { p: "Most small businesses don't need a heavy CRM system — just a reliable way to remember who's who. That's exactly what the contacts section in MineBio is for: while you're talking to someone, you save their name, number, and an optional note (\"met at the fair\", \"wanted the red bag\") in one screen — it saves straight to a vCard you can add to your phone, and you can message them on WhatsApp with one tap whenever you're ready." },
        { p: "Think of it less as adopting a new system and more as adding a thin memory layer on top of WhatsApp, which you're already using anyway." },
        { h2: "What away mode is for" },
        { p: "It also helps to let visitors know when you're out — a note on your page saying you're away until a certain date means people don't message you and then sit waiting for a reply that isn't coming anytime soon." },
      ],
    },
    {
      slug: "kartvizit-qr-kod-ise-yarar-mi",
      title: "Do QR codes on business cards actually work",
      description:
        "QR-coded business cards became trendy, but most go unused. The difference is where the code actually leads.",
      date: "2026-02-24",
      readTime: "3 min",
      content: [
        { p: "QR codes on business cards have become common over the last few years, but most people's experience with them is disappointing — you scan it and land on either a blank page or a website that hasn't been touched in years. The problem was never the code itself, it's where it leads." },
        { p: "People's patience at a networking event is short. If scanning the code doesn't answer 'who is this, what do they do, how do I reach them' within a few seconds, that card ends up in a drawer." },
        { h2: "What actually makes it work" },
        { p: "The page behind the code needs to load fast, look right on a phone, and make it obvious who you are the moment it opens. Putting your own photo in the middle of the QR code itself helps too — the way we do it in MineBio — so people can often guess whose card it is before they even scan it." },
        { p: "One more detail worth having: a 'save to contacts' button on the page. So scanning the code doesn't just open a page — the person can save you as a real contact on their phone in one tap, something a paper card was never able to do." },
      ],
    },
    {
      slug: "serbest-calisanlar-icin-tanitim-sayfasi",
      title: "What a simple profile page should look like for freelancers and consultants",
      description:
        "Bringing your portfolio, resume, and booking link together in one place works for anyone running their own thing.",
      date: "2026-03-03",
      readTime: "4 min",
      content: [
        { p: "If you freelance or consult, anyone trying to get a sense of you is usually after three things: what you do, what you've done before, and how to reach you. Keeping those scattered across LinkedIn, a separate portfolio site, and an email signature makes people work harder than they should have to." },
        { p: "It helps to resist the urge to over-explain here. Instead of a long resume, three or four clear links are usually enough: your LinkedIn, your portfolio if you have one, and a way to book time with you. A page that stays simple is a page that doesn't confuse anyone." },
        { h2: "Why a booking link matters" },
        { p: "The biggest time sink in consulting work is the back-and-forth just to land on a time that works. Having a booking link right on your page removes that entirely — someone interested picks an open slot and it's set, no messages required." },
        { p: "A contact form helps too — you won't always want to hand out your WhatsApp number, and a form lets messages land in your dashboard where you can reply on your own time." },
      ],
    },
    {
      slug: "sayfani-kim-ziyaret-etti",
      title: "Why it matters to know who's actually visiting your page",
      description:
        "Knowing how many people looked and what they clicked tells you where to actually put your attention.",
      date: "2026-03-10",
      readTime: "3 min",
      content: [
        { p: "Most people set up a link page once and never look at it again. But the part that's actually worth paying attention to is what happens after it goes live — how many people looked, what they clicked, which days brought more traffic than others." },
        { p: "Without that, you're guessing at what's working. Once you see the real numbers, they're often surprising — the link you assumed people wanted often isn't the one getting clicked the most." },
        { h2: "What to do with it" },
        { p: "Moving your most-clicked link higher up the page is an obvious first step. What matters more, though, is noticing which channel — your Instagram bio, your business card, your WhatsApp status — is actually sending people your way, since that tells you where to spend more of your time." },
        { p: "You can see these numbers live from the MineBio dashboard, no separate analytics tool required — just a clear read on views and clicks as they happen." },
      ],
    },
    {
      slug: "ajanslar-icin-tek-sayfa",
      title: "Why agencies putting one link in client decks actually works",
      description:
        "An agency juggles several services, several case studies, and several ways to get in touch. Keeping it on one page saves time in meetings.",
      date: "2026-03-17",
      readTime: "4 min",
      content: [
        { p: "If you run an agency, you're probably repeating the same thing in every pitch: here's our portfolio, here are our case studies, here's how to reach us. Digging those up separately for every new client conversation gets messy fast, especially once more than one person on the team is building decks." },
        { p: "Putting all of it on one page and dropping that link into your email signature, the last slide of a proposal, or your LinkedIn profile simplifies things. A prospect clicking that link sees who you are, what you've done, and how to reach you, all in one place." },
        { h2: "Keeping the team consistent" },
        { p: "Agencies usually have more than one person talking to a client — account manager, creative lead, sales. Everyone sharing the same, current link means you don't end up with different people handing out different, sometimes outdated, information." },
        { p: "When something changes — a new case study goes up, a service gets dropped — you update it in one place, and everyone's sharing the same current page instead of sending out separate files." },
      ],
    },
    {
      slug: "hizmet-sektoru-randevu-sayfasi",
      cover: "/blog/hizmet-sektoru.jpg",
      title: "A booking-first page for salons and similar businesses",
      description:
        "What a visitor usually wants is one specific thing: to book an appointment. Building the page around that makes the difference.",
      date: "2026-03-24",
      readTime: "3 min",
      content: [
        { p: "If you run a hair salon, a beauty studio, or anything else that runs on appointments, whoever lands on your page usually has one question in mind: how do I book. They might have liked your photos on Instagram, but that's the step they actually want." },
        { p: "That's why the booking link — or a direct way to message you on WhatsApp — matters more at the top of the page than a long list of services further down. A visitor shouldn't have to hunt for it." },
        { h2: "Location and hours" },
        { p: "If you have a physical space, having your location and hours clearly visible helps too, especially for a first-time visitor. Away mode is useful here as well — if you're closed or on holiday, saying so on the page heads off messages you'd otherwise have to answer later." },
        { p: "Save-to-contacts matters for this kind of business specifically — once someone's been in once, they can save you to their phone and just call directly next time." },
      ],
    },
    {
      slug: "emlak-danismanlari-icin-sayfa",
      cover: "/blog/emlak.jpg",
      title: "Bringing listings, references, and contact together for real estate agents",
      description:
        "Everything a real estate agent's card should say usually doesn't fit on a card. The fix is putting a link on the back of it.",
      date: "2026-03-31",
      readTime: "4 min",
      content: [
        { p: "Trust matters a lot in real estate — people are making one of the biggest decisions of their lives and want to know who they're working with. A name and a phone number on a card doesn't really cut it anymore." },
        { p: "Putting your current listings, examples of homes you've sold or rented before, client reviews, and a direct WhatsApp option on one page makes it a lot easier to build trust during an open house or a first meeting." },
        { h2: "Where the QR code specifically helps" },
        { p: "Using a QR code at an open house or on a sign can work better than handing out a paper card — a visitor scans it and lands straight on your current listings and contact info, with no risk of the card getting lost or forgotten in a drawer." },
        { p: "Having the page available in more than one language helps too, especially if you work with foreign buyers — you can offer the same page in Turkish and English under one link." },
      ],
    },
    {
      slug: "restoran-kafe-tek-sayfa",
      cover: "/blog/restoran-kafe.jpg",
      title: "Bringing your menu, location, and reservations together for restaurants and cafes",
      description:
        "Someone landing on a restaurant's page from Instagram is usually after one of three things: the menu, the location, or a way to book a table.",
      date: "2026-04-07",
      readTime: "3 min",
      content: [
        { p: "If you run a restaurant or cafe, Instagram is probably your busiest promotional channel. But someone coming from there is usually after one of three things: the current menu, your location, or a way to reserve a table. Making them dig through comments or old stories for any of that is a bad start." },
        { p: "A menu you can link to as a PDF, a location link that opens straight into a maps app, and a way to book through WhatsApp — all of that should sit on one page, reachable in one tap." },
        { h2: "What helps during a promotion" },
        { p: "When you launch a new promotion — a holiday menu, a happy hour — you don't need to touch your Instagram bio at all. You just update the links on your page; the bio link itself never changes." },
        { p: "Seeing which link gets clicked more helps here too — the menu, the reservation link, or the location — and that tells you what to put front and center." },
      ],
    },
  ],
};

export function getPost(lang, slug) {
  return posts[lang]?.find((p) => p.slug === slug) || null;
}
