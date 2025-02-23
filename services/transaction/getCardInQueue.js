export default function buildGetCardInQueue(transactionDb) {
    return async function getCardInQueue(emailId) {
        try {
            let cards = await transactionDb.getCardFromQueue(emailId);
            if (!cards) {
                return `<html>
            <meta http-equiv="refresh" content="1200" >
            <script>
                setTimeout(() => {
                    window.location.href = '/auth/user/queueCards/${emailId}';
                }, 10000);
                </script><body><h1></h1></body></html>`
            }
                const html = `<meta http-equiv="refresh" content="1200" >
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #333333; /* dark gray background */
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .card {
                        width: 320px;
                        margin: 20px;
                        border: none;
                        border-radius: 12px;
                        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                        overflow: hidden;
                        background: #ffffff; /* White background */
                    }
                    .card-img-top {
                        width: 100%;
                        height: 160px;
                        object-fit: cover;
                    }
                    .card-body {
                        padding: 20px;
                        background: #ffffff; /* White background */
                    }
                    .card-title {
                        font-weight: bold;
                        font-size: 20px;
                        color: #333;
                        margin-bottom: 10px;
                    }
                    .card-text {
                        font-size: 14px;
                        color: #555;
                        line-height: 1.5;
                    }
                </style>
                <div class="card">
                    <img src=${cards.imageUrl} alt="Card Image" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">Title: ${cards.cardTitle}</h5>
                        <p class="card-text">Description: ${cards.description}</p>
                        <p class="card-text">Sent By: ${cards.streamerEmailId}</p>
                    </div>
                </div>
                <script>
                    setTimeout(() => {
                        window.location.href = '/auth/user/queueCards/${emailId}';
                    }, 10000);
                </script>
                </body>
            `;
            return html
        } catch (err) {
            console.log(err)
            return {
                status: "failure",
                message: err.message
            }
        }
    }
}