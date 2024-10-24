document
  .getElementById("paymentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const live = "1";
    const oid = Math.random().toString(36).substring(7);
    const inv = "iPay" + Math.random().toString(36).substring(7);
    const ttl = document.getElementById("ttl").value;
    const tel = document.getElementById("tel").value;
    const eml = document.getElementById("eml").value;
    const vid = "demo";
    const curr = document.getElementById("curr").value;
    const p1 = "";
    const p2 = "";
    const p3 = "";
    const p4 = "";
    // autopay
    const autopay = "1";
    // channels
    const mpesa = "0";
    const airtel = "0";
    const equity = "0";
    const pesalink = "0";
    const bonga = "0";
    const vooma = "0";
    const unionpay = "0";
    // to disable card programatically uncomment the below, it will display only the card option by default as it is
    // const debitcard = '0';
    // const creditcard = '0';

    const fields = {
      live: live,
      oid: oid,
      inv: inv,
      ttl: ttl,
      tel: tel,
      eml: eml,
      vid: vid,
      curr: curr,
      p1: p1,
      p2: p2,
      p3: p3,
      p4: p4,
      cbk: "https://webhook.site/2e115c8a-0437-4ea7-a0c5-1819bddee8ec",
      cst: "1",
      crl: "2",
    };

    const datastring = Object.values(fields).join("");

    const hashkey = "demoCHANGED";
    const generated_hash = CryptoJS.HmacSHA1(datastring, hashkey).toString(
      CryptoJS.enc.Hex
    );

    // to enable channel, basically have the required channel's flag read 1.

    // with card disabled and autopay enabled
    //  const actionUrl = `https://payments.ipayafrica.com/v3/ke?autopay=${autopay}&mpesa=${mpesa}&airtel=${airtel}&equity=${equity}&pesalink=${pesalink}&bonga=${bonga}&vooma=${vooma}&unionpay=${unionpay}&creditcard=${creditcard}&debitcard=${debitcard}`;

    // with just card and autopay enabled
    //  const actionUrl = `https://payments.ipayafrica.com/v3/ke?autopay=${autopay}&mpesa=${mpesa}&airtel=${airtel}&equity=${equity}&pesalink=${pesalink}&bonga=${bonga}&vooma=${vooma}&unionpay=${unionpay}`;

    // out of the shell gateway without customization
    const actionUrl = `https://payments.ipayafrica.com/v3/ke`;

    console.log("Form action URL:", actionUrl);

    const form = document.createElement("form");
    form.action = actionUrl;
    form.method = "post";

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    const hshInput = document.createElement("input");
    hshInput.type = "hidden";
    hshInput.name = "hsh";
    hshInput.value = generated_hash;
    form.appendChild(hshInput);

    document.body.appendChild(form);
    form.submit();
    console.log("Form submitted");
  });
