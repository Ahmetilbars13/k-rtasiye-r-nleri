let defter=["kareli defter","20","telli defter","5","resim defteri","2"];
let kalem=["kurşun kalem","20","tukenmez","30","keçeli kalem","100"];
let boya=["pastel boya","200","kuru boya","3000","guaj boya","200"];
let i;
let urunAciklama,urunSecenek;
let eklenecekler=[];
let fiyatlar=[];
let listeSepet=document.getElementById("sepetMarket");
let toplamTutar=0;
const kod="kalem123";
for(i=0;i<document.getElementsByName("kategori").length;i++)
{
    document.getElementsByName("kategori")[i].addEventListener("change",urunleriGetir);
}   
function olustur(){
    urunAciklama=document.createElement("label");
    urunSecenek=document.createElement("input");
    document.getElementById("urunPanel").appendChild(urunAciklama);
    document.getElementById("urunPanel").appendChild(urunSecenek);
    urunSecenek.type="checkbox";
    urunSecenek.setAttribute("name","urunler");
    urunAciklama.setAttribute("for","urunler");
    urunAciklama.setAttribute("class","urunler");
}
function urunleriGetir(){
    const silinecekler = document.getElementById("urunPanel");
    while (silinecekler.hasChildNodes()) {
      silinecekler.removeChild(silinecekler.firstChild);
    }
    if(document.getElementById("defter").checked)
    {
        for(i=0;i<defter.length;i=i+2)
        {
            olustur();
            urunSecenek.value=defter[i+1];
            urunAciklama.innerHTML=defter[i]; 
        }
    }
    else if(document.getElementById("kalem").checked)
    {
        for(i=0;i<kalem.length;i=i+2)
        {
        olustur();
        urunSecenek.value=kalem[i+1];
        urunAciklama.innerHTML=kalem[i];
        }
    }
    else if(document.getElementById("boya").checked)
    {
        for(i=0;i<boya.length;i=i+2)
        {
        olustur();
        urunSecenek.value=boya[i+1];
        urunAciklama.innerHTML=boya[i];
        }
    }
}
function sepeteEkle(){
    const listeUrunlerFiyat=document.getElementsByName("urunler");
    const listeUrunlerAd=document.getElementsByClassName("urunler");
    let adet=document.getElementById("urunAdet").value;
        eklenecekler=[];
        fiyatlar=[];
        for(i=0;i<listeUrunlerFiyat.length;i++){
            if(listeUrunlerFiyat[i].checked){
                toplamTutar+=(Number(listeUrunlerFiyat[i].value)*adet);
                eklenecekler.push(listeUrunlerAd[i].innerHTML);
                fiyatlar.push(listeUrunlerFiyat[i].value);
            }
        }

        for(i=0;i<adet;i++)
    {
        let sepeteEklenecekUrun;
        for(let j=0;j<eklenecekler.length;j++){
            sepeteEklenecekUrun=document.createElement("option");
            listeSepet.options.add(sepeteEklenecekUrun);
            sepeteEklenecekUrun.text=eklenecekler[j];
            sepeteEklenecekUrun.value=fiyatlar[j];
        }
    }

    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}
function sepettenCikar(){
    let seciliIndeks=listeSepet.selectedIndex;
    let silinecekUrununFiyati=listeSepet.options[seciliIndeks].value;
    listeSepet.options.remove(seciliIndeks);
    toplamTutar=toplamTutar-silinecekUrununFiyati;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}
function sepetiBosalt(){
    document.querySelectorAll('#sepetMarket option').forEach(eleman => eleman.remove());
    toplamTutar=0;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";

}
function koduEkle(){
    let girilenKod=document.getElementById("txtIndirim").value;
    if(girilenKod == kod)
    {
        if(toplamTutar>=200)
        {
            toplamTutar=toplamTutar-80;
            document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
            document.getElementById("sonuc").innerHTML="İndirim uygulandı.";
            document.getElementById("txtIndirim").disabled=true;
            document.getElementById("txtIndirim").value="";
        }
        else{
            document.getElementById("sonuc").innerHTML="Girdiğiniz kod için minimum sepet tutarı 50 TL olmalıdır!";
        }
    }
    else{
        document.getElementById("sonuc").innerHTML="Geçerli bir kod girmediniz!";
    }
}


