export class AppConfig {
  public static API_ENDPOINT= 'http://13.126.208.177:8080' ;
  public static  CURR_USER = JSON.parse(localStorage.getItem('currentUser'));
  public static IMG_ENDPOINT = 'http://www.examchain.in.s3-website.ap-south-1.amazonaws.com/question-images/';
}
