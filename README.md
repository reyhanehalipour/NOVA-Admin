# NOVA Admin

NOVA Admin یک داشبورد مدیریت (Admin Dashboard) با React و TypeScript است که برای چالش فنی استخدامی Frontend Developer در سطح Mid-Level توسعه یافته است. این پروژه شامل ورود کاربران، مدیریت محصولات و کاربران، داشبورد با آمار، پشتیبانی دو زبانه، و تغییر تم روشن و تاریک می‌باشد.

قابلیت‌های اصلی پروژه عبارتند از:

- ورود کاربران و مدیریت وضعیت Authentication
- محافظت از صفحات مدیریتی با Protected Routes
- داشبورد با نمایش تعداد کل محصولات و کاربران
- مشاهده لیست محصولات و جست‌وجوی آن‌ها
- ایجاد محصول جدید
- مشاهده لیست کاربران و جست‌وجوی آن‌ها
- ایجاد کاربر جدید
- مدیریت فرم‌ها با Formik و Yup
- مدیریت State با Redux Toolkit
- پشتیبانی از زبان فارسی و انگلیسی
- پشتیبانی از RTL (فارسی) و LTR (انگلیسی)
- تغییر تم Light و Dark
- ذخیره تنظیمات زبان و تم در localStorage
- نمایش حالت‌های Loading، Error و Empty State در صفحات

---

## امکانات پروژه (Features)

| قابلیت | توضیح |
|--------|-------|
| ورود کاربران | صفحه ورود با اعتبارسنجی Formik/Yup و ارسال credentialها به API |
| مدیریت Authentication | ذخیره توکن در localStorage، بررسی وضعیت لاگین، خروج از سیستم |
| Protected Routes | صفحات مدیریتی فقط برای کاربران لاگین‌شده در دسترسند؛ در غیر این صورت به صفحه ورود هدایت می‌شوند |
| داشبورد | نمایش تعداد محصولات و کاربران در کارت‌های آماری، لینک سریع به صفحات محصولات و کاربران |
| مدیریت محصولات | نمایش لیست محصولات در جدول، جست‌وجوی محصولات بر اساس عنوان و دسته‌بندی، ایجاد محصول جدید |
| مدیریت کاربران | نمایش لیست کاربران در جدول، جست‌وجوی کاربران بر اساس نام، نام کاربری و ایمیل، ایجاد کاربر جدید |
| مدیریت فرم‌ها | اعتبارسنجی ورودی‌ها با Yup و کنترل فرم با Formik |
| مدیریت State | Redux Toolkit با Sliceهای جداگانه برای auth، products و users |
| پشتیبانی دو زبانه | زبان فارسی و انگلیسی با دکشنری جداگانه و تغییر فوری بدون reload |
| پشتیبانی RTL/LTR | تغییر خودکار `dir` و `lang` در `<html>` بر اساس زبان انتخاب‌شده |
| تم روشن و تاریک | تغییر تم Light و Dark با دکمه در هدر، persistence در localStorage |
| ذخیره تنظیمات | زبان و تم پس از refresh صفحه حفظ می‌شوند |
| وضعیت‌های UI | نمایش Loading، Error و Empty State در صفحات لیست و داشبورد |

---

## تکنولوژی‌های استفاده‌شده (Tech Stack)

نسخه‌های زیر مستقیماً از `package.json` استخراج شده‌اند.

| تکنولوژی | نسخه | کاربرد در پروژه |
|-----------|------|-----------------|
| React | ^19.3.1 | کتابخانه huvud برای ساخت رابط کاربری |
| Vite | ^8.3.6 | ابزار ساخت و سرور توسعه (dev server) |
| TypeScript | ~7.0.2 | زبان برنامه‌نویسی با contrôle نوع (type safety) |
| Redux Toolkit | ^2.14.0 | مدیریت حالت جهانی برنامه (global state) |
| React Redux | ^9.3.1 | اتصال Redux به React |
| Axios | ^1.21.0 | ارسال درخواست‌های HTTP به API |
| Styled Components | ^6.6.0 | استایل‌دهی کامپوننت‌ها با پشتیبانی از تم |
| Formik | ^2.4.9 | مدیریت فرم‌ها |
| Yup | ^1.7.1 | اعتبارسنجی Schema برای فرم‌ها |
| React Router DOM | ^7.18.5 | مسیرگذاری (Routing) در برنامه |

---

## پیش‌نیازها (Prerequisites)

برای اجرا و توسعه این پروژه نیاز به ابزارهای زیر دارید:

- Node.js
- npm
- Git

---

## نصب و اجرای پروژه (Getting Started)

دستورهای زیر را به ترتیب اجرا کنید:

```bash
# ۱. کلون کردن ریپازیتوری
git clone https://github.com/reyhanehalipour/NOVA-Admin.git
cd NOVA-Admin

# ۲. نصب وابستگی‌ها
npm install

# ۳. آماده‌سازی متغیرهای محیطی
cp .env.example .env

# ۴. اجرای سرور توسعه
npm run dev

# ۵. ساخت نسخهproduction (در صورت نیاز)
npm run build
```

پس از اجرای `npm run dev`، برنامه در آدرس `http://localhost:5173` در دسترس خواهد بود (پورت پیش‌فرض Vite).

---

## متغیرهای محیطی (Environment Variables)

فایل `.env.example` در ریشه پروژه حاوی متغیر زیر است:

```
VITE_API_BASE_URL=https://fakestoreapi.com
```

- **VITE_API_BASE_URL**: آدرس پایه API که درخواست‌های Axios به آن ارسال می‌شوند. مقدار فعلی FakeStoreAPI است.
- برای اجرا محلی، فایل `.env.example` را کپی کرده و به `.env` تغییر نام دهید.
- فایل `.env` حاوی اطلاعات حساس نباید در Git کامیت شود.
- متغیرهایی که با پیشوند `VITE_` شروع می‌شوند، در سمت کلاینت قابل مشاهده هستند و محلی نگهدارنده secret نیستند.

---

## ساختار پروژه (Project Structure)

ساختار پوشه‌های `src` به شرح زیر است:

```text
src/
├── App.tsx                      # ریشه برنامه، envolve کردن MainRoutes با BrowserRouter
├── main.tsx                     # نقطه ورودی برنامه، رندر ریشه با Redux Provider و Theme/Language Providers
├── style.css                    # استایل‌های پایه CSS
├── assets/
│   ├── Fonts/                   # فونت‌های پروژه (خالی)
│   ├── Icons/                   # آیکون‌های پروژه (خالی)
│   └── Images/                  # تصاویر پروژه (خالی)
├── Components/                  # کامپوننت‌های قابل استفاده مجدد (خالی)
├── Dictionary/
│   ├── index.ts                 # exported:getDictionary برای دریافت دکشنری بر اساس زبان
│   ├── LanguageContext.ts       # Context و hook useLanguage برای دسترسی به دکشنری
│   ├── LanguageProvider.tsx     # provider زبان با persistence در localStorage و تنظیم dir/lang
│   ├── dictionary.types.ts      # نوع Dictionary بر اساس faDictionary
│   ├── fa.ts                    # دکشنری فارسی (۸۱ کلید)
│   └── en.ts                    # دکشنری انگلیسی (۸۳ کلید)
├── Modals/                      # ماژول‌های/modal (خالی)
├── Pages/
│   ├── Login/
│   │   └── Login.tsx            # صفحه ورود با Formik/Yup و اعتبارسنجی
│   ├── Dashboard/
│   │   └── Dashboard.tsx        # داشبورد با کارت‌های آماری محصولات و کاربران
│   ├── Products/
│   │   ├── ProductsList.tsx     # لیست محصولات با جست‌وجو، جدول و وضعیت‌های UI
│   │   └── CreateProduct/
│   │       └── CreateProduct.tsx # فرم ایجاد محصول جدید با Formik/Yup
│   └── Users/
│       ├── UsersList.tsx        # لیست کاربران با جست‌وجو، جدول و وضعیت‌های UI
│       └── CreateUser/
│           └── CreateUser.tsx   # فرم ایجاد کاربر جدید با Formik/Yup
├── Redux/
│   ├── index.ts                 # Export store و प्रकारها
│   ├── hooks.ts                 # hookهای تایپ شده useAppDispatch و useAppSelector
│   ├── store.ts                 # ConfigureStore با سه reducer: auth, products, users
│   ├── auth/
│   │   └── authSlice.ts         # مدیریت وضعیت احراز هویت، 토کن، login/logout thunkها
│   ├── products/
│   │   └── productsSlice.ts     # مدیریت状態 محصولات، fetch/create thunkها
│   └── users/
│       └── usersSlice.ts        # مدیریت状態 کاربران، fetch/create thunkها
├── Routes/
│   ├── MainRoutes.tsx           # تعریف تمام مسیرها و نقشه‌همانی صفحه به کامپوننت
│   ├── appRoutes.tsx            # ثابت‌های مسیر (ROUTES) و لیست appRoutes با ProtectedRoute
│   └── ProtectedRoute.tsx       # محافظت از مسیرهای مدیریتی، بازneshانی به Login در صورت عدم احراز هویت
├── Shared/
│   ├── layout/
│   │   ├── index.ts             # Export AdminLayout, Sidebar, Header
│   │   ├── AdminLayout.tsx      # چیدمان کلی با Sidebar، هدر وOutlet
│   │   ├── Header.tsx           # هدر با دکمه تم، زبان، خروج و عنوان صفحه جار břez مسیر
│   │   └── Sidebar.tsx          // سایدبار با لینک‌های داشبورد، محصولات و کاربران (active state)
│   └── theme/
│       ├── index.ts             # Export قالب‌ها، توکن‌ها و GlobalStyle
│       ├── theme.types.ts       # تعريف interfaceهای Theme، ThemeColors، ThemeSpacing و...
│       ├── theme.tokens.ts      # توکن‌های مشترک (فاصله و حاشیه‌پای)
│       ├── light.theme.ts       # قالب روشن (رنگ‌های پس‌زمینه، متن، border و...)
│       ├── dark.theme.ts        # قالب تاریک (رنگ‌های پس‌زمینه، متن، border و...)
│       ├── GlobalStyle.ts       # استایل‌های سراسری با createGlobalStyle
│       └── ThemeProvider.tsx    # provider تم با persistence در localStorage
├── Storage/
│   └── tokenStorage.ts          # توابع getToken/setToken/removeToken با localStorage
├── types/
│   ├── Enums/
│   │   └── Language.enum.ts     # تعریف زبان‌هایupported (fa, en)
│   ├── auth.types.ts            # LoginCredentials و AuthResponse
│   ├── product.types.ts         # Product، Rating و CreateProductInput
│   └── user.types.ts            # Name، User و CreateUserInput
├── Utils/
│   ├── api/
│   │   └── axiosInstance.ts     # نمونه مرکزی Axios با Base URL از متغیر محیطی
│   └── services/
│       ├── auth.service.ts      # سرویس احراز هویت (POST /auth/login)
│       ├── product.service.ts   # سرویس محصولات (GET/POST /products)
│       └── user.service.ts      # سرویس کاربران (GET/POST /users)
└── Validations/                 # پوشه اعتبارسنجی (در حال حاضر خالی؛ اعتبارسنجی‌های در همان صفحات با Yup تعریف شده‌اند)
```

---

## یکپارچه‌سازی API (API Integration)

این پروژه از **FakeStoreAPI** به عنوان backend آزمایشی استفاده می‌کند.

### Endpointها

| العملية | متد | Endpoint | توضیح |
|---------|-----|----------|-------|
| ورود | `POST` | `/auth/login` | احراز هویت کاربر و دریافت توکن |
| دریافت محصولات | `GET` | `/products` | دریافت لیست محصولات |
| ایجاد محصول | `POST` | `/products` | ایجاد یک محصول جدید |
| دریافت کاربران | `GET` | `/users` | دریافت لیست کاربران |
| ایجاد کاربر | `POST` | `/users` | ایجاد یک کاربر جدید |

### Architektur اتصال به API

- تمام درخواست‌ها از طریق `axiosInstance` در `src/Utils/api/axiosInstance.ts` ارسال می‌شوند.
- `baseURL` از متغیر محیطی `VITE_API_BASE_URL` خوانده می‌شود.
- هر源 (product, user, auth) دارای فایل service جداگانه در `src/Utils/services/` است که مسئول فراخوانی endpointهای مربوطه است.
- پاسخ‌های API در لایه Redux (sliceها) مدیریت می‌شوند و کامپوننت‌ها فقط از `useAppSelector` استفاده می‌کنند.

### محدودیت مهم FakeStoreAPI

در عملیات `POST` (ایجاد محصول یا کاربر)، پاسخ موفقیت‌آمیز از سمت API به معنای ذخیره دائمی اطلاعات در سرور نیست. در این پروژه، آیتم ایجادشده پس از دریافت پاسخ موفق بلافاصله به لیست Redux اضافه می‌شود تا نتیجه در رابط کاربری نمایش داده شود؛ اما ممکن است پس از refresh صفحه از بین برود، چون FakeStoreAPI تغییرات را پایدار نمی‌کند.

---

## تصمیمات فنی و معماری (Technical Decisions)

### ۱. Redux Toolkit

Redux Toolkit برای مدیریت حالت جهانی برنامه انتخاب شده است. Store شامل سه Slice است:

- **auth**: مدیریت توکن، وضعیت لاگین، خطا و thunkهای ورود/خروج.
- **products**: مدیریت لیست محصولات، وضعیت بارگذاری (fetchStatus)، وضعیت ایجاد (createStatus) و خطا.
- **users**: مدیریت لیست کاربران، وضعیت بارگذاری، وضعیت ایجاد و خطا.

هر Slice وضعیت‌های `idle`، `loading`، `succeeded` و `failed` را برای درخواست‌های asynchronous پشتیبانی می‌کند.

### ۲. Axios

از یک نمونه مرکزی Axios (`axiosInstance`) استفاده شده است تا `baseURL`، timeout و هدرهای مشترک در یک hely تعریف شوند. سرویس‌های API (auth.service، product.service، user.service) از این نمونه استفاده می‌کنند و لایه UI از طریق Redux به داده‌های آن‌ها دسترسی دارد، بنابراین جداسازی نگرانی‌ها (separation of concerns) حفظ می‌شود.

### ۳. تفکیک Client State و Server State

- **Client State**: زبان، تم، توکن احراز هویت و وضعیت UI (مانند فعال بودن دکمه در هنگام بارگذاری) در Redux و Contextها مدیریت می‌شوند.
- **Server State**: لیست محصولات و کاربران که از API دریافت می‌شوند، در Redux sliceها نگهداری می‌شوند اما نه به عنوان cache_side server state، بلکه به عنوان client-side mirror از داده‌های سرور.

### ۴. چرا TanStack Query استفاده نشده است؟

با توجه به نیازمندی‌های چالش فنی استخدامی، استفاده از Redux Toolkit و Axios به عنوانStack مشخص شده بود. برای جلوگیری از اضافه کردن وابستگی غیرضروری، TanStack Query به پروژه اضافه نشده است. Redux Toolkit قابلیت مدیریت state مشترک را فراهم می‌کند، امالزوماً تمام ویژگی‌های تخصصی مدیریت server state (مانند caching خودکار، re-fetch در Hintergrund و deduplicate درخواست‌ها) که TanStack Query فراهم می‌کند، را ندارد.

### ۵. TypeScript

تمام کامپوننت‌ها، 토큰ها، reducerها و سرویس‌ها با TypeScript تایپ شده‌اند. از استفاده از `type any` جلوگیری شده است و type safety در کل برنامه حفظ شده است.

### ۶. Styled Components

از styled-components v6 برای استایل‌دهی استفاده شده است. تم روشن و تاریک در فایل‌های جداگانه (`light.theme.ts` و `dark.theme.ts`) تعریف شده و از طریق `ThemeProvider` به کل برنامه اعمال می‌شود. هر کامپوننتStyled از `$theme` برای دسترسی به رنگ‌ها، فاصله‌ها و حاشیه‌پا استفاده می‌کند.

### ۷. Formik و Yup

مدیریت فرم و اعتبارسنجی ورودی‌ها تفکیک شده‌اند: Formik مسئول کنترل状態 فرم و ارسال است و Yup مسئول تعریف schema اعتبارسنجی (مثلاً الزامی بودن فیلد، فرمت ایمیل، حداقل طول رمز عبور و عدد مثبت برای قیمت). اعتبارسنجی در صفحات ورود، ایجاد محصول و ایجاد کاربر اعمال می‌شود.

---

## محدودیت‌ها و نکات (Notes & Limitations)

- این پروژه یک Frontend Technical Challenge است و برای ارزیابی مهارت‌های توسعه‌دهنده در سطح Mid-Level آماده شده است.
- FakeStoreAPI یک API آزمایشی است و رفتار آن لزوماً مشابه یک backend واقعی نیست.
- اطلاعات ایجادشده از طریق POST ممکن است به شکل دائمی در سرور ذخیره نشوند (بیان شده در بخش یکپارچه‌سازی API).
- احراز هویت در این پروژه نباید به عنوان یک راهکار امنیتی production در نظر گرفته شود. امنیت واقعی احراز هویت، مدیریت session و مجوزهای دسترسی نیاز به پیاده‌سازی backend امن دارد.
- پوشه‌های `Components/`، `Modals/` و `Validations/` در حال حاضر خالی هستند (اعتبارسنجی‌ها مستقیماً در صفحات با Yup تعریف شده‌اند).
- فونت و آیکون Custom در پوشه `assets/` قرار ندارند و از فونت‌های سیستم و emoji استفاده شده است.

---

## مجوز (License)

این پروژه برای اهداف آموزشی و ارزیابی استخدامی توسعه یافته است.
