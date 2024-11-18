
const labDetails = {
    lab1: `
        <h4>Лаборатори 1</h4>
        <p>Энэ хичээлийн хамгийн эхний лабораторийн ажлаар бүгдээрээ дараах даалгаваруудыг хийж гүйцэтгэнэ.</p>
        <ol>
            <li>Бүгд өөрсдийн компьютер дээр <strong>sublime</strong> гэдэг код засварлагч програм хангамжийг суулгана.</li>
            <li><strong>Github.com</strong> дээр өөрсдийн вэб хаягийг үүсгэнэ.</li>
            <li>Доорх кодыг github дээр байршуулан ажиллуулж өөрсдийн онлайн хаягтай болно.</li>
        </ol>
        <p>Доорх линкээс хэрхэн github дээр хаяг үүсгэх, өөрсдийн статик вэб сайтыг хост хийн байршуулах талаар хичээл байгаа шүү:</p>
        <a href="https://dev.to/ows_ali/how-to-host-a-static-website-on-github-for-free-2pd1" target="_blank">How to Host a Static Website on GitHub</a>
    `,
    lab2: `
        <h4>Лаборатори 2</h4>
        <p>Өөрсдийн тухай 5 хуудастай танилцуулга вэб сайтыг хөгжүүлнэ. Нүүр хуудас, миний тухай, миний гэр бүл, найзууд, холбоо барих гэх мэт хуудсуудтай байж болно.</p>
        <ul>
            <li>Вэб сайтынхаа бүтэцийг хүснэгт ашиглан гаргах.</li>
            <li>Бусад таг-уудыг нэмэлтээр хэрэглэх.</li>
            <li>Хуудас хооронд шилжихдээ <code>&lt;a&gt;</code> таг-г ашиглана.</li>
        </ul>
        <p><strong>Тусламж:</strong> Table based загвартай вэбүүдийг эндээс үзээд санаа авах боломжтой:</p>
        <a href="https://www.google.com/search?q=table+based+old+website+design&udm=2&sxsrf=ADLYWIJqn4UJNFuAkF-9H6ZqdVdC7wsaAg%3A1725861685882&uact=5" target="_blank">Table Based Old Website Design</a>
    `,
    lab3: `
        <h4>Лаборатори 3</h4>
        <p>Бүгдээрээ фэйсбүүк гэж сайтыг хэрэглэдэг байлгүй дээ тэ? Бидний мэдэх Марк маань энэхүү сайтыг 2004 онд <strong>DIV</strong> tag-г <strong>CSS</strong>-ээр хэлбэржүүлэхээс өмнө хүснэгт ашиглан хөгжүүлж олны хүртээл болгож байжээ.</p>
        <p>Энэ долоо хоногийн лабораторийн ажлаар бүгдээрээ <strong>Table</strong> буюу хүснэгт ашиглан вэб загвар, бүтэц гаргах бөгөөд гаргах вэб нь:</p>
        <a href="https://lh5.googleusercontent.com/NvrtQExncBwxxMGG1pccsDRqqfxyATShO1M_ERQJtSoZtBG3vd9u6gkZ6JPqTV9z4O-sjr7J6KYhtHFSGBtEsVCrHbwMxzNMMeWHvpSCf_HKV9D_54qK0ChvDQ" target="_blank">Facebook Style Template</a>
        <p>Энэхүү загварыг гаргахад шаардлагатай бүхий л мэдлэгийг та бүхэн эзэмшсэн байгаа гэдэгт итгэлтэй байна. Бие даан судлаад жаахан жаахан CSS ашиглаж болно.</p>
    `,
    lab4: "Lab 4: My CV - Build your personal CV using HTML and CSS.",
    lab5: "Lab 5: Bootstrap with Responsive Design - Use Bootstrap to create a responsive website.",
    lab6: "Lab 6: Flexbox Layout - Copy an existing website layout using Flexbox.",
    lab7: `
            <h4>Лабораторийн ажил 7</h4>
            <p>Өмнөх лаб дээр хийсэн лаг гоё сайтынхаа нүүр хуудсыг онлайн байршуулаад вэб сайтын SEO шалгадаг tools-үүдээр шалгана.</p>
            <p><a href="https://www.google.com/search?q=seo+checker" target="_blank">SEO Checker</a></p>
            <p>Шалгадаг сайтаар анх шалгахад хэдээ оноо авч байсанг screenshot хийгээд түүнийгээ хэд болгосоноо дахиад screenshot хийж авна.</p>
            <ul>
                <li>85-аас дээш оноо болгож чадвал 5 оноо</li>
                <li>80 болговол 4 оноо гэх мэт буураад явна.</li>
            </ul>
        `,
    lab8: "Lab 8: JavaScript Basics - Learn the basics of JavaScript for interactivity.",
    lab9: "Lab 9: Hangman with JavaScript - Create a Hangman game using JavaScript."
};

function showSelectedLabDetails() {
    const select = document.getElementById('lab-select');
    const selectedLab = select.value;
    const labDescription = document.getElementById('lab-description');

    if (selectedLab) {
        labDescription.innerHTML = `<p>${labDetails[selectedLab]}</p>`;
    } else {
        labDescription.innerHTML = "<p>Please select a lab from the dropdown above.</p>";
    }
}