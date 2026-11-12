# NOVA Admin

**NOVA Admin** یک داشبورد مدیریت (Admin Dashboard) تک‌صفحه‌ای (SPA) با **React**، **TypeScript** و **Vite** است که برای چالش فنی استخدامی Frontend Developer در سطح Mid-Level پیاده‌سازی شده است. این پروژه چرخه کامل یک پنل مدیریت را پوشش می‌دهد: ورود کاربر، داشبورد آماری، مدیریت محصولات، مدیریت کاربران، جست‌وجو، صفحه‌بندی، تم روشن/تاریک و رابط دوزبانه فارسی/انگلیسی با پشتیبانی RTL/LTR.

داده‌های برنامه از **FakeStoreAPI** دریافت می‌شوند؛ بنابراین این پروژه یک نمونه واقعی از اتصال به API واقعی، مدیریت وضعیت سمت سرور در Redux و رعایت جداسازی لایه‌ها (UI / State / Service / API) است.

## اطلاعات ورود به پنل مدیریت (Demo Credentials)

برای ورود به پنل از اطلاعات زیر استفاده کنید:

**Username**

```text
mor_2314
```

**Password**

```text
83r5^_
```

> این اعتبارنامه متعلق به دموی عمومی FakeStoreAPI است و صرفاً برای اجرای پروژه استفاده می‌شود.
> آدرس API: `https://fakestoreapi.com`

---

## قابلیت‌ها

| قابلیت | جزئیات پیاده‌سازی |
|--------|-------------------|
| احراز هویت | صفحه ورود با Formik/Yup، ارسال `POST /auth/login`، دریافت توکن و ذخیره در `localStorage` |
| مدیریت نشست | بازیابی توکن در شروع برنامه، `logout` با پاک‌سازی توکن و هدایت به `/login` |
| واکنش به 401 | درخواست‌های ناموفق (به‌جز `/auth/login`) با `notifyUnauthorized` باعث خروج خودکار و پاک‌سازی وضعیت می‌شوند |
| Protected Routes | مسیرهای مدیریتی با `ProtectedRoute` محافظت شده‌اند و در صورت عدم احراز هویت به `/login` هدایت می‌شوند |
| داشبورد | دریافت هم‌زمان محصولات و کاربران، نمایش تعداد کل در کارت‌های آماری و دسترسی سریع به دو بخش |
| مدیریت محصولات | جدول محصولات (تصویر، عنوان، قیمت، دسته‌بندی)، جست‌وجو بر اساس عنوان/دسته‌بندی، صفحه‌بندی ۵ ردیفی، ایجاد محصول |
| مدیریت کاربران | جدول کاربران (نام، نام کاربری، ایمیل، تلفن)، جست‌وجو در نام/نام خانوادگی/نام کاربری/ایمیل، صفحه‌بندی ۵ ردیفی، ایجاد کاربر |
| جست‌وجو | فیلتر سمت کلاینت روی داده‌های بارگذاری‌شده، بدون درخواست مجدد به API |
| صفحه‌بندی | هوک `usePagination` و کامپوننت `Pagination` با نمایش بازه `از–تا`، شماره صفحه و جهت فلش‌ها بر اساس زبان |
| تم روشن و تاریک | کلید تغییر تم در سایدبار، ذخیره در `localStorage` کلید `nova_admin_theme` |
| زبان فارسی/انگلیسی | کلید FA/EN در سایدبار، دیکشنری جداگانه (۹۸ کلید) و تغییر فوری بدون reload |
| RTL/LTR | تنظیم `document.documentElement.lang` و `dir` بر اساس زبان انتخابی |
| اعتبارسنجی فرم | Formik + Yup در ورود، ایجاد محصول و ایجاد کاربر؛ پیام خطا از دیکشنری |
| وضعیت‌های UI | Loading، Error همراه با دکمه Retry، Empty و Empty-on-search در صفحات لیست و داشبورد |

---

## تکنولوژی‌های استفاده‌شده

نسخه‌ها مستقیماً از `package.json` استخراج شده‌اند.

| کتابخانه / ابزار | نسخه | نقش در پروژه |
|------------------|-------|----------------|
| React | `^19.3.1` | ساخت رابط کاربری و کامپوننت‌ها |
| React DOM | `^19.3.1` | رندر درخت React در DOM |
| TypeScript | `~7.0.2` | تایپ‌استاتیک در کل پروژه (بدون `any`) |
| Vite | `^8.3.6` | سرور توسعه و باندل production |
| `@vitejs/plugin-react` | `^6.3.0` | پشتیبانی JSX/Fast Refresh در Vite |
| Redux Toolkit | `^2.14.0` | مدیریت state سراسری با Slice و `createAsyncThunk` |
| React Redux | `^9.3.1` | اتصال Store به کامپوننت‌ها (`Provider`، هوک‌های تایپ‌شده) |
| Axios | `^1.21.0` | ارسال درخواست HTTP به API |
| React Router DOM | `^7.18.5` | مسیربندی، `ProtectedRoute` و ناوبری برنامه |
| Styled Components | `^6.6.0` | استایل کامپوننت‌محور متصل به تم |
| Formik | `^2.4.9` | مدیریت state فرم، اعتبارسنجی و ارسال |
| Yup | `^1.7.1` | تعریف schema اعتبارسنجی فرم‌ها |
| Lucide React | `^1.72.0` | آیکون‌های SVG (منو، کاربران، محصول و…) |
| `@types/react-dom` | `^19.3.0` | تایپ‌های React DOM برای TypeScript |

ابزارهای تست و Lint در پروژه تعریف نشده‌اند.

---

## پیش‌نیازها

- **Node.js** نسخه ۲۰.۱۹ یا جدیدتر (الزام Vite 8)
- **npm**
- **Git**

---

## راه‌اندازی

```bash
# ۱. دریافت پروژه
git clone https://github.com/reyhanehalipour/NOVA-Admin.git
cd NOVA-Admin

# ۲. نصب وابستگی‌ها
npm install

# ۳. ساخت فایل متغیرهای محیطی
cp .env.example .env

# ۴. اجرای سرور توسعه
npm run dev
```

پس از اجرا، برنامه به‌صورت پیش‌فرض در `http://localhost:5173` در دسترس است. مسیر `/` به `/dashboard` هدایت می‌شود و در اولین ورود به صفحه `/login` منتقل می‌شوید.

---

## متغیرهای محیطی

فایل `.env.example` در ریشه پروژه:

```dotenv
VITE_API_BASE_URL=https://fakestoreapi.com
```

| متغیر | توضیح |
|-------|-------|
| `VITE_API_BASE_URL` | آدرس پایه درخواست‌های Axios؛ مقدارش در `axiosInstance` خوانده می‌شود |

نکات:

- `.env` در `.gitignore` قرار دارد و نباید کامیت شود.
- متغیرهای با پیشوند `VITE_` در سمت کلاینت قابل مشاهده‌اند و برای نگهداری secret مناسب نیستند.
- در صورت خالی بودن مقدار، `baseURL` رشته خالی می‌شود و درخواست‌ها نسبی ارسال خواهند شد.

---

## دستورات پروژه

دستورهای واقعی موجود در `package.json`:

| دستور | عملکرد |
|--------|--------|
| `npm run dev` | اجرای سرور توسعه Vite |
| `npm run build` | بررسی TypeScript با `tsc` و سپس باندل production با Vite |
| `npm run preview` | پیش‌نمایش خروجی باندل‌شده |

بررسی نوع‌ها به‌صورت مستقل:

```bash
npx tsc --noEmit
```

خروجی build در پوشه `dist/` تولید می‌شود که در Git نادیده گرفته شده است.

---

## ساختار پوشه‌ها

ساختار واقعی پروژه:

```text
NOVA-Admin/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx                  # نقطه ورود؛ Providerهای Redux، Theme و Language
│   ├── App.tsx                   # BrowserRouter و MainRoutes
│   ├── style.css                 # استایل پایه و ریست حداقلی
│   ├── Dictionary/
│   │   ├── index.ts              # getDictionary برای انتخاب دیکشنری بر اساس زبان
│   │   ├── LanguageContext.ts    # Context و هوک useLanguage
│   │   ├── LanguageProvider.tsx  # state زبان، persistence و تنظیم lang/dir
│   │   ├── dictionary.types.ts   # نوع Dictionary مشتق از faDictionary
│   │   ├── fa.ts                 # دیکشنری فارسی (۹۸ کلید)
│   │   └── en.ts                 # دیکشنری انگلیسی (۹۸ کلید)
│   ├── Pages/
│   │   ├── Login/Login.tsx
│   │   ├── Dashboard/Dashboard.tsx
│   │   ├── Products/
│   │   │   ├── ProductsList.tsx
│   │   │   └── CreateProduct/CreateProduct.tsx
│   │   └── Users/
│   │       ├── UsersList.tsx
│   │       └── CreateUser/CreateUser.tsx
│   ├── Redux/
│   │   ├── index.ts              # بازخروجی store و typeها
│   │   ├── hooks.ts              # useAppDispatch و useAppSelector تایپ‌شده
│   │   ├── store.ts              # ساخت Store و ثبت هندلر 401
│   │   ├── auth/authSlice.ts     # توکن، وضعیت لاگین و loginThunk
│   │   ├── products/productsSlice.ts
│   │   └── users/usersSlice.ts
│   ├── Routes/
│   │   ├── appRoutes.tsx         # ثابت ROUTES و فهرست مسیرها
│   │   ├── MainRoutes.tsx        # تعریف Routeها و ProtectedRoute
│   │   └── ProtectedRoute.tsx    # محافظت از مسیرهای مدیریتی
│   ├── Shared/
│   │   ├── components/
│   │   │   ├── PrimaryButton.ts  # دکمه اصلی با توکن‌های رنگ فعال
│   │   │   ├── FormFeedback.tsx  # نمایش پیام موفقیت/خطای فرم
│   │   │   ├── form.styles.ts    # استایل مشترک فرم‌ها و placeholder
│   │   │   └── Pagination.tsx    # کامپوننت صفحه‌بندی
│   │   ├── hooks/
│   │   │   └── usePagination.ts  # منطق صفحه‌بندی، بازه و ریست با جست‌وجو
│   │   ├── layout/
│   │   │   ├── index.ts
│   │   │   ├── AdminLayout.tsx   # چیدمان Sidebar + Header + Outlet
│   │   │   ├── Header.tsx        # آواتار، پیام خوش‌آمد و دکمه خروج
│   │   │   └── Sidebar.tsx       # منو، کلید تم، کلید زبان و پروفایل
│   │   └── theme/
│   │       ├── index.ts
│   │       ├── theme.types.ts    # اینترفیس Theme
│   │       ├── theme.tokens.ts   # توکن‌های فاصله و شعاع مشترک
│   │       ├── light.theme.ts    # پالت روشن
│   │       ├── dark.theme.ts     # پالت تاریک
│   │       ├── GlobalStyle.ts    # استایل سراسری createGlobalStyle
│   │       └── ThemeProvider.tsx # state تم و persistence
│   ├── Storage/
│   │   └── tokenStorage.ts       # کلید nova_admin_token در localStorage
│   ├── types/
│   │   ├── auth.types.ts         # LoginCredentials و AuthResponse
│   │   ├── product.types.ts      # Product، Rating و CreateProductInput
│   │   ├── user.types.ts         # Name، User و CreateUserInput
│   │   └── Enums/Language.enum.ts
│   └── Utils/
│       ├── api/
│       │   ├── axiosInstance.ts  # نمونه Axios، interceptor و withAuthorization
│       │   ├── authEvents.ts     # هندلر متمرکز 401 با single-flight
│       │   └── errorMessage.ts   # نگاشت خطا به کد و پیام دیکشنری
│       └── services/
│           ├── auth.service.ts   # POST /auth/login
│           ├── product.service.ts# GET/POST /products
│           └── user.service.ts   # GET/POST /users
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## معماری و نحوه پیاده‌سازی

### لایه‌بندی

```text
Pages (UI)
  ↓ useAppDispatch / useAppSelector
Redux Slices (state و thunk)
  ↓
Utils/services (فراخوانی endpoint)
  ↓
Utils/api/axiosInstance (تنظیمات مشترک و interceptor)
  ↓
FakeStoreAPI
```

کامپوننت‌ها هرگز مستقیماً با Axios کار نمی‌کنند؛ فراخوانی شبکه فقط در `Utils/services` انجام می‌شود و نتیجه از طریق Redux در اختیار UI قرار می‌گیرد.

### Redux Toolkit

`src/Redux/store.ts` سه reducer را در Store ثبت می‌کند: `auth`، `products` و `users`.

| Slice | thunkها | وضعیت‌ها |
|-------|---------|----------|
| `auth` | `loginThunk` | `token`، `isAuthenticated`، `status`، `error` |
| `products` | `fetchProductsThunk`، `createProductThunk` | `items`، `fetchStatus`، `createStatus`، `error` |
| `users` | `fetchUsersThunk`، `createUserThunk` | `items`، `fetchStatus`، `createStatus`، `error` |

- وضعیت‌های هر درخواست `idle | loading | succeeded | failed` هستند.
- خطاها با `rejectWithValue` و از طریق `toErrorMessage` به کد خطای قابل ترجمه تبدیل می‌شوند (مثلاً `networkError`، `serverError`، `forbiddenError`، `loginInvalid`).
- پس از ایجاد موفق محصول، آیتم در ابتدای `items` قرار می‌گیرد؛ در ایجاد کاربر، آیتم با ادغام پاسخ API و payload ساخته می‌شود و از تکراری شدن با بررسی `id` جلوگیری می‌شود.
- هوک‌های تایپ‌شده `useAppDispatch` و `useAppSelector` در `src/Redux/hooks.ts` قرار دارند.

### Axios Instance

`src/Utils/api/axiosInstance.ts`:

- `baseURL` از `import.meta.env.VITE_API_BASE_URL`
- `timeout: 10000` میلی‌ثانیه
- هدر پیش‌فرض `Content-Type: application/json`
- `interceptor` پاسخ: در خطای ۴۰۱ (به‌جز مسیر `/auth/login`) `notifyUnauthorized()` صدا زده می‌شود تا نشست کاربر بسته شود.
- `withAuthorization` یک helper برای افزودن هدر `Authorization: Bearer <token>` است.

`src/Utils/api/authEvents.ts` از الگوی single-flight استفاده می‌کند: در پاسخ‌های ۴۰۱ هم‌زمان، فقط یک‌بار هندلر خروج اجرا می‌شود و هندلر در `store.ts` ثبت می‌گردد.

### Routing و Protected Routes

- مسیرها در `src/Routes/MainRoutes.tsx` تعریف شده‌اند.
- `/login` خارج از محافظ عبور می‌کند.
- مسیرهای `/dashboard`، `/products`، `/products/create`، `/users` و `/users/create` داخل `ProtectedRoute` و `AdminLayout` قرار دارند.
- `ProtectedRoute` در صورت عدم احراز هویت، با `Navigate` و `state.from` کاربر را به `/login` می‌فرستد و پس از ورود، همان مسیر قبلی بازگردانده می‌شود.
- مسیر `/` به `/dashboard` و مسیرهای ناشناخته به یک placeholder `Not Found` هدایت می‌شوند.

### Theme Provider

- تم در `src/Shared/theme/ThemeProvider.tsx` مدیریت می‌شود و مقدار انتخابی در `localStorage` با کلید `nova_admin_theme` ذخیره می‌گردد.
- پالت‌های `light.theme.ts` و `dark.theme.ts` شامل رنگ‌های برند (Orange، Navy، Active Blue)، رنگ متن، border، success و error هستند.
- توکن‌های مشترک فاصله و شعاع در `theme.tokens.ts` قرار دارند و در همه کامپوننت‌های styled استفاده می‌شوند.
- `GlobalStyle` با `createGlobalStyle` ریست پایه، فونت سیستم و رفتار فرم‌ها را تعیین می‌کند.

### Language Provider و Dictionary

- `LanguageProvider` زبان پیش‌فرض را `fa` می‌گذارد و مقدار انتخابی را با کلید `nova_admin_language` در `localStorage` نگه می‌دارد.
- با تغییر زبان، `document.documentElement.lang` و `dir` به‌روزرسانی می‌شوند (`rtl` برای فارسی و `ltr` برای انگلیسی).
- `dictionary.types.ts` نوع `Dictionary` را از `faDictionary` می‌سازد؛ بنابراین افزودن کلید به `fa.ts` برای تایپ‌بودن `en.ts` الزامی است.
- متن‌های رابط، پیام‌های اعتبارسنجی و پیام‌های خطا همگی از دیکشنری خوانده می‌شوند و زبان switcher در سایدبار مقدار `FA`/`EN` را از state واقعی نمایش می‌دهد.

### Formik و Yup

- state فرم، `touched`، `errors` و `handleSubmit` با Formik مدیریت می‌شود.
- schema اعتبارسنجی با Yup تعریف می‌شود: الزامی‌بودن فیلدها، فرمت ایمیل، حداقل ۶ کاراکتر برای رمز، عدد مثبت برای قیمت و URL معتبر برای تصویر محصول.
- `validateOnMount: true` باعث می‌شود دکمه ارسال تا معتبرشدن فرم غیرفعال بماند.
- پیام موفقیت/خطای سرور با کامپوننت `FormFeedback` نمایش داده می‌شود و پس از موفقیت، فرم `resetForm` می‌شود.

### صفحه‌بندی

`usePagination` داده‌های فیلترشده را می‌پذیرد، `currentPage` را نگه می‌دارد و با تغییر عبارت جست‌وجو (`resetKey`) به صفحه اول برمی‌گردد. `Pagination` نیز بازه نمایش‌داده‌شده، شماره صفحات و جهت فلش‌ها را بر اساس زبان تعیین می‌کند.

---

## اتصال به API

این پروژه از **FakeStoreAPI** به عنوان backend آزمایشی استفاده می‌کند.

| عملیات | متد | Endpoint | فایل service |
|---------|-----|----------|---------------|
| ورود کاربر | `POST` | `/auth/login` | `auth.service.ts` |
| دریافت محصولات | `GET` | `/products` | `product.service.ts` |
| ایجاد محصول | `POST` | `/products` | `product.service.ts` |
| دریافت کاربران | `GET` | `/users` | `user.service.ts` |
| ایجاد کاربر | `POST` | `/users` | `user.service.ts` |

نکات اتصال:

- همه درخواست‌ها از `axiosInstance` عبور می‌کنند.
- پاسخ `POST /products` یک آبجکت کامل محصول و پاسخ `POST /users` تنها `{"id": <number>}` است؛ به همین دلیل در `createUserThunk` پاسخ API با payload فرم ادغام می‌شود تا ردیف جدید در جدول کامل باشد.
- جست‌وجو و صفحه‌بندی سمت کلاینت انجام می‌شوند و برای هر تغییر، درخواست جدیدی به API ارسال نمی‌شود.
- هدر `Authorization` در هیچ‌کدام از serviceها اعمال نمی‌شود؛ `withAuthorization` تعریف شده اما استفاده‌نشده است.

---

## احراز هویت و مدیریت نشست

1. کاربر در `/login` فرم را ارسال می‌کند و `loginThunk` درخواست `POST /auth/login` را می‌زند.
2. پاسخ شامل `token` است؛ توکن در state و در `localStorage` با کلید `nova_admin_token` ذخیره می‌شود.
3. در اجرای بعدی برنامه، `authSlice` مقدار اولیه را از `getToken()` می‌خواند و `isAuthenticated` را تعیین می‌کند.
4. `ProtectedRoute` بر اساس `isAuthenticated` درباره دسترسی تصمیم می‌گیرد.
5. با کلیک روی «خروج» در هدر، `logoutAction` توکن را حذف و state را پاک می‌کند و سپس به `/login` هدایت انجام می‌شود.
6. دریافت ۴۰۱ از هر درخواست (به‌جز `/auth/login`) نیز از طریق `notifyUnauthorized` همان مسیر خروج را طی می‌کند.

محدودیت‌های امنیتی این بخش:

- FakeStoreAPI توکن را اعتبارسنجی نمی‌کند و endpointهای آن عملاً محافظت‌شده نیستند؛ بنابراین این بخش جنبه نمایشی دارد.
- refresh token وجود ندارد و با اتمام اعتبار توکن، نشست بدون تجدید از دست می‌رود.
- توکن در `localStorage` نگهداری می‌شود و در برابر XSS مصون نیست؛ راهکار production استفاده از کوکی `HttpOnly` و بک‌اند امن است.
- اعتبارنامه دمو به‌صورت عمومی در FakeStoreAPI تعریف شده است و نباید به عنوان اعتبارنامه واقعی تلقی شود.

---

## محدودیت‌های شناخته‌شده

- **ماندگاری POST:** FakeStoreAPI داده‌های ایجادشده را ذخیره نمی‌کند؛ آیتم جدید تا زمان refresh در state باقی می‌ماند و پس از بارگذاری مجدد از بین می‌رود.
- **پاسخ ناقص کاربر:** `POST /users` فقط `id` برمی‌گرداند؛ به همین دلیل ردیف جدید در UI با payload فرم تکمیل می‌شود، نه با پاسخ کامل سرور.
- **دکمه‌های خروجی UI:** دکمه‌های منو و اعلان‌ها در هدر، و دکمه‌های Edit/Delete در جدول کاربران، فعلاً هندلر ندارند و جنبه ظاهری دارند.
- **مسیر `/settings`:** آیتم Settings در سایدبار تعریف شده اما مسیری معادل آن در `MainRoutes` وجود ندارد و به placeholder `Not Found` می‌رسد.
- **عدم ارسال توکن:** هدر `Authorization` در درخواست‌ها استفاده نمی‌شود و helper مربوطه بلااستفاده است.
- **پروژه تست/Lint ندارد:** اسکریپت test یا linter در `package.json` تعریف نشده و اعتبارسنجی فقط با `tsc` و build انجام می‌شود.
- **چیدمان دسکتاپ:** حداقل عرض ۱۲۸۰ پیکسل در نظر گرفته شده و طراحی واکنش‌گرا (Responsive) پیاده‌سازی نشده است.
- **فونت و آیکون:** از فونت‌های سیستم و آیکون‌های Lucide و emoji استفاده شده و فایل فونت سفارشی در پروژه وجود ندارد.
- **وابستگی به localStorage:** زبان و تم فقط در مرورگر فعلی ذخیره می‌شوند و بین دستگاه‌ها همگام نیستند.
- **API آزمایشی:** رفتار FakeStoreAPI لزوماً مشابه یک backend واقعی نیست و برای آن سند OpenAPI یا قرارداد رسمی در پروژه تعریف نشده است.

---

## مجوز

این پروژه برای اهداف آموزشی و ارزیابی استخدامی توسعه داده شده است و مجوز مشخصی برای استفاده تجاری ندارد.