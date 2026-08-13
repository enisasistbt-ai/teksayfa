# MineBio — Kurulum Rehberi

## 1) Supabase tarafı

Supabase projende **SQL Editor**'ü aç, aşağıdaki kodu yapıştırıp çalıştır:

```sql
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  display_name text,
  links jsonb default '[]'::jsonb,
  updated_at timestamptz default now()
);

alter table profiles enable row level security;

-- Kullanıcı sadece kendi profilini okuyup güncelleyebilir
create policy "Kendi profilini okuyabilir"
  on profiles for select
  using (auth.uid() = id);

create policy "Kendi profilini güncelleyebilir"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Kendi profilini değiştirebilir"
  on profiles for update
  using (auth.uid() = id);

-- Herkes (anon dahil) herkese açık profil sayfasını görebilsin
create policy "Herkes profilleri görebilir"
  on profiles for select
  using (true);
```

Sonra **Authentication > URL Configuration** kısmında, sitenin Vercel adresini
(örn. `https://minebio.vercel.app`) "Site URL" ve "Redirect URLs" alanına ekle.

**Project Settings > API** sayfasından şu ikisini kopyala, sonraki adımda lazım olacak:
- `Project URL`
- `anon public` key

## 2) Ortam değişkenleri

`.env.local.example` dosyasını `.env.local` olarak kopyala ve Supabase'den
aldığın değerleri yapıştır (bu dosya sadece yerelde test için — Vercel'de
adım 4'te ayrıca gireceksin).

## 3) GitHub'a yükle

1. GitHub'da yeni, boş bir repo oluştur (örn. `tek-sayfa`).
2. Bu klasördeki tüm dosyaları (`.env.local` HARİÇ) o repoya yükle
   (GitHub web arayüzünde "Add file > Upload files" ile sürükle-bırak yapabilirsin).

## 4) Vercel'e bağla

1. Vercel'de "Add New Project" > GitHub reponu seç.
2. "Environment Variables" kısmına ekle:
   - `NEXT_PUBLIC_SUPABASE_URL` → Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Supabase anon key
3. Deploy'a bas. Birkaç dakika içinde `xxx.vercel.app` adresin hazır olacak.

## 5) Test et

1. Vercel adresine git, "Ücretsiz başla"ya tıkla.
2. E-postanı gir, gelen bağlantıya tıkla.
3. Panelde kullanıcı adı, isim ve linklerini ekle, kaydet.
4. `xxx.vercel.app/kullanici-adin` adresine giderek yayındaki sayfanı gör.
