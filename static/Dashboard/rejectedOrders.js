import DB from '../../src/JS/DB';

class RejectedOrders {
	constructor() {
		this.closedOs = [];
		this.total = 0;
	}

	onNavigate() {
		this.rejectedOs = DB.getEntities('os', (os) => os.status == 'rejected');
		rejectedOsHolder.innerHTML = '';

		this.total = 0;

		this.rejectedOs.forEach((os) => {
			const osComponent = this.createFinishedOs(os);
			const osWrapper = document.createElement('div');
			osWrapper.innerHTML = osComponent;
			rejectedOsHolder.appendChild(osWrapper);

			this.total += this.getNumericPriceFromOS(os);
		});

		document.getElementById('rejectedTotal').innerHTML = this.getTotalString(this.total);
	}

	getNumericPriceFromOS(os) {
		return parseInt(os.price.replace(/[^\d]*/g, ''));
	}

	getTotalString(osPrice) {
		return 'R$ ' + (osPrice / 100).toString().replace(/\./g, ',');
	}

	createFinishedOs(os) {
		return `
        <div class="osContainer">
            <p class="osData osType">${os.osType} - ${os.price}</p>   
            <p class="osData osClient">${os.client}</p> 
            <p class="osData osDescription">${os.description}</p>
            
            <section class="commentsContainer">
                ${os.comments.reduce((acc, comment) => (acc += this.getCommentComponent(comment)), '') || 'Nenhum comentário ainda'}
            </section>
        </div>
        `;
	}

	getCommentComponent(comment) {
		return `
            <div class="commentHolder">
                <p class="commentText">${new Date(comment.date).toLocaleString('pt-BR').split(' ')[0]} - ${comment.comment}</p>
            </div>
        `;
	}
}

export default new RejectedOrders();
