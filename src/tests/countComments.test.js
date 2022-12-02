/** @jest-environment jsdom */
import updateCounter from "../modules/countComments";

describe("item comment count", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = `
        <div class="comments-div">
              
        </div>
        `
    })

    const createCommentHtml = ({ creationDate, username, comment }) => {

        const commentSpan = document.createElement('span');
        commentSpan.className = 'comment-sp';
        commentSpan.innerText = `
            ${creationDate} ${username}: ${comment}  
          `;
        return commentSpan;
      }

      const comments = [
      {
            creationDate: "02/12/2022", 
            username: "TeePee", 
            comment: "yeah, here"
      },
      {
        creationDate: "20/11/2022", 
        username: "V-Blaze", 
        comment: "who are you?"
      },
    ]

    test("get comment count on the dom", () => {
        const showComment = () => {
            const commentDiv =document.querySelector(".comments-div");
            comments.forEach((comment) => {
                commentDiv.append(createCommentHtml(comment));
            })
        }
        showComment();

        const result = updateCounter();

        expect(result).toBe(2);
    })
})