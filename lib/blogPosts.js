// Blog yazıları — TR ve EN. Her yazı için slug her iki dilde aynı tutuluyor
// ki /blog/[slug] ve /en/blog/[slug] arasında hreflang eşlemesi basit kalsın.

export const posts = {
  tr: [
    {
      slug: "instagram-bio-tek-link-sorunu",
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
        { p: "Bunu çözmenin en pratik yolu, sayfana gelen ziyaretçilerin iletişim bilgilerini otomatik olarak bir listede tutmak. Böylece kiminle ne zaman konuştuğunu, hangi aşamada olduğunu unutmadan takip edebiliyorsun." },
        { h2: "Neden ayrı bir CRM programı değil de bu" },
        { p: "Küçük işletmelerin çoğu büyük bir CRM programına ihtiyaç duymuyor, sadece kim kimdi'yi hatırlamak yeterli oluyor. MineBio'daki kişiler bölümü tam olarak bunun için var: sayfana gelen kişiler otomatik listeye ekleniyor, istersen not düşebiliyorsun, tek tıkla WhatsApp'tan mesaj atabiliyorsun." },
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
  ],
  en: [
    {
      slug: "instagram-bio-tek-link-sorunu",
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
        { p: "The simplest fix is having your page automatically keep a list of the people who reach out to you — a contact, when they reached out, and what stage things are at, without you trying to remember it all." },
        { h2: "Why not a full CRM" },
        { p: "Most small businesses don't need a heavy CRM system — just a reliable way to remember who's who. That's exactly what the contacts section in MineBio is for: people who reach out through your page get added automatically, you can leave yourself a note, and message them on WhatsApp with one tap." },
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
  ],
};

export function getPost(lang, slug) {
  return posts[lang]?.find((p) => p.slug === slug) || null;
}
