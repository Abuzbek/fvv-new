<template>
  <footer class="bg-fb-primary pt-12 pb-2.5 text-white">
    <div class="container mx-auto px-4">
      <div
        class="grid grid-cols-12 gap-7 pb-12 footer-top"
        style="border-bottom: 1px solid rgba(230, 242, 255, 0.2)"
      >
        <div class="col-span-3">
          <a href="/" class="nav-logo flex items-center">
            <img src="@/assets/img/logo.png" />
            <p class="ml-1.5">
              FVV Akademiyasi huzuridagi
              <br />fuqoro muhofazasi instituti
            </p>
          </a>
        </div>
        <div class="col-span-2">
          <h3>Institut</h3>
          <ul>
            <li><a href="#!">Institut nizomi</a></li>
            <li><a href="#!">Institut tarixi</a></li>
            <li><a href="#!">Umumiy ma’lumotlar</a></li>
            <li><a href="#!">Bo‘sh ish o‘rinlar</a></li>
          </ul>
        </div>
        <div class="col-span-2">
          <h3>Tuzilma</h3>
          <ul>
            <li><a href="#!">Rahbariyat</a></li>
            <li><a href="#!">Kafedralar</a></li>
            <li><a href="#!">Markaz va bo‘limlar</a></li>
            <li><a href="#!">Ilmiy kengashlar</a></li>
          </ul>
        </div>
        <div class="col-span-3">
          <h3>Matbuot xizmati</h3>
          <ul>
            <li><a href="#!">Yangiliklar</a></li>
            <li><a href="#!">Tadbirlar</a></li>
            <li><a href="#!">Jurnallar</a></li>
            <li><a href="#!">E’lonlar</a></li>
          </ul>
        </div>
        <div class="col-span-2">
          <h3>Kontaktlar</h3>
          <ul>
            <li><a href="#!">Тел.: (0371) 000-00-00</a></li>
            <li><a href="#!">E-mail: info@FVV.uz</a></li>
            <li><a href="#!">Call center: 1050</a></li>
          </ul>
        </div>
      </div>
      <div class="flex flex-wrap items-center justify-between footer-bottom">
        <p>
          © 2005-2021 FVV Akademiyasi huzuridagi fuqoro muhofazasi instituti
        </p>
        <img src="../../assets/img/home/info.png" alt="" />
        <ul>
          <li>
            <a href="#!">
              <img src="../../assets/img/home/tg.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="#!">
              <img src="../../assets/img/home/fb.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="#!">
              <img src="../../assets/img/home/inst.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="#!">
              <img src="../../assets/img/home/twitter.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="#!">
              <img src="../../assets/img/home/youtube.svg" alt="" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<style scoped>
h3 {
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 15px;
}
.footer-top ul > li > a {
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #e6f2ff;
  display: inline-block;
  margin-bottom: 15px;
}
.footer-bottom{
  padding: 14px 0;
}
.footer-bottom ul{
  display: flex;
  align-items: center;
}
.footer-bottom a{
  display: flex;
  align-items: center;
  padding: 0 12px;
}
</style>
