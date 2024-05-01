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
  const { commentStore } = useStore();
  const { addComments, createHubConnection, clearComments } = commentStore;

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
        <div className="text-center">Zadaj pytania organizatorowi</div>
        <div className="bg-white py-4 px-4">
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
              <Form className="flex justify-center items-center h-full">
                <Field name="commentText">
                  {(props: FieldProps) => (
                    <div className="w-[800px] relative">
                      <Loader active={isSubmitting} />
                      <textarea
                        className="block w-[80%] mx-auto"
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
          {commentStore.comments.map((comment) => (
            <div
              key={comment.commentId}
              className="flex space-x-4 items-center"
            >
              <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
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
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
