/**
 * 河津ヴィラ ティザーサイト用 JavaScript (ZINEN風デザイン版)
 * 機能:
 * 1. スムーススクロール (ページ内リンク用)
 * 2. スクロールに応じた要素のアニメーション表示 (Intersection Observer)
 * 3. フッターのコピーライト年の自動更新
 * 4. メールフォーム送信処理の基本構造 (バックエンド連携が別途必要)
 * 5. (任意) スクロールに応じたヘッダーのスタイル変更
 */
document.addEventListener('DOMContentLoaded', function() {

    /**
     * スムーススクロール機能
     */
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    // const header = document.querySelector('.header.zinen-header'); // ヘッダー取得 (スタイル変更用)

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href === '#' || href.startsWith('#!') || href.length < 2) {
                return;
            }
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const elementPosition = targetElement.getBoundingClientRect().top;
                // ZINEN風ヘッダーは通常固定しない or 高さが変動するため、オフセット計算は単純化
                const offsetPosition = window.pageYOffset + elementPosition;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /**
     * スクロールアニメーション機能 (Intersection Observer API)
     */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -10% 0px', // 画面下部10%くらいで発火
            threshold: 0.1
        });
        animatedElements.forEach(el => { observer.observe(el); });
    } else {
        animatedElements.forEach(el => { el.classList.add('is-visible'); });
        console.log("Intersection Observer not supported. Animations disabled.");
    }

    /**
     * フッターのコピーライト年の自動更新
     */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /**
     * メールフォーム送信処理 (フロントエンド部分)
     */
    const subscribeForm = document.querySelector('.subscribe-form-zinen');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = subscribeForm.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value : null;
            const privacyChecked = subscribeForm.querySelector('input[type="checkbox"]').checked;

            if (email && privacyChecked) {
                console.log("Form submitted. Email:", email);
                // --- ここに実際のメールアドレス送信処理を実装 (外部サービス連携など) ---
                alert('Thank you for subscribing! (仮)'); // 仮の成功メッセージ
                subscribeForm.reset();
                // --- ---
            } else if (!privacyChecked) {
                 alert('Please agree to the Privacy Policy.');
            } else {
                 alert('Please enter a valid email address.');
            }
        });
    }

    /**
     * (任意) スクロールに応じたヘッダーのスタイル変更
     * ZINENサイトではヘッダーが透過していてスクロールで背景が付くことが多い
     */
    /*
    const headerElement = document.querySelector('.header.zinen-header');
    if(headerElement) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) { // 50pxスクロールしたら
                headerElement.classList.add('scrolled');
            } else {
                headerElement.classList.remove('scrolled');
            }
        });
    }
    // 対応するCSS (.header.zinen-header.scrolled) も必要
    */

}); // End of DOMContentLoaded
