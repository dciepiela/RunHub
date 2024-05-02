import { Field, FieldProps, Form, Formik } from "formik";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { DEFAULT_PHOTO_URL } from "../../../config";
import { Loader } from "semantic-ui-react";
import { RaceDto } from "../../../app/models/race";

interface Props {
  race: RaceDto;
}

export default observer(function RaceDetailsChat({ race }: Props) {
  const { commentStore, userStore } = useStore();
  const { addComments, createHubConnection, clearComments } = commentStore;
  const { user } = userStore;

  useEffect(() => {
    if (race.raceId) {
      createHubConnection(race.raceId);
    }
    return () => {
      clearComments();
    };
  }, [race.raceId, createHubConnection, clearComments]);
  return (
    <div className="w-full my-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex justify-center items-center mb-2">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Zadaj pytanie organizatorowi
          </h2>
        </div>
        <div>
          <div className="flex items-center">
            <img
              className="mr-2 mt-1 h-10 rounded-full "
              src={user?.image || DEFAULT_PHOTO_URL}
              alt="image"
            />
            <Formik
              onSubmit={(values, { resetForm }) =>
                addComments(values).then(() => resetForm())
              }
              initialValues={{ commentText: "" }}
              validationSchema={Yup.object({
                commentText: Yup.string().required(),
              })}
            >
              {({ isSubmitting, isValid, handleSubmit }) => (
                <Form className="py-2 px-4 bg-white rounded-lg rounded-t-lg border border-gray-200 w-full">
                  <Field name="commentText">
                    {(props: FieldProps) => (
                      <div className="relative">
                        <Loader active={isSubmitting} />
                        <textarea
                          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white"
                          placeholder="Dodaj komentarz (Enter, żeby dodać, SHIFT + enter dla nowej linii)"
                          rows={2}
                          {...props.field}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.shiftKey) {
                              return;
                            }
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              isValid && handleSubmit();
                            }
                          }}
                        />
                      </div>
                    )}
                  </Field>
                </Form>
              )}
            </Formik>
          </div>

          {commentStore.comments.map((comment) => (
            <div
              key={comment.commentId}
              className="flex space-x-4 items-center mt-4"
            >
              <div className="text-black p-4 antialiased">
                <img
                  className="mr-2 mt-1 w-10 rounded-full"
                  src={comment.image || DEFAULT_PHOTO_URL}
                  alt="image"
                />
              </div>
              <div className="w-full">
                <div className="flex flex-col bg-whiteNeutral rounded-3xl px-4 pt-2 pb-2.5">
                  <div className="text-sm leading-relaxed w-full">
                    <span className="font-semibold">
                      {race.hostUsername === comment.username
                        ? `${comment.displayName} (organizator)`
                        : `${comment.displayName}`}
                    </span>
                    <span className="ml-2">
                      {formatDistanceToNow(comment.createadAt, { locale: pl })}
                    </span>
                  </div>
                  <div className="text-normal leading-snug md:leading-normal">
                    {comment.commentText}
                  </div>
                </div>
              </div>
              {/* <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={comment.image || DEFAULT_PHOTO_URL}
                        alt="image"
                      />
                      {race.hostUsername === comment.username
                        ? `${comment.displayName} (organizator)`
                        : `${comment.displayName}`}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDistanceToNow(comment.createadAt, {
                        locale: pl,
                      })}{" "}
                      temu
                    </p>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {comment.commentText}
                </p>
              </article> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
